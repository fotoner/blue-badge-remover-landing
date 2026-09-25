import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "../Hero";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("../../lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "../../lib/analytics";

describe("Hero", () => {
  it("renders headline and subtitle", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(
      screen.getByText("나의 타임라인을 되찾으세요"),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/파란 뱃지 계정을 자동으로/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("Chrome·Firefox·Edge를 지원한다고 표시한다", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(screen.getByText("Chrome · Firefox · Edge")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Firefox 부가 기능" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Edge 추가 기능" })).toBeInTheDocument();
  });

  it("renders CTA link to Chrome Web Store", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    const cta = screen.getByRole("link", { name: /Chrome에 추가/ });
    expect(cta).toHaveAttribute("href", expect.stringContaining("chromewebstore"));
  });

  it("renders GitHub link", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toBeInTheDocument();
  });

  it("renders popup preview", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    // 현재 팝업은 필터링 토글·숨김 통계·상태 요약·설정 열기만 있다 (세부 설정은 대시보드)
    expect(screen.getByText("Blue Badge Remover")).toBeInTheDocument();
    expect(screen.getByText("필터링")).toBeInTheDocument();
    expect(screen.getByText("오늘 128개 숨김")).toBeInTheDocument();
    expect(screen.getByText("설정 열기")).toBeInTheDocument();
    expect(screen.queryByText("홈 타임라인")).not.toBeInTheDocument();
  });

  it("tracks CTA click", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    await user.click(screen.getByRole("link", { name: /Chrome에 추가/ }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "hero", store: "chrome" });
  });
});
