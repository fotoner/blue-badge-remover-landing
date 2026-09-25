import { Button } from "./Button";
import { useI18n } from "../hooks/useI18n";
import { usePreferredStore } from "../hooks/usePreferredStore";
import { trackEvent } from "../lib/analytics";
import { STORES, STORE_ORDER, type Store } from "../lib/stores";

interface StoreCTAProps {
  location: string;
  showAlternatives?: boolean;
  className?: string;
  rowClassName?: string;
  buttonClassName?: string;
  size?: "md" | "lg";
  /** 설치 버튼 옆에 나란히 둘 버튼 (예: GitHub) */
  extra?: React.ReactNode;
}

/** 방문자 브라우저의 스토어를 기본 버튼으로, 나머지 스토어는 링크로 보여준다 */
export function StoreCTA({ location, showAlternatives = true, className = "", rowClassName = "", buttonClassName = "", size = "md", extra }: StoreCTAProps) {
  const { t } = useI18n();
  const primary = usePreferredStore();
  const alternatives = STORE_ORDER.filter((store) => store !== primary);

  function track(store: Store) {
    trackEvent("cta_click", { location, store });
  }

  return (
    <div className={className}>
      <div className={rowClassName}>
        <Button href={STORES[primary].url} onClick={() => track(primary)} size={size} className={buttonClassName}>
          {t(STORES[primary].ctaKey)}
        </Button>
        {extra}
      </div>
      {showAlternatives && (
        <p className="mt-3 text-sm text-text-secondary">
          {t("store.also")}:{" "}
          {alternatives.map((store, index) => (
            <span key={store}>
              {index > 0 && " · "}
              <a
                href={STORES[store].url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(store)}
                className="text-text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent-blue hover:decoration-accent-blue"
              >
                {t(STORES[store].nameKey)}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
