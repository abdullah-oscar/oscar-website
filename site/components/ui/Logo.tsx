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
  /** "light" = for navy surfaces, where the navy artwork would disappear */
  variant?: "dark" | "light";
}) {
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
