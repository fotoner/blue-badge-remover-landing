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
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <ShieldCheck className="h-6 w-6 text-green-500" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("privacy.title")}
        </h2>
        <p className="mt-2 text-text-secondary">
          {t("privacy.subtitle")}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-xl border border-green-500/10 bg-green-500/[0.03] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <Icon className="h-4 w-4 text-green-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {t(descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
