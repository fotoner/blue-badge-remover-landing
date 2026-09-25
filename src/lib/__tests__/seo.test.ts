import { describe, expect, it } from "vitest";
import html from "../../../index.html?raw";
import ogImage from "../../../public/og-image.png?inline";

function meta(property: string): string | undefined {
  const match = html.match(
    new RegExp(`<meta (?:property|name)="${property}" content="([^"]*)"`),
  );
  return match?.[1];
}

/** PNG IHDR(16~23바이트)의 가로·세로 */
function pngSize(dataUrl: string): { width: number; height: number } {
  const bytes = atob(dataUrl.split(",")[1] ?? "");
  const readUint32 = (offset: number) =>
    ((bytes.charCodeAt(offset) << 24) |
      (bytes.charCodeAt(offset + 1) << 16) |
      (bytes.charCodeAt(offset + 2) << 8) |
      bytes.charCodeAt(offset + 3)) >>>
    0;
  return { width: readUint32(16), height: readUint32(20) };
}

describe("index.html SEO", () => {
  it("og:image 크기 선언이 실제 이미지 크기와 같다", () => {
    const { width, height } = pngSize(ogImage);
    expect(meta("og:image:width")).toBe(String(width));
    expect(meta("og:image:height")).toBe(String(height));
  });

  it("구조화 데이터가 Chrome·Firefox·Edge 지원을 알린다", () => {
    const json =
      html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )?.[1] ?? "{}";
    const data = JSON.parse(json) as { operatingSystem?: string };
    expect(data.operatingSystem).toContain("Chrome");
    expect(data.operatingSystem).toContain("Firefox");
    expect(data.operatingSystem).toContain("Edge");
  });

  it("검색·공유 설명이 Chrome 전용으로 소개하지 않는다", () => {
    for (const key of [
      "description",
      "og:description",
      "twitter:description",
    ]) {
      expect(meta(key)).toMatch(/Chrome·Firefox·Edge/);
    }
    expect(html).not.toMatch(/<title>[^<]*Chrome 확장<\/title>/);
  });
});
