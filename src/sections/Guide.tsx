import { ExternalLink, Download, Users } from "lucide-react";
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
  { icon: Users, titleKey: "guide.step3.title", descKey: "guide.step3.desc" },
];

export function Guide() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "guide" });
  }

  return (
    <section id="guide" className="border-b border-border py-(--spacing-section)">
      <div className="px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("guide.title")}
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {STEPS.map(({ icon: Icon, titleKey, descKey }, index) => (
            <div key={titleKey} className="flex items-start gap-4 rounded-2xl border border-border bg-bg-card p-4">
              <div className="relative shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20">
                  <Icon className="h-5 w-5 text-accent-blue" aria-hidden="true" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-blue text-[10px] font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold">{t(titleKey)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
            {t("hero.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
