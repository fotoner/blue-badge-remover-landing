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

/** 띄어쓰기로 어절을 나누는 한국어·영어만 어절 단위로 줄바꿈한다. 띄어쓰기가 없는 일본어에 keep-all을 걸면 한 줄이 화면 밖으로 넘친다 */
export function wordBreakClass(locale: Locale): string {
  return locale === "ja" ? "" : "break-keep";
}
