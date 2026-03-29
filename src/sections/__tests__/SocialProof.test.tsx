import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "../SocialProof";
import { I18nProvider } from "../../hooks/useI18n";

describe("SocialProof", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("사용자 반응")).toBeInTheDocument();
  });

  it("renders testimonial cards", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getAllByText(/광명찾자/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/사용자 [A-N]씨/).length).toBeGreaterThan(0);
  });

  it("renders subtitle with RT count", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText(/10,000\+ RT/)).toBeInTheDocument();
  });
});
