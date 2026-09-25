import { useEffect, useState } from "react";
import { useI18n } from "../../hooks/useI18n";
import type { TranslationKeys } from "../../lib/i18n";

interface Row {
  avatar: string;
  handle: string;
  textKey: TranslationKeys;
  resultKey: TranslationKeys;
  hidden: boolean;
}

// 선택 필터를 켜면 모든 파딱이 아니라 조건에 맞는 파딱만 숨긴다
const ROWS: readonly Row[] = [
  { avatar: "🤑", handle: "coin_signal", textKey: "demo.selective.coin", resultKey: "demo.selective.hidden.keyword", hidden: true },
  { avatar: "🧑‍💻", handle: "tech_daily", textKey: "demo.selective.info", resultKey: "demo.selective.shown", hidden: false },
  { avatar: "📈", handle: "viral_now", textKey: "demo.selective.viral", resultKey: "demo.selective.hidden.aggressor", hidden: true },
];

export function SelectiveFilterDemo() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = ROWS.map((_, i) => setTimeout(() => setStep(i + 1), 900 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-1.5">
        {(["demo.selective.keyword", "demo.selective.aggressor"] as const).map((key) => (
          <span key={key} className="rounded-md bg-accent-blue/20 px-2 py-1 text-[10px] font-medium text-accent-blue">
            {t(key)}
          </span>
        ))}
      </div>
      <div className="divide-y divide-[#2f3336] overflow-hidden rounded-lg border border-[#2f3336]">
        {ROWS.map((row, i) => {
          const decided = step > i;
          return (
            <div
              key={row.handle}
              className="flex items-center gap-3 px-3 py-2.5 transition-opacity duration-500"
              style={{ opacity: decided && row.hidden ? 0.35 : 1 }}
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-[#16181c] text-center text-sm leading-8">{row.avatar}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-bold text-[#e7e9ea]">{row.handle}</span>
                  <span className="text-[#1d9bf0]">✓</span>
                </div>
                <p className="truncate text-xs text-[#e7e9ea]">{t(row.textKey)}</p>
                {decided && (
                  <span className={`animate-[fade-in-up_0.3s_ease-out_both] text-[10px] ${row.hidden ? "text-accent-red" : "text-green-500"}`}>
                    {t(row.resultKey)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
