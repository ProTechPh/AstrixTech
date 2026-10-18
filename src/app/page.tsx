import type { Metadata } from "next";

import { AboutPreview } from "@/components/sections/about-preview";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { TechExpertise } from "@/components/sections/tech-expertise";
import { WhyChoose } from "@/components/sections/why-choose";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — Building the Future Through Technology`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesOverview />
      <WhyChoose />
      <TechExpertise />
      <CtaBanner />
    </>
  );
}
