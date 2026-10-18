import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { technologies } from "@/data/technologies";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TechExpertise() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-surface/25 py-24 sm:py-32"
      aria-labelledby="tech-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-160px] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[128px]"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Technology Expertise"
          title="A stack chosen for longevity."
          description="We work with established, actively maintained technologies across frontend, mobile, backend, data, and infrastructure."
        />

        <Reveal className="mt-16" delay={0.1}>
          {/* Spec matrix — square tiles with hairline dividers */}
          <div
            aria-label="Technology list"
            className="grid grid-cols-2 border-t border-l border-white/10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {technologies.map((tech) => (
              <div
                key={tech.name}
                title={tech.note}
                className="group flex h-20 cursor-default flex-col items-center justify-center gap-1 border-r border-b border-white/10 px-3 text-center transition-colors duration-300 hover:bg-primary/10 hover:shadow-[inset_0_0_0_1px_rgba(84,183,255,0.25)]"
              >
                <span className="text-sm font-semibold tracking-wide uppercase transition-colors duration-300 group-hover:text-highlight">
                  {tech.name}
                </span>
                <span className="hidden font-mono text-[10px] text-muted/50 lg:block">
                  {tech.name.split(" ")[0].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 text-center" delay={0.15}>
          <Link
            href="/technologies"
            className={cn(buttonVariants({ variant: "outline" }), "group")}
          >
            Explore Our Stack
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
