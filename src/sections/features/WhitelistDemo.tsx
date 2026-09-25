import { useEffect, useState } from "react";
import { useI18n } from "../../hooks/useI18n";

export function WhitelistDemo() {
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
