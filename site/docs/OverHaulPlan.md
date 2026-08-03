# Oscar AI Website Overhaul — Owner visuals + Barry's feedback

> **Status: IMPLEMENTED — 2026-08-03.** All six phases below shipped; `npm run
> build` and TypeScript are clean, and every new file lints clean (the 8 lint
> errors that remain are pre-existing, in `Hero.tsx` / `Game.tsx` /
> `showcase/parts.tsx` / `showcase/scenes.tsx`, which this overhaul deliberately
> did not touch).
>
> **Deviations from the plan as written:**
>
> 1. **DailyBriefs says "36 stores reconciled", not "1,536 locations".** The
>    briefs live in the same simulated 36-store universe as the hero and the
>    product film; quoting the company-wide 1,536 there would have implied one
>    customer with 1,536 locations. The 1,536 figure appears where it belongs:
>    TrustedBy, AboutTeaser, and /about.
> 2. **No invented 5th "Labor" use case.** Rather than fabricate a stat, the
>    Results section closes with a "Where Oscar watches" row covering all five
>    categories, and the `TODO(barry)` on `useCases` asks for real Labor +
>    Product Availability cases.
> 3. **`integrationProviders` are generic category wordmarks** ("POS systems",
>    "Payroll", …), not guessed provider names — real names arrive with the
>    logo files in `/public/integrations`.
> 4. **DailyBriefs sits on a mist band** (plan said white) so the section
>    rhythm still alternates: CommandCenter gradient → briefs mist →
>    HowItWorks white.
> 5. **`Logo variant="full"` composes the transparent lockup + tagline text**
>    rather than rendering `oscar-main-logo.png`: that PNG contains the tagline
>    but has an opaque background that would show as a white box on the new
>    backdrop. (Confirmed by inspecting the file, as the plan required.)
>
> **Follow-ups owed by humans** (all marked in code): grep `TODO(barry)`,
> `sample: true`, and `unverified: true` for the full list — exact location and
> provider counts, stat verifications, bios/photos, real quotes, origin-story
> dates, customer-logo renames, and the UPS-logo decision.

> **Post-implementation changes (same day, owner feedback on the film):**
>
> 1. **Camera pan-zoom removed** from AppFilm — the owner wants the screens
>    shown flat. Chrome bar, glare pass, and the scroll-linked perspective
>    settle stay.
> 2. **The five scenes were rebuilt against the real app** (app.oscar.ai/v2),
>    from screenshots the owner supplied in `/design-refs` (gitignored — real
>    product captures never get committed). The sidebar now mirrors the real
>    app (modules + Scheduled Chats + a Reports section with
>    General/Labor/Sales + demo-user chip), with the Reports scene living
>    under "General".
> 3. **Then pulled back from being a copy**, on owner review: the scenes
>    emulate the modules but not the portal's distinctive surfaces. The Daily
>    Metrics to-do sticky note became an exception queue ("Needs a human
>    today" → 3 stores, each routed); Trends became a metric list beside one
>    annotated chart instead of the card row + ranking table; Scorecards
>    became a ranked worst-first list beside one open store instead of a grid
>    of score cards. Reasoning: competitors shouldn't be able to lift the
>    product's look off the marketing site — the original concern behind this
>    whole section.
> 4. **Nothing real was copied**: figures re-scaled to the simulated 36-store
>    universe (the real account shows 133), store numbers/cities and the
>    district manager's name replaced with invented ones, demo login email
>    swapped. Both rules are documented in the `scenes.tsx` file header.
> 5. **Then the whole preview pass was reverted** (manager's call):
>    `AppFilm.tsx` and `scenes.tsx` are back at their pre-overhaul committed
>    state — original invented scenes, no browser chrome, no glare, no tilt.
>    Points 1–4 above are history, not current behaviour. The reference
>    captures stay local in `/design-refs` (gitignored).

> **Sections held back (manager's call):** `Results`, `AboutTeaser`, and
> `Game` are commented out of `app/page.tsx`, with their `nav[]` entries
> commented out to match. Components are complete and untouched — restoring
> one means uncommenting its import, its element, and its nav entry.
> `/about` itself stays live and in the nav.

---

The approved plan follows, unedited, as the record of what was built and why.

Context
Two feedback sources on the redesigned marketing site (site/, Next.js 16 App Router, Tailwind v4 tokens in globals.css @theme, motion v12):

Owner (visual): hero background feels "AI-ish and old"; the product preview should feel like a sleek capture of real screens (competitor-copy concern); the reasoning-engine card is static and should feel like a live engine.
Barry (strategic): use-case/results section (BK $10K case + 26s SOS / +2ppt GP / +0.5% brand score claims), daily DM-alerts section, integrations count, /about page with origin story + bios, exact location count, 3→30 day go-live copy, more named testimonials, "no additional staffing" note, full logo w/ tagline.
Decisions made with user: keep JSX dashboard mocks (restyle only, no real screenshots); implement everything now with visible placeholder marking; About = dedicated /about route + homepage teaser.

Placeholder conventions (existing, reuse): sample: true → visible "Sample" chip (see Testimonials.tsx:82-85, lib/newsroom.ts); TODO(barry): comments for facts to confirm. New: unverified: true → "Pending verification" chip for claimed-but-unsubstantiated stats.

Site-wide contracts to respect: backdrop layers are z-0 inside relative overflow-hidden, content carries relative z-10 (never -z-10 — documented in HeroBackdrop.tsx header); global prefers-reduced-motion kill-switch in globals.css:348-355 + Motion useReducedMotion()/entry() snap-to-end pattern (showcase/parts.tsx:18-31); no randomness in initial render (hydration); figures use .num/.tnum.

All paths below are relative to site/.

Phase 1 — Content constants + copy fixes
lib/site.ts: add a single stats constant (source of truth, one-line updates when Barry confirms):

export const stats = {
  locations: 1536,   // TODO(barry): confirm exact count. Render .toLocaleString()
  brands: 18,
  goLiveDays: 30,
  integrations: 50,  // TODO(barry): confirm provider count. Rendered "50+"
} as const;
"3 days" → "30 days" (all verified occurrences):

lib/site.ts:18 ogDescription → "Live in 30 days, not months."
lib/site.ts:203 metrics { value: "3", suffix: "-day" } → "30" (Counter animates 0→30 automatically)
lib/site.ts:273 FAQ answer → "live in about 30 days…" (propagates to FAQ JSON-LD via lib/structured-data.ts — intended; re-validate)
components/site/HowItWorks.tsx:19 H2 → "Up and running in 30 days, not months"
lib/site.ts:160 + components/site/CTA.tsx:36 (currently unrendered — update anyway for consistency)
Small fixes:

HowItWorks.tsx:17 class bug leading-[1.05]sm:text-5xl → add missing space (sm breakpoint is dead)
Game.tsx:319 "34 locations" → 36 (matches Hero.tsx NODES = 36)
TrustedBy.tsx:21 → "Trusted by operators running 1,536 locations across 18 brands" (from stats)
Barry's real-time question: hero stays a simulation; keep the disclaimer at Hero.tsx:451 and sharpen to "Simulated demo — illustrative locations and figures, not live customer data." Badge keeps its energy.
New FAQ entries (lib/site.ts faqs[], auto-feeds JSON-LD; define below stats and interpolate):

Integrations: "What systems does Oscar integrate with?" → POS/payroll/back-office/spreadsheets/PDFs/SFTP, "${stats.integrations}+ providers"
Staffing: "Do I need to hire analysts to use Oscar?" → "No additional staffing required — Oscar is the analyst…"
Testimonials (lib/site.ts:215-262): add 2–3 sample: true entries formatted as real-name placeholders ("Firstname Lastname", "VP Operations, [Brand] Franchisee") so Barry sees exactly what to collect; "Sample quote" chip renders automatically.

Phase 2 — Hero backdrop redesign
Rewrite components/site/HeroBackdrop.tsx (stays a zero-JS server component). Delete the "AI-ish" layers: fine grid, SVG node constellation, scan band. New stack (all CSS, no canvas, no blur filters):

Base wash — bg-gradient-to-b from-white via-brand-50/60 to-white
Gradient mesh blooms — two layered divs (.bg-mesh-a/.bg-mesh-b): wide-falloff radial pools of brand-200/300/400 (10–22%) + one faint navy bloom top-right for depth; layer A on existing animate-drift, layer B on new animate-drift-slow (~26s, reversed) so they parallax
Horizon glow — .bg-horizon: one wide static ellipse low in frame (radial-gradient(90% 42% at 50% 96%, brand-300 @ 22%, transparent)) — the "premium light source" replacing the scan sweep
Grain — .bg-grain: inline SVG feTurbulence data-URI, ~140px tile, opacity 0.035, mix-blend-mode: overlay (constant string — hydration-safe)
Keep the outer aria-hidden pointer-events-none absolute inset-0 z-0 wrapper and update the header comment. Hero.tsx needs no changes (content already relative z-10).

app/globals.css: add drift-slow (reuse drift reversed), .bg-mesh-a/b, .bg-horizon, .bg-grain. Remove scan + twinkle keyframes/utilities after grep confirms only HeroBackdrop used them. Keep .bg-grid-fine (used by CommandCenter + newsroom).

New components/site/PageBackdrop.tsx (server): subtler variant (wash + one mesh + grain) extracted for interior pages; swap into app/newsroom/page.tsx:29-32 (currently reuses the old aurora+grid) and reuse on /about.

Phase 3 — Reasoning-engine animation
Extract PipelineVisual/Connector/Output (HowItWorks.tsx:64-165) → new client component components/site/PipelineVisual.tsx ("use client"; HowItWorks stays server). Hybrid approach: Motion for inView + count-ups (one-shot), CSS keyframes for continuous loops (no 60fps re-renders). Motion is already in the bundle.

Choreography:

Source chips: staggered feed keyframe (border/bg flick toward brand-100 + 1px lift), animationDelay: i * 0.45s — one chip "fires" at a time
Connectors: replace with SVG line, stroke-dasharray + flow keyframe on dashoffset (continuous downward flow) + small traveling dot; bottom connector lags top ~0.6s
Engine core: pulsing glow ring on the radar tile (engine-pulse) + rotating conic-gradient sweep (sweep, 4s linear) clipped inside the brand-50 card (z-0 under relative z-10 content — same stacking contract)
Stats ($48.2K / 28.3% / 3): count up once on useInView(once: true, amount: 0.4) — import useCountUp from showcase/parts.tsx, don't re-implement
Output rows: Motion staggered slide-in on inView; then slow CSS loop — staggered animate-blink dots + row-flash background sweep (delays 0/2/4s) so rows read as arriving
Reduced motion: stats render final values immediately; entrances use entry() pattern; CSS loops die via global kill-switch. No blank/zero states.
globals.css: keyframes feed, flow, flow-dot, sweep, row-flash + --animate-* vars/utilities in the existing pattern.

Phase 4 — AppFilm "real product capture" restyle
Diff confined to components/site/AppFilm.tsx + globals.css; scenes.tsx (1174L) and parts.tsx untouched.

Browser chrome: slim bar above the rail/main row — three neutral traffic dots, centered address pill (lock icon + app.oscar.ai), faint tab notch (~15 lines static JSX). Biggest "recorded session" cue.
Scroll perspective: wrap frame in perspective: 1200px stage; useScroll + useTransform drive rotateX 5°→0 and translateY 24→0, settling flat by center-viewport. Skip when reduced-motion.
Cursor trap (must fix): scripted cursor measures rail geometry via getBoundingClientRect (AppFilm.tsx:142-152) which returns post-transform coords. Switch measurement to offsetLeft/offsetTop accumulation (transform-immune); tilt settles to 0 while playing so residual error is sub-pixel.
Screen texture/glare: one aria-hidden absolute inset-0 z-20 overlay — diagonal glare band sweeping once per scene entry (keyed on playKey, 1.2s), inset vignette box-shadow for screen curvature. Move cursor layer z-20 → z-30 so it rides above the glare.
Camera pan-zoom: reuse each scene's existing focus: {fx, fy} as transformOrigin; animate scene body scale [1, 1, 1.045, 1.045], times [0, .25, .6, 1] over scene.ms — hold wide, push toward the active region, hold. Scale 1 when paused/reduced.
Tighter motion: scene entry y 10→6, duration 0.45→0.4; rail layoutId spring 0.4→0.32.
Keep the "Illustrative walkthrough…" caption (honesty policy, matches hero).
Phase 5 — New homepage sections (Barry)
lib/site.ts: add typed useCases[] (featured BK: Voids & Fraud, "$10,000 annual savings"; then 26s SOS / +2ppt GP / +0.5% brand score each unverified: true; 5th Labor slot), dailyBriefs[] (3 role-targeted morning messages), integrationProviders[] (wordmark strings, TODO(barry)).

New components/site/Results.tsx (server): id="results", mist band, SectionHeading "Results / What operators get back", sub mentions no added staffing. Grid lg:grid-cols-[1.15fr_1fr]: featured BK case card (brand-50, category chip, $10,000 in .num display size) + stacked stat cards with "Pending verification" chips (reuse the Sample-chip recipe). Reuse Container, SectionHeading, Reveal, Icon, .card-lift. No client JS.

New components/site/DailyBriefs.tsx (server): "Same data. Same morning. Three different actions." — top source strip ("Overnight run · 1,536 locations reconciled · 3 exceptions" from stats) fanning to three chat-DM-styled cards (initials avatar, "Oscar · 7:02 AM", speech-bubble body mirroring Hero.tsx:406, one headline metric + two action bullets + one tone-colored row reusing the Output recipe; amber/brand/emerald per role: District Leader / GM / Owner). Caption: "Illustrative messages — not a real customer account." Don't import showcase/parts.tsx (keeps section server-static). Watchtower.tsx stays unused.

Integrations strip: lib/assets.ts add integrationLogos() (copy of customerLogos() reading public/integrations/, returns [] gracefully). Under the pipeline in HowItWorks.tsx: "Works with 50+ providers" + logos when present, else muted wordmarks (TrustedBy fallback pattern). Drop-in logos later = zero code changes.

app/page.tsx new order: Hero → TrustedBy → CommandCenter → DailyBriefs → HowItWorks → Metrics → Results → Testimonials → Newsroom → AboutTeaser → Game → Faq. Add { label: "Results", href: "/#results" } to nav[] (root-relative; footer inherits).

Phase 6 — /about page + teaser + logo tagline
New lib/about.ts: story milestones ({year, title, body}: Dunkin' franchisee w/ disconnected reporting → wife builds product → business flourishes → investors → today 1,536 locations / 18 brands) + team[] ({name, role, bio, initials, photo?, sample?}: Abdullah, Adam, Barry — bios sample: true; 2–3 engineer slots fully sample). Header comment in the lib/newsroom.ts:1-17 style.

New app/about/page.tsx (mirror app/newsroom/page.tsx structure + metadata shape):

Hero band w/ PageBackdrop, kicker "About", H1 "Built by restaurant operators, for restaurant operators", full logo lockup w/ tagline
Origin story: narrative + milestone timeline (reuse numbered-step rail recipe from HowItWorks.tsx:29-51)
Stats band: generalize Metrics.tsx with optional items? prop (defaults to homepage metrics); pass 1,536 locations · 18 brands · founded · 24/7
Navy pull-quote band (SectionHeading tone="light")
Team grid (photo-or-initials avatar, "Placeholder bio" chips)
CTA row → demo link; Footer
Add /about to app/sitemap.ts; add { label: "About", href: "/about" } to nav[]. lib/assets.ts: teamPhotos() reading public/team/ (same graceful pattern).

New components/site/AboutTeaser.tsx (server): short brand-50 band — kicker "Our story", one-line hook, three stat chips, btn-ghost "Meet the team" → /about.

components/ui/Logo.tsx: inspect /public/logos/oscar-main-logo.png first; if it contains the tagline "One Platform. Total Insight. Immediate Action." add variant="full"; else compose Logo + tagline text as Footer.tsx:15-18 already does. Use on /about hero. Not in the nav (too tall for 68px bar).

Asset chores for the owner (no code): rename public/customers/Untitled (n).png files to brand names (fixes alt text automatically via prettyName()); decide on the UPS logo (The UPS Store is a legit franchise but reads oddly next to QSR — keep/relabel/drop, owner call); supply team photos, integration logos, franchisee-org logos, real quotes, exact location + integration counts.

Verification (per phase; full pass at end)
npm run build + npm run lint clean. (Note AGENTS.md: Next 16 differs from training data — consult node_modules/next/dist/docs/ before any API not already used in-repo; this plan only reuses in-repo patterns.)
Visual at localhost:3000 — /, /newsroom, /about at 360/768/1024/1440px: hero headline legible over new backdrop; AppFilm cursor lands on rail items; pipeline loop runs; brief cards stack on mobile.
Reduced-motion emulation: backdrop fully static; AppFilm static complete scene; pipeline shows final stat values; no blank/zero states.
JSON-LD: paste / ld+json blocks into validator.schema.org — FAQ includes new questions + 30-day copy.
Placeholder audit: grep sample: true / unverified: true (each must render a visible chip) + TODO(barry) → hand list to Barry.
Anchors /#results, /#how, /#command, /#customers, /#game resolve from /about and /newsroom.
git diff --stat sanity — Phase 4 touches only AppFilm.tsx + globals.css.
Key risks
z-0 stacking contract — any -z-10 backdrop becomes invisible (HeroBackdrop.tsx header).
AppFilm cursor vs. transforms — perspective tilt corrupts rect measurement; use offset math + settle tilt to 0 (Phase 4).
FAQ edits propagate to JSON-LD — intended; validate after every faqs[] change.
Hydration — no randomness in initial render (repo pattern: fixed server value, randomize in useEffect); grain/mesh are constant CSS strings.
Honesty markers — simulation/illustrative disclaimers stay on hero, AppFilm, and DailyBriefs; unverified stats always chip-marked.