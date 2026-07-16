# Editing Content — Oscar AI

**One file to rule them all:** [`lib/site.ts`](../lib/site.ts). Nearly every
piece of visible text and every link lives there as typed data. Edit it and the
sections, SEO metadata, and structured data all update together.

## Common edits

### Change a link (demo, login, socials)

`site.links` — used by the nav, hero, CTA, footer, and JSON-LD.

```ts
links: {
  demo: "https://…/schedule",   // every "Request a demo" button
  login: "https://app.oscar.ai", // every "Log in"
  linkedin: "https://…",
  terms: "…",
  privacy: "…",
}
```

### Change the headline pitch / SEO description

`site.tagline`, `site.description`, `site.ogDescription`. These feed the
`<title>`, meta description, and social cards. (The big hero H1 itself is in
`components/site/Hero.tsx` because of its custom line breaks + gradient.)

### Add / edit a capability card

`features[]` — `icon` must be one of the keys in
`components/ui/icons.tsx` (`shield`, `trend`, `people`, `chat`, `box`,
`report`, …).

### Add / edit an industry, value prop, or step

`industries[]`, `valueProps[]`, `steps[]`. Same pattern — plain objects.

### Add / edit a testimonial

`testimonials[]` — `initials` renders in the avatar circle.

### Add / edit an FAQ

`faqs[]`. ⚠️ This array is **also the source of the FAQ rich-snippet schema**, so
adding a Q&A here improves SEO automatically. Keep answers self-contained.

### Change the trusted-by brands

`trustedBrands[]` — rendered as styled wordmarks in the marquee (no logo files
needed).

### Tune the impact numbers

`metrics[]` — numeric `value`s animate a count-up; `suffix` (e.g. `%`, `/7`,
`-day`) renders in the accent gradient.

## Editing the interactive pieces

These have data co-located in their components (they're behavioral, not just
copy):

- **Hero dashboard** — `components/site/LiveDashboard.tsx` (`bars`, `feedSource`).
- **Watchtower** — `components/site/Watchtower.tsx` (`nodes`, `kinds`).
- **District Manager game** — `components/site/Game.tsx` (`ALERTS`, plus scoring
  constants in `start`/`answer`).

## Adding a new section

1. Create `components/site/YourSection.tsx` (copy an existing one for the
   `Container` + `SectionHeading` + `Reveal` pattern).
2. Import and drop it into the desired position in `app/page.tsx`.
3. If it needs an anchor in the nav, add an entry to `nav[]` in `lib/site.ts`.
