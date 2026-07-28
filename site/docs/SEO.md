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

### 4. Sitemap & robots

- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt` (allows all, points to the sitemap, sets host)

### 5. Performance (Core Web Vitals)

- **Fonts self-hosted** via `next/font` → no render-blocking Google requests,
  `display: swap`, zero layout shift.
- **Server Components by default**; only genuinely interactive pieces
  (`Nav`, `AppFilm`, `Watchtower`, `Metrics`, `Game`, `Faq`) are client
  components, keeping JS minimal.
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
  source of the `FAQPage` schema — add Q&As there to widen coverage.
- Copy leads with outcomes ("catch revenue leaks", "live in days") and the core
  keyword cluster: *franchise / multi-location operations, AI analyst, labor
  compliance, fraud detection*.
- Section `id`s (`#platform`, `#how`, `#industries`, `#customers`, `#game`,
  `#faq`) enable deep links and jump-to anchors.

## Recommended next steps

- Add **Google Search Console** + submit `/sitemap.xml`.
- Add analytics (Vercel Analytics or Plausible — both privacy-friendly).
- When blog/resource pages are added, give each its own `generateMetadata`,
  canonical, and a per-route `opengraph-image`.
