import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionLabel } from "@/components/layout/page-hero";
import { cn } from "@/lib/utils";

const highlights = [
  {
    title: "Technology-focused",
    description:
      "We concentrate on what we do best: designing and engineering modern software with current, well-supported technologies.",
  },
  {
    title: "Solution-driven",
    description:
      "Every engagement starts with the problem, not the stack. We shape our approach around the outcome your business actually needs.",
  },
  {
    title: "Built for growth",
    description:
      "From the first commit, our work is structured to scale — clean architecture, typed code, and decisions that don't expire.",
  },
];

export function AboutPreview() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="about-preview">
      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Who We Are</SectionLabel>
            <h2
              id="about-preview"
              className="mt-4 font-display text-3xl leading-tight font-semibold tracking-tight text-balance uppercase sm:text-4xl"
            >
              A software development brand{" "}
              <span className="text-gradient-blue">built around modern engineering.</span>
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted">
              AstrixTech is a technology-focused software development brand
              committed to building modern digital solutions. We work across
              the full product lifecycle — from interface design and mobile
              experience through backend systems, infrastructure, and
              release.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              What sets us apart is a deliberate way of building: small teams
              of engineers and designers, clear communication, and a standard
              of quality that shows in the codebase, not just the demo.
            </p>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "group mt-10"
              )}
            >
              More About Us
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          {/* Spec-sheet highlight rows */}
          <div className="border-t border-white/10">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[0.02] sm:px-2">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-xs tracking-widest text-muted/50 transition-colors duration-300 group-hover:text-highlight"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
