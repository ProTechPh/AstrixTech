import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AstrixTech handles the information you provide through this website and what happens to contact form submissions.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what information ${site.name} collects through this website, why we collect it, and how it is handled. We designed this website to collect as little data as possible — the only personal data we process is the information you choose to send us.`}
      lastUpdated="October 18, 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            `${site.name} is a software development brand owned and operated by Jericko Garcia, based in the Philippines. For the purposes of this policy, \"${site.name}\" (referred to as \"we\", \"us\", or \"our\") refers to that operation. You can reach us at ${site.email}. The operator's official personal website, which identifies him publicly, is ${site.links.operatorSite}.`,
          ],
        },
        {
          heading: "What we collect",
          body: [
            "The contact form asks for your name, email address, company name (optional), the service you are interested in, and your message. You provide this voluntarily; nothing here is purchased, enriched, or combined with other datasets.",
            "When you submit the form, we also record limited technical metadata for security purposes: your IP address (as forwarded by the network layer), your browser's user-agent string, and the time of submission. This is used solely for rate limiting and abuse prevention.",
            "We do not run advertising networks, behavioral tracking, or cross-site profiling on this website. If we ever introduce analytics, hosting access logs, or cookies beyond what this policy describes, we will update this page — and obtain any legally required consent — before doing so.",
          ],
        },
        {
          heading: "Why we process it",
          body: [
            "Your message and contact details are used exclusively to respond to your inquiry and, if we engage, to communicate with you about potential work. The technical metadata described above is processed for the legitimate purpose of protecting the site from spam and abuse.",
            "We do not sell, rent, or share your personal information with third parties for marketing purposes. We do not use your information for automated decision-making or profiling.",
          ],
        },
        {
          heading: "Where your data goes",
          body: [
            "Contact submissions are forwarded to our email inbox through a third-party email delivery service so that we can receive and answer them. The delivery provider processes your message only to deliver it to that inbox; it is not used for advertising or analytics, and we instruct it accordingly.",
            "The website itself is hosted with a third-party hosting provider. We keep the set of parties that can access your information as small as the technical requirements of running the site allow.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "Email correspondence related to an inquiry is retained for up to 24 months from your last message to us, so that we have context if you return with a follow-up. After that, the correspondence is deleted or anonymized. If a project engagement results from your inquiry, the related records are governed by the terms of that engagement instead.",
            "Technical security metadata (IP address, user-agent, timestamp) is kept only for a short window sufficient for abuse prevention and is not used to build profiles.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "We operate from the Philippines and handle personal information under the Philippine Data Privacy Act of 2012 (Republic Act No. 10173). Subject to that law, you have the right to be informed of how your data is processed, to access a copy of it, to object to its processing, to have rectification or erasure of incomplete, inaccurate, outdated, false, or unlawfully obtained data, to have the organization suspend or withdraw its processing, and to be indemnified for damages sustained due to unauthorized or unlawful processing.",
            "You can exercise these rights — or raise a privacy concern — by emailing us at the address in the Contact section below. We will respond within the timeframe required by the applicable law.",
            "If you believe your rights under the Data Privacy Act have been violated, you also have the right to complain to the National Privacy Commission (privacy.gov.ph). If a different privacy law applies to you because of where you live, we will honor the corresponding right under that law in our handling of your request.",
          ],
        },
        {
          heading: "Cookies and tracking",
          body: [
            "This website does not use advertising cookies, analytics cookies, or third-party trackers.",
          ],
        },
        {
          heading: "Security",
          body: [
            "We apply sensible protective measures: transport encryption (HTTPS), server-side validation, rate limiting, and honeypot-based spam protection on the contact form, and email credentials stored only in protected server environment variables, never in the public code or in the browser. No method of transmission over the internet is perfectly secure, and we cannot guarantee absolute security of information you send us.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this policy as the website or our practices evolve. The current version is always published on this page with its last-updated date, and material changes will reflect the date above.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `For any privacy question or request regarding your data, contact ${site.name} (operator: Jericko Garcia) at ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
