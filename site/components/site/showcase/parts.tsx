"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import type { TargetAndTransition, Transition } from "motion/react";
import type { ReactNode } from "react";

/* ================================================================
   Shared building blocks for the product film.

   Every part takes a `play` flag. `play === false` means "render the
   finished state immediately, with no animation" — that is what the
   reduced-motion path and off-screen scenes rely on, so nothing ever
   gets stuck at its `initial` values and renders blank.
   ================================================================ */

/** Motion props that animate on `play` and snap to the end state otherwise. */
export function entry(
  play: boolean,
  from: TargetAndTransition,
  to: TargetAndTransition,
  transition?: Transition
): {
  initial: TargetAndTransition | false;
  animate: TargetAndTransition;
  transition?: Transition;
} {
  return play
    ? { initial: from, animate: to, transition }
    : { initial: false, animate: to };
}

/* ---------------- easing shared with the CSS layer ----------------
   Typed as a mutable 4-tuple, not `as const` — Motion's BezierDefinition
   is mutable, and a readonly tuple won't assign to it. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ---------------------------------------------------------------
   Chart math — normalize a series into an SVG path
   --------------------------------------------------------------- */

type Pt = { x: number; y: number };

/**
 * `domain` pins the vertical scale to an explicit [min, max]. Without it each
 * series is normalised against its own extremes, which is right for a lone
 * sparkline and wrong the moment two lines share a chart — a flat series would
 * stretch to fill the same box as a steep one and the comparison would lie.
 */
function toPoints(
  values: number[],
  w: number,
  h: number,
  pad: number,
  domain?: [number, number]
): Pt[] {
  const min = domain ? domain[0] : Math.min(...values);
  const max = domain ? domain[1] : Math.max(...values);
  const span = max - min || 1;
  const step = values.length > 1 ? w / (values.length - 1) : w;
  return values.map((v, i) => ({
    x: i * step,
    y: pad + (h - pad * 2) * (1 - (v - min) / span),
  }));
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Coordinates of a single sample — for pinning annotations onto a curve. */
export function pointAt(
  values: number[],
  i: number,
  w: number,
  h: number,
  pad = 3,
  domain?: [number, number]
): Pt {
  return toPoints(values, w, h, pad, domain)[i];
}

/** Straight polyline path. */
export function linePath(values: number[], w: number, h: number, pad = 3) {
  return toPoints(values, w, h, pad)
    .map((p, i) => `${i ? "L" : "M"}${r1(p.x)},${r1(p.y)}`)
    .join(" ");
}

/**
 * Cardinal-spline path. Real revenue curves are smooth, and a smoothed
 * line is what separates a chart that looks designed from one that looks
 * like a sawtooth of hand-typed points.
 */
export function smoothPath(
  values: number[],
  w: number,
  h: number,
  pad = 3,
  domain?: [number, number]
) {
  const p = toPoints(values, w, h, pad, domain);
  if (p.length < 3) return linePath(values, w, h, pad);
  let d = `M${r1(p[0].x)},${r1(p[0].y)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${r1(c1x)},${r1(c1y)} ${r1(c2x)},${r1(c2y)} ${r1(p2.x)},${r1(p2.y)}`;
  }
  return d;
}

/** Same curve, closed to the baseline so it can be filled. */
export function areaPath(
  values: number[],
  w: number,
  h: number,
  pad = 3,
  domain?: [number, number]
) {
  return `${smoothPath(values, w, h, pad, domain)} L${r1(w)},${h} L0,${h} Z`;
}

/* ---------------------------------------------------------------
   Count-up
   --------------------------------------------------------------- */

/**
 * Eases a number from 0 to `target`. Returns `target` verbatim when not
 * playing, so a paused or reduced-motion scene shows real figures rather
 * than a wall of zeroes.
 */
export function useCountUp(target: number, duration: number, play: boolean) {
  const [value, setValue] = useState(play ? 0 : target);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!play) {
      setValue(target);
      return;
    }
    let t0: number | null = null;
    const tick = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setValue((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, play]);

  return value;
}

/** $169.2K from 169200 */
export const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${(n / 1000).toFixed(1)}K`;
export const thousands = (n: number) => `${(n / 1000).toFixed(1)}K`;

/* ---------------------------------------------------------------
   Typewriter — used by the chat scene
   --------------------------------------------------------------- */

export function useTypewriter(text: string, speed: number, play: boolean, startAt = 0) {
  const [out, setOut] = useState(play ? "" : text);

  useEffect(() => {
    if (!play) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startAt);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, play, startAt]);

  return out;
}

/* ---------------------------------------------------------------
   Tone system — one place deciding what "good" and "bad" look like
   --------------------------------------------------------------- */

export type Tone = "ok" | "warn" | "crit" | "info" | "flat";

export const toneText: Record<Tone, string> = {
  ok: "text-emerald-600",
  warn: "text-amber-600",
  crit: "text-red-600",
  info: "text-brand-600",
  flat: "text-muted",
};

export const toneStroke: Record<Tone, string> = {
  ok: "#10b981",
  warn: "#f59e0b",
  crit: "#ef4444",
  info: "#35b8ff",
  flat: "#94a3b8",
};

export const tonePill: Record<Tone, string> = {
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  warn: "bg-amber-50 text-amber-700 ring-amber-600/15",
  crit: "bg-red-50 text-red-700 ring-red-600/15",
  info: "bg-brand-50 text-brand-700 ring-brand-600/15",
  flat: "bg-mist text-slate ring-line",
};

/* ---------------------------------------------------------------
   Atoms
   --------------------------------------------------------------- */

/** Small status chip — ON TRACK, CRITICAL, LABOR, SALES … */
export function Pill({
  children,
  tone = "flat",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider ring-1 ring-inset ${tonePill[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** A signed delta, colored by direction. */
export function Delta({
  children,
  tone = "ok",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={`num font-medium ${toneText[tone]} ${className}`}>{children}</span>
  );
}

/** Column label used above every product surface. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}

/** Panel surface inside the app frame. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-line bg-white ${className}`}>{children}</div>
  );
}

/* ---------------------------------------------------------------
   Sparkline
   --------------------------------------------------------------- */

/** Tiny inline trend line that draws itself left to right. */
export function Spark({
  values,
  tone = "ok",
  play,
  delay = 0,
  fill = true,
  className = "",
}: {
  values: number[];
  tone?: Tone;
  play: boolean;
  delay?: number;
  fill?: boolean;
  className?: string;
}) {
  const w = 120;
  const h = 34;
  // SVG ids share one global namespace — useId keeps two sparklines with the
  // same tone from pointing at each other's gradient.
  const id = useId().replace(/:/g, "");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={toneStroke[tone]} stopOpacity="0.28" />
          <stop offset="100%" stopColor={toneStroke[tone]} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && (
        <motion.path
          d={areaPath(values, w, h, 3)}
          fill={`url(#${id})`}
          {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.5, delay: delay + 0.35 })}
        />
      )}
      <motion.path
        d={smoothPath(values, w, h, 3)}
        fill="none"
        stroke={toneStroke[tone]}
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...entry(play, { pathLength: 0 }, { pathLength: 1 }, { duration: 0.9, delay, ease: "easeOut" })}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------
   Score ring
   --------------------------------------------------------------- */

/** Circular score gauge that sweeps from empty to its value. */
export function Ring({
  value,
  tone = "ok",
  size = 34,
  play,
  delay = 0,
}: {
  value: number;
  tone?: Tone;
  size?: number;
  play: boolean;
  delay?: number;
}) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const shown = useCountUp(value, 900, play);

  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={toneStroke[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          {...entry(
            play,
            { strokeDashoffset: c },
            { strokeDashoffset: c * (1 - value / 100) },
            { duration: 1, delay, ease: EASE }
          )}
        />
      </svg>
      <span className="num absolute text-[10px] font-semibold text-navy">
        {Math.round(shown)}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------
   Horizontal bar — store ranking rows
   --------------------------------------------------------------- */

export function Bar({
  pct,
  tone = "ok",
  play,
  delay = 0,
}: {
  pct: number;
  tone?: Tone;
  play: boolean;
  delay?: number;
}) {
  return (
    <span className="block h-1 w-full overflow-hidden rounded-full bg-mist-2">
      <motion.span
        className="block h-full rounded-full"
        style={{
          background: toneStroke[tone],
          width: `${pct}%`,
          transformOrigin: "left",
        }}
        {...entry(play, { scaleX: 0 }, { scaleX: 1 }, { duration: 0.8, delay, ease: EASE })}
      />
    </span>
  );
}
