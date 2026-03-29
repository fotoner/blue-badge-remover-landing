import { Repeat2, ShieldCheck } from "lucide-react";
import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";

export function SocialProof() {
  const { t } = useI18n();

  const { ref: sectionRef, inView } = useInView();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden bg-accent-blue/[0.04] py-(--spacing-section) transition-all duration-700 delay-100 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-center text-3xl font-bold text-text-primary sm:text-4xl">
          {t("social.title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* RT Stats */}
          <div className="glass-card glow-border-hover group rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-blue/10">
              <Repeat2 className="h-7 w-7 text-accent-blue transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            </div>
            <p className="text-gradient font-heading text-5xl font-bold sm:text-6xl">
              {t("social.stat.rt")}
            </p>
            <p className="mt-2 text-lg text-text-secondary">{t("social.stat.rt.label")}</p>
            <p className="mt-4 text-sm text-text-secondary">{t("social.stat.users")}</p>
          </div>

          {/* Privacy */}
          <div className="glass-card glow-border-hover group rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
              <ShieldCheck className="h-7 w-7 text-green-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            </div>
            <p className="font-heading text-2xl font-bold">{t("social.privacy.title")}</p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              {t("social.privacy.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
