import { describe, it, expect } from "vitest";
import { t, LOCALES } from "../i18n";

describe("i18n", () => {
  it("returns Korean text for ko locale", () => {
    expect(t("ko", "hero.title")).toBe("파딱은 숨기고,\n트친은 그대로.");
  });

  it("returns English text for en locale", () => {
    expect(t("en", "hero.title")).toBe("Hide the paid blue checks.\nKeep the people you follow.");
  });

  it("returns Japanese text for ja locale", () => {
    expect(t("ja", "hero.title")).toBe("課金バッジは隠して、\nフォロー中はそのまま。");
  });

  it("returns key as fallback for missing translation", () => {
    expect(t("ko", "nonexistent.key" as never)).toBe("nonexistent.key");
  });

  it("exports all supported locales", () => {
    expect(LOCALES).toEqual(["ko", "en", "ja"]);
  });
});
