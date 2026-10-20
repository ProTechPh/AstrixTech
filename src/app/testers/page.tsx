import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Smartphone, Users } from "lucide-react";

import { TesterForm } from "@/components/forms/tester-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Join Google Play Closed Testing",
  description:
    "Become a closed tester for AstrixTech Android applications on Google Play Store. Submit your Play Store email for early access and updates.",
  alternates: { canonical: "/testers" },
  openGraph: {
    title: `Join Google Play Closed Testing | ${site.name}`,
    description:
      "Get early access to our latest Android apps. Join our closed testing group directly through Google Play.",
  },
};

const steps = [
  {
    step: "01",
    title: "Submit Your Google Play Email",
    description:
      "Provide the Gmail or Google account email that is currently logged into Google Play Store on your Android phone.",
  },
  {
    step: "02",
    title: "We Add You to Play Console",
    description:
      "Our team adds your email to the authorized Closed Testing track in our Google Play Developer Console.",
  },
  {
    step: "03",
    title: "Accept & Install the App",
    description:
      "You receive the official opt-in link, accept the test invite, and install the build directly from Google Play.",
  },
];

export default function TestersPage() {
  return (
    <>
      <PageHero
        eyebrow="Google Play Closed Testing"
        title="Become an Early Tester."
        description="Help shape the future of our Android applications. Register your Google Play account email to receive early access builds, test new features, and provide direct feedback."
      />

      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left Column: Form */}
          <Reveal>
            <div className="rounded-xl border border-white/8 bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-highlight/20 bg-primary/10 text-highlight">
                  <Smartphone className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Register as a Tester
                  </h2>
                  <p className="text-xs text-muted">
                    We&apos;ll grant your Google account access to our Play Store test tracks.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <TesterForm />
              </div>
            </div>
          </Reveal>

          {/* Right Column: Informative Cards */}
          <div className="space-y-4">
            {/* Steps */}
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-white/8 bg-surface p-6">
                <h3 className="font-mono text-xs tracking-[0.2em] text-foreground/80 uppercase">
                  How Closed Testing Works
                </h3>
                <div className="mt-5 space-y-4">
                  {steps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-mono text-xs font-semibold text-highlight">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Why your Google Play email is needed */}
            <Reveal delay={0.15}>
              <div className="rounded-xl border border-white/8 bg-surface p-6">
                <div className="flex items-center gap-3">
                  <Users className="size-4.5 text-highlight" aria-hidden="true" />
                  <h3 className="text-sm font-semibold tracking-tight">
                    Why do we need your Google Play email?
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Google Play Store restricts closed testing tracks exclusively to approved email addresses. If you provide a different email than the one logged into your Android device&apos;s Play Store, Google will not let you download the test build.
                </p>
              </div>
            </Reveal>

            {/* Official Play Store Profile */}
            {site.links.playStore && (
              <Reveal delay={0.2}>
                <div className="rounded-xl border border-white/8 bg-surface p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-4.5 text-emerald-400" aria-hidden="true" />
                    <h3 className="text-sm font-semibold tracking-tight">
                      Verified Google Play Developer
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    AstrixTech operates a verified developer account on Google Play. Check out our official developer profile.
                  </p>
                  <a
                    href={site.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-highlight transition-colors hover:text-foreground"
                  >
                    View developer profile on Google Play
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            )}

            {/* Privacy Guarantee */}
            <Reveal delay={0.25}>
              <div className="flex gap-4 rounded-xl border border-white/8 bg-surface p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10 text-highlight">
                  <ShieldCheck className="size-4.5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-tight">
                    Spam-free &amp; Secure
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Your email is solely used for Google Play Console testing invitations. We never sell, spam, or share your contact info.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
