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
    <section className="bg-dot-grid relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden px-4">
      {/* Background glow effects */}
      <div className="animate-pulse-glow pointer-events-none absolute top-[-20%] right-[5%] h-[500px] w-[500px] rounded-full bg-accent-blue/[0.10] blur-[120px]" />
      <div className="animate-pulse-glow pointer-events-none absolute bottom-[-15%] left-[5%] h-[400px] w-[400px] rounded-full bg-accent-red/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute top-[30%] left-[40%] h-[300px] w-[300px] rounded-full bg-purple-500/[0.04] blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left: Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Social proof badge */}
          <div className="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-accent-blue">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {t("hero.badge")}
          </div>

          <h1 className="text-gradient font-heading text-4xl font-bold leading-tight tracking-tight break-keep sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Button
              href={CHROME_STORE_URL}
              onClick={handleCtaClick}
              className="shadow-[0_0_20px_rgba(29,155,240,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(29,155,240,0.5)]"
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

        {/* Right: Popup Preview */}
        <div className="w-full max-w-[300px] flex-shrink-0 lg:max-w-[320px]">
          <div className="animate-float rounded-2xl border border-white/[0.08] bg-[#15202b] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(29,155,240,0.12)]">
            {/* Popup Header */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-red">
                <span className="text-xs font-bold text-white">✕</span>
              </div>
              <span className="font-heading text-sm font-bold">Blue Badge Remover</span>
            </div>
            <p className="mb-3 text-xs text-text-secondary">
              {t("hero.subtitle").slice(0, 30)}...
            </p>

            {/* Master Toggle */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-accent-blue/[0.08] px-3 py-2.5">
              <span className="text-sm font-semibold text-accent-blue">Filtering</span>
              <ToggleSwitch on />
            </div>

            {/* Filter Scope */}
            <p className="mb-2 text-[10px] uppercase tracking-wider text-text-secondary">
              Filter Scope
            </p>
            <div className="flex flex-col gap-2">
              <FilterRow label="Home Timeline" />
              <FilterRow label="Tweet Detail" />
              <FilterRow label="Search Results" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleSwitch({ on }: { on?: boolean }) {
  return (
    <div className={`relative h-5 w-9 rounded-full ${on ? "bg-accent-blue" : "bg-border"}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </div>
  );
}

function FilterRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs">{label}</span>
      <ToggleSwitch on />
    </div>
  );
}
