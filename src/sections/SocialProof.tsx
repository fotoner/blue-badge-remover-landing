import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";

interface Testimonial {
  text: string;
  handle: string;
}

const LABELS = "ABCDEFGHIJKLMN".split("");

const ROW_1_TEXTS = [
  "와 이거 성능 지린다 얘들아 이거 쓰고 광명찾자",
  "이 시대의 희망. 참된 위인. 그저 빛.",
  "공익을 위해 리트윗합니다",
  "최근 본 툴 중에 가장 혁신적이다",
  "헐 대박 ㅇㅇㅇ 정신적인 스트레스 반은 줄어들듯",
  "원하던 거였어요",
  "구원자🙏",
];

const ROW_2_TEXTS = [
  "본인이 뭔가에 불편함을 느끼고 그 해결책을 스스로 만든 거 아님? 리얼로 리스펙한다",
  "참다참다 결국 이거 사용함",
  "이 사람을 청와대로!!!",
  "드디어내탐라청소를할수있어",
  "이거 내가 맘속에서 있었으면 좋겠다고 계속 생각했던건데💕😭",
  "노고에 경의를 표합니다",
  "개발자계의 나이팅게일",
];

export function SocialProof() {
  const { t } = useI18n();
  const { ref: sectionRef, inView } = useInView();

  const anon = t("social.anon");
  const row1: Testimonial[] = ROW_1_TEXTS.map((text, i) => ({
    text,
    handle: `${anon} ${LABELS[i]}`,
  }));
  const row2: Testimonial[] = ROW_2_TEXTS.map((text, i) => ({
    text,
    handle: `${anon} ${LABELS[i + ROW_1_TEXTS.length]}`,
  }));

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`relative overflow-hidden bg-accent-blue/[0.04] py-(--spacing-section) transition-all duration-700 delay-100 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading text-center text-3xl font-bold text-text-primary sm:text-4xl">
          {t("social.title")}
        </h2>
        <p className="mt-3 text-center text-text-secondary">
          {t("social.subtitle")}
        </p>
      </div>

      {/* Marquee area - full width */}
      <div className="group relative mt-10 flex flex-col gap-4">
        <MarqueeRow testimonials={row1} direction="left" />
        <MarqueeRow testimonials={row2} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({
  testimonials,
  direction,
}: {
  testimonials: Testimonial[];
  direction: "left" | "right";
}) {
  const items = [...testimonials, ...testimonials];

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 group-hover:[animation-play-state:paused] ${
          direction === "left"
            ? "animate-[marquee-left_40s_linear_infinite]"
            : "animate-[marquee-right_40s_linear_infinite]"
        }`}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.handle}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[280px] shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 sm:w-[320px]">
      <p className="text-sm leading-relaxed text-text-primary">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <p className="mt-3 text-xs text-text-secondary">{testimonial.handle}</p>
    </div>
  );
}
