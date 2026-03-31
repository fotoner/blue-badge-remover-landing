import { FAQItem } from "../components/FAQItem";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";

const FAQ_KEYS: Array<{ q: TranslationKeys; a: TranslationKeys }> = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
];

export function FAQ() {
  const { t } = useI18n();

  return (
    <section id="faq" className="border-b border-border py-(--spacing-section)">
      <div className="px-4">
        <h2 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
          {t("faq.title")}
        </h2>
        <div className="mt-8">
          {FAQ_KEYS.map(({ q, a }) => (
            <FAQItem key={q} question={t(q)} answer={t(a)} />
          ))}
        </div>
      </div>
    </section>
  );
}
