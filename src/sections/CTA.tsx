import { Button } from "../components/Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL } from "../lib/constants";

export function CTA() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "bottom_cta" });
  }

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
        <div className="mt-8">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center rounded-full bg-accent-blue px-10 py-4 text-lg font-semibold text-white shadow-[0_4px_0_0_#1a6fb5] transition-all duration-200 hover:brightness-110 active:translate-y-1 active:shadow-none"
          >
            {t("hero.cta")}
          </a>
        </div>
        <p className="mt-4 text-sm text-text-secondary">{t("hero.cta.sub")}</p>
      </div>
    </section>
  );
}
