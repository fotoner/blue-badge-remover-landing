import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CTA } from "../CTA";
import { StickyMobileCTA } from "../../components/StickyMobileCTA";
import { I18nProvider } from "../../hooks/useI18n";

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

describe("모바일 하단 고정 CTA", () => {
  it("설치 버튼 하나만 스타일이 적용된 버튼으로 보여준다", () => {
    render(<I18nProvider><StickyMobileCTA /></I18nProvider>);
    const link = screen.getByRole("link", { name: "Chrome에 추가" });
    expect(link).toHaveClass("w-full");
    expect(link).toHaveClass("bg-accent-blue");
    expect(screen.queryByRole("link", { name: "Firefox 부가 기능" })).not.toBeInTheDocument();
  });
});
