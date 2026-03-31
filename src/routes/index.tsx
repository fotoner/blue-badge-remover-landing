import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../sections/Hero";
import { BeforeAfter } from "../sections/BeforeAfter";
import { Features } from "../sections/Features";
import { SocialProof } from "../sections/SocialProof";
import { Privacy } from "../sections/Privacy";
import { Guide } from "../sections/Guide";
import { FAQ } from "../sections/FAQ";
import { Sidebar } from "../components/Sidebar";
import { StickyMobileCTA } from "../components/StickyMobileCTA";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <div className="mx-auto flex max-w-[1000px] justify-center">
        <div className="min-w-0 w-full max-w-[600px] border-x border-border">
          <Hero />
          <BeforeAfter />
          <Features />
          <SocialProof />
          <Privacy />
          <Guide />
          <FAQ />
        </div>
        <Sidebar />
      </div>
      <StickyMobileCTA />
    </>
  );
}
