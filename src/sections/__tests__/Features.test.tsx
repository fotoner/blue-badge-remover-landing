import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Features } from "../Features";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({
  Scan: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="scan-icon" />
  ),
  Filter: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="filter-icon" />
  ),
  EyeOff: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="eyeoff-icon" />
  ),
  UserCheck: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="usercheck-icon" />
  ),
  Quote: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="quote-icon" />
  ),
  Globe: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="globe-icon" />
  ),
}));

describe("Features", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(screen.getByText("주요 기능")).toBeInTheDocument();
  });

  it("renders all 6 feature cards", () => {
    render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(screen.getByText("유료 뱃지 감지")).toBeInTheDocument();
    expect(screen.getByText("트윗 필터링")).toBeInTheDocument();
    expect(screen.getByText("숨김 모드")).toBeInTheDocument();
    expect(screen.getByText("화이트리스트")).toBeInTheDocument();
    expect(screen.getByText("인용 트윗 처리")).toBeInTheDocument();
    expect(screen.getByText("다국어 지원")).toBeInTheDocument();
  });

  it("has features id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(container.querySelector("#features")).toBeInTheDocument();
  });
});
