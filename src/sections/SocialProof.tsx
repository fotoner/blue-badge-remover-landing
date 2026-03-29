import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";

interface Testimonial {
  text: string;
  handle: string;
}

const ROW_1: Testimonial[] = [
  { text: "와 이거 성능 지린다 얘들아 이거 쓰고 광명찾자", handle: "사용자 A씨" },
  { text: "이 시대의 희망. 참된 위인. 그저 빛.", handle: "사용자 B씨" },
  { text: "공익을 위해 리트윗합니다", handle: "사용자 C씨" },
  { text: "최근 본 툴 중에 가장 혁신적이다", handle: "사용자 D씨" },
  { text: "헐 대박 ㅇㅇㅇ 정신적인 스트레스 반은 줄어들듯", handle: "사용자 E씨" },
  { text: "원하던 거였어요", handle: "사용자 F씨" },
  { text: "구원자🙏", handle: "사용자 G씨" },
];

const ROW_2: Testimonial[] = [
  { text: "본인이 뭔가에 불편함을 느끼고 그 해결책을 스스로 만든 거 아님? 리얼로 리스펙한다", handle: "사용자 H씨" },
  { text: "참다참다 결국 이거 사용함", handle: "사용자 I씨" },
  { text: "이 사람을 청와대로!!!", handle: "사용자 J씨" },
  { text: "드디어내탐라청소를할수있어", handle: "사용자 K씨" },
  { text: "이거 내가 맘속에서 있었으면 좋겠다고 계속 생각했던건데💕😭", handle: "사용자 L씨" },
  { text: "노고에 경의를 표합니다", handle: "사용자 M씨" },
  { text: "개발자계의 나이팅게일", handle: "사용자 N씨" },
];

export function SocialProof() {
  const { t } = useI18n();
  const { ref: sectionRef, inView } = useInView();

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

      {/* Marquee area - full width, no px constraint */}
      <div className="group relative mt-10 space-y-4">
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-primary to-transparent" />

        <MarqueeRow testimonials={ROW_1} direction="left" />
        <MarqueeRow testimonials={ROW_2} direction="right" />
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
