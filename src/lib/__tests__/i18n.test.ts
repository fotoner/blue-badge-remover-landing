import { describe, it, expect } from "vitest";
import { t, LOCALES } from "../i18n";

describe("i18n", () => {
  it("returns Korean text for ko locale", () => {
    expect(t("ko", "hero.title")).toBe("깨끗한 타임라인을 되찾으세요");
  });

  it("returns English text for en locale", () => {
    expect(t("en", "hero.title")).toBe("Take back your clean timeline");
  });

  it("returns Japanese text for ja locale", () => {
    expect(t("ja", "hero.title")).toBe("クリーンなタイムラインを取り戻そう");
  });

  it("returns key as fallback for missing translation", () => {
    expect(t("ko", "nonexistent.key" as never)).toBe("nonexistent.key");
  });

  it("exports all supported locales", () => {
    expect(LOCALES).toEqual(["ko", "en", "ja"]);
  });
});
