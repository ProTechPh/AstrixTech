import Link from "next/link";

import { site } from "@/config/site";

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

/**
 * Shared layout for /privacy and /terms: consistent typography, jump links,
 * and a review placeholder callout for legally required business details.
 */
export function LegalPage({ title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <article className="py-20 sm:py-24">
      <div className="container-page">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-highlight uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
          <p className="mt-4 text-xs text-muted/70">Last updated: {lastUpdated}</p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Jump links */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.18em] text-foreground/70 uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="text-sm text-muted transition-colors hover:text-highlight"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="max-w-3xl space-y-10">
            {sections.map((section) => (
              <section key={section.heading} id={slugify(section.heading)}>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed text-muted"
                    dangerouslySetInnerHTML={{
                      __html: linkify(paragraph),
                    }}
                  />
                ))}
              </section>
            ))}

            <div className="rounded-xl border border-white/8 bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                Questions about this page? Contact us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-highlight transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>{" "}
                or use the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-highlight transition-colors hover:text-foreground"
                >
                  contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Renders [Review: …] and [Brackets] segments as visible review markers. */
function linkify(text: string) {
  return text.replace(/&/g, "&amp;").replace(
    /\[(Review: ?)?([^\]]+)\]/gi,
    (_match, review, content) =>
      `<mark class="rounded bg-amber-400/15 px-1 text-amber-300">[${content}]</mark>`
  );
}
