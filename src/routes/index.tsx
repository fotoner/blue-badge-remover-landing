import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../sections/Hero";
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
      <Features />
      <SocialProof />
      <Guide />
      <FAQ />
    </>
  );
}
