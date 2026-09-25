import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL } from "./constants";
import type { TranslationKeys } from "./i18n";

export type Browser = "chrome" | "firefox" | "edge" | "other";
export type Store = Exclude<Browser, "other">;

export interface StoreInfo {
  url: string;
  ctaKey: TranslationKeys;
  nameKey: TranslationKeys;
}

export const STORES: Record<Store, StoreInfo> = {
  chrome: { url: CHROME_STORE_URL, ctaKey: "store.chrome.cta", nameKey: "store.chrome.name" },
  firefox: { url: FIREFOX_STORE_URL, ctaKey: "store.firefox.cta", nameKey: "store.firefox.name" },
  edge: { url: EDGE_STORE_URL, ctaKey: "store.edge.cta", nameKey: "store.edge.name" },
};

export const STORE_ORDER: readonly Store[] = ["chrome", "firefox", "edge"];

/** User-Agent로 설치할 스토어를 고른다. Edge는 "Edg/"를, Chromium 계열(웨일 등)은 "Chrome/"을 포함한다 */
export function detectBrowser(userAgent: string): Browser {
  if (/Firefox\//.test(userAgent)) return "firefox";
  if (/Edg\//.test(userAgent)) return "edge";
  if (/Chrome\//.test(userAgent)) return "chrome";
  return "other";
}

/** 확장을 설치할 수 없는 브라우저(Safari 등)는 Chrome 웹 스토어로 안내한다 */
export function preferredStore(browser: Browser): Store {
  return browser === "other" ? "chrome" : browser;
}
