import { useI18n } from "../hooks/useI18n";

interface Testimonial {
  text: string;
  handle: string;
  initial: string;
}

const SELECTED_TEXTS = [
  "와 이거 성능 지린다 얘들아 이거 쓰고 광명찾자",
  "헐 대박 ㅇㅇㅇ 정신적인 스트레스 반은 줄어들듯",
  "구원자🙏",
  "본인이 뭔가에 불편함을 느끼고 그 해결책을 스스로 만든 거 아님? 리얼로 리스펙한다",
  "드디어내탐라청소를할수있어",
  "참다참다 결국 이거 사용함",
];

const LABELS = "ABCDEF".split("");
const COLORS = ["#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#ff7a00"];

export function SocialProof() {
  const { t } = useI18n();

  const anon = t("social.anon");
  const testimonials: Testimonial[] = SELECTED_TEXTS.map((text, i) => ({
    text,
    handle: `@${anon.toLowerCase()}_${LABELS[i]!.toLowerCase()}`,
    initial: LABELS[i]!,
  }));

  return (
    <section className="border-b border-border py-(--spacing-section)">
      <div className="px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("social.title")}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t("social.subtitle")}
        </p>
      </div>

      <div className="mt-6">
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.handle}
            className="flex gap-3 border-b border-border px-4 py-3 last:border-b-0"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            >
              {testimonial.initial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-bold text-text-primary">{t("social.anon")} {testimonial.initial}</span>
                <span className="text-[15px] text-text-secondary">{testimonial.handle}</span>
              </div>
              <p className="mt-0.5 text-[15px] leading-snug text-text-primary">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
