import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitch } from "../LanguageSwitch";
import { I18nProvider, useI18n } from "../../hooks/useI18n";

function LocaleDisplay() {
  const { locale } = useI18n();
  return <span data-testid="current-locale">{locale}</span>;
}

function renderWithI18n() {
  return render(
    <I18nProvider>
      <LanguageSwitch />
      <LocaleDisplay />
    </I18nProvider>,
  );
}

describe("LanguageSwitch", () => {
  it("renders three language buttons", () => {
    renderWithI18n();
    expect(screen.getByRole("button", { name: "한국어" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "日本語" })).toBeInTheDocument();
  });

  it("highlights the active locale", () => {
    renderWithI18n();
    const koButton = screen.getByRole("button", { name: "한국어" });
    expect(koButton.className).toContain("text-accent-blue");
  });

  it("switches locale on click", async () => {
    const user = userEvent.setup();
    renderWithI18n();
    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByTestId("current-locale")).toHaveTextContent("en");
  });
});
