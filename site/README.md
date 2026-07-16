# Oscar AI — Marketing Site

A world-class, SEO-first marketing site for **Oscar AI**, the AI analyst for
multi-location operators. Built with **Next.js 16 (App Router)**, **React 19**,
**Tailwind CSS v4**, **Motion**, and self-hosted Google Fonts.

> Design concept: **"Living Operations Intelligence."** A light, premium
> surface punctuated by commanding dark "command-center" moments, with a single
> electric-blue accent and monospaced numerals that read as live telemetry.

---

## Quick start

```bash
cd site
npm install        # first time only
npm run dev        # start dev server → http://localhost:3000
```

| Script          | What it does                            |
| --------------- | --------------------------------------- |
| `npm run dev`   | Dev server with Turbopack + hot reload  |
| `npm run build` | Production build                        |
| `npm run start` | Serve the production build              |
| `npm run lint`  | ESLint (flat config)                    |

Node **20.9+** is required (Next 16 minimum).

---

## Project structure

```
site/
├─ app/
│  ├─ layout.tsx          # Fonts, global metadata, JSON-LD, <html> shell
│  ├─ page.tsx            # Home — composes every section in order
│  ├─ globals.css         # Design system (tokens, utilities, keyframes)
│  ├─ icon.svg            # Favicon (Next file convention)
│  ├─ opengraph-image.tsx # Dynamic 1200×630 social card
│  ├─ sitemap.ts          # /sitemap.xml
│  └─ robots.ts           # /robots.txt
├─ components/
│  ├─ site/               # Page sections (Hero, Watchtower, Game, …)
│  └─ ui/                 # Reusable primitives (Logo, icons, Reveal, …)
├─ lib/
│  ├─ site.ts             # Single source of truth for copy + config
│  └─ structured-data.ts  # JSON-LD builders (Org, Software, FAQ, WebSite)
├─ docs/                  # DESIGN.md · SEO.md · CONTENT.md
└─ public/icon.svg        # Stable logo URL (used by JSON-LD / OG)
```

## The page, section by section

1. **Hero** — dark command center with an animated live dashboard (counting
   KPIs, growing bar chart, streaming signal feed) + floating stat cards.
2. **TrustedBy** — infinite marquee of operator brands.
3. **Features** — "What Oscar detects" capability grid.
4. **Watchtower** ⭐ — the signature interactive piece: a live network map where
   Oscar detects and auto-resolves issues across locations in real time.
5. **HowItWorks** — 3 steps + a data-pipeline visual.
6. **WhyOscar** — four value props.
7. **Metrics** — count-up impact band.
8. **Industries** — who it's for.
9. **Testimonials** — real operator quotes.
10. **Game** ⭐ — "You're the District Manager" — a playable triage game that
    dramatizes the chaos Oscar removes.
11. **FAQ** — accordion (doubles as FAQ rich-snippet source).
12. **CTA** + **Footer**.

## Editing content

Almost all copy lives in [`lib/site.ts`](lib/site.ts). Change it there and every
section — plus the SEO metadata and structured data — updates in sync. See
[`docs/CONTENT.md`](docs/CONTENT.md).

## Design system

Tokens, type scale, motion language, and the rationale behind them are in
[`docs/DESIGN.md`](docs/DESIGN.md). All values are CSS variables in
[`app/globals.css`](app/globals.css) under Tailwind v4's `@theme`.

## SEO

Metadata, Open Graph, JSON-LD, sitemap, robots, and accessibility notes are in
[`docs/SEO.md`](docs/SEO.md). Set the production domain in `lib/site.ts`
(`site.url`) before deploying — `metadataBase` and canonicals derive from it.

## Deploying

Any Node host works. On **Vercel**: point the project at the `site/` directory
and it deploys with zero config. Run `npm run build` locally first to confirm a
clean production build.
