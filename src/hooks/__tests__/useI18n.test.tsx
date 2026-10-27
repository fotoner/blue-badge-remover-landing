import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider, useI18n } from "../useI18n";

function TestComponent() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="text">{t("hero.title")}</span>
      <button onClick={() => setLocale("en")}>EN</button>
      <button onClick={() => setLocale("ja")}>JA</button>
    </div>
  );
}

describe("useI18n", () => {
  it("defaults to Korean locale", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("ko");
    expect(screen.getByTestId("text")).toHaveTextContent(/파딱은 숨기고,\s+트친은 그대로\./);
  });

  it("switches to English when setLocale is called", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    await user.click(screen.getByText("EN"));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("text")).toHaveTextContent(/Hide the paid blue checks\.\s+Keep the people you follow\./);
  });

  it("switches to Japanese", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    await user.click(screen.getByText("JA"));
    expect(screen.getByTestId("locale")).toHaveTextContent("ja");
  });
});
