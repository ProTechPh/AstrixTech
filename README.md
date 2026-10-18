# AstrixTech — Corporate Website

Production website for **AstrixTech** — *Engineering Tomorrow's Digital Experiences.*

Built with Next.js (App Router) · TypeScript · Tailwind CSS 4 · Motion · React Hook Form · Zod · Lucide Icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev
```

Production:

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local`. Key settings:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap, robots (defaults to `https://astrixstudio.tech`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email shown on the site |
| `CONTACT_EMAIL_TO` | Where contact submissions are delivered (falls back to the public email) |
| `RESEND_API_KEY` | Contact-form email delivery via Resend (recommended) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | Contact-form email delivery via SMTP (fallback) |
| `SMTP_FROM` | Verified sender address, e.g. `AstrixTech <contact@yourdomain.com>` |

If no provider is configured, submissions are logged server-side in
development; in **production the form fails loudly (502)** so no inquiries are
silently lost — configure a provider before launching.

## Launch checklist

- [ ] Point DNS for `astrixstudio.tech` at the host — the domain is
      registered but does not resolve yet (verified: no A records).
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://astrixstudio.tech` in the
      production environment (the code default already matches).
- [ ] Configure email delivery: set the `SMTP_FROM` sender to an address
      on `astrixstudio.tech` once DNS (including SPF/DKIM, if using
      Resend) is live.
- [ ] **[Review]** The Google Play Console developer profile homepage URL
      currently points to `jerickogarcia.com` — update it to
      `https://astrixstudio.tech` in Play Console → Developer profile so
      the Play listing and this site share one canonical domain.
- [ ] The site links to the verified Google Play developer profile
      (footer, contact page, Organization JSON-LD `sameAs`). No apps are
      published on the account yet; revisit the wording once apps ship.

## Contact form

- Client + server validation with Zod (shared schema in `src/lib/validations.ts`)
- Honeypot field, visible-time heuristic (`elapsedMs`), and per-IP rate limiting (5 per 15 min)
- Delivers via Resend REST API or SMTP (nodemailer), credentials kept in env vars only

## Project structure

```
src/
├── app/            # Routes: /, /about, /services, /technologies, /contact, /privacy, /terms, /api/contact
├── components/     # brand/ forms/ layout/ sections/ ui/ animations/
├── config/         # site.ts (brand + SEO config), navigation.ts
├── data/           # services.ts, technologies.ts
├── hooks/
├── lib/            # email.ts, validations.ts, utils.ts
└── types/
```

## Content review markers

Legal pages (`/privacy`, `/terms`) render bracketed `[Review: …]` markers as amber
badges. Replace them with the company's actual legal entity, jurisdiction, dates,
and email provider details before launch.
