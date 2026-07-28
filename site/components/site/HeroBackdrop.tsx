/**
 * Hero backdrop — four stacked layers, none of them loud:
 *
 *   1. aurora    — cyan blooms pooling in the corners, slowly drifting
 *   2. grid      — fine graph paper, masked out toward the bottom
 *   3. mesh      — a node constellation: the "AI" layer, doing the work
 *                  of suggesting a network being watched
 *   4. scan      — a band of light crossing every 9s
 *
 * Node coordinates are hand-placed constants, never random: a random
 * layout would differ between the server and client render and blow up
 * hydration, and hand-placing lets the mesh stay clear of the headline.
 *
 * Entirely decorative — aria-hidden, pointer-events-none, and every
 * animation here is CSS so it costs no React work. The global
 * prefers-reduced-motion rule in globals.css stops all of it.
 *
 * IMPORTANT — this layer is `z-0`, never `-z-10`. `position: relative`
 * with `z-index: auto` does not create a stacking context, so a negative
 * z-index child escapes to the root stacking context and gets painted
 * *underneath* the section's own background colour: completely invisible.
 * The section's content must therefore carry `relative z-10` to sit above
 * this. Same pattern anywhere else on the site that stacks a backdrop.
 */

type Node = { x: number; y: number; r?: number };

/* viewBox is 1200×640. Nodes cluster right-of-centre, behind the product
   panel, and thin out over the copy on the left. */
const nodes: Node[] = [
  { x: 90, y: 120 }, { x: 205, y: 60, r: 2.6 }, { x: 160, y: 250 },
  { x: 300, y: 175, r: 3 }, { x: 265, y: 400 }, { x: 400, y: 95 },
  { x: 430, y: 320, r: 2.6 }, { x: 545, y: 200 }, { x: 505, y: 465 },
  { x: 640, y: 110, r: 3 }, { x: 675, y: 355 }, { x: 760, y: 235, r: 2.6 },
  { x: 720, y: 520 }, { x: 855, y: 145 }, { x: 895, y: 400, r: 3 },
  { x: 980, y: 275 }, { x: 1035, y: 90, r: 2.6 }, { x: 1080, y: 470 },
  { x: 1145, y: 230 }, { x: 960, y: 570 },
];

/* Index pairs, chosen so the mesh reads as a connected network rather
   than a triangulated blob. */
const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6],
  [5, 7], [6, 7], [6, 8], [7, 9], [7, 10], [8, 10], [9, 11], [10, 11],
  [10, 12], [11, 13], [11, 14], [12, 14], [13, 15], [14, 15], [14, 17],
  [15, 16], [15, 18], [16, 18], [17, 19], [12, 19], [17, 18],
];

export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 1 — aurora */}
      <div className="absolute inset-x-0 top-0 h-[760px] bg-aurora opacity-90 animate-drift" />

      {/* 2 — graph paper */}
      <div className="absolute inset-0 bg-grid-fine mask-fade-b opacity-40" />

      {/* 3 — the mesh */}
      <svg
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-0 h-[680px] w-full mask-fade-b"
      >
        <g stroke="var(--color-brand-500)" strokeWidth="1" opacity="0.16">
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
        <g fill="var(--color-brand-600)">
          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r ?? 2}
              className="animate-twinkle"
              // Staggered so the mesh shimmers rather than strobes.
              style={{ animationDelay: `${((i % 7) * 0.55).toFixed(2)}s` }}
            />
          ))}
        </g>
      </svg>

      {/* 4 — the pass */}
      <div className="absolute inset-y-0 left-0 w-[38%] animate-scan bg-gradient-to-r from-transparent via-brand-200/30 to-transparent" />
    </div>
  );
}
