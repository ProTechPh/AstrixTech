"use client";

import { ArrowRight, ArrowUpRight, CheckCircle2, Smartphone, Sparkles, Users } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/reveal";
import { site } from "@/config/site";

export function TesterCta() {
  return (
    <section className="relative border-y border-white/8 bg-surface/40 py-20 sm:py-24" aria-labelledby="tester-cta-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-transparent p-8 sm:p-12 lg:p-16">
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-highlight/10 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-primary/20 px-3.5 py-1 text-xs font-mono tracking-wider text-highlight uppercase">
                  <Smartphone className="size-3.5" aria-hidden="true" />
                  Google Play Beta &amp; Closed Testing
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h2
                  id="tester-cta-heading"
                  className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground uppercase sm:text-4xl"
                >
                  Want to test our upcoming Android apps?
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  We are testing upcoming mobile apps on Google Play. Submit your Google Play Store email to be added to our closed testing cohort and get early access before public release.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/testers"
                    className="group inline-flex h-11 items-center gap-2 border border-highlight/50 bg-primary px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-all duration-200 hover:bg-highlight hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset]"
                  >
                    Join as a Tester
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {site.links.playStore && (
                    <a
                      href={site.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 border border-white/10 px-5 text-xs font-semibold tracking-wider text-muted transition-colors hover:border-white/20 hover:text-foreground"
                    >
                      Play Store Profile
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Feature cards */}
            <div className="space-y-3">
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3.5 rounded-xl border border-white/6 bg-abyss/60 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-highlight/20 bg-primary/10 text-highlight">
                    <Sparkles className="size-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Early Access &amp; Sneak Peeks
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Try cutting-edge mobile features and updates before they hit production.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex items-start gap-3.5 rounded-xl border border-white/6 bg-abyss/60 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Official Play Store Distribution
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Safe and automatic updates directly delivered through the Google Play Store app.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex items-start gap-3.5 rounded-xl border border-white/6 bg-abyss/60 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-highlight">
                    <Users className="size-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      Direct Developer Feedback
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Your bug reports and suggestions directly shape the app before global launch.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
