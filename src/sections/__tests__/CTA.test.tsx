import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CTA } from "../CTA";
import { StickyMobileCTA } from "../../components/StickyMobileCTA";
import { I18nProvider } from "../../hooks/useI18n";
import { LanguageSwitch } from "../../components/LanguageSwitch";

vi.mock("../../lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "../../lib/analytics";

describe("하단 CTA", () => {
  it("브라우저에 맞는 설치 버튼과 다른 스토어 링크를 보여주고 위치를 기록한다", async () => {
    render(<I18nProvider><CTA /></I18nProvider>);
    await userEvent.click(screen.getByRole("link", { name: "Chrome에 추가" }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "bottom_cta", store: "chrome" });
    expect(screen.getByRole("link", { name: "Firefox 부가 기능" })).toBeInTheDocument();
  });
});

describe("하단 CTA 제목", () => {
  it("히어로와 같은 캐치프레이즈를 같은 줄 나눔으로 보여준다", () => {
    render(<I18nProvider><CTA /></I18nProvider>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/파딱은 숨기고,\s+트친은 그대로\./);
    expect(heading).toHaveClass("whitespace-pre-line");
    expect(heading).toHaveClass("break-keep");
  });

  it("일본어에서는 어절 단위 줄바꿈을 쓰지 않는다", async () => {
    render(<I18nProvider><LanguageSwitch /><CTA /></I18nProvider>);
    await userEvent.click(screen.getByRole("button", { name: "日本語" }));
    expect(screen.getByRole("heading", { level: 2 })).not.toHaveClass("break-keep");
  });
});

describe("모바일 하단 고정 CTA", () => {
  it("설치 버튼 하나만 스타일이 적용된 버튼으로 보여준다", () => {
    render(<I18nProvider><StickyMobileCTA /></I18nProvider>);
    const link = screen.getByRole("link", { name: "Chrome에 추가" });
    expect(link).toHaveClass("w-full");
    expect(link).toHaveClass("bg-accent-blue");
    expect(screen.queryByRole("link", { name: "Firefox 부가 기능" })).not.toBeInTheDocument();
  });
});
