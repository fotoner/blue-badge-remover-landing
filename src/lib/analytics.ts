declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
}

export function trackPageView(path: string): void {
  if (typeof gtag !== "function") return;
  gtag("event", "page_view", { page_path: path });
}

export function trackEvent(
  name: string,
  params?: Record<string, string>,
): void {
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
