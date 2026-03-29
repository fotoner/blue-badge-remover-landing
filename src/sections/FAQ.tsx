import { FAQItem } from "../components/FAQItem";
import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";
import type { TranslationKeys } from "../lib/i18n";

const FAQ_KEYS: Array<{ q: TranslationKeys; a: TranslationKeys }> = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

export function FAQ() {
  const { t } = useI18n();

  const { ref: sectionRef, inView } = useInView();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="faq"
      className={`bg-bg-card py-(--spacing-section) transition-all duration-700 delay-100 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-center text-3xl font-bold text-text-primary sm:text-4xl">
          {t("faq.title")}
        </h2>
        <div className="mt-12">
          {FAQ_KEYS.map(({ q, a }) => (
            <FAQItem key={q} question={t(q)} answer={t(a)} />
          ))}
        </div>
      </div>
    </section>
  );
}
