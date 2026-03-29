import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import { I18nProvider } from "../../hooks/useI18n";

describe("Footer", () => {
  it("renders author credit", () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );
    expect(screen.getByText("@fotoner_p")).toBeInTheDocument();
  });

  it("renders feedback link", () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /피드백/ })).toBeInTheDocument();
  });
});
