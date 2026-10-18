import {
  Cloud,
  Code2,
  Globe,
  PenTool,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  /** Two-digit ordinal used as a design element ("01" … "06"). */
  ordinal: string;
  title: string;
  /** One-liner used on cards. */
  summary: string;
  /** Longer explanation used on the dedicated section. */
  description: string;
  capabilities: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "web-development",
    ordinal: "01",
    title: "Web Development",
    summary:
      "Modern, high-performance websites and web applications built with current frameworks.",
    description:
      "From marketing sites to complex web applications, we build on the modern React and Next.js ecosystem with TypeScript end to end. Every interface is engineered to be fast, accessible, and responsive across devices — then tuned for performance long before launch.",
    capabilities: [
      "Modern websites",
      "Web applications",
      "Responsive interfaces",
      "Performance optimization",
    ],
    icon: Globe,
  },
  {
    slug: "mobile-app-development",
    ordinal: "02",
    title: "Mobile App Development",
    summary:
      "Native-quality mobile experiences with Flutter and Android development.",
    description:
      "We design and build mobile applications that feel native on every device. Using Flutter for cross-platform delivery and native Android development where it matters, we ship apps with smooth performance, clean navigation, and maintainable codebases.",
    capabilities: [
      "Flutter applications",
      "Android development",
      "Cross-platform solutions",
    ],
    icon: Smartphone,
  },
  {
    slug: "backend-api-development",
    ordinal: "03",
    title: "Backend & API Development",
    summary:
      "Reliable APIs, databases, and authentication systems behind your product.",
    description:
      "The backend is where products earn their reliability. We design REST APIs, model data for the long term, and implement authentication and authorization systems that are secure by default — all structured on architecture your team can extend.",
    capabilities: [
      "REST APIs",
      "Database design",
      "Authentication systems",
      "Backend architecture",
    ],
    icon: Server,
  },
  {
    slug: "cloud-infrastructure",
    ordinal: "04",
    title: "Cloud & Infrastructure",
    summary:
      "Deployment, monitoring, and cloud integration that keeps software online.",
    description:
      "We provide the operational backbone for your software: reproducible deployments, server management, observability, and integration with modern cloud platforms. Infrastructure is treated as code — versionable, reviewable, and recoverable.",
    capabilities: [
      "Deployment solutions",
      "Server management",
      "Monitoring",
      "Cloud integration",
    ],
    icon: Cloud,
  },
  {
    slug: "custom-software-development",
    ordinal: "05",
    title: "Custom Software Development",
    summary:
      "Purpose-built business software, automation, and integrations.",
    description:
      "Off-the-shelf tools rarely fit a business exactly. We build custom business software, automation systems, and bespoke integrations shaped around your workflows — software that removes friction instead of adding it.",
    capabilities: [
      "Business software",
      "Automation systems",
      "Custom integrations",
    ],
    icon: Code2,
  },
  {
    slug: "ui-ux-design",
    ordinal: "06",
    title: "UI/UX Design",
    summary:
      "Interfaces designed to be clear, coherent, and genuinely usable.",
    description:
      "Great software starts with how it feels to use. We design interfaces and user experiences grounded in clarity — from individual product screens to complete design systems that keep your product consistent as it grows.",
    capabilities: [
      "Interface design",
      "User experience",
      "Design systems",
      "Responsive design",
    ],
    icon: PenTool,
  },
];
