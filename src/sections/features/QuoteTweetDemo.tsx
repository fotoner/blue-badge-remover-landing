import { useEffect, useState } from "react";
import { useI18n } from "../../hooks/useI18n";

export function QuoteTweetDemo() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"off" | "quote-only" | "hide-entire">("off");

  useEffect(() => {
    const t1 = setTimeout(() => setMode("quote-only"), 2500);
    const t2 = setTimeout(() => setMode("hide-entire"), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const isEntire = mode === "hide-entire";
  const isQuoteOnly = mode === "quote-only";

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-1.5">
        {(["off", "quote-only", "hide-entire"] as const).map((m) => (
          <span
            key={m}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors duration-300 ${
              mode === m ? "bg-accent-blue/20 text-accent-blue" : "text-[#71767b]"
            }`}
          >
            {m === "off" ? "Off" : m === "quote-only" ? "Quote Only" : "Entire"}
          </span>
        ))}
      </div>

      {/* Outer tweet - entire mode hides this completely */}
      <div
        className="overflow-hidden rounded-lg border border-[#2f3336] transition-all duration-700 ease-out"
        style={{
          maxHeight: isEntire ? "0px" : "200px",
          opacity: isEntire ? 0 : 1,
          borderWidth: isEntire ? 0 : 1,
        }}
      >
        <div className="p-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#e7e9ea]">user</span>
            <span className="text-[#71767b]">@user · 2h</span>
          </div>
          <p className="mt-1 text-xs text-[#e7e9ea]">{t("demo.quote.text")}</p>

          {/* Inner quoted content - quote-only mode collapses this */}
          <div className="relative mt-2 overflow-hidden rounded-lg border border-[#2f3336]">
            {/* Full quote content */}
            <div
              className="p-2.5 transition-all duration-500 ease-out"
              style={{
                opacity: isQuoteOnly ? 0 : 1,
                maxHeight: isQuoteOnly ? "0px" : "60px",
                padding: isQuoteOnly ? "0 10px" : undefined,
              }}
            >
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-[#e7e9ea]">spammer</span>
                <span className="text-[#1d9bf0]">✓</span>
                <span className="text-[#71767b]">@spam</span>
              </div>
              <p className="mt-0.5 text-[10px] text-[#e7e9ea]">
                {t("demo.spam.text")}
              </p>
            </div>
            {/* Collapsed placeholder */}
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: isQuoteOnly ? 1 : 0,
                maxHeight: isQuoteOnly ? "28px" : "0px",
              }}
            >
              <div className="px-3 py-1.5 text-[10px] text-[#71767b]">
                {t("demo.quote.hidden")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Entire tweet hidden" label - appears when outer tweet fades */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isEntire ? "24px" : "0px",
          opacity: isEntire ? 1 : 0,
          marginTop: isEntire ? 8 : 0,
        }}
      >
        <span className="text-[10px] text-accent-red/70">
          {t("demo.quote.entire")}
        </span>
      </div>
    </div>
  );
}
