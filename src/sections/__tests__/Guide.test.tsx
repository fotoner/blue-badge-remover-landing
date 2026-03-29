import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Guide } from "../Guide";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({
  ExternalLink: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="external-link-icon" />
  ),
  Download: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="download-icon" />
  ),
  Users: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="users-icon" />
  ),
  Globe: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="globe-icon" />
  ),
}));

vi.mock("../../lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

describe("Guide", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(screen.getByText("설치 가이드")).toBeInTheDocument();
  });

  it("renders all 3 steps", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(screen.getByText("Chrome 웹 스토어 방문")).toBeInTheDocument();
    expect(screen.getAllByText("Chrome에 추가").length).toBeGreaterThan(0);
    expect(screen.getByText("팔로우 동기화 후 사용")).toBeInTheDocument();
  });

  it("has guide id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(container.querySelector("#guide")).toBeInTheDocument();
  });

  it("renders CTA link", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    const cta = screen.getByRole("link", { name: /Chrome에 추가/ });
    expect(cta).toBeInTheDocument();
  });
});
