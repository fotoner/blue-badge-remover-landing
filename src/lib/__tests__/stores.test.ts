import { describe, it, expect } from "vitest";
import { detectBrowser, preferredStore, STORES } from "../stores";

const UA = {
  chrome: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  edge: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.2849.56",
  firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:131.0) Gecko/20100101 Firefox/131.0",
  firefoxAndroid: "Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
  whale: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Whale/3.28.266.14 Safari/537.36",
  safari: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
};

describe("detectBrowser", () => {
  it("Chrome, Edge, Firefox(데스크톱·Android)를 구분한다", () => {
    expect(detectBrowser(UA.chrome)).toBe("chrome");
    expect(detectBrowser(UA.edge)).toBe("edge");
    expect(detectBrowser(UA.firefox)).toBe("firefox");
    expect(detectBrowser(UA.firefoxAndroid)).toBe("firefox");
  });

  it("웨일 등 Chromium 기반 브라우저는 Chrome으로 본다", () => {
    expect(detectBrowser(UA.whale)).toBe("chrome");
  });

  it("확장을 지원하지 않는 브라우저는 other로 본다", () => {
    expect(detectBrowser(UA.safari)).toBe("other");
  });
});

describe("preferredStore", () => {
  it("브라우저에 맞는 스토어를 고르고, 그 외에는 Chrome 웹 스토어로 안내한다", () => {
    expect(preferredStore("firefox")).toBe("firefox");
    expect(preferredStore("edge")).toBe("edge");
    expect(preferredStore("chrome")).toBe("chrome");
    expect(preferredStore("other")).toBe("chrome");
  });
});

describe("STORES", () => {
  it("세 스토어의 실제 등록 페이지를 가리킨다", () => {
    expect(STORES.chrome.url).toContain("chromewebstore.google.com/detail/");
    expect(STORES.chrome.url).toContain("cjhmbgfnddpcdfmoicfcocekmainhhdm");
    expect(STORES.firefox.url).toBe("https://addons.mozilla.org/firefox/addon/blue-badge-remover/");
    expect(STORES.edge.url).toBe("https://microsoftedge.microsoft.com/addons/detail/jojbfbgedljheefmnbppjneiiilfoccp");
  });
});
