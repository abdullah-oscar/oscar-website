"use client";

/**
 * The "Oscar pipeline" card — sources feeding a reasoning engine feeding
 * outputs. Split out of HowItWorks (which stays a server component) so
 * the engine can run: stats count up on first view and the card carries
 * a set of continuous "processor" loops.
 *
 * Animation is deliberately two-tier:
 *   - Continuous loops (chip feed pulses, connector flow, the engine's
 *     radar sweep, output-row flashes) are CSS keyframes — zero React
 *     work per frame, and the global reduced-motion rule in globals.css
 *     stops every one of them at its resting state.
 *   - One-shot work (stat count-ups, output-row entrances) is Motion,
 *     gated on first scroll into view. `useCountUp` returns the target
 *     verbatim when not playing, so a reduced-motion or pre-view render
 *     shows real figures, never zeroes.
 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { EASE, useCountUp } from "@/components/site/showcase/parts";

const sources = ["POS", "Payroll", "PDFs", "APIs", "SFTP", "Sheets"];

export function PipelineVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion() ?? false;
  const play = inView && !reduced;

  const revenue = useCountUp(48.2, 1100, play);
  const labor = useCountUp(28.3, 1100, play);
  const flags = useCountUp(3, 1100, play);

  const stats = [
    { k: "Revenue", v: `$${revenue.toFixed(1)}K`, c: "text-emerald-600" },
    { k: "Labor", v: `${labor.toFixed(1)}%`, c: "text-brand-600" },
    { k: "Flags", v: `${Math.round(flags)}`, c: "text-signal-crit" },
  ];

  return (
    <div ref={ref} className="rounded-[20px] border border-line bg-white p-6 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
          Oscar pipeline
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
          Connected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sources.map((s, i) => (
          <span
            key={s}
            className="rounded-md border border-line bg-mist px-2.5 py-1.5 text-[11px] font-semibold text-slate animate-feed"
            // Staggered so one chip "fires" at a time, round-robin.
            style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      <Connector />

      <div className="relative overflow-hidden rounded-xl border border-brand-100 bg-brand-50 p-4">
        {/* Radar beam, under the content. Centered by the translate
            utilities; the sweep keyframe rotates the standalone `rotate`
            property, so the two compose instead of fighting. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 z-0 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 animate-sweep"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0 76%, color-mix(in oklab, var(--color-brand-400) 16%, transparent) 92%, transparent 100%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-500 text-white animate-engine-pulse">
              <Icon name="radar" width={18} height={18} />
            </span>
            <div>
              <div className="text-[13px] font-extrabold text-navy">
                Oscar reasoning engine
              </div>
              <div className="text-[10.5px] font-medium text-slate">
                normalizing · detecting · routing
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {stats.map((m) => (
              <div
                key={m.k}
                className="rounded-lg border border-line bg-white px-2.5 py-2 text-center"
              >
                <div className={`tnum text-base font-extrabold ${m.c}`}>{m.v}</div>
                <div className="text-[9px] font-bold uppercase tracking-wide text-muted">
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Connector delay="0.6s" />

      <div className="flex flex-col gap-2">
        {(
          [
            { tone: "warn", text: "Alert → District Leader: void anomaly, Loc #14" },
            { tone: "info", text: "Report → Weekly labor summary, all regions" },
            { tone: "ok", text: "Action plan → Prep fix routed to Loc #22 GM" },
          ] as const
        ).map((o, i) => (
          <Output key={o.tone} tone={o.tone} text={o.text} i={i} inView={inView} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}

/** Vertical connector with a continuous dash flow and a traveling dot. */
function Connector({ delay = "0s" }: { delay?: string }) {
  return (
    <div aria-hidden className="my-3.5 flex justify-center">
      <svg width="14" height="30" viewBox="0 0 14 30" className="overflow-visible text-brand-400">
        <line x1="7" y1="2" x2="7" y2="22" stroke="var(--color-line-2)" strokeWidth="1" />
        <line
          x1="7"
          y1="2"
          x2="7"
          y2="22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          className="animate-flow"
          style={{ animationDelay: delay }}
        />
        <circle
          cx="7"
          cy="3"
          r="2.2"
          fill="currentColor"
          className="animate-flow-dot"
          style={{ animationDelay: delay }}
        />
        <path
          d="M3 22 L7 27 L11 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Output({
  tone,
  text,
  i,
  inView,
  reduced,
}: {
  tone: "warn" | "info" | "ok";
  text: string;
  i: number;
  inView: boolean;
  reduced: boolean;
}) {
  const styles = {
    warn: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-brand-100 bg-brand-50 text-brand-700",
    ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[tone];
  const dot = {
    warn: "bg-signal-warn",
    info: "bg-brand-500",
    ok: "bg-signal-ok",
  }[tone];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ delay: 0.25 + i * 0.15, duration: 0.5, ease: EASE }}
      className={`relative flex items-center gap-2.5 overflow-hidden rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${styles}`}
    >
      <span
        className={`size-1.5 shrink-0 rounded-full ${dot} animate-blink`}
        style={{ animationDelay: `${(i * 0.7).toFixed(2)}s` }}
      />
      {text}
      {/* One row at a time catches a pass of light — items "arriving". */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-row-flash bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ animationDelay: `${(i * 2.3).toFixed(2)}s` }}
      />
    </motion.div>
  );
}
