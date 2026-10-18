import {
  GitBranch,
  Ruler,
  ShieldCheck,
  Sparkles,
  UserRound,
  Boxes,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Principle = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const principles: Principle[] = [
  {
    title: "Quality-focused development",
    description:
      "Code review, typed codebases, and testing where it counts. We ship work we are willing to maintain.",
    icon: Ruler,
  },
  {
    title: "Scalable architecture",
    description:
      "Systems are designed for the next stage, not just the demo — clear boundaries and room to grow.",
    icon: Boxes,
  },
  {
    title: "Security-conscious engineering",
    description:
      "Least privilege, validated inputs, and secrets managed properly from the first commit onward.",
    icon: ShieldCheck,
  },
  {
    title: "Modern technologies",
    description:
      "A deliberate, current stack — TypeScript, React, Flutter, and modern backend tooling — chosen per project.",
    icon: Sparkles,
  },
  {
    title: "User-centered design",
    description:
      "Interfaces are measured by how clearly they work for the person using them, not by how they look in isolation.",
    icon: UserRound,
  },
  {
    title: "Engineering discipline",
    description:
      "Versioned infrastructure, reproducible builds, and documented decisions keep projects predictable.",
    icon: GitBranch,
  },
];

const ordinal = ["01", "02", "03", "04", "05", "06"];

export function WhyChoose() {
  return (
    <section
      className="bg-abyss/50 py-24 sm:py-32"
      aria-labelledby="why-heading"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Why AstrixTech"
          title="Principles we build by."
          description="How we work matters as much as what we deliver. These engineering principles guide every engagement."
        />

        {/* Divided spec grid — no cards, hairlines only */}
        <div className="mt-16 grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={(index % 3) * 0.08}>
                <div className="group relative h-full border-r border-b border-white/10 p-7 transition-colors duration-300 hover:bg-white/[0.02] sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0 bg-highlight/15 transition-all duration-300 group-hover:h-px"
                  />
                  <div className="flex items-baseline justify-between">
                    <Icon
                      className="size-5 text-highlight "
                      aria-hidden="true"
                    />
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs tracking-widest text-muted/40"
                    >
                      {ordinal[index]}
                    </span>
                  </div>
                  <h3 className="mt-18 font-display text-lg leading-snug font-medium tracking-tight uppercase">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
