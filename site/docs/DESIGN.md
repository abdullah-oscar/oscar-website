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

`paper #fff` · `mist #f7fbfe` (soft band) · `line #e2edf4` (borders).
Text: `navy` (headings) → `ink #1a2b3c` → `slate #4a6375` → `muted #7a95a8`.

### Signal palette

`signal-ok #16a34a` · `signal-warn #f59e0b` · `signal-crit #dc2626`.
Reused anywhere data appears so dashboards read as one system.

---

## Typography

**One family: Plus Jakarta Sans** — the same face the brand already uses in its
own HTML. Self-hosted via `next/font` (no layout shift, no Google requests).

- Headings: 700–800, tight tracking (`-0.03em`), balanced wrapping.
- Body: 400–500, `text-slate`.
- Kickers: uppercase, 700, `0.1em` tracking — **plain sans, not monospace.**
- Numbers: `.tnum` (tabular figures) so dashboard values don't jitter.

> Earlier drafts used a display face (Bricolage) + a mono for data. Both were
> dropped: together they read as generic "AI startup" rather than Oscar. One
> honest brand family is stronger.

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
