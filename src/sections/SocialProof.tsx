import { useI18n } from "../hooks/useI18n";

const ROW_1_TEXTS = [
  "이거 쓰고 타임라인이 진짜 깨끗해졌다",
  "최근 본 툴 중에 가장 혁신적이다",
  "정신적인 스트레스가 확 줄었어요",
  "원하던 거였어요",
  "드디어 내 타임라인을 청소할 수 있어",
  "이거 내가 계속 있었으면 했던 건데",
];

const ROW_2_TEXTS = [
  "불편함을 느끼고 직접 해결책을 만든 거잖아, 진짜 리스펙",
  "참다참다 결국 이거 사용함",
  "팔로우한 사람은 안 숨겨져서 좋다",
  "노고에 경의를 표합니다",
  "설치하고 바로 효과 봄",
  "광고차단기처럼 필수 확장 프로그램",
];

const COLORS_1 = ["#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#ff7a00"];
const COLORS_2 = ["#ff7a00", "#7856ff", "#ffd400", "#f91880", "#00ba7c", "#1d9bf0"];
const LABELS = "ABCDEFGHIJKLMN".split("");

export function SocialProof() {
  const { t } = useI18n();
  const anon = t("social.anon");

  return (
    <section className="border-y border-border py-(--spacing-section)">
      <div className="mx-auto max-w-[700px] px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("social.title")}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t("social.subtitle")}
        </p>
      </div>

      <div className="relative mt-6 flex flex-col gap-3 overflow-hidden">
        <MarqueeRow texts={ROW_1_TEXTS} colors={COLORS_1} labels={LABELS} anon={anon} offset={0} direction="left" />
        <MarqueeRow texts={ROW_2_TEXTS} colors={COLORS_2} labels={LABELS} anon={anon} offset={6} direction="right" />

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
      </div>
    </section>
  );
}

function MarqueeRow({
  texts,
  colors,
  labels,
  anon,
  offset,
  direction,
}: {
  texts: string[];
  colors: string[];
  labels: string[];
  anon: string;
  offset: number;
  direction: "left" | "right";
}) {
  const items = [...texts, ...texts];
  const itemColors = [...colors, ...colors];

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-3 ${
          direction === "left"
            ? "animate-[marquee-left_35s_linear_infinite]"
            : "animate-[marquee-right_35s_linear_infinite]"
        }`}
      >
        {items.map((text, i) => {
          const label = labels[(i % texts.length) + offset] ?? "?";
          return (
            <div
              key={`${label}-${i}`}
              className="flex w-[320px] shrink-0 gap-3 rounded-xl border border-border bg-bg-card px-4 py-3"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: itemColors[i % itemColors.length] }}
              >
                {label}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[13px]">
                  <span className="font-bold text-text-primary">{anon} {label}</span>
                  <span className="text-text-secondary">@{anon.toLowerCase()}_{label.toLowerCase()}</span>
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-text-primary line-clamp-2">
                  {text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
