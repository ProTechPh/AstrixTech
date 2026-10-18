import type { Metadata } from "next";

import { PageCta, PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/animations/reveal";
import { technologies, technologyCategories } from "@/data/technologies";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "The technologies AstrixTech works with — frontend, mobile, backend, database, and infrastructure.",
  alternates: { canonical: "/technologies" },
  openGraph: {
    title: `Technologies | ${site.name}`,
    description:
      "A stack chosen for longevity across frontend, mobile, backend, data, and infrastructure.",
  },
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="A stack chosen for longevity."
        description="We favor established, actively maintained technologies with strong communities and long-term viability — chosen per project, never by fashion."
      />

      <section className="py-20 sm:py-24">
        <div className="container-page space-y-14">
          {technologyCategories.map((group, groupIndex) => {
            const items = technologies.filter(
              (tech) => tech.category === group.category
            );
            return (
              <Reveal key={group.category} delay={groupIndex * 0.04}>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {group.category}
                    </h2>
                    <p className="text-sm text-muted">{group.blurb}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((tech) => (
                      <div
                        key={tech.name}
                        className="group relative overflow-hidden rounded-xl border border-white/8 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-highlight/30 hover:bg-surface-raised hover:shadow-[0_16px_40px_-20px_rgba(20,107,255,0.45)]"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-highlight/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <p className="text-base font-semibold tracking-tight">
                          {tech.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">{tech.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Note about the approach */}
      <section className="border-t border-white/8 bg-surface/25 py-16">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Not sure which technology fits?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              That&apos;s our job. Tell us the problem and the constraints —
              reachability, budget, team, timeline — and we&apos;ll recommend
              the stack with the best long-term economics.
            </p>
          </Reveal>
        </div>
      </section>

      <PageCta
        title="Let's pick the right stack together."
        label="Start a Conversation"
      />
    </>
  );
}
