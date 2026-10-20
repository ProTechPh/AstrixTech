import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarClock, Mail, ShieldCheck, Smartphone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AstrixTech. Tell us about your project, the service you need, and where you want to take it.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${site.name}`,
    description:
      "Tell us about your project — the form goes straight to our team inbox.",
  },
};

const assurances = [
  {
    icon: Mail,
    title: "Direct to our team",
    description:
      "Submissions go straight to our team inbox, not a ticket queue.",
  },
  {
    icon: ShieldCheck,
    title: "Handled with care",
    description:
      "Your details are used only to answer your inquiry — see our Privacy Policy.",
  },
  {
    icon: CalendarClock,
    title: "Clear next steps",
    description:
      "We reply by email with the questions (or a call proposal) that move things forward.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        description="Whether you have a fully scoped plan or just an idea worth exploring, the best first step is a short conversation."
      />

      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="rounded-xl border border-white/8 bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-muted">
                Fill in the details below and we&apos;ll get back to you by
                email.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Side column */}
          <div className="space-y-4">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-white/8 bg-surface p-6">
                <h2 className="text-sm font-semibold tracking-[0.14em] text-foreground/80 uppercase">
                  Prefer email?
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-lg font-medium text-highlight transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Write to us directly — include your goals, rough scope, and
                  timeline if you have one.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex gap-4 rounded-xl border border-white/8 bg-surface p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10 text-highlight">
                  <Smartphone className="size-4.5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Find us on Google Play
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    AstrixTech has a verified developer profile on Google Play.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={site.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-highlight transition-colors hover:text-foreground"
                    >
                      Visit our Play Store page
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                    <span className="text-white/20" aria-hidden="true">•</span>
                    <Link
                      href="/testers"
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-highlight"
                    >
                      Become a Closed Tester
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {assurances.map((item, index) => (
              <Reveal key={item.title} delay={0.15 + index * 0.08}>
                <div className="flex gap-4 rounded-xl border border-white/8 bg-surface p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10 text-highlight">
                    <item.icon className="size-4.5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
