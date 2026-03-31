import { ExternalLink, Download, Users } from "lucide-react";
import { useI18n } from "../hooks/useI18n";
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

  return (
    <section id="guide" className="border-b border-border py-(--spacing-section)">
      <div className="px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("guide.title")}
        </h2>

        <div className="mt-6">
          {STEPS.map(({ icon: Icon, titleKey, descKey }, index) => (
            <div key={titleKey} className="flex gap-4 border-b border-border py-4 last:border-b-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-text-primary">{t(titleKey)}</h3>
                  <Icon className="h-4 w-4 text-text-secondary" aria-hidden="true" />
                </div>
                <p className="mt-1 text-[15px] leading-snug text-text-secondary">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
