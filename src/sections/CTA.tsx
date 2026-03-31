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
    <section className="border-b border-border py-(--spacing-section)">
      <div className="px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("hero.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
          {t("hero.subtitle")}
        </p>
        <div className="mt-6">
          <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
            {t("hero.cta")}
          </Button>
        </div>
        <p className="mt-3 text-xs text-text-secondary">{t("hero.cta.sub")}</p>
      </div>
    </section>
  );
}
