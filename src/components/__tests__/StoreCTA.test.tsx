import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoreCTA } from "../StoreCTA";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("../../lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "../../lib/analytics";

const FIREFOX_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:131.0) Gecko/20100101 Firefox/131.0";

function renderCTA(showAlternatives = true) {
  return render(
    <I18nProvider>
      <StoreCTA location="hero" showAlternatives={showAlternatives} />
    </I18nProvider>,
  );
}

describe("StoreCTA", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(trackEvent).mockClear();
  });

  it("기본은 Chrome 웹 스토어 버튼이고, Firefox·Edge는 다른 브라우저 링크로 보인다", () => {
    renderCTA();
    expect(screen.getByRole("link", { name: "Chrome에 추가" })).toHaveAttribute("href", expect.stringContaining("chromewebstore"));
    expect(screen.getByRole("link", { name: "Firefox 부가 기능" })).toHaveAttribute("href", expect.stringContaining("addons.mozilla.org"));
    expect(screen.getByRole("link", { name: "Edge 추가 기능" })).toHaveAttribute("href", expect.stringContaining("microsoftedge"));
  });

  it("Firefox로 접속하면 Firefox 부가 기능 버튼을 먼저 보여준다", () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(FIREFOX_UA);
    renderCTA();
    expect(screen.getByRole("link", { name: "Firefox에 추가" })).toHaveAttribute("href", expect.stringContaining("addons.mozilla.org"));
    expect(screen.getByRole("link", { name: "Chrome 웹 스토어" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Firefox 부가 기능" })).not.toBeInTheDocument();
  });

  it("클릭한 스토어를 이벤트에 함께 기록한다", async () => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(FIREFOX_UA);
    renderCTA();
    await userEvent.click(screen.getByRole("link", { name: "Firefox에 추가" }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "hero", store: "firefox" });
    await userEvent.click(screen.getByRole("link", { name: "Edge 추가 기능" }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "hero", store: "edge" });
  });

  it("다른 브라우저 링크를 숨길 수 있다 (모바일 하단 고정 버튼)", () => {
    renderCTA(false);
    expect(screen.getByRole("link", { name: "Chrome에 추가" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Edge 추가 기능" })).not.toBeInTheDocument();
  });
});
