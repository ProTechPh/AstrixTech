import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";

// Evaluated once at build time; avoids non-deterministic dates during prerender.
const FOOTER_YEAR = new Date().getFullYear();

const footerNav: { title: string; links: { title: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { title: "Services", href: "/services" },
      { title: "Technologies", href: "/technologies" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const externalLinks: { title: string; href: string }[] = [
    { title: "Google Play", href: `${site.links.playStore}` },
  ];

  return (
    <footer className="border-t border-white/10 bg-abyss/60">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-muted/50 uppercase">
              {site.industry}
            </p>
          </div>

          {/* Link columns */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <h3 className="font-mono text-[11px] tracking-[0.25em] text-foreground/70 uppercase">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.title}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 py-0.5 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-highlight transition-all duration-200 hover:w-3"
                      />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* External links */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.25em] text-foreground/70 uppercase">
              Elsewhere
            </h3>
            <ul className="mt-5 space-y-3">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email row */}
        <div className="mt-14 border-y border-white/10 py-6">
          <p className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
              Inquiries
            </span>
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-highlight transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
          </p>
        </div>

        {/* Giant display sign-off */}
        <p
          aria-hidden="true"
          className="mt-10 font-display text-[clamp(3.5rem,12vw,10rem)] leading-none font-semibold tracking-tight text-white/[0.045] uppercase select-none"
        >
          AstrixTech
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-muted/70">
            © {FOOTER_YEAR} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/50">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
