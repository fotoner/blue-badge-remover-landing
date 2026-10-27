// 공유용 OG 이미지(1200×630 PNG)를 template.html에서 만든다.
// 사용법: npm run og  →  public/og-image.png
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const WIDTH = 1200;
const HEIGHT = 630;
const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../../public/og-image.png');

// 설치된 Chrome으로 그린다 (Playwright 브라우저를 따로 받지 않아도 됨)
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve(here, 'template.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate('document.fonts.ready');

  // 웹 폰트를 못 받으면 대체 글꼴로 그려지므로 잘못된 이미지 대신 실패로 알린다.
  // document.fonts.check()는 등록된 폰트가 없어도 true라서 실제로 불러온 FontFace를 확인한다
  const fontLoaded = await page.evaluate(() =>
    [...document.fonts].some((face) => face.family.replaceAll('"', '') === 'IBM Plex Sans KR' && face.status === 'loaded'),
  );
  if (!fontLoaded) throw new Error('IBM Plex Sans KR 폰트를 불러오지 못했습니다 — 네트워크를 확인하세요');

  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
  process.stdout.write(`${out}\n`);
} finally {
  await browser.close();
}
