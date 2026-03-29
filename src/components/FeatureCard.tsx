import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-bg-card p-6 transition-colors duration-200 hover:border-text-secondary ${className}`}
    >
      <div className="mb-4 inline-flex rounded-xl bg-accent-blue/10 p-3">
        <Icon className="h-6 w-6 text-accent-blue" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
