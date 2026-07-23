/**
 * Single source of truth for site-wide config + marketing copy.
 * Centralizing content here keeps SEO metadata, structured data,
 * and UI components perfectly in sync. See /docs/CONTENT.md.
 */

export const site = {
  name: "Oscar AI",
  legalName: "Oscar AI",
  domain: "oscar.ai",
  url: "https://oscar.ai",
  // The one-liner that shows up in search results + social cards.
  tagline: "The AI Analyst for Multi-Location Operators",
  description:
    "Oscar is an AI operations analyst that watches every location 24/7 — catching revenue leaks, labor inefficiencies, and compliance risks, then delivering the alerts, reports, and action plans your team needs to fix them fast.",
  // Short blurb for cards / OG.
  ogDescription:
    "AI that watches every location 24/7 — catching revenue leaks, labor risks, and compliance issues before they cost you. Live in days, not months.",
  founded: "2021",
  links: {
    demo: "https://meetings.hubspot.com/kelemen/marketing-site-scheduling-link",
    login: "https://app.oscar.ai",
    linkedin: "https://www.linkedin.com/company/oscaraidata/",
    terms:
      "https://docs.google.com/document/d/1Wrv5P-rY2MJT9WPwMJrtM_ZiNqp_BLg6eMGkW_wyghA/edit",
    privacy:
      "https://docs.google.com/document/d/1I7312L34R5zmTwjXVJVK9BbQZnflDtQSk5H_E2VT74Y/edit",
  },
} as const;

export const nav = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how" },
  { label: "Industries", href: "#industries" },
  { label: "Customers", href: "#customers" },
  { label: "Play", href: "#game" },
] as const;

/** Hero headline trust stats. */
/** Brands shown in the trust marquee (rendered as styled wordmarks). */
export const trustedBrands = [
  "Dunkin'",
  "Burger King",
  "Subway",
  "Popeyes",
  "Jimmy John's",
  "Baskin-Robbins",
  "Potbelly",
  "UPS",
  "PMG",
] as const;

export type Feature = {
  icon: string; // key mapped to an SVG icon in components/ui/icons.tsx
  title: string;
  desc: string;
  metric?: string;
};

/** "What Oscar detects" — the core capability grid. */
export const features: Feature[] = [
  {
    icon: "shield",
    title: "Voids, discounts & fraud",
    desc: "Spots unusual voids, comps, and overrides in real time — and tells you whether it's fraud, a training gap, or nothing at all.",
    metric: "Real-time",
  },
  {
    icon: "trend",
    title: "Root-cause sales anomalies",
    desc: "Sales dip? Labor spike? Oscar surfaces exactly what changed and why, so your team acts on the cause instead of chasing symptoms.",
    metric: "Explained",
  },
  {
    icon: "people",
    title: "Labor efficiency & compliance",
    desc: "Catches overstaffing, understaffing, late clock-ins, and missed meal breaks — then recommends fixes that cut cost without hurting service.",
    metric: "Auto-flagged",
  },
  {
    icon: "chat",
    title: "Customer sentiment",
    desc: "Reads review and feedback signals, then routes the ones that matter to the right person before they show up in your sales numbers.",
    metric: "Routed",
  },
  {
    icon: "box",
    title: "Product availability",
    desc: "Flags items that aren't selling when they should — surfacing out-of-stocks, prep misses, and equipment issues before they cost you revenue.",
    metric: "Monitored",
  },
  {
    icon: "report",
    title: "Reports & action plans",
    desc: "Replaces manual reporting with automated summaries, alerts, and prescriptive action plans your ops team actually uses.",
    metric: "Delivered",
  },
];

export type Step = {
  n: string;
  title: string;
  desc: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Connect your data",
    desc: "Spreadsheets, PDFs, APIs, SFTPs, or direct database connections — Oscar plugs into whatever you already use. Built for the messy reality of franchise data.",
  },
  {
    n: "02",
    title: "Oscar learns your operations",
    desc: "It maps your org structure and logic rules, learns what \"normal\" looks like across every location, and immediately starts flagging what isn't.",
  },
  {
    n: "03",
    title: "Automate & act",
    desc: "Real-time alerts, automated reports, and clear action plans reach the right person at the right time. No digging. Just decisions.",
  },
];

export type ValueProp = {
  n: string;
  title: string;
  desc: string;
};

export const valueProps: ValueProp[] = [
  {
    n: "01",
    title: "More automation, less chaos",
    desc: "Oscar runs complex workflows across sales, labor, and ops — so your team moves faster and stays focused on growth, not spreadsheets.",
  },
  {
    n: "02",
    title: "Capture every dollar",
    desc: "It finds the revenue buried in your messy data, with unlimited logic rules and crosswalks tuned to how you actually operate.",
  },
  {
    n: "03",
    title: "Streamline compliance",
    desc: "Stay ahead of labor laws, break violations, and brand standards. Oscar flags issues and routes them to the right owner automatically.",
  },
  {
    n: "04",
    title: "Fits your existing stack",
    desc: "No rip-and-replace. Oscar connects to your current systems and adapts to your workflows. Most teams are live in days.",
  },
];

export type Industry = {
  icon: string;
  title: string;
  desc: string;
};

export const industries: Industry[] = [
  {
    icon: "franchise",
    title: "Franchise & multi-unit brands",
    desc: "From restaurants to wellness to automotive — any brand with dozens or hundreds of locations stays consistent, compliant, and profitable.",
  },
  {
    icon: "retail",
    title: "Retail & convenience chains",
    desc: "Stores, fuel centers, and specialty retail get smarter operations across sales, labor, and customer experience.",
  },
  {
    icon: "hospitality",
    title: "Hospitality & service groups",
    desc: "Hotel groups, foodservice operators, and field teams tap Oscar's real-time automation and issue detection.",
  },
  {
    icon: "health",
    title: "Healthcare & wellness networks",
    desc: "Multi-location providers simplify operations — from patient-facing clinics to behind-the-scenes scheduling and labor.",
  },
];

export type Metric = {
  value: string;
  suffix?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: "24", suffix: "/7", label: "Every location, always watched" },
  { value: "95", suffix: "%", label: "Reduction in manual reporting" },
  { value: "1000", suffix: "s", label: "Workflows automated" },
  { value: "3", suffix: "-day", label: "Typical time to go live" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** Placeholder copy standing in for a real quote — swap for the real thing before this ships. */
  sample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Oscar is the time saver and consolidation system your team needs to increase awareness and consistency across your business. Our District Leaders and General Managers love it — customized dashboards in real time, improved PLV, improved labor controls, and improved FSS results.",
    name: "Multi-Unit Operator",
    role: "Burger King Franchisee",
    initials: "BK",
  },
  {
    quote:
      "I am extremely proud to say Oscar is our most strategic partner. Together we are keeping our team engaged and energized — which in turn means our team delivers the very best guest experiences.",
    name: "Russ Lo Bello",
    role: "President, The Phoenix Organization",
    initials: "RL",
  },
  {
    quote:
      "We used to spend a full day every week pulling reports across locations. Now it's automatic, and the flags Oscar sends are usually right.",
    name: "Director of Operations",
    role: "45-unit convenience retail group",
    initials: "DO",
    sample: true,
  },
  {
    quote:
      "The labor alerts alone paid for the platform in the first month.",
    name: "General Manager",
    role: "Quick-service restaurant group",
    initials: "GM",
    sample: true,
  },
  {
    quote:
      "Our district leaders finally see the same numbers we do, in real time, instead of finding out on Monday.",
    name: "VP of Operations",
    role: "Multi-unit hospitality group",
    initials: "VP",
    sample: true,
  },
  {
    quote:
      "Oscar catches void patterns our old system never flagged — training gaps we didn't even know we had.",
    name: "Loss Prevention Manager",
    role: "Multi-location retail chain",
    initials: "LP",
    sample: true,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What exactly is Oscar?",
    a: "Oscar is an AI operations analyst for multi-location businesses. It continuously watches your sales, labor, and compliance data across every location, detects the issues that matter, and delivers alerts, reports, and prescriptive action plans to the right people — automatically.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most teams are live in days, not months. Oscar connects to the systems you already use — spreadsheets, PDFs, APIs, SFTPs, or direct database connections — so there's no rip-and-replace and no long IT project.",
  },
  {
    q: "Do I need to replace my current systems?",
    a: "No. Oscar is built to fit your existing stack. It layers on top of the tools you already run and adapts to your workflows, org structure, and logic rules.",
  },
  {
    q: "What kinds of businesses use Oscar?",
    a: "Franchise and multi-unit brands, retail and convenience chains, hospitality and service groups, and healthcare and wellness networks — essentially any operator running dozens or hundreds of locations with complex workflows.",
  },
  {
    q: "How does Oscar detect fraud and anomalies?",
    a: "Oscar learns what 'normal' looks like for each of your locations, then flags unusual voids, comps, discounts, labor patterns, and sales movements in real time — and explains the likely root cause so your team can act, not just react.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Oscar is SOC 2 compliant, with security and access controls designed for enterprise multi-location operators.",
  },
];
