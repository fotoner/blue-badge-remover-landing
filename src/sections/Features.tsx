import { useState, useEffect } from "react";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";

interface FeatureItem {
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  Demo: React.ComponentType;
}

const FEATURES: FeatureItem[] = [
  {
    titleKey: "features.badge.title",
    descKey: "features.badge.desc",
    Demo: BadgeDetectionDemo,
  },
  {
    titleKey: "features.filter.title",
    descKey: "features.filter.desc",
    Demo: FilteringDemo,
  },
  {
    titleKey: "features.hide.title",
    descKey: "features.hide.desc",
    Demo: HideModesDemo,
  },
  {
    titleKey: "features.whitelist.title",
    descKey: "features.whitelist.desc",
    Demo: WhitelistDemo,
  },
  {
    titleKey: "features.quote.title",
    descKey: "features.quote.desc",
    Demo: QuoteTweetDemo,
  },
];

export function Features() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const ActiveDemo = FEATURES[active]!.Demo;

  return (
    <section
      id="features"
      className="mx-auto max-w-3xl border-b border-border px-4 py-(--spacing-section)"
    >
      <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
        {t("features.title")}
      </h2>
      <p className="mt-2 max-w-md text-text-secondary">
        {t("features.subtitle")}
      </p>

      <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: Feature tabs */}
        <div className="flex flex-col gap-1">
          {FEATURES.map((f, i) => (
            <button
              key={f.titleKey}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-xl px-5 py-4 text-left transition-colors duration-200 ${
                active === i ? "bg-bg-muted" : "hover:bg-bg-muted/50"
              }`}
            >
              <h3
                className={`font-heading text-base font-semibold transition-colors ${
                  active === i ? "text-accent-blue" : "text-text-secondary"
                }`}
              >
                {t(f.titleKey)}
              </h3>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: active === i ? "80px" : "0px",
                  opacity: active === i ? 1 : 0,
                }}
              >
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {t(f.descKey)}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Demo area */}
        <div className="flex min-h-[280px] items-center justify-center">
          <div
            key={active}
            className="w-full max-w-sm animate-[fade-in-up_0.4s_ease-out_both] overflow-hidden rounded-2xl border border-[#2f3336] bg-black"
          >
            <ActiveDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Demo Components ───────────────────────────────── */

function BadgeDetectionDemo() {
  const { t } = useI18n();
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#16181c] text-lg">
          🤑
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-[15px] font-bold text-[#e7e9ea]">
              spam_user
            </span>
            <svg
              className="h-[18px] w-[18px] flex-shrink-0"
              viewBox="0 0 22 22"
            >
              <path
                fill="#1d9bf0"
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
              />
            </svg>
            <span className="text-[15px] text-[#71767b]">@spam</span>
          </div>
          <p className="mt-1 text-[15px] text-[#e7e9ea]">
            {t("demo.spam.text")}
          </p>
          <div className="mt-3 animate-[fade-in-up_0.5s_ease-out_1s_both] rounded-lg bg-accent-red/10 px-3 py-2 text-xs text-accent-red">
            {t("demo.badge.alert")}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilteringDemo() {
  const scopes = ["Home Timeline", "Tweet Detail", "Search Results"];
  return (
    <div className="p-4">
      <p className="mb-3 text-[10px] uppercase tracking-wider text-[#71767b]">
        Filter Scope
      </p>
      {scopes.map((scope, i) => (
        <div
          key={scope}
          className="flex items-center justify-between border-b border-[#2f3336] py-3 last:border-0"
          style={{ animation: `fade-in-up 0.4s ease-out ${i * 150}ms both` }}
        >
          <span className="text-sm text-[#e7e9ea]">{scope}</span>
          <AnimatedToggle delay={800 + i * 300} />
        </div>
      ))}
    </div>
  );
}

function AnimatedToggle({ delay }: { delay: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
        on ? "bg-accent-blue" : "bg-[#38444d]"
      }`}
    >
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </div>
  );
}

function HideModesDemo() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"remove" | "collapse">("remove");
  const [phase, setPhase] = useState<"visible" | "hiding" | "hidden">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hiding"), 1500);
    const t2 = setTimeout(() => setPhase("hidden"), 2500);
    const t3 = setTimeout(() => { setMode("collapse"); setPhase("visible"); }, 3500);
    const t4 = setTimeout(() => setPhase("hiding"), 5000);
    const t5 = setTimeout(() => setPhase("hidden"), 6000);
    return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
  }, []);

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-2">
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${
            mode === "remove" ? "bg-accent-blue/20 text-accent-blue" : "text-[#71767b]"
          }`}
        >
          Remove
        </span>
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${
            mode === "collapse" ? "bg-accent-blue/20 text-accent-blue" : "text-[#71767b]"
          }`}
        >
          Collapse
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#2f3336]">
        <div
          className="flex gap-3 p-3 transition-all duration-500 ease-out"
          style={{
            opacity: phase === "visible" ? 1 : phase === "hiding" ? 0.3 : 0,
            maxHeight: phase === "hidden" ? "0px" : mode === "collapse" && phase !== "visible" ? "32px" : "50px",
            transform: mode === "remove" && phase === "hiding" ? "translateX(20px)" : "translateX(0)",
            padding: phase === "hidden" ? "0 12px" : undefined,
          }}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#16181c] text-center text-sm leading-8">
            🤑
          </div>
          <div className="text-xs text-[#71767b] self-center">
            {mode === "remove" ? t("demo.hide.removed") : t("demo.hide.collapsed")}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhitelistDemo() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="divide-y divide-[#2f3336] p-0">
      {/* Spam user - gets filtered */}
      <div
        className="flex items-center gap-3 px-4 py-3 transition-all duration-500"
        style={{
          opacity: step >= 1 ? 0.2 : 1,
          textDecoration: step >= 1 ? "line-through" : "none",
        }}
      >
        <div className="h-8 w-8 rounded-full bg-[#16181c] text-center text-sm leading-8">
          🤑
        </div>
        <div className="flex-1">
          <span className="text-sm text-[#e7e9ea]">spam_account</span>
          <span className="ml-1 text-sm text-[#1d9bf0]">✓</span>
        </div>
        {step >= 1 && (
          <span className="animate-[fade-in-up_0.3s_ease-out_both] text-[10px] text-accent-red">
            {t("demo.whitelist.filtered")}
          </span>
        )}
      </div>

      {/* Followed user - stays */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-8 w-8 rounded-full bg-[#16181c] text-center text-sm leading-8">
          😊
        </div>
        <div className="flex-1">
          <span className="text-sm text-[#e7e9ea]">friend_user</span>
          <span className="ml-1 text-sm text-[#1d9bf0]">✓</span>
          <span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-500">
            {t("demo.whitelist.following")}
          </span>
        </div>
        {step >= 2 && (
          <span className="animate-[fade-in-up_0.3s_ease-out_both] text-[10px] text-green-500">
            {t("demo.whitelist.protected")}
          </span>
        )}
      </div>
    </div>
  );
}

function QuoteTweetDemo() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"off" | "quote-only" | "hide-entire">("off");

  useEffect(() => {
    const t1 = setTimeout(() => setMode("quote-only"), 2500);
    const t2 = setTimeout(() => setMode("hide-entire"), 5000);
    const t3 = setTimeout(() => setMode("off"), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-1.5">
        {(["off", "quote-only", "hide-entire"] as const).map((m) => (
          <span
            key={m}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors duration-300 ${
              mode === m
                ? "bg-accent-blue/20 text-accent-blue"
                : "text-[#71767b]"
            }`}
          >
            {m === "off" ? "Off" : m === "quote-only" ? "Quote Only" : "Entire"}
          </span>
        ))}
      </div>

      <div className="rounded-lg border border-[#2f3336] p-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#e7e9ea]">user</span>
          <span className="text-[#71767b]">@user · 2h</span>
        </div>
        <p className="mt-1 text-xs text-[#e7e9ea]">{t("demo.quote.text")}</p>

        {/* Quote block - always rendered, height/opacity transitions */}
        <div
          className="mt-2 overflow-hidden rounded-lg border border-[#2f3336] transition-all duration-700 ease-out"
          style={{
            maxHeight: mode === "hide-entire" ? "0px" : "60px",
            opacity: mode === "hide-entire" ? 0 : 1,
            borderWidth: mode === "hide-entire" ? 0 : 1,
            marginTop: mode === "hide-entire" ? 0 : 8,
          }}
        >
          <div className="p-2.5">
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-[#e7e9ea]">spammer</span>
              <span className="text-[#1d9bf0]">✓</span>
              <span className="text-[#71767b]">@spam</span>
            </div>
            <p
              className="mt-0.5 text-[10px] transition-all duration-500"
              style={{
                color: mode === "quote-only" ? "#71767b" : "#e7e9ea",
              }}
            >
              {mode === "quote-only" ? t("demo.quote.hidden") : t("demo.spam.text")}
            </p>
          </div>
        </div>

        {/* Entire hidden label */}
        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: mode === "hide-entire" ? "24px" : "0px",
            opacity: mode === "hide-entire" ? 1 : 0,
            marginTop: mode === "hide-entire" ? 8 : 0,
          }}
        >
          <span className="text-[10px] text-accent-red/70">
            {t("demo.quote.entire")}
          </span>
        </div>
      </div>
    </div>
  );
}
