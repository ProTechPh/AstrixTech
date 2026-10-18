export type TechnologyCategory =
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Database"
  | "Infrastructure";

export type Technology = {
  name: string;
  category: TechnologyCategory;
  note: string;
};

export const technologyCategories: {
  category: TechnologyCategory;
  blurb: string;
}[] = [
  { category: "Frontend", blurb: "Interfaces built on the modern web stack." },
  { category: "Mobile", blurb: "Applications that feel native on any device." },
  { category: "Backend", blurb: "Services engineered for reliability." },
  { category: "Database", blurb: "Data modeled for the long term." },
  { category: "Infrastructure", blurb: "Shipping, running, and observing software." },
];

export const technologies: Technology[] = [
  // Frontend
  { name: "React", category: "Frontend", note: "Component-driven UI" },
  { name: "Next.js", category: "Frontend", note: "Full-stack React framework" },
  { name: "TypeScript", category: "Frontend", note: "Type-safe end to end" },
  { name: "Tailwind CSS", category: "Frontend", note: "Utility-first styling" },
  // Mobile
  { name: "Flutter", category: "Mobile", note: "Cross-platform apps" },
  { name: "Dart", category: "Mobile", note: "Flutter language" },
  { name: "Android", category: "Mobile", note: "Native platform work" },
  // Backend
  { name: "Node.js", category: "Backend", note: "JavaScript runtime" },
  { name: "Python", category: "Backend", note: "Scripting & services" },
  { name: "Django", category: "Backend", note: "Batteries-included framework" },
  { name: "Laravel", category: "Backend", note: "Elegant PHP framework" },
  // Database
  { name: "PostgreSQL", category: "Database", note: "Relational standard" },
  { name: "MySQL", category: "Database", note: "Proven relational workhorse" },
  { name: "MongoDB", category: "Database", note: "Flexible documents" },
  { name: "Redis", category: "Database", note: "Caching & queues" },
  // Infrastructure
  { name: "Docker", category: "Infrastructure", note: "Containerized delivery" },
  { name: "Linux", category: "Infrastructure", note: "Server foundation" },
  { name: "Cloudflare", category: "Infrastructure", note: "Edge & DNS" },
  { name: "GitHub Actions", category: "Infrastructure", note: "CI/CD automation" },
];
