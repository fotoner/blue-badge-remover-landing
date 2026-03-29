import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconBg?: string;
  iconColor?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = "",
  iconBg = "bg-accent-blue/10",
  iconColor = "text-accent-blue",
}: FeatureCardProps) {
  return (
    <div
      className={`glass-card glow-border-hover group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className={`mb-4 inline-flex rounded-xl p-3 ${iconBg}`}>
        <Icon
          className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${iconColor}`}
          aria-hidden="true"
        />
      </div>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
