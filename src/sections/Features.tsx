import { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";
import { BadgeDetectionDemo } from "./features/BadgeDetectionDemo";
import { FilteringDemo } from "./features/FilteringDemo";
import { HideModesDemo } from "./features/HideModesDemo";
import { WhitelistDemo } from "./features/WhitelistDemo";
import { QuoteTweetDemo } from "./features/QuoteTweetDemo";

interface FeatureItem {
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  Demo: React.ComponentType;
}

const FEATURES: FeatureItem[] = [
  {
    titleKey: "features.badge.title",
    descKey: "features.badge.desc",
    Demo: BadgeDetectionDemo,
  },
  {
    titleKey: "features.filter.title",
    descKey: "features.filter.desc",
    Demo: FilteringDemo,
  },
  {
    titleKey: "features.hide.title",
    descKey: "features.hide.desc",
    Demo: HideModesDemo,
  },
  {
    titleKey: "features.whitelist.title",
    descKey: "features.whitelist.desc",
    Demo: WhitelistDemo,
  },
  {
    titleKey: "features.quote.title",
    descKey: "features.quote.desc",
    Demo: QuoteTweetDemo,
  },
];

export function Features() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const ActiveDemo = FEATURES[active]!.Demo;

  return (
    <section
      id="features"
      className="border-b border-border px-4 py-(--spacing-section)"
    >
      <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
        {t("features.title")}
      </h2>
      <p className="mt-2 max-w-md text-text-secondary">
        {t("features.subtitle")}
      </p>

      {/* Horizontal tabs */}
      <div className="relative -mx-4 mt-6">
        <div className="overflow-x-auto overflow-y-hidden border-b border-border scrollbar-hide">
          <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
          <div className="flex min-w-max px-4">
            {FEATURES.map((f, i) => (
              <button
                key={f.titleKey}
                onClick={() => setActive(i)}
                className={`cursor-pointer whitespace-nowrap px-3 py-3 text-[13px] font-semibold transition-colors duration-200 ${
                  active === i
                    ? "border-b-2 border-accent-blue text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t(f.titleKey)}
              </button>
            ))}
          </div>
        </div>
        {/* Scroll hint fade - outside scroll container so it stays fixed */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-primary to-transparent sm:hidden" />
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {t(FEATURES[active]!.descKey)}
      </p>

      {/* Demo area */}
      <div className="relative mt-6 flex items-center justify-center">
        <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(29,155,240,0.06),transparent_70%)]" />
        <div
          key={active}
          className="relative w-full max-w-sm animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden rounded-2xl border border-[#2f3336] bg-black"
        >
          <ActiveDemo />
        </div>
      </div>
    </section>
  );
}
