# SEO & Discoverability — Oscar AI

Everything here is already implemented. This doc explains what's in place and
the one thing you must set before going live.

## ⚠️ Before deploying

Set the real production domain in **`lib/site.ts`**:

```ts
export const site = {
  url: "https://oscar.ai", // ← metadataBase, canonical, sitemap, robots all derive from this
  ...
}
```

`metadataBase` in `app/layout.tsx` uses it, so canonical URLs, OG URLs, sitemap,
and robots all resolve to absolute production URLs automatically.

---

## What's implemented

### 1. Metadata (`app/layout.tsx`)

Uses the Next.js Metadata API:

- **Title template** — `%s · Oscar AI`, with a keyword-rich default.
- **Description** — benefit-led, ~160 chars.
- **Keywords**, authors, publisher, category.
- **Canonical** — `alternates.canonical: "/"`.
- **Open Graph** + **Twitter** (`summary_large_image`).
- **Robots** — `index, follow` with `max-image-preview:large` and full snippets
  for Googlebot.
- **Viewport / themeColor** — light + dark, exported via `viewport`.

### 2. Structured data / JSON-LD (`lib/structured-data.ts`)

Four schema.org blocks are injected into `<head>`:

| Schema                | Powers                                             |
| --------------------- | -------------------------------------------------- |
| `Organization`        | Knowledge panel, logo, social profiles             |
| `WebSite`             | Site name in results                               |
| `SoftwareApplication` | Product rich result, rating, feature list, offer   |
| `FAQPage`             | FAQ rich snippets (sourced from `faqs` in site.ts) |

Validate at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
Because the FAQ schema is generated from the same `faqs` array the UI renders,
the visible content and structured data can never drift apart.

### 3. Open Graph image (`app/opengraph-image.tsx`)

A branded **1200×630** card generated with `next/og` `ImageResponse` at build
time. Next automatically wires `og:image` and `twitter:image`. No static asset to
maintain — edit the JSX to restyle.

### 4. Sitemap, robots & routes

- `app/sitemap.ts` → `/sitemap.xml` — lists `/` (1.0), `/newsroom` (0.7), and
  `/about` (0.6). **Add any new route here.**
- `app/robots.ts` → `/robots.txt` (allows all, points to the sitemap, sets host)
- `/newsroom` and `/about` each carry their own `metadata` export with a
  canonical and OG block — copy that shape for new routes.

### 5. Performance (Core Web Vitals)

- **Fonts self-hosted** via `next/font` → no render-blocking Google requests,
  `display: swap`, zero layout shift.
- **Server Components by default**; only genuinely interactive pieces
  (`Nav`, `Hero`, `AppFilm`, `PipelineVisual`, `Metrics`, `Testimonials`,
  `Game`, `Faq`) are client components, keeping JS minimal. The new
  overhaul sections (`Results`, `DailyBriefs`, `AboutTeaser`, the backdrops)
  are deliberately server-static.
- **No external images/CDNs** — brand marks are text/SVG, so nothing blocks LCP
  and there are no third-party requests.
- **Turbopack** production builds.

### 6. Accessibility (helps SEO too)

- Single `<h1>`, logical heading order, semantic landmarks.
- Skip-to-content link, focus-visible rings, labelled controls.
- `prefers-reduced-motion` fully honored.

---

## Content SEO notes

- The **FAQ** section targets long-tail question queries and is the direct
  source of the `FAQPage` schema — add Q&As there to widen coverage. The
  integrations and no-additional-staffing answers interpolate the `stats`
  constant, so updating a figure updates the rich snippet too. **Re-validate
  the FAQ schema after any `faqs[]` edit.**
- Copy leads with outcomes ("catch revenue leaks", "live in 30 days") and the
  core keyword cluster: *franchise / multi-location operations, AI analyst,
  labor compliance, fraud detection*. Quoted figures (1,536 locations, 18
  brands, 50+ integrations, 30-day go-live) come from `stats` in `lib/site.ts`
  — one edit updates copy, metadata, and schema together.
- Section `id`s (`#command`, `#briefs`, `#how`, `#customers`, `#newsroom`,
  `#faq`) enable deep links and jump-to anchors; nav entries use
  root-relative form (`/#customers`) so they resolve from `/about` and
  `/newsroom` too. `#results` and `#game` exist in the components but are
  commented out of the homepage, so their nav entries are commented out to
  match — restore them together or the link is dead.

## Recommended next steps

- Add **Google Search Console** + submit `/sitemap.xml`.
- Add analytics (Vercel Analytics or Plausible — both privacy-friendly).
- When blog/resource pages are added, give each its own `generateMetadata`,
  canonical, and a per-route `opengraph-image`.
