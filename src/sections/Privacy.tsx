import { ShieldCheck, EyeOff, Code } from "lucide-react";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";
import type { LucideIcon } from "lucide-react";

interface PrivacyItem {
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
}

const ITEMS: PrivacyItem[] = [
  { icon: ShieldCheck, titleKey: "privacy.local.title", descKey: "privacy.local.desc" },
  { icon: EyeOff, titleKey: "privacy.nocollect.title", descKey: "privacy.nocollect.desc" },
  { icon: Code, titleKey: "privacy.opensource.title", descKey: "privacy.opensource.desc" },
];

export function Privacy() {
  const { t } = useI18n();

  return (
    <section className="border-b border-border py-(--spacing-section)">
      <div className="px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("privacy.title")}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t("privacy.subtitle")}
        </p>

        <div className="mt-6">
          {ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="flex gap-3 border-b border-border py-3 last:border-b-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <Icon className="h-5 w-5 text-green-500" aria-hidden="true" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-[15px] font-bold text-text-primary">
                  {t(titleKey)}
                </h3>
                <p className="mt-0.5 text-[15px] leading-snug text-text-secondary">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
