import { FAQItem } from "../components/FAQItem";
import { useI18n } from "../hooks/useI18n";
import type { TranslationKeys } from "../lib/i18n";

const FAQ_KEYS: Array<{ q: TranslationKeys; a: TranslationKeys }> = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
];

export function FAQ() {
  const { t } = useI18n();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-(--spacing-section)">
      <h2 className="font-heading text-center text-3xl font-bold sm:text-4xl">
        {t("faq.title")}
      </h2>
      <div className="mt-12">
        {FAQ_KEYS.map(({ q, a }) => (
          <FAQItem key={q} question={t(q)} answer={t(a)} />
        ))}
      </div>
    </section>
  );
}
