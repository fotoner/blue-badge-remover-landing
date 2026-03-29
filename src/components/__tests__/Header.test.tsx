import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { I18nProvider } from "../../hooks/useI18n";

describe("Header", () => {
  it("renders logo text", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByText("Blue Badge Remover")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: "기능" })).toHaveAttribute("href", "#features");
    expect(screen.getByRole("link", { name: "설치" })).toHaveAttribute("href", "#guide");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
  });

  it("renders language switch", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });
});
