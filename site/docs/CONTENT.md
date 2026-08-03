# Editing Content — Oscar AI

**One file to rule them all:** [`lib/site.ts`](../lib/site.ts). Nearly every
piece of visible text and every link lives there as typed data. Edit it and the
sections, SEO metadata, and structured data all update together. The /about
page's story and team live in [`lib/about.ts`](../lib/about.ts); newsroom items
in [`lib/newsroom.ts`](../lib/newsroom.ts).

## Placeholder conventions (read this first)

Three markers keep unconfirmed content from shipping as real:

- **`sample: true`** — invented stand-in content (testimonials, news items,
  team bios). Renders a visible "Sample" / "Placeholder" chip. Replace the
  content, drop the flag, the chip disappears.
- **`unverified: true`** — a *real claim awaiting substantiation* (the 26s /
  +2ppt / +0.5% stats in `useCases`). Renders a "Pending verification" chip.
  Different from `sample`: the claim is ours, the proof isn't in hand yet.
- **`TODO(barry):`** code comments — facts a human must confirm (exact
  location count, provider list, bios, dates). `grep -rn "TODO(barry)" lib`
  produces the outstanding list.

## Common edits

### Company stats (location count, brands, go-live days, integrations)

`stats` in `lib/site.ts` — **the single source of truth for every figure quoted
on the site.** TrustedBy, the FAQ (and its JSON-LD), the integrations strip,
AboutTeaser, and /about all read from it; update it once.

### Change a link (demo, login, socials)

`site.links` — used by the nav, hero, CTA, footer, and JSON-LD.

### Change the headline pitch / SEO description

`site.tagline`, `site.description`, `site.ogDescription`. These feed the
`<title>`, meta description, and social cards. (The big hero H1 itself is in
`components/site/Hero.tsx` because of its custom line breaks + gradient.)

### Add / edit a use case (Results section)

`useCases[]` — `featured: true` gets the big card (one at a time); the rest
render as stat cards. `icon` must be a key in `components/ui/icons.tsx`.
Mind the `unverified` flag (above).

### Add / edit a daily brief (Same data, same morning section)

`dailyBriefs[]` — one card per role (District Leader / GM / Owner), each with a
headline metric, two actions, and a tone-colored callout (`warn`/`info`/`ok`).
Figures stay inside the simulated 36-store universe the hero and product film
use — the section carries its own "illustrative" disclaimer.

### Add / edit a testimonial

`testimonials[]` — `initials` renders in the avatar circle. The last two
entries are formatted the way real quotes should land (full name + titled role
at a named org); swap content in and drop `sample: true`.

### Add / edit an FAQ

`faqs[]`. ⚠️ This array is **also the source of the FAQ rich-snippet schema**, so
adding a Q&A here improves SEO automatically. Keep answers self-contained.
Answers may interpolate `stats` (see the integrations answer).

### Edit the /about story or team

`lib/about.ts` — `story[]` (milestone timeline) and `team[]`. Team photos:
drop files named after the member's `photo` stem into `/public/team/`
(e.g. `abdullah-khan.jpg`); initials render until then.

### Tune the impact numbers

`metrics[]` — numeric `value`s animate a count-up; `suffix` (e.g. `%`, `/7`,
`-day`) renders in the accent color. `<Metrics items={...}>` accepts a custom
list — /about passes its own.

## Logo & asset drop-in folders

All discovered at build time by `lib/assets.ts` — **drop a file in, rebuild,
done; no code changes**. Filenames become alt text via `prettyName()`
(`burger-king.png` → "Burger King"), so name files properly:

| Folder                | Renders in                              | Fallback when empty            |
| --------------------- | --------------------------------------- | ------------------------------ |
| `/public/customers`   | TrustedBy marquee                       | `trustedBrands[]` wordmarks    |
| `/public/compliance`  | Footer badge                            | icon chip                      |
| `/public/integrations`| Integrations strip under the pipeline   | `integrationProviders[]` words |
| `/public/team`        | /about team cards                       | initials avatar                |

⚠️ The current customer logos are all named `Untitled (n).png` — renaming them
to brand names fixes their alt text automatically.

## Editing the interactive pieces

These have data co-located in their components (they're behavioral, not just
copy):

- **Product film** — `components/site/showcase/`. `AppFilm.tsx` owns the scene
  list, beat lengths (`ms`), cursor focus points, and chapter labels;
  `scenes.tsx` holds the invented figures for each scene.
  ⚠️ The scenes are **deliberately not copies of the real app** — the same
  information architecture and the same kind of answer, redrawn at web
  scale. Every figure, store, and person is invented at 36-store scale;
  never paste real values, store identities, or staff names in from the
  product. (An August 2026 pass rebuilt these against real screenshots and
  was reverted on the manager's call — if that comes up again, reference
  captures belong in `/design-refs`, which is gitignored and must never be
  committed.)
- **Pipeline engine** — `components/site/PipelineVisual.tsx` (source chips,
  engine stats, output rows).
- **District Manager game** — `components/site/Game.tsx` (`ALERTS`, plus scoring
  constants in `start`/`answer`). Currently held back — see below.
- The hero, film, game, and briefs all share one simulated universe:
  **36 locations**. Keep any new invented figure consistent with it.

## Sections currently held back

`Results`, `AboutTeaser`, and `Game` are commented out of `app/page.tsx`
(manager's call, Aug 2026). The components are complete and untouched. To
restore one: uncomment its import and its element, and re-add its `nav[]`
entry in `lib/site.ts` (`Results` → `/#results`, `Game` → `/#game`) —
otherwise the nav points at an anchor that isn't on the page. `AboutTeaser`
has no nav entry of its own; `/about` stays live either way.

## Adding a new section

1. Create `components/site/YourSection.tsx` (copy an existing one for the
   `Container` + `SectionHeading` + `Reveal` pattern).
2. Import and drop it into the desired position in `app/page.tsx`.
3. If it needs an anchor in the nav, add an entry to `nav[]` in `lib/site.ts`
   (root-relative, e.g. `/#results`, so it resolves from /about and /newsroom).
