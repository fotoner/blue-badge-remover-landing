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
      screen.getByText("깨끗한 타임라인을 되찾으세요"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/유료 파란 뱃지 계정을 자동으로 숨기는/),
    ).toBeInTheDocument();
  });

  it("renders social proof badge", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(screen.getByText(/10,000\+ RT/)).toBeInTheDocument();
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
    expect(screen.getByText("Blue Badge Remover")).toBeInTheDocument();
    expect(screen.getByText("Filtering")).toBeInTheDocument();
    expect(screen.getByText("Home Timeline")).toBeInTheDocument();
  });

  it("tracks CTA click", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    await user.click(screen.getByRole("link", { name: /Chrome에 추가/ }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "hero" });
  });
});
