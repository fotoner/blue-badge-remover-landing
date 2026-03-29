import { ExternalLink, Download, Zap } from "lucide-react";
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
      <h2 className="text-gradient font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("guide.title")}
      </h2>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {/* Connecting line (desktop only) */}
        <div className="pointer-events-none absolute top-8 right-[calc(16.67%+16px)] left-[calc(16.67%+16px)] hidden h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent sm:block" />

        {STEPS.map(({ icon: Icon, titleKey, descKey }, index) => (
          <div key={titleKey} className="group flex flex-col items-center text-center">
            {/* Step number badge */}
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10 transition-all duration-300 group-hover:bg-accent-blue/20 group-hover:shadow-[0_0_20px_rgba(29,155,240,0.15)]">
                <Icon className="h-7 w-7 text-accent-blue transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </div>
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-blue text-xs font-bold text-white">
                {index + 1}
              </span>
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">{t(titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t(descKey)}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          href={CHROME_STORE_URL}
          onClick={handleCtaClick}
          className="shadow-[0_0_20px_rgba(29,155,240,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(29,155,240,0.5)]"
        >
          {t("hero.cta")}
        </Button>
      </div>
    </section>
  );
}
