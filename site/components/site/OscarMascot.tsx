"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Oscar — the real mascot artwork.
 *
 * Framing: the source is a 1440-square but Oscar only occupies the middle
 * ~42-72% of it; the rest is margin. We frame to his true bounding box
 * (615 x 1360) so he reads big instead of floating in white space.
 *
 * Motion: the artwork is a raster, so his pupils can't move. Instead the whole
 * bird leans and drifts toward the cursor, pivoting at his feet.
 *
 * ON EYE-TRACKING (three failed attempts, documented so nobody repeats them):
 *   1. Hand-drawn SVG bird           -> looked nothing like the mascot.
 *   2. VTracer auto-vectorization    -> traced the upscale's anti-aliasing;
 *                                       one path, ~400KB. Unusable.
 *   3. Hand-drawn head close-up      -> proportions wrong; read as a lollipop.
 * The blocker is not the file format. Oscar's eyes are ~13px in a 1440 frame
 * (<1%), so at any hero size they're ~5px and a pupil can travel ~1px. The head
 * must be LARGE for the effect to exist, and the only faithful way to get a
 * large head is the original vector art from design (Figma -> export SVG).
 * With that file, rig the real eye paths here and delete this note.
 */

const MAX_SHIFT = 16; // px of drift toward the cursor
const MAX_TILT = 3; // degrees of lean

export function OscarMascot({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width) return;
      // Track relative to his head, near the top of the artwork.
      const hx = r.left + r.width * 0.62;
      const hy = r.top + r.height * 0.08;
      const dx = e.clientX - hx;
      const dy = e.clientY - hy;
      const dist = Math.hypot(dx, dy) || 1;
      const ease = Math.min(1, dist / 500);
      setT({
        x: (dx / dist) * MAX_SHIFT * ease,
        y: (dy / dist) * MAX_SHIFT * ease * 0.45,
        r: (dx / dist) * MAX_TILT * ease,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${t.x}px, ${t.y}px, 0) rotate(${t.r}deg)`,
        transformOrigin: "50% 94%", // pivot at his feet so he leans, not slides
        transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {/* The idle float lives on its own element: a CSS animation's transform
          would otherwise override the inline lean transform above. */}
      <div className="animate-float-slow relative mx-auto aspect-[615/1360] h-[400px] sm:h-[460px] lg:h-[500px]">
        <Image
          src="/logos/oscar-mascot.avif"
          alt="Oscar, the ostrich who watches every location"
          fill
          priority
          sizes="(max-width: 640px) 200px, 240px"
          className="object-cover drop-shadow-[0_22px_38px_rgba(10,31,53,0.16)]"
        />
      </div>
    </div>
  );
}
