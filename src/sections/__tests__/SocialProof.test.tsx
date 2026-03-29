import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "../SocialProof";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("lucide-react", () => ({
  Repeat2: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="repeat2-icon" />
  ),
  ShieldCheck: ({ className, ...props }: any) => (
    <span className={className} {...props} data-testid="shieldcheck-icon" />
  ),
}));

describe("SocialProof", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("사용자 반응")).toBeInTheDocument();
  });

  it("renders retweet stat", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("10,000+")).toBeInTheDocument();
    expect(screen.getByText("리트윗")).toBeInTheDocument();
  });

  it("renders privacy message", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("프라이버시 보호")).toBeInTheDocument();
    expect(screen.getByText(/데이터를 수집하거나/)).toBeInTheDocument();
  });
});
