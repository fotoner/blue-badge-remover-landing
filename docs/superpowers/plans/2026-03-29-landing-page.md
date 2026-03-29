# Blue Badge Remover Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed landing page for the Blue Badge Remover Chrome extension, featuring hero, feature showcase (bento grid), social proof, install guide, FAQ, and i18n (Ko/En/Ja).

**Architecture:** Route-Centric Feature structure — `routes → sections → components → lib`. TanStack Router file-based routing with a single landing page route. Sections are independent UI blocks composed in the page route. Shared logic (i18n, analytics) lives in `lib/` with React wrappers in `hooks/`.

**Tech Stack:** React 19, TypeScript (strict), Tailwind CSS 4, TanStack Router, Vite, Vitest + React Testing Library, GA4, GitHub Pages.

**Design System:** Dark Mode (OLED) + Bento Grid Showcase pattern. Space Grotesk (headings) + Inter (body). X-branded color palette (#0f172a bg, #1d9bf0 accent, #f4212e red). Lucide icons (SVG).

---

## File Structure

```
src/
├── routes/
│   ├── __root.tsx           # Root layout: I18nProvider + Header + Outlet + Footer
│   └── index.tsx            # Landing page: assembles all sections
├── sections/
│   ├── Hero.tsx             # Hero headline + CTA + extension preview
│   ├── Features.tsx         # Bento grid of 6 feature cards
│   ├── SocialProof.tsx      # Viral stats + user testimonials
│   ├── Guide.tsx            # 3-step install guide
│   └── FAQ.tsx              # Accordion FAQ
├── components/
│   ├── Button.tsx           # Shared button with variants (primary/secondary/ghost)
│   ├── Header.tsx           # Logo + nav links + language switch
│   ├── Footer.tsx           # Credits + links
│   ├── FeatureCard.tsx      # Individual bento grid card
│   ├── FAQItem.tsx          # Accordion item with expand/collapse
│   └── LanguageSwitch.tsx   # Ko/En/Ja toggle
├── hooks/
│   └── useI18n.tsx          # React context + hook for i18n
├── lib/
│   ├── i18n.ts              # Translation data + t() function
│   ├── analytics.ts         # GA4 event wrapper
│   └── constants.ts         # URLs, branding values
├── assets/
│   └── icon.svg             # Extension logo (red circle + white X)
├── main.tsx                 # App entry point
└── index.css                # Tailwind import + custom properties
```

### Test Files

```
src/
├── lib/
│   ├── __tests__/
│   │   ├── i18n.test.ts
│   │   └── analytics.test.ts
├── components/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── Header.test.tsx
│   │   ├── Footer.test.tsx
│   │   ├── FeatureCard.test.tsx
│   │   ├── FAQItem.test.tsx
│   │   └── LanguageSwitch.test.tsx
├── sections/
│   ├── __tests__/
│   │   ├── Hero.test.tsx
│   │   ├── Features.test.tsx
│   │   ├── SocialProof.test.tsx
│   │   ├── Guide.test.tsx
│   │   └── FAQ.test.tsx
└── hooks/
    └── __tests__/
        └── useI18n.test.tsx
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/index.css`, `src/vite-env.d.ts`, `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize Vite React TypeScript project**

```bash
npm create vite@latest . -- --template react-ts
```

If the directory is not empty, confirm overwrite. This creates the base project structure.

- [ ] **Step 2: Install core dependencies**

```bash
npm install @tanstack/react-router lucide-react
npm install -D @tanstack/router-plugin @tailwindcss/vite tailwindcss vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Configure Vite**

Replace `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite({ quoteStyle: "double" }), react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: true,
  },
});
```

- [ ] **Step 4: Create test setup file**

Create `src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Configure TypeScript**

Replace `tsconfig.app.json` — add path alias and strict settings:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Setup CSS with Tailwind 4**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  /* === Colors: X-branded dark palette === */
  --color-bg-primary: #0f172a;
  --color-bg-card: #1e293b;
  --color-bg-muted: #273340;
  --color-text-primary: #e7e9ea;
  --color-text-secondary: #71767b;
  --color-accent-blue: #1d9bf0;
  --color-accent-blue-hover: #1a8cd8;
  --color-accent-red: #f4212e;
  --color-border: #38444d;

  /* === Typography === */
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* === Spacing === */
  --spacing-section: 5rem;
  --spacing-section-mobile: 3rem;
}
```

- [ ] **Step 7: Setup index.html with fonts and meta**

Replace `index.html`:

```html
<!doctype html>
<html lang="ko" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="X(Twitter)에서 유료 파란 뱃지 계정을 자동으로 숨기는 Chrome 확장 프로그램" />
    <title>Blue Badge Remover</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-bg-primary text-text-primary font-body antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create .env.example**

Create `.env.example`:

```
VITE_GA_MEASUREMENT_ID=
```

- [ ] **Step 9: Update .gitignore**

Append to `.gitignore`:

```
.env
.env.local
```

- [ ] **Step 10: Create placeholder main.tsx**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>Hello</div>
  </StrictMode>,
);
```

- [ ] **Step 11: Verify setup**

```bash
npx vitest run 2>&1 || true
npm run build
```

Expected: Build succeeds. Tests may show "no tests" — that's OK at this stage.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: scaffold project with Vite, React, Tailwind 4, TanStack Router"
```

---

## Task 2: i18n Module (lib)

**Files:**
- Create: `src/lib/i18n.ts`
- Test: `src/lib/__tests__/i18n.test.ts`

- [ ] **Step 1: Write failing tests for i18n**

Create `src/lib/__tests__/i18n.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { t, type Locale, LOCALES } from "../i18n";

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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/__tests__/i18n.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement i18n module**

Create `src/lib/i18n.ts`:

```ts
export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

type TranslationKey = keyof typeof translations.ko;

const translations = {
  ko: {
    // Hero
    "hero.title": "깨끗한 타임라인을 되찾으세요",
    "hero.subtitle":
      "X(Twitter)에서 유료 파란 뱃지 계정을 자동으로 숨기는 Chrome 확장 프로그램",
    "hero.cta": "Chrome에 추가",
    "hero.cta.sub": "무료 · 데이터 수집 없음",

    // Features
    "features.title": "주요 기능",
    "features.badge.title": "유료 뱃지 감지",
    "features.badge.desc":
      "API 응답 분석으로 유료 구독 뱃지와 레거시 인증 뱃지를 정확히 구분합니다",
    "features.filter.title": "트윗 필터링",
    "features.filter.desc":
      "홈 타임라인, 트윗 상세, 검색 결과에서 영역별로 필터링을 설정할 수 있습니다",
    "features.hide.title": "숨김 모드",
    "features.hide.desc":
      "완전 삭제 또는 접기(클릭으로 펼치기) 중 원하는 방식을 선택하세요",
    "features.whitelist.title": "화이트리스트",
    "features.whitelist.desc":
      "팔로우 중인 계정은 자동 제외. 수동 화이트리스트도 지원합니다",
    "features.quote.title": "인용 트윗 처리",
    "features.quote.desc":
      "인용 트윗을 필터링하지 않거나, 인용 블록만 숨기거나, 전체 트윗을 숨길 수 있습니다",
    "features.i18n.title": "다국어 지원",
    "features.i18n.desc": "한국어, 영어, 일본어를 지원합니다",

    // Social Proof
    "social.title": "사용자 반응",
    "social.stat.rt": "10,000+",
    "social.stat.rt.label": "리트윗",
    "social.stat.users": "활발한 사용자 커뮤니티",
    "social.privacy.title": "프라이버시 보호",
    "social.privacy.desc":
      "모든 처리는 로컬에서 이루어집니다. 데이터를 수집하거나 외부로 전송하지 않습니다.",

    // Guide
    "guide.title": "설치 가이드",
    "guide.step1.title": "Chrome 웹 스토어 방문",
    "guide.step1.desc": "아래 버튼을 클릭하여 확장 프로그램 페이지로 이동합니다",
    "guide.step2.title": "Chrome에 추가",
    "guide.step2.desc": "'Chrome에 추가' 버튼을 클릭하여 설치합니다",
    "guide.step3.title": "X에서 사용",
    "guide.step3.desc":
      "X(Twitter)를 열면 자동으로 유료 뱃지 계정의 트윗이 필터링됩니다",

    // FAQ
    "faq.title": "자주 묻는 질문",
    "faq.q1": "팔로우 중인 계정도 숨겨지나요?",
    "faq.a1":
      "아니요. 팔로우 중인 계정은 자동으로 제외됩니다. 팔로잉 페이지에서 목록을 동기화하면 더 정확하게 작동합니다.",
    "faq.q2": "기업 인증 계정(금색/회색 뱃지)도 숨겨지나요?",
    "faq.a2":
      "아니요. Blue Badge Remover는 유료 구독으로 받은 파란 뱃지만 감지합니다. 기업 인증(금색)이나 정부 기관(회색) 뱃지는 영향받지 않습니다.",
    "faq.q3": "개인정보를 수집하나요?",
    "faq.a3":
      "전혀 수집하지 않습니다. 모든 처리는 브라우저 내에서 로컬로 이루어지며, 외부 서버와 통신하지 않습니다.",
    "faq.q4": "Firefox나 Safari에서도 사용할 수 있나요?",
    "faq.a4":
      "현재는 Chrome(및 Chromium 기반 브라우저)만 지원합니다. 다른 브라우저 지원은 검토 중입니다.",

    // Layout
    "nav.features": "기능",
    "nav.guide": "설치",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "피드백 보내기",
  },
  en: {
    "hero.title": "Take back your clean timeline",
    "hero.subtitle":
      "A Chrome extension that automatically hides tweets from paid blue badge accounts on X (Twitter)",
    "hero.cta": "Add to Chrome",
    "hero.cta.sub": "Free · No data collection",

    "features.title": "Key Features",
    "features.badge.title": "Paid Badge Detection",
    "features.badge.desc":
      "Accurately distinguishes paid subscription badges from legacy verified badges through API response analysis",
    "features.filter.title": "Tweet Filtering",
    "features.filter.desc":
      "Configure filtering per area: home timeline, tweet detail, and search results",
    "features.hide.title": "Hide Modes",
    "features.hide.desc":
      "Choose between complete removal or collapse (click to expand)",
    "features.whitelist.title": "Whitelist",
    "features.whitelist.desc":
      "Followed accounts are auto-excluded. Manual whitelist also supported",
    "features.quote.title": "Quote Tweet Handling",
    "features.quote.desc":
      "Don't filter, hide quote block only, or hide the entire tweet",
    "features.i18n.title": "Multi-language",
    "features.i18n.desc": "Supports Korean, English, and Japanese",

    "social.title": "User Response",
    "social.stat.rt": "10,000+",
    "social.stat.rt.label": "Retweets",
    "social.stat.users": "Active user community",
    "social.privacy.title": "Privacy First",
    "social.privacy.desc":
      "All processing happens locally. No data collection or external transmission.",

    "guide.title": "Installation Guide",
    "guide.step1.title": "Visit Chrome Web Store",
    "guide.step1.desc":
      "Click the button below to go to the extension page",
    "guide.step2.title": "Add to Chrome",
    "guide.step2.desc":
      "Click 'Add to Chrome' button to install",
    "guide.step3.title": "Use on X",
    "guide.step3.desc":
      "Open X (Twitter) and tweets from paid badge accounts will be automatically filtered",

    "faq.title": "FAQ",
    "faq.q1": "Are followed accounts also hidden?",
    "faq.a1":
      "No. Followed accounts are automatically excluded. Syncing your follow list from the Following page makes it even more accurate.",
    "faq.q2": "Are business verified accounts (gold/gray badge) hidden too?",
    "faq.a2":
      "No. Blue Badge Remover only detects blue badges from paid subscriptions. Business (gold) and government (gray) badges are not affected.",
    "faq.q3": "Do you collect personal data?",
    "faq.a3":
      "Absolutely not. All processing happens locally in your browser with no external server communication.",
    "faq.q4": "Can I use it on Firefox or Safari?",
    "faq.a4":
      "Currently only Chrome (and Chromium-based browsers) are supported. Other browser support is under consideration.",

    "nav.features": "Features",
    "nav.guide": "Install",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "Send Feedback",
  },
  ja: {
    "hero.title": "クリーンなタイムラインを取り戻そう",
    "hero.subtitle":
      "X（Twitter）で有料青バッジアカウントのツイートを自動的に非表示にするChrome拡張機能",
    "hero.cta": "Chromeに追加",
    "hero.cta.sub": "無料・データ収集なし",

    "features.title": "主な機能",
    "features.badge.title": "有料バッジ検出",
    "features.badge.desc":
      "APIレスポンス分析で有料サブスクバッジとレガシー認証バッジを正確に区別します",
    "features.filter.title": "ツイートフィルタリング",
    "features.filter.desc":
      "ホームタイムライン、ツイート詳細、検索結果ごとにフィルタリングを設定できます",
    "features.hide.title": "非表示モード",
    "features.hide.desc":
      "完全削除または折りたたみ（クリックで展開）から選べます",
    "features.whitelist.title": "ホワイトリスト",
    "features.whitelist.desc":
      "フォロー中のアカウントは自動除外。手動ホワイトリストもサポート",
    "features.quote.title": "引用ツイート処理",
    "features.quote.desc":
      "フィルタしない、引用ブロックのみ非表示、ツイート全体を非表示から選べます",
    "features.i18n.title": "多言語対応",
    "features.i18n.desc": "韓国語、英語、日本語に対応しています",

    "social.title": "ユーザーの反応",
    "social.stat.rt": "10,000+",
    "social.stat.rt.label": "リツイート",
    "social.stat.users": "活発なユーザーコミュニティ",
    "social.privacy.title": "プライバシー保護",
    "social.privacy.desc":
      "すべての処理はローカルで行われます。データの収集や外部送信は一切ありません。",

    "guide.title": "インストールガイド",
    "guide.step1.title": "Chrome Web Storeにアクセス",
    "guide.step1.desc":
      "下のボタンをクリックして拡張機能ページに移動します",
    "guide.step2.title": "Chromeに追加",
    "guide.step2.desc":
      "「Chromeに追加」ボタンをクリックしてインストールします",
    "guide.step3.title": "Xで使用",
    "guide.step3.desc":
      "X（Twitter）を開くと、有料バッジアカウントのツイートが自動的にフィルタリングされます",

    "faq.title": "よくある質問",
    "faq.q1": "フォロー中のアカウントも非表示になりますか？",
    "faq.a1":
      "いいえ。フォロー中のアカウントは自動的に除外されます。フォローページでリストを同期するとより正確に動作します。",
    "faq.q2": "企業認証アカウント（金色/灰色バッジ）も非表示になりますか？",
    "faq.a2":
      "いいえ。Blue Badge Removerは有料サブスクリプションの青バッジのみを検出します。企業認証（金色）や政府機関（灰色）バッジには影響しません。",
    "faq.q3": "個人情報を収集しますか？",
    "faq.a3":
      "一切収集しません。すべての処理はブラウザ内でローカルに行われ、外部サーバーとの通信はありません。",
    "faq.q4": "FirefoxやSafariでも使えますか？",
    "faq.a4":
      "現在はChrome（およびChromiumベースのブラウザ）のみサポートしています。他のブラウザのサポートは検討中です。",

    "nav.features": "機能",
    "nav.guide": "インストール",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "フィードバックを送る",
  },
} as const;

export type TranslationKeys = TranslationKey;

export function t(locale: Locale, key: TranslationKey): string {
  const localeTranslations = translations[locale];
  return (localeTranslations[key] as string) ?? key;
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/lib/__tests__/i18n.test.ts
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n.ts src/lib/__tests__/i18n.test.ts
git commit -m "feat: add i18n module with Ko/En/Ja translations"
```

---

## Task 3: i18n React Hook

**Files:**
- Create: `src/hooks/useI18n.tsx`
- Test: `src/hooks/__tests__/useI18n.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/hooks/__tests__/useI18n.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider, useI18n } from "../useI18n";

function TestComponent() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="text">{t("hero.title")}</span>
      <button onClick={() => setLocale("en")}>EN</button>
      <button onClick={() => setLocale("ja")}>JA</button>
    </div>
  );
}

describe("useI18n", () => {
  it("defaults to Korean locale", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("ko");
    expect(screen.getByTestId("text")).toHaveTextContent(
      "깨끗한 타임라인을 되찾으세요",
    );
  });

  it("switches to English when setLocale is called", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    await user.click(screen.getByText("EN"));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("text")).toHaveTextContent(
      "Take back your clean timeline",
    );
  });

  it("switches to Japanese", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>,
    );
    await user.click(screen.getByText("JA"));
    expect(screen.getByTestId("locale")).toHaveTextContent("ja");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/__tests__/useI18n.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement useI18n hook with context**

Create `src/hooks/useI18n.tsx`:

```tsx
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { t as translate, type Locale, type TranslationKeys } from "../lib/i18n";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");

  const t = useCallback(
    (key: TranslationKeys) => translate(locale, key),
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/hooks/__tests__/useI18n.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useI18n.tsx src/hooks/__tests__/useI18n.test.tsx
git commit -m "feat: add useI18n React context and hook"
```

---

## Task 4: Analytics & Constants

**Files:**
- Create: `src/lib/analytics.ts`, `src/lib/constants.ts`
- Test: `src/lib/__tests__/analytics.test.ts`

- [ ] **Step 1: Write failing tests for analytics**

Create `src/lib/__tests__/analytics.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackEvent, trackPageView } from "../analytics";

describe("analytics", () => {
  beforeEach(() => {
    vi.stubGlobal("gtag", vi.fn());
  });

  it("sends page_view event", () => {
    trackPageView("/");
    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/",
    });
  });

  it("sends custom event", () => {
    trackEvent("cta_click", { location: "hero" });
    expect(gtag).toHaveBeenCalledWith("event", "cta_click", {
      location: "hero",
    });
  });

  it("does not throw when gtag is undefined", () => {
    vi.stubGlobal("gtag", undefined);
    expect(() => trackPageView("/")).not.toThrow();
    expect(() => trackEvent("test")).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/__tests__/analytics.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement analytics module**

Create `src/lib/analytics.ts`:

```ts
declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
}

export function trackPageView(path: string): void {
  if (typeof gtag !== "function") return;
  gtag("event", "page_view", { page_path: path });
}

export function trackEvent(
  name: string,
  params?: Record<string, string>,
): void {
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
```

- [ ] **Step 4: Create constants module**

Create `src/lib/constants.ts`:

```ts
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/blue-badge-remover/TODO";

export const GITHUB_URL =
  "https://github.com/niceplugin/blue-badge-remover";

export const AUTHOR_X_URL = "https://x.com/fotoner_p";
export const AUTHOR_HANDLE = "@fotoner_p";

export const FEEDBACK_URL =
  "https://docs.google.com/forms/d/e/TODO/viewform";
```

- [ ] **Step 5: Run tests**

```bash
npx vitest run src/lib/__tests__/analytics.test.ts
```

Expected: All 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/analytics.ts src/lib/__tests__/analytics.test.ts src/lib/constants.ts
git commit -m "feat: add analytics wrapper and project constants"
```

---

## Task 5: Button Component

**Files:**
- Create: `src/components/Button.tsx`
- Test: `src/components/__tests__/Button.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/__tests__/Button.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-accent-blue");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-border");
  });

  it("calls onClick handler", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders as anchor when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/__tests__/Button.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Button component**

Create `src/components/Button.tsx`:

```tsx
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  variant?: Variant;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold",
  secondary:
    "border border-border hover:border-text-secondary text-text-primary bg-transparent",
  ghost:
    "text-text-secondary hover:text-text-primary bg-transparent",
};

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue";

  const className = `${baseStyles} ${variantStyles[variant]} ${(props as { className?: string }).className ?? ""}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className: _, ...rest } = props as ButtonAsButton;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/__tests__/Button.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Button.tsx src/components/__tests__/Button.test.tsx
git commit -m "feat: add Button component with primary/secondary/ghost variants"
```

---

## Task 6: LanguageSwitch Component

**Files:**
- Create: `src/components/LanguageSwitch.tsx`
- Test: `src/components/__tests__/LanguageSwitch.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/__tests__/LanguageSwitch.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitch } from "../LanguageSwitch";
import { I18nProvider, useI18n } from "../../hooks/useI18n";

function LocaleDisplay() {
  const { locale } = useI18n();
  return <span data-testid="current-locale">{locale}</span>;
}

function renderWithI18n() {
  return render(
    <I18nProvider>
      <LanguageSwitch />
      <LocaleDisplay />
    </I18nProvider>,
  );
}

describe("LanguageSwitch", () => {
  it("renders three language buttons", () => {
    renderWithI18n();
    expect(screen.getByRole("button", { name: "한국어" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "日本語" })).toBeInTheDocument();
  });

  it("highlights the active locale", () => {
    renderWithI18n();
    const koButton = screen.getByRole("button", { name: "한국어" });
    expect(koButton.className).toContain("text-accent-blue");
  });

  it("switches locale on click", async () => {
    const user = userEvent.setup();
    renderWithI18n();
    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByTestId("current-locale")).toHaveTextContent("en");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/__tests__/LanguageSwitch.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement LanguageSwitch**

Create `src/components/LanguageSwitch.tsx`:

```tsx
import { useI18n } from "../hooks/useI18n";
import { LOCALES, type Locale } from "../lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "EN",
  ja: "日本語",
};

export function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`cursor-pointer rounded-md px-2 py-1 text-xs font-medium transition-colors duration-200 ${
            locale === loc
              ? "text-accent-blue"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/__tests__/LanguageSwitch.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/LanguageSwitch.tsx src/components/__tests__/LanguageSwitch.test.tsx
git commit -m "feat: add LanguageSwitch component for Ko/En/Ja"
```

---

## Task 7: Header & Footer Components

**Files:**
- Create: `src/components/Header.tsx`, `src/components/Footer.tsx`
- Test: `src/components/__tests__/Header.test.tsx`, `src/components/__tests__/Footer.test.tsx`

- [ ] **Step 1: Write failing tests for Header**

Create `src/components/__tests__/Header.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { I18nProvider } from "../../hooks/useI18n";

describe("Header", () => {
  it("renders logo text", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByText("Blue Badge Remover")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: "기능" })).toHaveAttribute("href", "#features");
    expect(screen.getByRole("link", { name: "설치" })).toHaveAttribute("href", "#guide");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "#faq");
  });

  it("renders language switch", () => {
    render(
      <I18nProvider>
        <Header />
      </I18nProvider>,
    );
    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write failing tests for Footer**

Create `src/components/__tests__/Footer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import { I18nProvider } from "../../hooks/useI18n";

describe("Footer", () => {
  it("renders author credit", () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );
    expect(screen.getByText("@fotoner_p")).toBeInTheDocument();
  });

  it("renders feedback link", () => {
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /피드백/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run src/components/__tests__/Header.test.tsx src/components/__tests__/Footer.test.tsx
```

Expected: FAIL — modules not found.

- [ ] **Step 4: Implement Header**

Create `src/components/Header.tsx`:

```tsx
import { useI18n } from "../hooks/useI18n";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { t } = useI18n();

  const navLinks = [
    { key: "nav.features" as const, href: "#features" },
    { key: "nav.guide" as const, href: "#guide" },
    { key: "nav.faq" as const, href: "#faq" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="" className="h-6 w-6" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold">
            Blue Badge Remover
          </span>
        </div>

        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Implement Footer**

Create `src/components/Footer.tsx`:

```tsx
import { useI18n } from "../hooks/useI18n";
import { AUTHOR_X_URL, AUTHOR_HANDLE, FEEDBACK_URL, GITHUB_URL } from "../lib/constants";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-sm text-text-secondary">
        <div className="flex items-center gap-4">
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-primary"
          >
            {t("footer.feedback")}
          </a>
          <span className="text-border">·</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-primary"
          >
            GitHub
          </a>
        </div>
        <p>
          {t("footer.credit")}{" "}
          <a
            href={AUTHOR_X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            {AUTHOR_HANDLE}
          </a>
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run src/components/__tests__/Header.test.tsx src/components/__tests__/Footer.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.tsx src/components/Footer.tsx src/components/__tests__/Header.test.tsx src/components/__tests__/Footer.test.tsx
git commit -m "feat: add Header and Footer layout components"
```

---

## Task 8: Router Setup & Root Layout

**Files:**
- Create: `src/routes/__root.tsx`, `src/routes/index.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Generate route tree**

```bash
npx tsr generate
```

This creates `src/routeTree.gen.ts` from the file-based routes.

- [ ] **Step 2: Create root layout route**

Create `src/routes/__root.tsx`:

```tsx
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Create index route (placeholder)**

Create `src/routes/index.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <h1 className="font-heading text-4xl font-bold">Landing Page</h1>
    </div>
  );
}
```

- [ ] **Step 4: Regenerate route tree**

```bash
npx tsr generate
```

- [ ] **Step 5: Wire up main.tsx with router**

Replace `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { I18nProvider } from "./hooks/useI18n";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>,
);
```

- [ ] **Step 6: Verify dev server**

```bash
npm run dev -- --open
```

Expected: Page loads with Header (logo + nav + language switch), "Landing Page" placeholder text, and Footer.

- [ ] **Step 7: Commit**

```bash
git add src/routes/ src/routeTree.gen.ts src/main.tsx
git commit -m "feat: setup TanStack Router with root layout"
```

---

## Task 9: Hero Section

**Files:**
- Create: `src/sections/Hero.tsx`
- Test: `src/sections/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/sections/__tests__/Hero.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "../Hero";
import { I18nProvider } from "../../hooks/useI18n";

vi.mock("../../lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from "../../lib/analytics";

describe("Hero", () => {
  it("renders headline and subtitle", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    expect(
      screen.getByText("깨끗한 타임라인을 되찾으세요"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/유료 파란 뱃지 계정을 자동으로 숨기는/),
    ).toBeInTheDocument();
  });

  it("renders CTA link to Chrome Web Store", () => {
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    const cta = screen.getByRole("link", { name: /Chrome에 추가/ });
    expect(cta).toHaveAttribute("href", expect.stringContaining("chromewebstore"));
  });

  it("tracks CTA click", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>,
    );
    await user.click(screen.getByRole("link", { name: /Chrome에 추가/ }));
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "hero" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/sections/__tests__/Hero.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Hero section**

Create `src/sections/Hero.tsx`:

```tsx
import { Chrome } from "lucide-react";
import { Button } from "../components/Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL } from "../lib/constants";

export function Hero() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "hero" });
  }

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-secondary">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          <span>Chrome Extension</span>
        </div>

        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
            <Chrome className="h-5 w-5" aria-hidden="true" />
            {t("hero.cta")}
          </Button>
          <span className="text-sm text-text-secondary">{t("hero.cta.sub")}</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/sections/__tests__/Hero.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/sections/__tests__/Hero.test.tsx
git commit -m "feat: add Hero section with CTA and analytics tracking"
```

---

## Task 10: FeatureCard + Features Section (Bento Grid)

**Files:**
- Create: `src/components/FeatureCard.tsx`, `src/sections/Features.tsx`
- Test: `src/components/__tests__/FeatureCard.test.tsx`, `src/sections/__tests__/Features.test.tsx`

- [ ] **Step 1: Write failing tests for FeatureCard**

Create `src/components/__tests__/FeatureCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "../FeatureCard";
import { Shield } from "lucide-react";

describe("FeatureCard", () => {
  it("renders icon, title, and description", () => {
    render(
      <FeatureCard icon={Shield} title="Test Title" description="Test Description" />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("applies span classes for grid sizing", () => {
    const { container } = render(
      <FeatureCard
        icon={Shield}
        title="Wide Card"
        description="Spans 2 columns"
        className="sm:col-span-2"
      />,
    );
    expect(container.firstChild).toHaveClass("sm:col-span-2");
  });
});
```

- [ ] **Step 2: Write failing tests for Features section**

Create `src/sections/__tests__/Features.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Features } from "../Features";
import { I18nProvider } from "../../hooks/useI18n";

describe("Features", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(screen.getByText("주요 기능")).toBeInTheDocument();
  });

  it("renders all 6 feature cards", () => {
    render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(screen.getByText("유료 뱃지 감지")).toBeInTheDocument();
    expect(screen.getByText("트윗 필터링")).toBeInTheDocument();
    expect(screen.getByText("숨김 모드")).toBeInTheDocument();
    expect(screen.getByText("화이트리스트")).toBeInTheDocument();
    expect(screen.getByText("인용 트윗 처리")).toBeInTheDocument();
    expect(screen.getByText("다국어 지원")).toBeInTheDocument();
  });

  it("has features id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <Features />
      </I18nProvider>,
    );
    expect(container.querySelector("#features")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run src/components/__tests__/FeatureCard.test.tsx src/sections/__tests__/Features.test.tsx
```

Expected: FAIL — modules not found.

- [ ] **Step 4: Implement FeatureCard**

Create `src/components/FeatureCard.tsx`:

```tsx
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-bg-card p-6 transition-colors duration-200 hover:border-text-secondary ${className}`}
    >
      <div className="mb-4 inline-flex rounded-xl bg-accent-blue/10 p-3">
        <Icon className="h-6 w-6 text-accent-blue" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
```

- [ ] **Step 5: Implement Features section with bento grid**

Create `src/sections/Features.tsx`:

```tsx
import { Scan, Filter, EyeOff, UserCheck, Quote, Globe } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { useI18n } from "../hooks/useI18n";
import type { LucideIcon } from "lucide-react";
import type { TranslationKeys } from "../lib/i18n";

interface FeatureItem {
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  className?: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Scan,
    titleKey: "features.badge.title",
    descKey: "features.badge.desc",
    className: "sm:col-span-2",
  },
  {
    icon: Filter,
    titleKey: "features.filter.title",
    descKey: "features.filter.desc",
  },
  {
    icon: EyeOff,
    titleKey: "features.hide.title",
    descKey: "features.hide.desc",
  },
  {
    icon: UserCheck,
    titleKey: "features.whitelist.title",
    descKey: "features.whitelist.desc",
  },
  {
    icon: Quote,
    titleKey: "features.quote.title",
    descKey: "features.quote.desc",
  },
  {
    icon: Globe,
    titleKey: "features.i18n.title",
    descKey: "features.i18n.desc",
    className: "sm:col-span-2",
  },
];

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="mx-auto max-w-5xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("features.title")}
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon, titleKey, descKey, className }) => (
          <FeatureCard
            key={titleKey}
            icon={icon}
            title={t(titleKey)}
            description={t(descKey)}
            className={className}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run src/components/__tests__/FeatureCard.test.tsx src/sections/__tests__/Features.test.tsx
```

Expected: All 5 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/FeatureCard.tsx src/components/__tests__/FeatureCard.test.tsx src/sections/Features.tsx src/sections/__tests__/Features.test.tsx
git commit -m "feat: add Features section with bento grid layout"
```

---

## Task 11: Social Proof Section

**Files:**
- Create: `src/sections/SocialProof.tsx`
- Test: `src/sections/__tests__/SocialProof.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/sections/__tests__/SocialProof.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "../SocialProof";
import { I18nProvider } from "../../hooks/useI18n";

describe("SocialProof", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("사용자 반응")).toBeInTheDocument();
  });

  it("renders retweet stat", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("10,000+")).toBeInTheDocument();
    expect(screen.getByText("리트윗")).toBeInTheDocument();
  });

  it("renders privacy message", () => {
    render(
      <I18nProvider>
        <SocialProof />
      </I18nProvider>,
    );
    expect(screen.getByText("프라이버시 보호")).toBeInTheDocument();
    expect(screen.getByText(/데이터를 수집하거나/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/sections/__tests__/SocialProof.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement SocialProof section**

Create `src/sections/SocialProof.tsx`:

```tsx
import { Repeat2, ShieldCheck } from "lucide-react";
import { useI18n } from "../hooks/useI18n";

export function SocialProof() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-5xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("social.title")}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* RT Stats */}
        <div className="flex flex-col items-center rounded-2xl border border-border bg-bg-card p-8 text-center">
          <Repeat2 className="mb-4 h-10 w-10 text-accent-blue" aria-hidden="true" />
          <p className="font-heading text-5xl font-bold">{t("social.stat.rt")}</p>
          <p className="mt-2 text-lg text-text-secondary">{t("social.stat.rt.label")}</p>
          <p className="mt-4 text-sm text-text-secondary">{t("social.stat.users")}</p>
        </div>

        {/* Privacy */}
        <div className="flex flex-col items-center rounded-2xl border border-border bg-bg-card p-8 text-center">
          <ShieldCheck className="mb-4 h-10 w-10 text-green-500" aria-hidden="true" />
          <p className="font-heading text-2xl font-bold">{t("social.privacy.title")}</p>
          <p className="mt-4 leading-relaxed text-text-secondary">
            {t("social.privacy.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/sections/__tests__/SocialProof.test.tsx
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/sections/SocialProof.tsx src/sections/__tests__/SocialProof.test.tsx
git commit -m "feat: add SocialProof section with stats and privacy"
```

---

## Task 12: Guide Section

**Files:**
- Create: `src/sections/Guide.tsx`
- Test: `src/sections/__tests__/Guide.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/sections/__tests__/Guide.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Guide } from "../Guide";
import { I18nProvider } from "../../hooks/useI18n";

describe("Guide", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(screen.getByText("설치 가이드")).toBeInTheDocument();
  });

  it("renders all 3 steps", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(screen.getByText("Chrome 웹 스토어 방문")).toBeInTheDocument();
    expect(screen.getByText("Chrome에 추가")).toBeInTheDocument();
    expect(screen.getByText("X에서 사용")).toBeInTheDocument();
  });

  it("has guide id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    expect(container.querySelector("#guide")).toBeInTheDocument();
  });

  it("renders CTA link", () => {
    render(
      <I18nProvider>
        <Guide />
      </I18nProvider>,
    );
    const cta = screen.getByRole("link", { name: /Chrome에 추가/ });
    expect(cta).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/sections/__tests__/Guide.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Guide section**

Create `src/sections/Guide.tsx`:

```tsx
import { ExternalLink, Download, Zap, Chrome } from "lucide-react";
import { Button } from "../components/Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL } from "../lib/constants";
import type { LucideIcon } from "lucide-react";
import type { TranslationKeys } from "../lib/i18n";

interface StepItem {
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
}

const STEPS: StepItem[] = [
  { icon: ExternalLink, titleKey: "guide.step1.title", descKey: "guide.step1.desc" },
  { icon: Download, titleKey: "guide.step2.title", descKey: "guide.step2.desc" },
  { icon: Zap, titleKey: "guide.step3.title", descKey: "guide.step3.desc" },
];

export function Guide() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "guide" });
  }

  return (
    <section id="guide" className="mx-auto max-w-5xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("guide.title")}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, titleKey, descKey }, index) => (
          <div key={titleKey} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10">
              <Icon className="h-8 w-8 text-accent-blue" aria-hidden="true" />
            </div>
            <span className="mt-4 text-sm font-medium text-text-secondary">
              Step {index + 1}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold">{t(titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t(descKey)}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
          <Chrome className="h-5 w-5" aria-hidden="true" />
          {t("hero.cta")}
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/sections/__tests__/Guide.test.tsx
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Guide.tsx src/sections/__tests__/Guide.test.tsx
git commit -m "feat: add Guide section with 3-step install instructions"
```

---

## Task 13: FAQItem + FAQ Section

**Files:**
- Create: `src/components/FAQItem.tsx`, `src/sections/FAQ.tsx`
- Test: `src/components/__tests__/FAQItem.test.tsx`, `src/sections/__tests__/FAQ.test.tsx`

- [ ] **Step 1: Write failing tests for FAQItem**

Create `src/components/__tests__/FAQItem.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQItem } from "../FAQItem";

describe("FAQItem", () => {
  it("renders question text", () => {
    render(<FAQItem question="Test question?" answer="Test answer." />);
    expect(screen.getByText("Test question?")).toBeInTheDocument();
  });

  it("hides answer by default", () => {
    render(<FAQItem question="Q?" answer="A." />);
    const details = screen.getByRole("group");
    expect(details).not.toHaveAttribute("open");
  });

  it("shows answer when clicked", async () => {
    const user = userEvent.setup();
    render(<FAQItem question="Q?" answer="A." />);
    await user.click(screen.getByText("Q?"));
    expect(screen.getByText("A.")).toBeVisible();
  });
});
```

- [ ] **Step 2: Write failing tests for FAQ section**

Create `src/sections/__tests__/FAQ.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQ } from "../FAQ";
import { I18nProvider } from "../../hooks/useI18n";

describe("FAQ", () => {
  it("renders section title", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.getByText("자주 묻는 질문")).toBeInTheDocument();
  });

  it("renders all 4 questions", () => {
    render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(screen.getByText("팔로우 중인 계정도 숨겨지나요?")).toBeInTheDocument();
    expect(screen.getByText(/기업 인증 계정/)).toBeInTheDocument();
    expect(screen.getByText("개인정보를 수집하나요?")).toBeInTheDocument();
    expect(screen.getByText(/Firefox나 Safari/)).toBeInTheDocument();
  });

  it("has faq id for anchor navigation", () => {
    const { container } = render(
      <I18nProvider>
        <FAQ />
      </I18nProvider>,
    );
    expect(container.querySelector("#faq")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run src/components/__tests__/FAQItem.test.tsx src/sections/__tests__/FAQ.test.tsx
```

Expected: FAIL — modules not found.

- [ ] **Step 4: Implement FAQItem with native details/summary**

Create `src/components/FAQItem.tsx`:

```tsx
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group border-b border-border" role="group">
      <summary className="flex cursor-pointer items-center justify-between py-5 text-left font-medium transition-colors duration-200 hover:text-accent-blue">
        <span>{question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="pb-5 leading-relaxed text-text-secondary">{answer}</p>
    </details>
  );
}
```

- [ ] **Step 5: Implement FAQ section**

Create `src/sections/FAQ.tsx`:

```tsx
import { FAQItem } from "../components/FAQItem";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";

const FAQ_KEYS: Array<{ q: TranslationKeys; a: TranslationKeys }> = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

export function FAQ() {
  const { t } = useI18n();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("faq.title")}
      </h2>
      <div className="mt-12">
        {FAQ_KEYS.map(({ q, a }) => (
          <FAQItem key={q} question={t(q)} answer={t(a)} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run src/components/__tests__/FAQItem.test.tsx src/sections/__tests__/FAQ.test.tsx
```

Expected: All 6 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/FAQItem.tsx src/components/__tests__/FAQItem.test.tsx src/sections/FAQ.tsx src/sections/__tests__/FAQ.test.tsx
git commit -m "feat: add FAQ section with accordion items"
```

---

## Task 14: Landing Page Assembly

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Assemble all sections into landing page**

Replace `src/routes/index.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../sections/Hero";
import { Features } from "../sections/Features";
import { SocialProof } from "../sections/SocialProof";
import { Guide } from "../sections/Guide";
import { FAQ } from "../sections/FAQ";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <SocialProof />
      <Guide />
      <FAQ />
    </>
  );
}
```

- [ ] **Step 2: Verify full page renders**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

## Task 15: SEO & Meta Tags

**Files:**
- Modify: `index.html`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Add OG tags and JSON-LD to index.html**

Add to `<head>` in `index.html`, after the existing `<meta name="description">`:

```html
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Blue Badge Remover" />
    <meta property="og:description" content="X(Twitter)에서 유료 파란 뱃지 계정을 자동으로 숨기는 Chrome 확장 프로그램" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:url" content="https://TODO.github.io/blue-badge-remover-landing/" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Blue Badge Remover" />
    <meta name="twitter:description" content="X(Twitter)에서 유료 파란 뱃지 계정을 자동으로 숨기는 Chrome 확장 프로그램" />
    <meta name="twitter:image" content="/og-image.png" />

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Blue Badge Remover",
      "operatingSystem": "Chrome",
      "applicationCategory": "BrowserApplication",
      "description": "X(Twitter)에서 유료 파란 뱃지 계정을 자동으로 숨기는 Chrome 확장 프로그램",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>
```

- [ ] **Step 2: Add GA4 script to index.html**

Add before closing `</head>` in `index.html`:

```html
    <!-- GA4 (loaded only when measurement ID is set) -->
    <script>
      (function() {
        var id = '%VITE_GA_MEASUREMENT_ID%';
        if (!id || id.indexOf('VITE_') === 0) return;
        var s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
        s.async = true;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', id);
      })();
    </script>
```

Note: Vite replaces `%VITE_*%` patterns in `index.html` with env var values during build.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add SEO meta tags, OG, JSON-LD, and GA4 script"
```

---

## Task 16: GitHub Pages Deployment

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy.yml`, `public/404.html`

- [ ] **Step 1: Add base path to vite config**

In `vite.config.ts`, add `base` to the config:

```ts
export default defineConfig({
  base: "/blue-badge-remover-landing/",
  plugins: [TanStackRouterVite({ quoteStyle: "double" }), react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: true,
  },
});
```

- [ ] **Step 2: Create SPA redirect 404.html**

Create `public/404.html`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Blue Badge Remover</title>
    <script>
      // GitHub Pages SPA redirect
      // Redirects all 404s to index.html with the path preserved as a query param
      var pathSegmentsToKeep = 1; // repo name segment
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 3: Add SPA redirect handler in index.html**

Add before `<script type="module" src="/src/main.tsx">` in `index.html`:

```html
    <!-- GitHub Pages SPA redirect handler -->
    <script>
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
```

- [ ] **Step 4: Create GitHub Actions deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds, `dist/` contains `index.html`, `404.html`, and assets.

- [ ] **Step 6: Commit**

```bash
git add vite.config.ts public/404.html .github/workflows/deploy.yml index.html
git commit -m "chore: add GitHub Pages deployment with SPA routing support"
```

---

## Task 17: Copy Extension Logo & Final Verification

**Files:**
- Create: `public/icon.svg` (copy from source project)

- [ ] **Step 1: Copy extension logo**

```bash
cp ~/dev/blue-badge-remover/public/icons/icon.svg public/icon.svg
```

- [ ] **Step 2: Run all tests**

```bash
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 3: Build and verify**

```bash
npm run build && ls -la dist/
```

Expected: Build succeeds. `dist/` contains `index.html`, `404.html`, `icon.svg`, and `assets/`.

- [ ] **Step 4: Commit**

```bash
git add public/icon.svg
git commit -m "chore: add extension logo asset"
```

---

## Design System Reference

### Color Tokens (Tailwind)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0f172a` | Page background |
| `bg-card` | `#1e293b` | Cards, elevated surfaces |
| `bg-muted` | `#273340` | Subtle backgrounds |
| `text-primary` | `#e7e9ea` | Body text |
| `text-secondary` | `#71767b` | Muted text |
| `accent-blue` | `#1d9bf0` | CTA, links, active states |
| `accent-blue-hover` | `#1a8cd8` | CTA hover |
| `accent-red` | `#f4212e` | Logo, destructive actions |
| `border` | `#38444d` | Borders, dividers |

### Typography

| Element | Font | Weight | Size (mobile → desktop) |
|---------|------|--------|-------------------------|
| H1 (Hero) | Space Grotesk | 700 | text-4xl → text-6xl |
| H2 (Section) | Space Grotesk | 700 | text-3xl → text-4xl |
| H3 (Card) | Space Grotesk | 600 | text-lg |
| Body | Inter | 400 | text-sm – text-base |
| Label | Inter | 500 | text-xs – text-sm |

### Spacing

- Section padding: `py-20` (80px desktop), `py-12` (48px mobile)
- Card padding: `p-6` (24px)
- Component gap: `gap-4` (16px)
- Grid gap: `gap-4` (16px) – `gap-8` (32px)

### Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | < 640px | Single column, mobile |
| `sm` | ≥ 640px | Two columns for features |
| `md` | ≥ 768px | Hero text size increase |
| `lg` | ≥ 1024px | Four-column bento grid |

### Bento Grid Layout (Features)

```
┌──────────────────┬──────────┬──────────┐
│   Badge Detect   │  Filter  │   Hide   │
│   (col-span-2)   │          │          │
├──────────┬───────┴──────────┴──────────┤
│Whitelist │  Quote Tweet  │   i18n       │
│          │               │ (col-span-2) │
└──────────┴───────────────┴─────────────┘
```
