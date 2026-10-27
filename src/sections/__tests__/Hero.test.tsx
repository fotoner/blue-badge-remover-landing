import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "../Hero";
import { I18nProvider } from "../../hooks/useI18n";
import { LanguageSwitch } from "../../components/LanguageSwitch";

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
      screen.getByRole("heading", { level: 1, name: /^파딱은 숨기고,\s+트친은 그대로\.$/ }),
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
    // 실제 팝업 제목 아래에는 설명 문구가 없다 (버전만 표시)
    expect(screen.queryByText(/수익성 파란 뱃지 계정을 숨깁니다/)).not.toBeInTheDocument();
  });

  it("한국어 제목은 어절 단위로만 줄바꿈한다", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("break-keep");
  });

  it("일본어에서는 어절 단위 줄바꿈을 쓰지 않아 좁은 화면에서 넘치지 않는다", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <LanguageSwitch />
        <Hero />
      </I18nProvider>,
    );
    await user.click(screen.getByRole("button", { name: "日本語" }));
    // 띄어쓰기가 없는 일본어에 keep-all을 걸면 한 줄이 화면 밖으로 넘친다
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveClass("break-keep");
    expect(screen.getByText(/X（Twitter）で有料青バッジ/)).not.toHaveClass("break-keep");
    // 팝업 미리보기 라벨은 확장의 일본어 표기를 따른다
    expect(screen.getByText("累計非表示")).toBeInTheDocument();
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
