import { useI18n } from "../hooks/useI18n";
import { LOCALES, type Locale } from "../lib/i18n";

const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "EN",
  ja: "日本語",
};

export function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          aria-pressed={locale === loc}
          className={`cursor-pointer rounded-md px-3 py-2 text-xs font-medium transition-colors duration-200 ${
            locale === loc
              ? "text-accent-blue"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
