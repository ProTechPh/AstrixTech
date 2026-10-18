import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { services } from "@/data/services";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function ServicesOverview() {
  return (
    <section
      className="relative border-y border-white/10 bg-surface/25 py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div id="services-heading" className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="Full-stack capability, delivered with discipline."
          description="Six focused practices covering the complete scope of a modern software product — from the first sketch to production infrastructure."
        />

        {/* Numbered index — full-width rows, FROMSOFTWARE-style */}
        <nav aria-label="Services index" className="mt-16 border-t border-white/10">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services#${service.slug}`}
                className="index-row group focus-visible:bg-white/[0.03] hover:bg-white/[0.02]"
              >
                <span
                  aria-hidden="true"
                  className="pl-1 font-mono text-xs tracking-widest text-muted/60 transition-colors duration-300 group-hover:text-highlight"
                >
                  {service.ordinal}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl leading-none font-medium tracking-tight uppercase transition-colors duration-300 group-hover:text-white sm:text-3xl">
                    {service.title}
                  </span>
                  <span className="mt-2 hidden max-w-xl text-sm leading-relaxed text-muted sm:block">
                    {service.summary}
                  </span>
                </span>
                <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted/60 uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-highlight">
                  <span className="hidden sm:inline">View</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-white/25 transition-colors duration-300 group-hover:bg-highlight"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </nav>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "outline" }), "group")}
          >
            View All Services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
