import { ShieldCheck, EyeOff, Code } from "lucide-react";
import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";
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
  const { ref: sectionRef, inView } = useInView();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`bg-green-500/[0.03] py-(--spacing-section) transition-all duration-700 delay-100 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <ShieldCheck className="h-8 w-8 text-green-500" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-center text-3xl font-bold text-text-primary sm:text-4xl">
          {t("privacy.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-text-secondary">
          {t("privacy.subtitle")}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-xl border border-green-500/10 bg-green-500/[0.03] p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-green-500/10">
                <Icon className="h-5 w-5 text-green-500" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
