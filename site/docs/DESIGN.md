# Design System — Oscar AI

**The rule: the brand leads, not the trend.**

Colors and type here are taken directly from the existing oscar.ai site and the
in-house v3 HTML — not invented. Oscar's surface is **light, white, and
trustworthy**, with **Oscar blue (`#35b8ff`)** as the single accent and **deep
navy (`#0a1f35`)** used *sparingly* for emphasis. The product's promise —
watching every location 24/7 — shows up as genuinely live data, not as neon glow.

---

## Color

All tokens are CSS variables in `app/globals.css` under `@theme`, exposed as
Tailwind utilities (`bg-brand-500`, `text-navy`, `border-line`, …).

### Brand blue — exact brand values

| Token        | Hex       | Origin           | Use                              |
| ------------ | --------- | ---------------- | -------------------------------- |
| `brand-50`   | `#f0faff` | `--blue-tint`    | Tinted surfaces, CTA band        |
| `brand-100`  | `#e1f4ff` | `--blue-tint2`   | Borders on tint, chart bars      |
| `brand-500`  | `#35b8ff` | `--blue`         | **Primary accent**, buttons      |
| `brand-600`  | `#0099d6` | `--blue-dark`    | Hover, accent text on white      |
| `brand-700`  | `#006fa3` | `--blue-deeper`  | Text on tint                     |

### Navy — used deliberately, not everywhere

`navy #0a1f35`. Appears in exactly three places, mirroring the live site:
the **dashboard header bar**, the **"Why Oscar" band**, and the **footer**.
That restraint is what keeps it feeling like Oscar and not a generic dark
AI template.

### Neutrals & text

`paper #fff` · `mist #f5f8fb` (soft band) · `mist-2 #eef4f9` (sunken) ·
`line #e4ebf3` (borders) · `line-2 #ccd9e5`.
Text: `navy` (headings) → `ink #0f2438` → `slate #47637a` → `muted #7d95aa`.

The neutrals carry a deliberate **blue undertone**. An earlier pass ran them
warm (`mist #f8f6f2`, `line #e8e2d8`) to pair with a serif; that ground fought
the brand cyan and made it read as a stray accent. On a cool ground the same
`#35b8ff` reads as the system's own color.

### Elevation

`shadow-e1` → `shadow-e4`, plus `shadow-stage` for the product frame. All are
tinted `rgba(12,44,72,…)` rather than neutral black, so a shadow sits in the
same light as the surface instead of greying it out.

### Signal palette

`signal-ok #16a34a` · `signal-warn #f59e0b` · `signal-crit #dc2626`.
Reused anywhere data appears so dashboards read as one system.

---

## Typography

**Geist for everything, Geist Mono for every numeral.** Both self-hosted via
`next/font` as variable fonts (no layout shift, no Google requests, and weight
changes cost no extra bytes).

- Headings: **600**, tracking `-0.032em` (`-0.04em` at h1), balanced wrapping.
- Body: 400–500, `text-slate`.
- Kickers: uppercase, 600, `0.14em` tracking — **plain sans, not monospace.**
- Numbers: `.num` (Geist Mono + tabular + `-0.02em`) everywhere a figure appears
  in a product surface. `.tnum` remains for tabular figures in body copy.

Two rules worth keeping:

**Grotesques need negative tracking at display sizes.** Geist set loose at 3rem+
reads generic. The base rule handles this — don't re-add `tracking-tight` to
headings, it is looser than the base and will fight it.

**Weight 600, not 800.** The heavy end of Geist at display sizes reads shouty
rather than confident.

> History: the site ran Plus Jakarta Sans + a Newsreader serif for headings
> before this. The serif was doing the work of feeling "premium" while making
> the product surfaces — which are fundamentally tables of numbers — read as an
> editorial site rather than software. Mono numerals do that job better.

## Section rhythm

The page alternates deliberately so a long scroll never flattens out:

```
Hero white → TrustedBy mist → Features white → Watchtower mist →
HowItWorks white → WhyOscar NAVY → Metrics white → Industries mist →
Testimonials white → Game mist → FAQ white → CTA brand-50 → Footer NAVY
```

Two accent moments carry the brand: the **navy "Why Oscar" band** and the
**brand-blue testimonial block** (both lifted from the live site).

## Motion

Motion means *aliveness*, never decoration:

- **Reveal on scroll** — fade up 22px, expo ease, staggered (`ui/Reveal.tsx`).
- **Live because Oscar is working** — the hero dashboard counts revenue, grows
  its chart, and streams alerts; the Watchtower detects and resolves.
- **Micro-interactions** — cards lift 3px, buttons rise 1px, FAQ "+" rotates.
- **`prefers-reduced-motion`** collapses everything, globally and per-component.

## Utilities (globals.css)

`.kicker` · `.tnum` · `.btn-primary` (flat brand blue) · `.btn-navy` ·
`.btn-ghost` · `.card-lift` · `.shadow-panel` · `.bg-grid` · `.mask-fade-b/-x` ·
`.pulse-ring` (radar ping) · `.animate-marquee/-float/-blink`.

## Layout

Content max-width **1152px** (`max-w-6xl`) via `<Container>`; sections
`py-20 md:py-28`; radii 10–20px (softer, matching the brand's rounded cards).

## Accessibility

Semantic landmarks, skip link, focus-visible rings, labelled controls,
`aria-hidden` on decorative visuals, AA contrast on both white and navy.
