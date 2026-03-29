import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="glass-card group mb-3 rounded-xl">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left font-medium transition-colors duration-200 hover:text-accent-blue">
        <span>{question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="px-5 pb-4 leading-relaxed text-text-secondary">{answer}</p>
    </details>
  );
}
