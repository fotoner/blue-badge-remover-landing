import { useI18n } from "../../hooks/useI18n";

/** 실제 확장 팝업(필터링 토글·숨김 통계·상태 요약·설정 열기)을 본뜬 미리보기. 세부 설정은 대시보드에 있다 */
export function PopupPreview() {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl border border-border bg-[#15202b] shadow-[0_8px_32px_rgba(29,155,240,0.08),0_8px_24px_rgba(0,0,0,0.4)]">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="" className="h-5 w-5" />
          <span className="text-[15px] font-bold">Blue Badge Remover</span>
        </div>
        <p className="mt-1 text-[11px] text-text-secondary">{t("mock.tagline")}</p>
      </div>

      <div className="bg-accent-blue/[0.08] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">{t("mock.filtering")}</span>
          <ToggleSwitch on />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#38444d]/50 px-4 py-3">
        <span className="text-[13px] font-semibold text-text-primary">{t("mock.today")}</span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-primary">{t("mock.share")}</span>
      </div>

      <div className="flex flex-col gap-1.5 border-b border-[#38444d]/50 px-4 py-3 text-[12px]">
        <InfoRow label={t("mock.total")} value={t("mock.totalValue")} />
        <InfoRow label={t("mock.keyword")} value="OFF" />
        <InfoRow label={t("mock.follow")} value={t("mock.followValue")} />
      </div>

      <div className="px-4 py-3">
        <div className="w-full rounded-lg bg-[#273340] px-3 py-2 text-center text-[12px] text-text-primary">
          {t("mock.settings")}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary">{value}</span>
    </div>
  );
}

function ToggleSwitch({ on }: { on?: boolean }) {
  return (
    <div className={`relative h-5 w-9 rounded-full ${on ? "bg-accent-blue" : "bg-border"}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </div>
  );
}
