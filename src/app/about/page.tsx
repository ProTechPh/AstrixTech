import type { Metadata } from "next";
import {
  Compass,
  Gem,
  Heart,
  Eye,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { PageCta, PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who AstrixTech is, how we think about software engineering, and the values that guide how we build.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${site.name}`,
    description:
      "A technology-focused software development brand committed to building modern digital solutions.",
  },
};

type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    eyebrow: "Who We Are",
    title: "Engineers and designers who treat software as craft.",
    body: "AstrixTech is a technology company focused on software development. We exist to help ambitious ideas become dependable digital products — bringing together frontend, mobile, backend, infrastructure, and design under one accountable team. Every project is an exercise in the same discipline: understand the problem deeply, choose tools deliberately, and build something that lasts.",
  },
  {
    eyebrow: "Our Mission",
    title: "Make advanced software accessible to every serious idea.",
    body: "Our mission is to deliver software solutions and digital experiences that are modern in design, sound in architecture, and honest in operation. We aim for our clients to receive systems they understand, trust, and can continue to grow with — not black boxes they depend on blindly.",
  },
  {
    eyebrow: "Our Vision",
    title: "A future where software quality is the default.",
    body: "We believe the next decade of software will be decided by who builds with care — teams who invest in architecture, accessibility, security, and maintainability while everyone else optimizes for the demo. Our vision is to be the engineering partner people point to when that bet pays off.",
  },
  {
    eyebrow: "Our Philosophy",
    title: "Clarity compounds.",
    body: "We approach every engagement with a simple thesis: clarity compounds. Clear problems produce clear solutions. Clear code produces clear futures. Clear communication produces trust. We'd rather push back on a requirement today than explain a failure in production next year.",
  },
];

const values: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Craft over shortcuts",
    description:
      "Details matter, from spacing to database indexes. We take the time others skip.",
    icon: Gem,
  },
  {
    title: "Clarity in communication",
    description:
      "Plain language, visible progress, and early honesty about trade-offs.",
    icon: Compass,
  },
  {
    title: "Ownership",
    description:
      "We treat every system we build as long-term responsibility, not a one-time delivery.",
    icon: ShieldCheck,
  },
  {
    title: "User empathy",
    description:
      "Software is judged by the people using it. We design around them, not around ourselves.",
    icon: Heart,
  },
  {
    title: "Continuous learning",
    description:
      "Technology moves. We study, experiment, and upgrade our practice deliberately.",
    icon: Sparkles,
  },
  {
    title: "Collaboration",
    description:
      "The best outcomes come from working with our clients, not merely for them.",
    icon: Users,
  },
];

const approach: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Understand",
    description:
      "We start with requirements conversations that map goals, constraints, and success — before any code exists.",
    icon: Users,
  },
  {
    title: "Architect",
    description:
      "We design the system: data models, interfaces, infrastructure, and the boundaries that keep growth painless.",
    icon: Eye,
  },
  {
    title: "Build",
    description:
      "Typed, reviewed, incremental development in short iterations — with working software you can see early.",
    icon: Rocket,
  },
  {
    title: "Ship & sustain",
    description:
      "We release with monitoring and documentation in place, and support the product as it evolves.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AstrixTech"
        title="Building software the way it should be built."
        description="AstrixTech delivers innovative software solutions, modern digital experiences, and scalable technology designed for tomorrow."
      />

      {/* Pillars */}
      <section className="py-20 sm:py-24">
        <div className="container-page space-y-16">
          {pillars.map((pillar) => (
            <Reveal key={pillar.eyebrow}>
              <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-16">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-highlight uppercase">
                    {pillar.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
                    {pillar.title}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-muted lg:pt-7">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="border-y border-white/8 bg-surface/25 py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Core Values"
            title="What we hold the line on."
            description="Values are only real when they cost something. These are the commitments that shape decisions at AstrixTech."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 3) * 0.08}>
                <div className="h-full rounded-xl border border-white/8 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-highlight/25">
                  <value.icon className="size-5 text-highlight" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Our Approach"
            title="How we do software engineering."
            description="A repeatable engineering approach — the same rigor whether the system runs one business process or an entire platform."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {approach.map((step, index) => (
              <Reveal key={step.title} delay={(index % 2) * 0.08}>
                <div className="h-full rounded-xl border border-white/8 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-highlight/25">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted/50">
                      0{index + 1}
                    </span>
                    <step.icon className="size-4.5 text-highlight" aria-hidden="true" />
                    <h3 className="text-base font-semibold tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
