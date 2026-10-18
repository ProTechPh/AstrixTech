import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Shared page header for secondary pages (About, Services, Contact …). */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 pt-40 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-220px] left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-primary/12 blur-[128px]"
      />
      <div className="container-page relative">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-highlight/70" />
          <p className="font-mono text-[11px] tracking-[0.3em] text-highlight uppercase">
            {eyebrow}
          </p>
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.04] font-semibold tracking-tight text-balance uppercase sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

/** CTA row used at the end of secondary pages. */
export function PageCta({
  title = "Have an Idea? Let's Build Something Exceptional.",
  label = "Start a Conversation",
  href = "/contact",
}: {
  title?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] bottom-[-260px] size-[460px] rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="container-page relative flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="max-w-xl font-display text-2xl leading-tight font-semibold tracking-tight text-balance uppercase sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-muted">
            Tell us about your project and we&apos;ll get back to you by email.
          </p>
        </div>
        <Link
          href={href}
          className={cn(
            buttonVariants({ size: "lg" }),
            "group shrink-0"
          )}
        >
          {label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="container-page relative mt-12 hidden items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted/60 uppercase sm:flex">
        <Logo className="opacity-70" markOnly markClassName="size-4 rounded-full" />
        <span aria-hidden="true" className="mx-1 h-px w-6 bg-white/15" />
        <span>
          {site.name} — {site.industry}
        </span>
      </div>
    </section>
  );
}

/** Shared section label — mono caps eyebrow with hairline. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden="true" className="h-px w-8 bg-highlight/60" />
      <p className="font-mono text-[11px] tracking-[0.3em] text-highlight uppercase">
        {children}
      </p>
    </div>
  );
}
