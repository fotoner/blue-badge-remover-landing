import { useEffect, useState } from "react";
import { useI18n } from "../../hooks/useI18n";

export function HideModesDemo() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"remove" | "collapse">("remove");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Remove: show tweet → hide it
    const t1 = setTimeout(() => setHidden(true), 1500);
    // Switch to Collapse: reset → show tweet → collapse it
    const t2 = setTimeout(() => { setMode("collapse"); setHidden(false); }, 3500);
    const t3 = setTimeout(() => setHidden(true), 5000);
    return () => { [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  return (
    <div className="p-4">
      <div className="mb-3 flex gap-2">
        <span className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${mode === "remove" ? "bg-accent-blue/20 text-accent-blue" : "text-[#71767b]"}`}>
          Remove
        </span>
        <span className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-300 ${mode === "collapse" ? "bg-accent-blue/20 text-accent-blue" : "text-[#71767b]"}`}>
          Collapse
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#2f3336]">
        {/* Full tweet row */}
        <div
          className="flex gap-3 p-3 transition-all duration-500 ease-out"
          style={{
            opacity: hidden ? 0 : 1,
            maxHeight: hidden ? "0px" : "60px",
            transform: hidden && mode === "remove" ? "translateX(30px)" : "translateX(0)",
            padding: hidden ? "0 12px" : undefined,
          }}
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#16181c] text-center text-sm leading-8">
            🤑
          </div>
          <div className="min-w-0 self-center">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#e7e9ea]">spam_user</span>
              <span className="text-xs text-[#1d9bf0]">✓</span>
            </div>
            <p className="text-xs text-[#e7e9ea]">{t("demo.spam.text")}</p>
          </div>
        </div>

        {/* Collapsed bar (collapse mode only) */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            maxHeight: hidden && mode === "collapse" ? "32px" : "0px",
            opacity: hidden && mode === "collapse" ? 1 : 0,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-[#71767b]">
            <span>▸</span>
            <span>{t("demo.hide.collapsed")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
