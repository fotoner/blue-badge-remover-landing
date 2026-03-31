import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../sections/Hero";
import { BeforeAfter } from "../sections/BeforeAfter";
import { Features } from "../sections/Features";
import { SocialProof } from "../sections/SocialProof";
import { Privacy } from "../sections/Privacy";
import { Guide } from "../sections/Guide";
import { CTA } from "../sections/CTA";
import { FAQ } from "../sections/FAQ";
import { StickyMobileCTA } from "../components/StickyMobileCTA";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-[700px] border-x border-border">
        <BeforeAfter />
        <Features />
        <SocialProof />
        <Privacy />
        <Guide />
        <CTA />
        <FAQ />
      </div>
      <StickyMobileCTA />
    </>
  );
}
