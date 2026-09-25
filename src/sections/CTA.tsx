import { StoreCTA } from "../components/StoreCTA";
import { useI18n } from "../hooks/useI18n";

export function CTA() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden border-b border-border py-16">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(29,155,240,0.06),transparent)]" />

      <div className="relative px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
          {t("hero.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-text-secondary">
          {t("hero.subtitle")}
        </p>
        <StoreCTA location="bottom_cta" className="mt-8" size="lg" />
        <p className="mt-2 text-sm text-text-secondary">{t("hero.cta.sub")}</p>
      </div>
    </section>
  );
}
