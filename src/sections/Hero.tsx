import { Globe } from "lucide-react";
import { Button } from "../components/Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL } from "../lib/constants";

export function Hero() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "hero" });
  }

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-secondary">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          <span>Chrome Extension</span>
        </div>

        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-text-secondary sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
            <Globe className="h-5 w-5" aria-hidden="true" />
            {t("hero.cta")}
          </Button>
          <span className="text-sm text-text-secondary">{t("hero.cta.sub")}</span>
        </div>
      </div>
    </section>
  );
}
