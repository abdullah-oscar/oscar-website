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
    "AI that watches every location 24/7 — catching revenue leaks, labor risks, and compliance issues before they cost you. Live in 30 days, not months.",
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

/**
 * Company stats — the single source of truth for every figure quoted on
 * the site. Update here and every section, FAQ, and JSON-LD block that
 * references them stays in sync.
 */
export const stats = {
  /** TODO(barry): confirm the exact live location count before launch. */
  locations: 1536, // render via .toLocaleString("en-US") → "1,536"
  brands: 18,
  goLiveDays: 30,
  /** TODO(barry): confirm the provider count once the integrations list is final. */
  integrations: 50, // rendered as "50+"
} as const;

/**
 * Primary nav.
 *
 * Root-relative anchors (`/#how`, not `#how`) so these resolve from
 * standalone routes like /newsroom, not just the homepage.
 *
 * "Platform" points at #command (the product film) and "Industries" was
 * dropped: both previously targeted #platform / #industries, which are the
 * commented-out <Features /> and <Industries /> sections — dead links on the
 * live page. Restore them here if those sections come back.
 */
export const nav = [
  { label: "Platform", href: "/#command" },
  { label: "How it works", href: "/#how" },
  // { label: "Results", href: "/#results" },  ← restore with <Results />
  { label: "Customers", href: "/#customers" },
  { label: "About", href: "/about" },
  { label: "Newsroom", href: "/newsroom" },
  // { label: "Play", href: "/#game" },        ← restore with <Game />
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
    desc: "No rip-and-replace. Oscar connects to your current systems and adapts to your workflows. Most teams are live in about 30 days.",
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
  { value: "30", suffix: "-day", label: "Typical time to go live" },
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
  /* TODO(barry): the slots below are formatted the way we want the real
     quotes to land — full name + titled role at a named franchisee org.
     Swap in the real quote, name, and role, then drop `sample: true`. */
  {
    quote:
      "Placeholder — a quote about a specific dollar amount or hours-per-week Oscar saved this operator, in their own words.",
    name: "Firstname Lastname",
    role: "VP of Operations, [Brand] Franchisee",
    initials: "FL",
    sample: true,
  },
  {
    quote:
      "Placeholder — a quote from a district leader about the daily brief: what it catches, and what their mornings look like now.",
    name: "Firstname Lastname",
    role: "District Leader, [Franchisee organization]",
    initials: "FL",
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
    a: `Most teams are live in about ${stats.goLiveDays} days, not months. Oscar connects to the systems you already use — spreadsheets, PDFs, APIs, SFTPs, or direct database connections — so there's no rip-and-replace and no long IT project.`,
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
  {
    q: "What systems does Oscar integrate with?",
    a: `Oscar already integrates with ${stats.integrations}+ providers across POS, payroll, and back-office systems — plus spreadsheets, PDFs, SFTPs, and direct database connections. If your data lives somewhere, Oscar can almost certainly read it, and connecting a new source is our work, not yours.`,
  },
  {
    q: "Do I need to hire analysts or add staff to use Oscar?",
    a: "No additional staffing required — Oscar is the analyst. It does the watching, reconciling, and reporting your team would otherwise do by hand, and delivers finished alerts and action plans to the people you already have.",
  },
];

/* ================================================================
   Results / use cases
   ================================================================ */

export type UseCaseCategory =
  | "Sales & Revenue"
  | "Labor"
  | "Voids & Fraud"
  | "Product Availability"
  | "Customer Experience";

export type UseCase = {
  category: UseCaseCategory;
  icon: string; // key in components/ui/icons.tsx
  stat: string;
  statLabel: string;
  desc: string;
  featured?: boolean;
  /** Claimed by the team but not yet substantiated — renders a visible
   *  "Pending verification" chip until the supporting detail lands. */
  unverified?: boolean;
};

/* TODO(barry): the three unverified stats below come from the sell-in
   deck. Once the supporting detail is confirmed, drop the flag. A Labor
   and a Product Availability case are still wanted to round out the five
   categories — add them here and they render automatically. */
export const useCases: UseCase[] = [
  {
    category: "Voids & Fraud",
    icon: "shield",
    stat: "$10,000",
    statLabel: "back per year",
    desc: "A Burger King franchisee used Oscar's void and discount monitoring to catch comp-abuse and override patterns its POS reports never surfaced — worth $10,000 a year straight back to the bottom line.",
    featured: true,
  },
  {
    category: "Customer Experience",
    icon: "clock",
    stat: "26s",
    statLabel: "faster speed of service",
    desc: "Drive-thru times fell once Oscar flagged the day-parts and stations dragging the average.",
    unverified: true,
  },
  {
    category: "Sales & Revenue",
    icon: "trend",
    stat: "+2ppt",
    statLabel: "gross profit",
    desc: "Margin recovered by catching leaks — voids, waste, missed price changes — as they happen.",
    unverified: true,
  },
  {
    category: "Customer Experience",
    icon: "spark",
    stat: "+0.5%",
    statLabel: "brand score",
    desc: "Standards flags reached the right GM while there was still time to fix them.",
    unverified: true,
  },
];

/* ================================================================
   Daily briefs — "Same data. Same morning. Three different actions."
   Illustrative messages in the same simulated 36-store universe as the
   hero and the product film; the section carries its own disclaimer.
   ================================================================ */

export type DailyBrief = {
  role: string;
  name: string;
  initials: string;
  time: string;
  metric: string;
  metricLabel: string;
  actions: [string, string];
  callout: string;
  tone: "warn" | "info" | "ok";
};

export const dailyBriefs: DailyBrief[] = [
  {
    role: "District Leader",
    name: "Dana",
    initials: "DL",
    time: "7:02 AM",
    metric: "3.1%",
    metricLabel: "void rate at Loc #14 — norm is 0.8%",
    actions: [
      "Review last night's void log with the closing manager",
      "Compare against the district's 90-day pattern — attached",
    ],
    callout: "Alert → needs a decision today",
    tone: "warn",
  },
  {
    role: "General Manager",
    name: "Marcus",
    initials: "GM",
    time: "7:02 AM",
    metric: "86%",
    metricLabel: "prep completion before open — 2 items short",
    actions: [
      "Move one prep shift 30 minutes earlier on Fri–Sat",
      "Confirm the walk-in thermometer swap logged last night",
    ],
    callout: "Action plan → two steps, 15 minutes",
    tone: "ok",
  },
  {
    role: "Owner",
    name: "Priya",
    initials: "OW",
    time: "7:02 AM",
    metric: "27.9%",
    metricLabel: "labor, trailing 7 days — trending to plan",
    actions: [
      "Weekly labor summary, all regions — attached",
      "Two stores flagged for next week's schedule review",
    ],
    callout: "Report → no action needed, trending well",
    tone: "info",
  },
];

/* ================================================================
   Integrations
   ================================================================ */

/* TODO(barry): confirm the provider list. These generic wordmarks render
   in the integrations strip until logo files are dropped into
   /public/integrations (filenames become the display names — no code
   change needed). */
export const integrationProviders = [
  "POS systems",
  "Payroll",
  "Accounting",
  "Scheduling",
  "Inventory",
  "Review platforms",
] as const;
