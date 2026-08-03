/**
 * Hero backdrop — soft light, no circuitry. Four stacked layers:
 *
 *   1. wash    — a plain vertical white → blue-tint → white gradient
 *                that grounds the blooms so they never sit on stark white
 *   2. mesh    — two bloom layers drifting against each other (A on
 *                drift, B on the slower reversed drift) for a gentle
 *                parallax; B carries a faint navy pool top-right for depth
 *   3. horizon — one wide static ellipse of light low in the frame:
 *                the "premium light source" this backdrop is built around
 *   4. grain   — SVG turbulence tiled at 140px, blended overlay, which
 *                keeps the gradients from reading as flat CSS
 *
 * The old grid / node-constellation / scan-band layers are gone on
 * purpose: they read as generic "AI network" decoration. This version
 * sells calm instead.
 *
 * Entirely decorative — aria-hidden, pointer-events-none, and every
 * animation here is CSS so it costs no React work. The global
 * prefers-reduced-motion rule in globals.css stops all of it. All
 * gradients and the grain tile are constant strings: nothing here can
 * differ between server and client render, so hydration is safe.
 *
 * IMPORTANT — this layer is `z-0`, never `-z-10`. `position: relative`
 * with `z-index: auto` does not create a stacking context, so a negative
 * z-index child escapes to the root stacking context and gets painted
 * *underneath* the section's own background colour: completely invisible.
 * The section's content must therefore carry `relative z-10` to sit above
 * this. Same pattern anywhere else on the site that stacks a backdrop.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 1 — wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/60 to-white" />

      {/* 2 — mesh blooms, drifting against each other */}
      <div className="absolute inset-x-0 top-0 h-[780px] bg-mesh-a animate-drift" />
      <div className="absolute inset-x-0 top-0 h-[780px] bg-mesh-b animate-drift-slow" />

      {/* 3 — horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-horizon" />

      {/* 4 — grain */}
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
