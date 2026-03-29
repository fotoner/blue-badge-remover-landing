import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  accent?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
  accent = "accent-blue",
}: FeatureCardProps) {
  return (
    <div
      className={`glass-card glow-border-hover group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className={`mb-4 inline-flex rounded-xl bg-${accent}/10 p-3`}>
        <Icon
          className={`h-6 w-6 text-${accent} transition-transform duration-300 group-hover:scale-110`}
          aria-hidden="true"
        />
      </div>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
