import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../sections/Hero";
import { BeforeAfter } from "../sections/BeforeAfter";
import { Features } from "../sections/Features";
import { SocialProof } from "../sections/SocialProof";
import { Guide } from "../sections/Guide";
import { FAQ } from "../sections/FAQ";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Hero />
      <BeforeAfter />
      <Features />
      <SocialProof />
      <Guide />
      <FAQ />
    </>
  );
}
