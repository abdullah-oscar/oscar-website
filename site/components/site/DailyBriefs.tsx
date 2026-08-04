"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { briefViews, type BriefView } from "@/lib/site";

/**
 * Daily briefs — one overnight run, read at three altitudes.
 *
 * Previously three cards side by side, which made the three roles look
 * like three unrelated messages and hid the actual point. They are now
 * tabs over one surface: you pick who is reading, and the SAME finding
 * re-renders at that person's scope. The owner sees a pattern across the
 * network, the district leader sees the two locations that are hers, the
 * general manager sees three names on his own schedule.
 *
 * The 36-dot grid on the right is what makes the hierarchy legible —
 * switching tabs visibly shrinks how much of the network lights up.
 *
 * Copy and figures live in `briefViews` in lib/site.ts.
 */

/* Mutable 4-tuple, not `as const` — Motion's BezierDefinition is mutable and
   a readonly tuple will not assign to it. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const tones = {
  warn: {
    row: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-signal-warn",
    avatar: "border-amber-200 bg-amber-50 text-amber-700",
  },
  info: {
    row: "border-brand-100 bg-brand-50 text-brand-700",
    dot: "bg-brand-500",
    avatar: "border-brand-100 bg-brand-50 text-brand-700",
  },
  ok: {
    row: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-signal-ok",
    avatar: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
} as const;

export function DailyBriefs() {
  const [active, setActive] = useState(0);
  const view = briefViews[active];

  return (
    <section id="briefs" className="border-b border-line bg-mist py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker="Daily briefs"
          title={
            <>
              One overnight run.{" "}
              <span className="text-brand-600">Three different jobs.</span>
            </>
          }
          sub="Oscar reconciles the night, then writes to each person at their own altitude — the owner gets the pattern, the district leader gets the decision, the manager gets the fix."
        />

        {/* the shared source everything below fans out from */}
        <Reveal delay={2}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-3 pr-4 text-[12.5px] font-medium text-slate shadow-e1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
            Overnight run complete
            <span className="text-line-2">·</span>
            <span className="tnum">36 locations reconciled</span>
            <span className="text-line-2">·</span>
            <span className="tnum">1 finding</span>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[20px] border border-line bg-white shadow-panel">
            {/* ---- who's reading ---- */}
            {/* Vertical padding lives on the label and the buttons, not on the
                row — that makes each button's bottom edge the row's bottom edge,
                so the active underline can sit at bottom-0 instead of being
                nudged onto the border with a magic offset. */}
            <div className="flex flex-wrap items-center gap-x-6 border-b border-line px-5">
              <span className="py-3.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">
                Who&rsquo;s reading
              </span>
              <div className="flex flex-wrap items-center gap-5">
                {briefViews.map((v, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className={`relative py-3.5 text-[13px] font-semibold transition-colors ${
                        on ? "text-brand-600" : "text-slate hover:text-navy"
                      }`}
                    >
                      {v.role}
                      {on && (
                        <motion.span
                          layoutId="briefTab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-brand-500"
                          transition={{ duration: 0.35, ease: EASE }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- the message at that altitude ---- */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="grid gap-6 p-5 md:grid-cols-[1.55fr_1fr] md:p-6"
              >
                <BriefBody v={view} />
                <ScopeGrid v={view} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-[11px] text-muted">
          Illustrative messages — not a real customer account.
        </p>
      </Container>
    </section>
  );
}

function BriefBody({ v }: { v: BriefView }) {
  const tone = tones[v.tone];
  return (
    <div className="flex flex-col">
      {/* recipient */}
      <div className="flex items-center gap-2.5 border-b border-line pb-3.5">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border-2 text-[11px] font-extrabold ${tone.avatar}`}
        >
          {v.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold text-navy">
            {v.name} · {v.role}
          </div>
          <div className="num text-[10.5px] text-muted">from Oscar · {v.time}</div>
        </div>
        <span className="ml-auto grid size-6 shrink-0 place-items-center rounded-md bg-navy text-white">
          <Icon name="spark" width={12} height={12} />
        </span>
      </div>

      {/* the headline number, in this person's unit */}
      <div className="relative mt-4 rounded-2xl border border-line bg-mist/60 px-4 py-3.5">
        <span className="absolute -top-1.5 left-6 size-3 rotate-45 border-l border-t border-line bg-mist/60" />
        <div className="num text-2xl font-extrabold leading-none text-navy">{v.metric}</div>
        <p className="mt-1.5 text-[12.5px] font-medium leading-snug text-slate">
          {v.metricLabel}
        </p>
        <ul className="mt-3.5 flex flex-col gap-2">
          {v.lines.map((line) => (
            <li
              key={line}
              className="flex items-start gap-2 text-[12.5px] leading-snug text-ink"
            >
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Icon name="check" width={9} height={9} />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mt-3.5 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${tone.row}`}
      >
        <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} />
        {v.callout}
      </div>
    </div>
  );
}

/**
 * What this person can actually see. Same 36 locations every time — only
 * the lit subset changes — so switching tabs reads as zooming in rather
 * than as three unrelated pictures.
 */
function ScopeGrid({ v }: { v: BriefView }) {
  const visible = new Set(v.scopeNodes);
  const flagged = new Set(v.flagged);

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-mist/40 p-4">
      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">
        What {v.name} sees
      </span>
      <p className="mt-1 text-[12.5px] font-semibold leading-snug text-navy">{v.scope}</p>

      <div className="mt-4 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 36 }, (_, i) => {
          const isVisible = visible.has(i);
          const isFlagged = flagged.has(i);
          return (
            <motion.span
              key={i}
              className="aspect-square rounded-[3px]"
              animate={{
                backgroundColor: isFlagged
                  ? "#f59e0b"
                  : isVisible
                    ? "#8ad6fa"
                    : "#e4ebf3",
                opacity: isVisible ? 1 : 0.55,
              }}
              transition={{ duration: 0.4, delay: i * 0.006, ease: EASE }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-1.5 border-t border-line pt-3 text-[11px] text-slate">
        <span className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-[2px] bg-brand-300" />
          <span className="num">{v.scopeNodes.length}</span> in view
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-[2px] bg-amber-500" />
          <span className="num">{v.flagged.length}</span> needing them today
        </span>
        <span className="flex items-center gap-2 text-muted">
          <span className="size-2 shrink-0 rounded-[2px] bg-line" />
          Outside their remit
        </span>
      </div>
    </div>
  );
}
