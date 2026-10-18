/**
 * Central site configuration.
 *
 * Values that would otherwise be invented are sourced from environment
 * variables so production data can be supplied at deploy time.
 */
export const site = {
  name: "AstrixTech",
  tagline: "Engineering Tomorrow's Digital Experiences.",
  description:
    "AstrixTech delivers innovative software solutions, modern digital experiences, and scalable technology designed for tomorrow.",
  industry: "Software Development & Technology Solutions",
  /**
   * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production so metadata,
   * sitemap, robots, and structured data emit the real domain.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrixstudio.tech").replace(
    /\/$/,
    ""
  ),
  /** Contact email shown across the site. Configure via NEXT_PUBLIC_CONTACT_EMAIL. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@astrixtech.example",
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    /**
     * Verified Google Play developer page. Sourced from the Play Store
     * profile itself — not a placeholder. Rendered even though no apps
     * are published there yet; revisit once the catalog grows.
     */
    playStore:
      "https://play.google.com/store/apps/dev?id=6392585599893101233",
    /**
     * Operator's official personal website (verified live). Referenced on
     * the legal pages so visitors can identify the operator. Deliberately
     * NOT included in Organization JSON-LD sameAs — it identifies the
     * founder, not the AstrixTech brand.
     */
    operatorSite: "https://www.jerickogarcia.com",
  } as Partial<
    Record<
      "github" | "linkedin" | "playStore" | "operatorSite",
      string | undefined
    >
  >,
} as const;

export type Site = typeof site;
