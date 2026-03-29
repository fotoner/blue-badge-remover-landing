import { Scan, Filter, EyeOff, UserCheck, Quote, Globe } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { useI18n } from "../hooks/useI18n";
import type { LucideIcon } from "lucide-react";
import type { TranslationKeys } from "../lib/i18n";

interface FeatureItem {
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  className?: string;
  iconBg: string;
  iconColor: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Scan,
    titleKey: "features.badge.title",
    descKey: "features.badge.desc",
    className: "sm:col-span-2",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Filter,
    titleKey: "features.filter.title",
    descKey: "features.filter.desc",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: EyeOff,
    titleKey: "features.hide.title",
    descKey: "features.hide.desc",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: UserCheck,
    titleKey: "features.whitelist.title",
    descKey: "features.whitelist.desc",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Quote,
    titleKey: "features.quote.title",
    descKey: "features.quote.desc",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    icon: Globe,
    titleKey: "features.i18n.title",
    descKey: "features.i18n.desc",
    className: "sm:col-span-2",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
];

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="mx-auto max-w-5xl px-4 py-(--spacing-section)">
      <h2 className="text-gradient font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("features.title")}
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon, titleKey, descKey, className, iconBg, iconColor }) => (
          <FeatureCard
            key={titleKey}
            icon={icon}
            title={t(titleKey)}
            description={t(descKey)}
            className={className}
            iconBg={iconBg}
            iconColor={iconColor}
          />
        ))}
      </div>
    </section>
  );
}
