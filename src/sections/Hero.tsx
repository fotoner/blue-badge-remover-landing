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
    <section className="relative min-h-[calc(100vh-3.5rem)] border-b border-border px-4 py-24 flex items-center overflow-hidden">
      {/* Fluid background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute h-[600px] w-[600px] rounded-full bg-accent-blue/[0.12] blur-[120px] animate-[drift-a_20s_ease-in-out_infinite]" />
        <div className="absolute h-[500px] w-[500px] rounded-full bg-[#1a6fb5]/[0.08] blur-[120px] animate-[drift-b_25s_ease-in-out_infinite]" />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-[#0e4f8b]/[0.06] blur-[100px] animate-[drift-c_30s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left: Content */}
        <div className="flex-1">
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
            <Button href={CHROME_STORE_URL} onClick={handleCtaClick}>
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
        <div className="w-full max-w-[280px] flex-shrink-0 lg:max-w-[300px]">
          <div className="rounded-2xl border border-border bg-bg-card shadow-[0_8px_32px_rgba(29,155,240,0.08),0_8px_24px_rgba(0,0,0,0.4)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-red">
                  <span className="text-xs font-bold text-white">✕</span>
                </div>
                <span className="font-heading text-sm font-bold">Blue Badge Remover</span>
              </div>
              <span className="text-[10px] text-text-secondary">v2.1</span>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 border-b border-border">
              <StatCell label="오늘" value="47" />
              <StatCell label="이번 주" value="312" border />
              <StatCell label="전체" value="2,841" />
            </div>

            {/* Master toggle */}
            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center justify-between rounded-xl bg-accent-blue/[0.08] px-3 py-2.5">
                <span className="text-sm font-semibold text-accent-blue">Filtering</span>
                <ToggleSwitch on />
              </div>
            </div>

            {/* Filter Scope */}
            <div className="border-b border-border px-4 py-3">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-text-secondary">
                Filter Scope
              </p>
              <div className="flex flex-col gap-2">
                <FilterRow label="Home Timeline" />
                <FilterRow label="Tweet Detail" />
                <FilterRow label="Search Results" />
              </div>
            </div>

            {/* Hide Mode */}
            <div className="border-b border-border px-4 py-3">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-text-secondary">
                Hide Mode
              </p>
              <div className="flex gap-1.5">
                <ModeChip label="Remove" active />
                <ModeChip label="Collapse" />
              </div>
            </div>

            {/* Whitelist */}
            <div className="px-4 py-3">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-text-secondary">
                Whitelist
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {["😊", "🎨", "🎵"].map((emoji) => (
                    <div key={emoji} className="flex h-6 w-6 items-center justify-center rounded-full border border-bg-card bg-[#16181c] text-xs">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-text-secondary">+24 following</span>
              </div>
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

function StatCell({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`px-3 py-2.5 text-center ${border ? "border-x border-border" : ""}`}>
      <p className="text-sm font-bold text-text-primary">{value}</p>
      <p className="text-[10px] text-text-secondary">{label}</p>
    </div>
  );
}

function ModeChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${active ? "bg-accent-blue/20 text-accent-blue" : "text-text-secondary"}`}>
      {label}
    </span>
  );
}
