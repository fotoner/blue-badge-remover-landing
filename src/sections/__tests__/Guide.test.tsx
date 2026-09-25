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
    expect(screen.getByText("브라우저 스토어 방문")).toBeInTheDocument();
    expect(screen.getByText("스토어에서 추가")).toBeInTheDocument();
    expect(screen.getByText("설치하면 바로 시작")).toBeInTheDocument();
    // Chrome뿐 아니라 Firefox·Edge 스토어도 안내하고, 팔로우는 자동 수집됨을 알린다
    expect(screen.getByText(/Firefox 부가 기능.*Edge 추가 기능/)).toBeInTheDocument();
    expect(screen.getByText(/자동으로 모입니다/)).toBeInTheDocument();
  });

  it("has guide id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(container.querySelector("#guide")).toBeInTheDocument();
  });
});
