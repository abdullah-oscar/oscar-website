/**
 * Newsroom content.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  EVERY ITEM BELOW IS A PLACEHOLDER (`sample: true`) AND RENDERS WITH A
 *  VISIBLE "Sample" CHIP. Replace them with Barry's real items and drop
 *  the flag — do not ship these as-is.
 *
 *  Note the outlets are deliberately generic ("Industry trade publication").
 *  Never name a real outlet here unless that outlet actually covered Oscar:
 *  an invented byline on a live marketing site is a real problem, not a
 *  placeholder.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Adding a real item: append to `newsItems`, omit `sample`, and set `date`
 * as ISO (YYYY-MM-DD). Sorting and filtering are derived, so that's all.
 */

export type NewsKind = "press-release" | "announcement" | "coverage";

export type NewsItem = {
  id: string;
  kind: NewsKind;
  title: string;
  /** ISO date — drives sort order and the <time> element. */
  date: string;
  excerpt: string;
  /** Where it goes. External for coverage, internal or PDF for the rest. */
  href: string;
  /** Publication name — coverage items only. */
  outlet?: string;
  /** Placeholder standing in until real content lands. */
  sample?: boolean;
};

export const newsKindLabel: Record<NewsKind, string> = {
  "press-release": "Press release",
  announcement: "Announcement",
  coverage: "In the media",
};

/** Filter tabs, in display order. */
export const newsFilters = [
  { id: "all", label: "All" },
  { id: "press-release", label: "Press releases" },
  { id: "announcement", label: "Announcements" },
  { id: "coverage", label: "In the media" },
] as const;

export type NewsFilter = (typeof newsFilters)[number]["id"];

export const newsItems: NewsItem[] = [
  {
    id: "sample-funding",
    kind: "press-release",
    title: "Oscar AI raises to bring autonomous operations analysis to multi-location operators",
    date: "2026-07-10",
    excerpt:
      "Placeholder press release. Replace with the real announcement copy, and point href at the hosted release or PDF.",
    href: "#",
    sample: true,
  },
  {
    id: "sample-scorecards",
    kind: "announcement",
    title: "Store Scorecards: every location scored, ranked, and explained daily",
    date: "2026-06-24",
    excerpt:
      "Placeholder product announcement. Replace with the real release note and link to the changelog or blog post.",
    href: "#",
    sample: true,
  },
  {
    id: "sample-coverage-1",
    kind: "coverage",
    title: "How AI is reshaping back-office operations for franchise groups",
    date: "2026-06-02",
    excerpt:
      "Placeholder media mention. Replace with the real article and name the actual outlet that published it.",
    href: "#",
    outlet: "Industry trade publication",
    sample: true,
  },
  {
    id: "sample-soc2",
    kind: "press-release",
    title: "Oscar AI completes SOC 2 Type II examination",
    date: "2026-05-15",
    excerpt:
      "Placeholder compliance announcement. Replace with the real release once the report is issued.",
    href: "#",
    sample: true,
  },
  {
    id: "sample-chat",
    kind: "announcement",
    title: "Ask Oscar: plain-language answers across every location's data",
    date: "2026-04-28",
    excerpt:
      "Placeholder product announcement. Replace with the real release note for the conversational analytics launch.",
    href: "#",
    sample: true,
  },
  {
    id: "sample-coverage-2",
    kind: "coverage",
    title: "Operators are trading weekly reporting cycles for real-time exception alerts",
    date: "2026-03-19",
    excerpt:
      "Placeholder media mention. Replace with the real article and name the actual outlet that published it.",
    href: "#",
    outlet: "Restaurant technology press",
    sample: true,
  },
];

/** Newest first. */
export function sortedNews(items: NewsItem[] = newsItems): NewsItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

/** TODO(barry): confirm this inbox exists and is monitored before launch. */
export const pressContact = {
  email: "press@oscar.ai",
  label: "Media & press enquiries",
};

export function formatNewsDate(iso: string): string {
  // Parsed as UTC so the rendered date can't drift a day between the
  // server and a visitor in a behind-UTC timezone (hydration mismatch).
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
