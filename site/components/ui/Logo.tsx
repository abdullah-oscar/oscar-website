import Image from "next/image";

/**
 * The brand lockup (ostrich-in-the-O).
 *
 * Renders /logos/oscar-logo.png — a transparent, tagline-free crop generated
 * from the source artwork by scripts/make-logo-transparent.mjs. Regenerate it
 * (and update the dimensions below) if the source lockup ever changes.
 *
 * This used to crop the tagline off at render time and hide the source's
 * opaque white background with `mix-blend-multiply`. That only worked while
 * the page behind the nav was flat white: the nav is `position: fixed`, which
 * always creates a stacking context, so the blend could never reach the page
 * background. Against the hero's gradient it rendered as a white box.
 */

// Output dimensions of scripts/make-logo-transparent.mjs.
const LOGO_W = 1464;
const LOGO_H = 560;

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  /** "light" = for navy surfaces, where the navy artwork would disappear;
   *  "full" = lockup + tagline, for hero/brand moments (not the 68px nav).
   *  Composed from the transparent crop + type rather than rendering
   *  oscar-main-logo.png, whose opaque background would show as a white
   *  box against any non-white surface. */
  variant?: "dark" | "light" | "full";
}) {
  if (variant === "full") {
    return (
      <span className={`inline-flex flex-col gap-2.5 ${className}`}>
        <Image
          src="/logos/oscar-logo.png"
          alt="Oscar AI"
          width={LOGO_W}
          height={LOGO_H}
          priority
          className="h-[56px] w-auto"
        />
        <span className="text-[13px] font-semibold tracking-[-0.01em] text-brand-700">
          One Platform. Total Insight. Immediate Action.
        </span>
      </span>
    );
  }

  if (variant === "light") {
    // The lockup's type is navy and would vanish on a navy band, so compose
    // the mark from the transparent mascot plus type instead.
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
        <span className="text-xl font-semibold tracking-[-0.03em] text-white">
          Oscar
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/logos/oscar-logo.png"
      alt="Oscar AI"
      width={LOGO_W}
      height={LOGO_H}
      priority
      className={`h-[38px] w-auto ${className}`}
    />
  );
}
