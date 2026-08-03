/**
 * Backdrop for standalone-page heros (/newsroom, /about) — the hero
 * backdrop's quieter sibling: wash + one drifting mesh layer + grain,
 * no horizon glow. Interior pages get the same visual language at a
 * volume that doesn't compete with the homepage.
 *
 * Same stacking contract as HeroBackdrop: this sits at `z-0` (never
 * `-z-10`) inside a `relative overflow-hidden` section, and the section's
 * content must carry `relative z-10`.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/50 to-white" />
      <div className="absolute inset-x-0 top-0 h-[460px] bg-mesh-a opacity-70 animate-drift" />
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
