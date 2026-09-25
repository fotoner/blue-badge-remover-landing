import { useI18n } from "../../hooks/useI18n";
import type { TranslationKeys } from "../../lib/i18n";
import { AnimatedToggle } from "./AnimatedToggle";

// 대시보드 기본값: 홈·상세·검색은 켜짐, 북마크·리스트는 꺼짐
const SCOPES: ReadonlyArray<{ key: TranslationKeys; on: boolean }> = [
  { key: "demo.scope.timeline", on: true },
  { key: "demo.scope.replies", on: true },
  { key: "demo.scope.search", on: true },
  { key: "demo.scope.bookmarks", on: false },
  { key: "demo.scope.lists", on: false },
  { key: "demo.scope.retweets", on: true },
];

export function FilteringDemo() {
  const { t } = useI18n();
  return (
    <div className="p-4">
      <p className="mb-2 text-[10px] uppercase tracking-wider text-[#71767b]">{t("demo.scope.title")}</p>
      {SCOPES.map((scope, i) => (
        <div
          key={scope.key}
          className="flex items-center justify-between border-b border-[#2f3336] py-2.5 last:border-0"
          style={{ animation: `fade-in-up 0.4s ease-out ${i * 120}ms both` }}
        >
          <span className="text-sm text-[#e7e9ea]">{t(scope.key)}</span>
          <AnimatedToggle delay={scope.on ? 700 + i * 250 : null} />
        </div>
      ))}
    </div>
  );
}
