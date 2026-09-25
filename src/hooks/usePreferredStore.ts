import { useMemo } from "react";
import { detectBrowser, preferredStore, type Store } from "../lib/stores";

/** 방문자의 브라우저에 맞는 설치 스토어 */
export function usePreferredStore(): Store {
  return useMemo(() => {
    const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
    return preferredStore(detectBrowser(userAgent));
  }, []);
}
