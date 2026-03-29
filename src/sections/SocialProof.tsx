import { Repeat2, ShieldCheck } from "lucide-react";
import { useI18n } from "../hooks/useI18n";

export function SocialProof() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-5xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("social.title")}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* RT Stats */}
        <div className="flex flex-col items-center rounded-2xl border border-border bg-bg-card p-8 text-center">
          <Repeat2 className="mb-4 h-10 w-10 text-accent-blue" aria-hidden="true" />
          <p className="font-heading text-5xl font-bold">{t("social.stat.rt")}</p>
          <p className="mt-2 text-lg text-text-secondary">{t("social.stat.rt.label")}</p>
          <p className="mt-4 text-sm text-text-secondary">{t("social.stat.users")}</p>
        </div>

        {/* Privacy */}
        <div className="flex flex-col items-center rounded-2xl border border-border bg-bg-card p-8 text-center">
          <ShieldCheck className="mb-4 h-10 w-10 text-green-500" aria-hidden="true" />
          <p className="font-heading text-2xl font-bold">{t("social.privacy.title")}</p>
          <p className="mt-4 leading-relaxed text-text-secondary">
            {t("social.privacy.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
