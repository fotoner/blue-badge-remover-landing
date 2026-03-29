import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BeforeAfter } from "../BeforeAfter";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({
  Check: ({ className, ...props }: Record<string, unknown>) => (
    <span className={className as string} {...props} data-testid="check-icon" />
  ),
}));

describe("BeforeAfter", () => {
  it("renders before and after labels", () => {
    render(
      <I18nProvider>
        <BeforeAfter />
      </I18nProvider>,
    );
    expect(screen.getByText("BEFORE")).toBeInTheDocument();
    expect(screen.getByText("AFTER")).toBeInTheDocument();
  });

  it("renders spam tweets in before section", () => {
    render(
      <I18nProvider>
        <BeforeAfter />
      </I18nProvider>,
    );
    expect(screen.getByText(/이 코인 지금 안 사면/)).toBeInTheDocument();
    expect(screen.getByText(/투자 정보 드립니다/)).toBeInTheDocument();
  });

  it("renders clean tweets in both sections", () => {
    render(
      <I18nProvider>
        <BeforeAfter />
      </I18nProvider>,
    );
    expect(screen.getAllByText(/날씨 진짜 좋다/)).toHaveLength(2);
    expect(screen.getByText(/영화 진짜 추천/)).toBeInTheDocument();
  });

  it("renders hidden count message", () => {
    render(
      <I18nProvider>
        <BeforeAfter />
      </I18nProvider>,
    );
    expect(screen.getByText(/스팸 트윗 2개 숨김/)).toBeInTheDocument();
  });
});
