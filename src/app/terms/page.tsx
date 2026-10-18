import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms covering use of the AstrixTech website and how contact submissions are handled.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms cover the use of this website and the submission of inquiries through it. They are intentionally general: a project engagement would be governed by a separate, written agreement between you and AstrixTech."
      lastUpdated="October 18, 2026"
      sections={[
        {
          heading: "About these terms",
          body: [
            `These terms (\"Terms\") apply to everyone who browses this website or contacts us through it. By using the site or submitting the contact form, you agree to them. The website is owned and operated by Jericko Garcia, doing business under the ${site.name} brand, ${site.email}. His official personal website is ${site.links.operatorSite}.`,
          ],
        },
        {
          heading: "What this website is",
          body: [
            "This website presents information about AstrixTech's services, expertise, and how to get in touch. Content is provided for general information purposes. It is not an offer, a price quotation, or advice, and it does not by itself create any contract, engagement, or obligation between you and AstrixTech.",
          ],
        },
        {
          heading: "Contact submissions",
          body: [
            "When you submit the contact form or email us, you consent to us using those details to respond to your inquiry, consistent with our Privacy Policy. You agree not to send unlawful, misleading, or infringing content, and not to use the form for spam or automated abuse. We may filter, rate-limit, or decline submissions that violate these terms.",
            "A submission is not a contract. Any project scope, timeline, or pricing discussed before signature is a proposal, not a commitment by either party.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The ${site.name} name, logo, website design, and written content on this site are owned by ${site.name} and its operator. They may be used, reproduced, or excerpted only with prior written permission, except where the law provides otherwise. Code samples or technical descriptions on this site, if any, are illustrative and are not provided as a license to copy them into production systems.`,
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to interfere with, probe, or disrupt the operation of this website, attempt to gain unauthorized access to its systems or services, use it to distribute malware or unlawful content, or misrepresent your identity when contacting us. We may block access to anyone who violates these rules.",
          ],
        },
        {
          heading: "Disclaimers",
          body: [
            "This website is provided on an \"as is\" and \"as available\" basis. We work to keep its content accurate and current, but we do not guarantee that content, availability, or functionality will be uninterrupted, error-free, or fit for your particular purpose.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by applicable law, AstrixTech and its operator are not liable for indirect, incidental, or consequential damages arising from use of this website or reliance on its content. Nothing in these terms limits liability that cannot be limited under applicable law.",
          ],
        },
        {
          heading: "Links to other websites",
          body: [
            "Where this site links to external websites (for example, our Google Play page or code hosting platforms), we do not control and are not responsible for their content, availability, or privacy practices.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms as the website or our practices evolve. The current version is always published on this page with its last-updated date. Continued use of the site after a revision constitutes acceptance of the revised terms.",
          ],
        },
        {
          heading: "Governing law and disputes",
          body: [
            "These terms are governed by the laws of the Republic of the Philippines, without regard to conflict-of-laws rules. Disputes arising from the use of this website shall be subject to the jurisdiction of the Philippine courts.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `Questions or notices concerning these terms can be sent to ${site.name} at ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
