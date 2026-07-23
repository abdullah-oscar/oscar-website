import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Centered max-width container. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Uppercase eyebrow. */
export function Kicker({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "light";
  className?: string;
}) {
  return (
    <span
      className={`kicker ${
        tone === "light" ? "text-brand-400" : "text-brand-600"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Section header block (kicker + heading + optional sub). */
export function SectionHeading({
  kicker,
  title,
  sub,
  tone = "dark",
  align = "left",
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  /** "dark" = navy text (light bg); "light" = white text (navy bg) */
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls =
    align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3.5 ${alignCls} ${className}`}>
      {kicker && (
        <Reveal>
          <Kicker tone={tone === "light" ? "light" : "brand"}>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2
          className={`text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem] ${
            tone === "light" ? "!text-white" : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={2}>
          <p
            className={`text-pretty leading-relaxed ${
              tone === "light" ? "text-white/65" : "text-slate"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
