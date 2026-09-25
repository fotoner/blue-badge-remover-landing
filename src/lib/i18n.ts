import { ko } from "./locales/ko";
import { en } from "./locales/en";
import { ja } from "./locales/ja";
import type { TranslationKey, Translations } from "./locales/types";

export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

const translations: Record<Locale, Translations> = { ko, en, ja };

export type TranslationKeys = TranslationKey;

export function t(locale: Locale, key: TranslationKey): string {
  const localeTranslations = translations[locale];
  return (localeTranslations[key] as string) ?? key;
}
