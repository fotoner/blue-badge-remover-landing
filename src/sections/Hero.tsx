import { Button } from "../components/Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL, GITHUB_URL } from "../lib/constants";

export function Hero() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "hero" });
  }

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] items-center border-b border-border px-4 py-(--spacing-section)">
      <div className="w-full">
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-accent-blue">
          Chrome Extension
        </div>

        <h1 className="whitespace-pre-line font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary break-keep sm:text-5xl md:text-6xl">
          {t("hero.title")}
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
          <Button
            href={CHROME_STORE_URL}
            onClick={handleCtaClick}
          >
            {t("hero.cta")}
          </Button>
          <Button variant="secondary" href={GITHUB_URL}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t("hero.github")}
          </Button>
        </div>
        <p className="mt-3 text-sm text-text-secondary">{t("hero.cta.sub")}</p>
      </div>
    </section>
  );
}
