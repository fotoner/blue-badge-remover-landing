import { useI18n } from "../hooks/useI18n";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { t } = useI18n();

  const navLinks = [
    { key: "nav.features" as const, href: "#features" },
    { key: "nav.guide" as const, href: "#guide" },
    { key: "nav.faq" as const, href: "#faq" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-black/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="" className="h-6 w-6" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold">
            Blue Badge Remover
          </span>
        </div>

        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="inline-flex items-center px-2 py-3 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <LanguageSwitch />
      </div>
    </header>
  );
}
