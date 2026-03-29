import { ExternalLink, Download, Zap, Globe } from "lucide-react";
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
              {t("guide.step")} {index + 1}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold">{t(titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t(descKey)}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
          <Globe className="h-5 w-5" aria-hidden="true" />
          {t("hero.cta")}
        </Button>
      </div>
    </section>
  );
}
