/**
 * Oscar wordmark — mirrors the in-house v3 HTML: "Oscar AI" set tight in navy
 * with the brand-blue dot. LogoMark is the compact circular glyph used where a
 * square icon is needed (Watchtower core, favicon).
 */

export function LogoMark({
  className = "",
  size = 30,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="14" stroke="#35b8ff" strokeWidth="4" />
      <circle cx="20" cy="20" r="4.5" fill="#0099d6" />
    </svg>
  );
}

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  /** "dark" = navy text (light bg), "light" = white text (navy bg) */
  variant?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-1 text-xl font-extrabold tracking-[-0.03em] ${
        variant === "light" ? "text-white" : "text-navy"
      } ${className}`}
    >
      Oscar AI
      <span
        aria-hidden
        className="inline-block size-2 translate-y-[-1px] rounded-full bg-brand-500"
      />
    </span>
  );
}
