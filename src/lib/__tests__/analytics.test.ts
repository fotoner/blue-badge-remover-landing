import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackEvent, trackPageView } from "../analytics";

describe("analytics", () => {
  beforeEach(() => {
    vi.stubGlobal("gtag", vi.fn());
  });

  it("sends page_view event", () => {
    trackPageView("/");
    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/",
    });
  });

  it("sends custom event", () => {
    trackEvent("cta_click", { location: "hero" });
    expect(gtag).toHaveBeenCalledWith("event", "cta_click", {
      location: "hero",
    });
  });

  it("does not throw when gtag is undefined", () => {
    vi.stubGlobal("gtag", undefined);
    expect(() => trackPageView("/")).not.toThrow();
    expect(() => trackEvent("test")).not.toThrow();
  });
});
