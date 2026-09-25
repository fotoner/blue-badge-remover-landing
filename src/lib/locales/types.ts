import type { ko } from "./ko";

export type TranslationKey = keyof typeof ko;
export type Translations = Record<TranslationKey, string>;
