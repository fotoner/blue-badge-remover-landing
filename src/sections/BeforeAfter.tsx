import { Check } from "lucide-react";
import { useI18n } from "../hooks/useI18n";

export function BeforeAfter() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-4xl px-4 py-(--spacing-section)">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* Before */}
        <div className="rounded-2xl border border-accent-red/20 bg-accent-red/[0.04] p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-md bg-accent-red px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("ba.before")}
            </span>
            <span className="text-xs text-text-secondary">{t("ba.before.desc")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <TweetRow
              name="spam_promoter"
              badge
              text={t("ba.spam1")}
              faded
            />
            <TweetRow name="친구" text={t("ba.clean1")} />
            <TweetRow
              name="badge_buyer"
              badge
              text={t("ba.spam2")}
              faded
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden items-center text-2xl font-bold text-accent-blue md:flex">
          →
        </div>
        <div className="flex items-center justify-center text-2xl font-bold text-accent-blue md:hidden">
          ↓
        </div>

        {/* After */}
        <div className="rounded-2xl border border-green-500/15 bg-green-500/[0.03] p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-md bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("ba.after")}
            </span>
            <span className="text-xs text-text-secondary">{t("ba.after.desc")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <TweetRow name="친구" text={t("ba.clean1")} />
            <TweetRow name="동료" text={t("ba.clean2")} />
          </div>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-green-500">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {t("ba.hidden")}
          </div>
        </div>
      </div>
    </section>
  );
}

function TweetRow({
  name,
  text,
  badge,
  faded,
}: {
  name: string;
  text: string;
  badge?: boolean;
  faded?: boolean;
}) {
  return (
    <div
      className={`flex gap-2.5 rounded-lg bg-bg-card p-2.5 ${faded ? "opacity-60" : ""}`}
    >
      <div className="h-7 w-7 flex-shrink-0 rounded-full bg-bg-muted" />
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-1">
          <span className="truncate text-xs font-semibold">{name}</span>
          {badge && (
            <span className="text-[10px] text-accent-blue" aria-label="paid badge">
              ✓
            </span>
          )}
        </div>
        <p className={`text-xs leading-relaxed ${faded ? "text-text-secondary" : ""}`}>
          {text}
        </p>
      </div>
    </div>
  );
}
