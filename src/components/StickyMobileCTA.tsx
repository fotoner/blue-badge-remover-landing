import { Button } from "./Button";
import { useI18n } from "../hooks/useI18n";
import { trackEvent } from "../lib/analytics";
import { CHROME_STORE_URL } from "../lib/constants";

export function StickyMobileCTA() {
  const { t } = useI18n();

  function handleCtaClick() {
    trackEvent("cta_click", { location: "sticky_mobile" });
  }

  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 border-t border-border bg-bg-primary/90 p-3 backdrop-blur-sm lg:hidden">
      <Button href={CHROME_STORE_URL} onClick={handleCtaClick} className="w-full">
        {t("hero.cta")}
      </Button>
    </div>
  );
}
