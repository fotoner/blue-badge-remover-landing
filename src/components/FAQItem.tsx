import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer items-center justify-between py-5 text-left font-medium transition-colors duration-200 hover:text-accent-blue">
        <span>{question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="pb-5 leading-relaxed text-text-secondary">{answer}</p>
    </details>
  );
}
