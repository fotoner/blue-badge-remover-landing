import { Button } from "./Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL, GITHUB_URL, FEEDBACK_URL, AUTHOR_X_URL, AUTHOR_HANDLE } from "../lib/constants";

export function Sidebar() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "sidebar" });
  }

  return (
    <aside className="hidden w-[350px] shrink-0 pl-8 pt-4 lg:block">
      <div className="sticky top-18">
        {/* Install CTA Card */}
        <div className="rounded-2xl bg-bg-card p-4">
          <h3 className="text-lg font-bold text-text-primary">Blue Badge Remover</h3>
          <p className="mt-2 text-sm text-text-secondary">
            {t("hero.subtitle")}
          </p>
          <div className="mt-4">
            <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
              {t("hero.cta")}
            </Button>
          </div>
          <p className="mt-2 text-xs text-text-secondary">{t("hero.cta.sub")}</p>
        </div>

        {/* Links */}
        <div className="mt-4 flex flex-col gap-3 px-2 text-sm text-text-secondary">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-primary"
          >
            {t("footer.feedback")}
          </a>
          <a
            href={AUTHOR_X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            {AUTHOR_HANDLE}
          </a>
        </div>
      </div>
    </aside>
  );
}
