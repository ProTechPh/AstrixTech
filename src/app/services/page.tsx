import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { PageCta, PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/animations/reveal";
import { services } from "@/data/services";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile applications, backend & API engineering, cloud & infrastructure, custom software, and UI/UX design — delivered to one standard.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${site.name}`,
    description:
      "Six focused practices covering the complete scope of a modern software product.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering, end to end."
        description="AstrixTech covers the full lifecycle of software — from the first interface sketch to the infrastructure that keeps it online. One team, one standard of quality."
      />

      {/* Spec-sheet service sections — full-bleed, alternating depth */}
      <section aria-label="Service details" className="border-t border-white/10">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className={cn(
                  "relative scroll-mt-24 overflow-hidden border-b border-white/10",
                  index % 2 === 1 ? "bg-abyss/45" : "bg-transparent"
                )}
              >
                {/* Big display ordinal watermark */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute top-8 right-8 font-display text-[120px] leading-none font-semibold text-white/[0.035] uppercase select-none sm:text-[160px]",
                    index % 2 === 1 && "left-8 right-auto"
                  )}
                >
                  {service.ordinal}
                </span>

                <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-24">
                  {/* Left: identity */}
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex size-11 items-center justify-center border border-white/15 bg-primary/10 text-highlight">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.3em] text-muted/60 uppercase">
                        Service {service.ordinal}
                      </span>
                    </div>
                    <h2 className="mt-7 font-display text-3xl leading-tight font-semibold tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="group mt-8 inline-flex items-center gap-1.5 border-b border-highlight/40 pb-1 text-xs font-semibold tracking-[0.14em] text-highlight uppercase transition-colors hover:border-highlight hover:text-foreground"
                    >
                      Discuss this service
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  {/* Right: spec table — capability registry */}
                  <div className="self-start">
                    <div className="flex items-baseline justify-between border-b border-highlight/40">
                      <p className="font-mono text-[11px] tracking-[0.3em] text-foreground/80 uppercase">
                        Capabilities
                      </p>
                      <p className="font-mono text-[10px] tracking-widest text-muted/50 uppercase">
                        {service.capabilities.length} entries
                      </p>
                    </div>
                    <ul className="border-x border-b border-white/10">
                      {service.capabilities.map((capability, capIndex) => (
                        <li
                          key={capability}
                          className="grid grid-cols-[64px_1fr] items-baseline border-b border-white/8 transition-colors last:border-b-0 hover:bg-primary/[0.06]"
                        >
                          <span
                            aria-hidden="true"
                            className="border-r border-b-transparent px-3 py-4 font-mono text-[11px] tracking-widest text-muted/50"
                          >
                            {String(capIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="px-4 py-4 text-sm text-foreground/90">
                            {capability}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted/60 uppercase">
                      Custom requirements? Everything here adapts to your scope.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <PageCta />
    </>
  );
}
