import { StoreCTA } from "./StoreCTA";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 border-t border-border bg-bg-primary/90 p-3 backdrop-blur-sm lg:hidden">
      <StoreCTA location="sticky_mobile" showAlternatives={false} buttonClassName="w-full" />
    </div>
  );
}
