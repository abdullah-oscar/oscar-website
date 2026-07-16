import Image from "next/image";

/**
 * The real brand lockup (/logos/oscar-main-logo.png — ostrich-in-the-O).
 *
 * That asset ships with two things baked in that don't suit a 68px nav:
 *   1. The "One Platform. Total Insight. Immediate Action." tagline, which is
 *      illegible at this size.
 *   2. An opaque white background.
 *
 * So we crop to the artwork's real bounds and blend the white away. Measured
 * from the source (1668×934): the lockup occupies x 6.3%→94.1%, y 14.5%→73.9%
 * — everything below is tagline, everything around is padding.
 *
 * ⚠️ A transparent, tagline-free SVG lockup makes this whole component two
 * lines. Worth requesting from design.
 */

// Crop geometry, derived from the measurements above.
const BOX_H = 38; // rendered logo height in the nav
const CONTENT_H = 0.594; // fraction of source height the lockup occupies
const CONTENT_W = 0.878;
const OFFSET_X = 0.063;
const OFFSET_Y = 0.145;

const scaledW = Math.round((BOX_H / CONTENT_H) * (1668 / 934));
const boxW = Math.round(scaledW * CONTENT_W);

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  /** "light" = for navy surfaces, where multiply-blend can't work */
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    // On navy the white-background PNG can't be blended away, so compose the
    // mark from the transparent mascot + type instead.
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <Image
          src="/logos/oscar-mascot.avif"
          alt=""
          width={36}
          height={36}
          aria-hidden
          className="h-9 w-9 object-contain"
        />
        <span className="text-xl font-extrabold tracking-[-0.03em] text-white">
          Oscar
        </span>
      </span>
    );
  }

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ height: BOX_H, width: boxW }}
    >
      <Image
        src="/logos/oscar-main-logo.png"
        alt="Oscar AI"
        width={1668}
        height={934}
        priority
        className="absolute max-w-none mix-blend-multiply"
        style={{
          width: scaledW,
          height: "auto",
          left: -Math.round(scaledW * OFFSET_X),
          top: -Math.round((scaledW * (934 / 1668)) * OFFSET_Y),
        }}
      />
    </span>
  );
}
