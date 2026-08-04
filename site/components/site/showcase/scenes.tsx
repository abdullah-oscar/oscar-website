"use client";

import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import {
  Bar,
  Delta,
  EASE,
  Eyebrow,
  Panel,
  Pill,
  areaPath,
  entry,
  money,
  pointAt,
  smoothPath,
  toneStroke,
  useCountUp,
  useTypewriter,
  type Tone,
} from "./parts";

/* ================================================================
   The five scenes of the product film.

   These are DUMMY VIEWS. They deliberately do not reproduce the real
   application: the layouts are invented, the metric vocabulary is
   plain English rather than the product's internal shorthand, and the
   devices the real app uses to rank and score locations are replaced
   with different ones. What survives is the argument — here is the
   morning, here is the pattern, here is the one location, here is the
   paper trail, now just ask.

   Rules for anyone editing this file:
   · Never paste real store numbers, brand groupings, or staff names.
     Locations are "Location #NN" — an obviously anonymised index that
     leaks no real numbering scheme, and the same convention the hero,
     the pipeline and the daily briefs use. One universe, one vocabulary.
     The film owns #04, #12, #16, #25, #29 and #33. Everything else is
     spoken for by the hero (#07, #09, #14, #22), the pipeline and Game
     (#03, #05, #08, #11, #19, #26, #31) — check before adding one, so
     no location ends up with two contradictory stories.
   · Never copy a real screen's column set, tab set, or scoring rubric.
   · Every figure here is invented and the frame carries a disclaimer.
   ================================================================ */

type SceneProps = { play: boolean };

/** Drives multi-beat scenes: returns how many marks have elapsed. */
function useStage(play: boolean, marks: readonly number[]) {
  const [stage, setStage] = useState(play ? 0 : marks.length);

  useEffect(() => {
    if (!play) {
      setStage(marks.length);
      return;
    }
    setStage(0);
    const ids = marks.map((ms, i) => setTimeout(() => setStage(i + 1), ms));
    return () => ids.forEach(clearTimeout);
    // marks is a module-level constant per scene, so identity is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return stage;
}

/* ================================================================
   SCENE 1 — Today
   The morning read. One headline figure with the day drawn underneath
   it, three supporting numbers, and the short list of things a human
   is actually needed for.
   ================================================================ */

const TODAY_MARKS = [1500] as const;

/** 10am → 10pm, one bar an hour. */
const dayparts = [22, 31, 44, 58, 52, 41, 38, 47, 61, 72, 64, 43, 28];
const dipHours = new Set([4, 5, 6]); // the early-afternoon fall-off Oscar picks up

const support: { label: string; value: string; delta: string; tone: Tone }[] = [
  { label: "Guests", value: "7,412", delta: "+3.1%", tone: "ok" },
  { label: "Average spend", value: "$17.32", delta: "+$0.41", tone: "ok" },
  { label: "Order time", value: "2m 04s", delta: "+9s", tone: "crit" },
];

const needsYou: { tone: Tone; text: ReactNode }[] = [
  {
    tone: "crit",
    text: (
      <>
        {/* Explicit {" "} after the bold run — the space that should follow
            </b> was rendering collapsed against "last". */}
        <b className="font-semibold text-navy">Location #12</b> came in{" "}
        <b className="num font-semibold text-navy">10.4% under</b>{" "}
        last Tuesday — the fourth day running. Guests are down; spend per guest
        hasn&apos;t moved, so this is traffic rather than menu.
      </>
    ),
  },
  {
    tone: "warn",
    text: (
      <>
        Order time crossed <b className="num font-semibold text-navy">two minutes</b> at
        three locations, all of them between noon and one.
      </>
    ),
  },
];

export function SceneMetrics({ play }: SceneProps) {
  const stage = useStage(play, TODAY_MARKS);
  const sales = useCountUp(128400, 1300, play);

  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* The top row takes the slack, not the list below it: two short
          sentences centred in a tall panel left a band of dead air. */}
      <div className="grid min-h-0 flex-1 gap-2 lg:grid-cols-[1.4fr_1fr]">
        {/* ---- headline + the day underneath it ---- */}
        <motion.div
          {...entry(play, { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.5, ease: EASE })}
        >
          <Panel className="flex h-full flex-col p-3">
            <Eyebrow>Sales today</Eyebrow>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="num text-[30px] font-semibold leading-none tracking-[-0.03em] text-navy">
                {money(sales)}
              </span>
              <Delta tone="ok" className="text-[11px]">
                +5.2% vs last Tue
              </Delta>
            </div>

            {/* hour-by-hour, with the soft patch called out in place */}
            <div className="mt-3.5 flex min-h-[62px] flex-1 items-end gap-[3px]">
              {dayparts.map((v, i) => {
                const dip = dipHours.has(i);
                return (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{
                      background: dip ? "var(--color-signal-warn)" : "var(--color-brand-300)",
                      opacity: dip ? 0.85 : 0.55,
                    }}
                    {...entry(
                      play,
                      // "0%" rather than 0 — same unit at both ends, so Motion
                      // never has to interpolate across unit types.
                      { height: "0%" },
                      { height: `${v}%` },
                      { duration: 0.55, delay: 0.25 + i * 0.03, ease: EASE }
                    )}
                  />
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between text-[8.5px] text-muted">
              <span>10a</span>
              <span className="text-amber-600">soft 2p–4p</span>
              <span>10p</span>
            </div>
          </Panel>
        </motion.div>

        {/* ---- supporting numbers, as rows rather than tiles ---- */}
        <motion.div
          {...entry(
            play,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: 0.1, ease: EASE }
          )}
        >
          <Panel className="flex h-full flex-col divide-y divide-line p-0">
            {support.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-1 items-center justify-between gap-2 px-3"
                {...entry(
                  play,
                  { opacity: 0, x: 10 },
                  { opacity: 1, x: 0 },
                  { duration: 0.4, delay: 0.25 + i * 0.1, ease: EASE }
                )}
              >
                <span className="text-[10px] text-slate">{s.label}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="num text-[14px] font-semibold tracking-[-0.02em] text-navy">
                    {s.value}
                  </span>
                  <Delta tone={s.tone} className="text-[9.5px]">
                    {s.delta}
                  </Delta>
                </span>
              </motion.div>
            ))}
          </Panel>
        </motion.div>
      </div>

      {/* ---- the short list ---- */}
      <motion.div
        className="shrink-0"
        {...entry(
          play,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0 },
          { duration: 0.5, delay: 0.2, ease: EASE }
        )}
      >
        <Panel className="flex flex-col p-3">
          <div className="flex items-center justify-between gap-2">
            <Eyebrow>Needs a human</Eyebrow>
            <span className="num text-[9px] text-muted">2 of 36 locations</span>
          </div>

          <div className="mt-2 flex flex-col gap-2.5">
            {needsYou.map((n, i) => (
              <motion.div
                key={i}
                className="flex gap-2.5"
                // Not entry(play && stage >= 1, …): entry() snaps to its END
                // state when the flag is false, so gating it on the stage would
                // reveal the list instantly instead of holding it back.
                initial={play ? { opacity: 0, y: 8 } : false}
                animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.45, delay: i * 0.14, ease: EASE }}
              >
                <span
                  aria-hidden
                  className="mt-[3px] block w-[2.5px] shrink-0 rounded-full"
                  style={{ background: toneStroke[n.tone] }}
                />
                <p className="text-[10.5px] leading-[1.5] text-slate">{n.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-2 border-t border-line pt-2 text-[9.5px] text-muted">
            The other 34 sat inside their normal range overnight.
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}

/* ================================================================
   SCENE 2 — Trends
   Zoom out. Deliberately NOT a naked chart: a chart alone says "we
   can plot your sales", which every reporting tool on earth can do.
   The claim here is that Oscar reads the curve — so the graph shares
   the frame with the three figures that summarise it and the
   right-hand column where it gets talked about, and the week the
   story turns is marked on the plot itself.
   ================================================================ */

const TREND_MARKS = [1400, 2200] as const;

const thisYear = [118, 124, 116, 131, 127, 122, 138, 129, 142, 151, 143, 158];
const lastYear = [112, 119, 115, 122, 124, 118, 126, 124, 130, 134, 136, 139];

/* Both lines are drawn against one scale, so the gap between them is
   the real gap and not an artefact of independent normalisation. Kept
   tight around the data (112–158) — a loose domain parks the curve in
   the bottom third and leaves the panel looking half-empty. */
const DOMAIN: [number, number] = [108, 162];

/** The week everything turns — marked on the plot, not just described. */
const TURN = 8;

const summary: { label: string; value: string; note: string; tone: Tone }[] = [
  /* Labels stay short enough to sit on one line in a third-width panel —
     an uppercase eyebrow that wraps or truncates undoes the tidiness. */
  { label: "12-week sales", value: "$1.58M", note: "+13.7% vs LY", tone: "ok" },
  { label: "Weeks ahead", value: "8 of 12", note: "was 3 of 12", tone: "ok" },
  { label: "Closing since wk 9", value: "9 wks", note: "still widening", tone: "info" },
];

const notes: { at: number; when: string; text: ReactNode }[] = [
  {
    at: 5,
    when: "Weeks 1–6",
    text: (
      <>
        Flat while last year climbed. The gap opens here — not at the quarter end, where
        anyone would have gone looking for it.
      </>
    ),
  },
  {
    at: TURN,
    when: "Week 9",
    text: (
      <>
        Recovery starts the week after the schedule change at{" "}
        <b className="font-semibold text-navy">four locations</b>.
      </>
    ),
  },
  {
    at: 11,
    when: "Week 12",
    text: (
      <>
        Now <b className="num font-semibold text-navy">+13.7%</b> ahead, and it is guests
        rather than price.
      </>
    ),
  },
];

export function SceneTrends({ play }: SceneProps) {
  const stage = useStage(play, TREND_MARKS);
  // SVG ids are global — scope the gradient so a second instance of this
  // scene on the page can never steal the first one's fill.
  const fillId = useId().replace(/:/g, "");
  const w = 320;
  const h = 132;
  /* The first and last samples sit at x=0 and x=w, so a pin centred on either
     one hangs half outside the panel. Draw into a viewBox that is XPAD wider
     on each side and translate the curve inward; pins then map through the
     same offset and stay clear of the edges. */
  const XPAD = 12;
  const vbW = w + XPAD * 2;
  const pctX = (i: number) => ((XPAD + pointAt(thisYear, i, w, h, 8, DOMAIN).x) / vbW) * 100;

  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* ---- what the twelve weeks add up to ---- */}
      <div className="grid shrink-0 grid-cols-3 gap-2">
        {summary.map((s, i) => (
          <motion.div
            key={s.label}
            {...entry(
              play,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.45, delay: i * 0.08, ease: EASE }
            )}
          >
            <Panel className="h-full p-2.5">
              <Eyebrow className="line-clamp-1">{s.label}</Eyebrow>
              <div className="num mt-1 text-[17px] font-semibold leading-none tracking-[-0.02em] text-navy">
                {s.value}
              </div>
              <Delta tone={s.tone} className="mt-1 block text-[9.5px]">
                {s.note}
              </Delta>
            </Panel>
          </motion.div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 gap-2 lg:grid-cols-[1.5fr_1fr]">
        {/* ---- the curve ---- */}
        <motion.div
          className="min-h-0"
          {...entry(
            play,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: 0.1, ease: EASE }
          )}
        >
          <Panel className="flex h-full flex-col p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[11.5px] font-semibold tracking-[-0.01em] text-navy">
                Against the same weeks last year
              </div>
              <div className="flex items-center gap-2.5 text-[9px] text-slate">
                <span className="flex items-center gap-1.5">
                  <span className="h-[2px] w-3.5 rounded-full bg-brand-500" /> This year
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 border-t-2 border-dashed border-line-2" /> Last year
                </span>
              </div>
            </div>

            <div className="relative mt-2.5 min-h-0 flex-1">
              <svg
                viewBox={`0 0 ${vbW} ${h}`}
                preserveAspectRatio="none"
                className="size-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#35b8ff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#35b8ff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g transform={`translate(${XPAD},0)`}>
                  {/* the week the story turns, marked in place */}
                  <motion.line
                    x1={pointAt(thisYear, TURN, w, h, 8, DOMAIN).x}
                    y1="0"
                    x2={pointAt(thisYear, TURN, w, h, 8, DOMAIN).x}
                    y2={h}
                    stroke="var(--color-brand-300)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    vectorEffect="non-scaling-stroke"
                    {...entry(
                      play,
                      { opacity: 0 },
                      { opacity: 1 },
                      { duration: 0.4, delay: 0.9 }
                    )}
                  />

                  {/* Fades in rather than drawing itself: Motion implements
                      pathLength with strokeDasharray, which would overwrite the
                      dashes and render last year as a solid line. */}
                  <motion.path
                    d={smoothPath(lastYear, w, h, 8, DOMAIN)}
                    fill="none"
                    stroke="var(--color-line-2)"
                    strokeWidth="1.6"
                    strokeDasharray="4 3"
                    vectorEffect="non-scaling-stroke"
                    {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.7, ease: "easeOut" })}
                  />
                  <motion.path
                    d={areaPath(thisYear, w, h, 8, DOMAIN)}
                    fill={`url(#${fillId})`}
                    {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.6, delay: 0.6 })}
                  />
                  <motion.path
                    d={smoothPath(thisYear, w, h, 8, DOMAIN)}
                    fill="none"
                    stroke="#35b8ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    {...entry(
                      play,
                      { pathLength: 0 },
                      { pathLength: 1 },
                      { duration: 1.2, delay: 0.15, ease: "easeOut" }
                    )}
                  />
                </g>
              </svg>

              {/* label for the marked week, in the flow of the plot */}
              <motion.span
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap rounded bg-brand-50 px-1.5 py-px text-[8px] font-semibold uppercase tracking-[0.1em] text-brand-700"
                style={{ left: `${pctX(TURN)}%` }}
                initial={play ? { opacity: 0 } : false}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                Schedule change
              </motion.span>

              {notes.map((n, i) => {
                const pt = pointAt(thisYear, n.at, w, h, 8, DOMAIN);
                return (
                  <motion.span
                    key={n.at}
                    className="absolute grid size-[15px] place-items-center rounded-full border-2 border-white bg-navy text-[8px] font-semibold text-white shadow-e1"
                    // Centring lives in Motion's own transform, not Tailwind's:
                    // this pin animates `scale`, and Motion owns `transform` for
                    // any element it animates a transform value on — a
                    // -translate-x-1/2 class would simply be overwritten.
                    style={{
                      left: `${pctX(n.at)}%`,
                      top: `${(pt.y / h) * 100}%`,
                      x: "-50%",
                      y: "-50%",
                    }}
                    initial={play ? { opacity: 0, scale: 0.4 } : false}
                    animate={
                      stage >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
                    }
                    transition={{ duration: 0.4, delay: i * 0.14, ease: EASE }}
                  >
                    {i + 1}
                  </motion.span>
                );
              })}
            </div>

            <div className="mt-1.5 flex justify-between text-[8.5px] text-muted">
              <span>12 weeks ago</span>
              <span>This week</span>
            </div>
          </Panel>
        </motion.div>

        {/* ---- and what Oscar made of it ---- */}
        <motion.div
          className="min-h-0"
          {...entry(
            play,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0 },
            { duration: 0.5, delay: 0.2, ease: EASE }
          )}
        >
          <Panel className="flex h-full flex-col p-3">
            <Eyebrow>What Oscar made of it</Eyebrow>

            <div className="relative mt-3 flex min-h-0 flex-1 flex-col justify-between">
              {/* spine the numbered beats hang off */}
              <span
                aria-hidden
                className="absolute bottom-2 left-[7px] top-2 w-px bg-line"
              />

              {notes.map((n, i) => (
                <motion.div
                  key={n.at}
                  className="relative flex gap-2.5"
                  initial={play ? { opacity: 0, x: 8 } : false}
                  animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                  transition={{ duration: 0.45, delay: i * 0.12, ease: EASE }}
                >
                  <span className="relative z-10 grid size-[15px] shrink-0 place-items-center rounded-full border-2 border-white bg-navy text-[8px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="num text-[8.5px] font-semibold uppercase tracking-[0.1em] text-brand-600">
                      {n.when}
                    </div>
                    <p className="mt-0.5 text-[9.5px] leading-snug text-slate">{n.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   SCENE 3 — Locations
   The outlier. Every location placed against its OWN normal band
   rather than against each other — which is the actual claim the
   marketing copy makes, and it needs no 0-100 rubric to show.
   ================================================================ */

const LOC_MARKS = [1600] as const;

/** Where "normal" sits on the track, as percentages. */
const BAND = { from: 36, to: 74 };

/** How the whole network splits. Counts sum to 36. */
const spread: { label: string; count: number; tone: Tone }[] = [
  { label: "need you", count: 2, tone: "crit" },
  { label: "drifting", count: 4, tone: "warn" },
  { label: "steady", count: 25, tone: "ok" },
  { label: "ahead", count: 5, tone: "info" },
];

const places: {
  name: string;
  at: number;
  delta: string;
  status: string;
  tone: Tone;
  open?: boolean;
}[] = [
  { name: "Location #12", at: 11, delta: "−10.4%", status: "Off pace", tone: "crit", open: true },
  { name: "Location #16", at: 28, delta: "−6.8%", status: "Watch", tone: "warn" },
  { name: "Location #04", at: 47, delta: "+1.2%", status: "Steady", tone: "ok" },
  { name: "Location #25", at: 58, delta: "+2.9%", status: "Steady", tone: "ok" },
  { name: "Location #29", at: 69, delta: "+4.1%", status: "Steady", tone: "ok" },
  { name: "Location #33", at: 89, delta: "+9.4%", status: "Ahead", tone: "info" },
];

export function SceneScorecards({ play }: SceneProps) {
  const stage = useStage(play, LOC_MARKS);

  return (
    <div className="flex h-full flex-col gap-2.5">
      <motion.div
        className="flex flex-wrap items-baseline justify-between gap-2"
        {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.4 })}
      >
        <div>
          <Eyebrow>36 locations</Eyebrow>
          <div className="mt-0.5 text-[12px] font-semibold tracking-[-0.01em] text-navy">
            Placed against what each one normally does
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] text-muted">
          <span className="h-2 w-6 rounded-full bg-brand-100" />
          its usual range
        </span>
      </motion.div>

      {/* The whole network in one bar, so the six rows below read as the
          exceptions they are rather than as the entire list. */}
      <motion.div
        className="shrink-0"
        {...entry(
          play,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0 },
          { duration: 0.45, delay: 0.1, ease: EASE }
        )}
      >
        <Panel className="p-2.5">
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-mist-2">
            {spread.map((s, i) => (
              <motion.span
                key={s.label}
                className="h-full"
                style={{ background: toneStroke[s.tone] }}
                {...entry(
                  play,
                  { width: "0%" },
                  { width: `${(s.count / 36) * 100}%` },
                  { duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }
                )}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {spread.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-[9.5px] text-slate">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: toneStroke[s.tone] }}
                />
                <b className="num font-semibold text-navy">{s.count}</b> {s.label}
              </span>
            ))}
          </div>
        </Panel>
      </motion.div>

      <Panel className="flex min-h-0 flex-1 flex-col divide-y divide-line p-0">
        {places.map((p, i) => {
          const expanded = p.open && stage >= 1;

          return (
            <motion.div
              key={p.name}
              className={`flex flex-col justify-center px-3 ${expanded ? "flex-[1.6]" : "flex-1"}`}
              {...entry(
                play,
                { opacity: 0, x: -12 },
                { opacity: 1, x: 0 },
                { duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }
              )}
            >
              <div className="flex items-center gap-3">
                <span className="num w-[82px] shrink-0 truncate text-[10.5px] font-medium text-ink">
                  {p.name}
                </span>

                {/* the band, and where this location is sitting on it */}
                <span className="relative h-1.5 min-w-0 flex-1 rounded-full bg-mist-2">
                  <span
                    className="absolute inset-y-0 rounded-full bg-brand-100"
                    style={{ left: `${BAND.from}%`, right: `${100 - BAND.to}%` }}
                  />
                  {/* dead centre of normal — gives the marker something to be
                      read against instead of floating in an empty track */}
                  <span
                    aria-hidden
                    className="absolute inset-y-[-2px] w-px bg-brand-300"
                    style={{ left: `${(BAND.from + BAND.to) / 2}%` }}
                  />
                  <motion.span
                    className="absolute top-1/2 size-[9px] rounded-full border-2 border-white"
                    style={{
                      background: toneStroke[p.tone],
                      boxShadow: "var(--shadow-e1)",
                      x: "-50%",
                      y: "-50%",
                    }}
                    {...entry(
                      play,
                      { left: "50%", opacity: 0 },
                      { left: `${p.at}%`, opacity: 1 },
                      { duration: 0.7, delay: 0.3 + i * 0.07, ease: EASE }
                    )}
                  />
                </span>

                <Delta tone={p.tone} className="w-[46px] shrink-0 text-right text-[10px]">
                  {p.delta}
                </Delta>
                <Pill tone={p.tone} className="w-[68px] shrink-0 justify-center">
                  {p.status}
                </Pill>
              </div>

              {/* only the one that needs a human explains itself */}
              {expanded && (
                <motion.p
                  className="ml-[94px] mt-1.5 text-[9.5px] leading-snug text-slate"
                  initial={play ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  Guests down <b className="num font-semibold text-navy">8%</b> since
                  Thursday while spend per guest held. That is a traffic problem, not a
                  menu problem — sent to the district lead.
                </motion.p>
              )}

              {/* Only the drifting one gets this line. Southport sits outside the
                  band too, but it is outside on the good side. */}
              {p.tone === "warn" && (
                <span className="ml-[94px] mt-1 text-[9px] text-muted">
                  Drifting, not yet worth interrupting anyone.
                </span>
              )}
            </motion.div>
          );
        })}
      </Panel>
    </div>
  );
}

/* ================================================================
   SCENE 4 — Reports
   The paper trail. A document, not a spreadsheet: the recap lands,
   then Oscar pulls the finding out of it.

   Deliberately three columns and no staff column. The real recap is
   wider and names people, and neither belongs on a public page.
   ================================================================ */

const REPORT_MARKS = [1800] as const;

type Row = { place: string; sales: string; vs: string; tone: Tone; flag?: boolean };

const rows: Row[] = [
  { place: "Location #04", sales: "$3,526", vs: "+13.7%", tone: "ok" },
  { place: "Location #12", sales: "$2,063", vs: "−10.4%", tone: "crit", flag: true },
  { place: "Location #25", sales: "$2,878", vs: "+4.1%", tone: "ok" },
  { place: "Location #16", sales: "$2,527", vs: "−6.8%", tone: "crit", flag: true },
  { place: "Location #29", sales: "$3,260", vs: "+2.2%", tone: "ok" },
  { place: "Location #33", sales: "$2,569", vs: "+9.4%", tone: "ok" },
];

export function SceneReports({ play }: SceneProps) {
  const stage = useStage(play, REPORT_MARKS);

  return (
    <div className="flex h-full flex-col gap-2.5">
      <motion.div
        className="min-h-0 flex-1"
        {...entry(play, { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, { duration: 0.5, ease: EASE })}
      >
        <Panel className="flex h-full flex-col p-0">
          {/* document header */}
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5">
            <div>
              <div className="text-[12px] font-semibold tracking-[-0.01em] text-navy">
                Morning Recap
              </div>
              <div className="num text-[9px] text-muted">Tuesday · 6:00 AM · 6 of 36 shown</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[9px] font-medium text-slate">
              <Icon name="download" width={10} height={10} />
              Export
            </span>
          </div>

          {/* two figures, then the table */}
          <div className="flex gap-6 border-b border-line px-3 py-2.5">
            <span>
              <Eyebrow>Network sales</Eyebrow>
              <div className="num text-[15px] font-semibold tracking-[-0.02em] text-navy">
                $128.4K
              </div>
            </span>
            <span>
              <Eyebrow>Under their normal</Eyebrow>
              <div className="num text-[15px] font-semibold tracking-[-0.02em] text-navy">
                8 <span className="text-[10px] font-normal text-muted">of 36</span>
              </div>
            </span>
          </div>

          {/* flex column with the rows sharing the slack — six fixed-height rows
              in a panel this tall left the bottom third empty. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-1.5">
            <div className="grid shrink-0 grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-line pb-1.5">
              {["Location", "Sales", "vs last year"].map((c, i) => (
                <Eyebrow key={c} className={i > 0 ? "text-right" : ""}>
                  {c}
                </Eyebrow>
              ))}
            </div>

            {rows.map((r, i) => (
              <motion.div
                key={r.place}
                className="relative grid flex-1 grid-cols-[1.4fr_1fr_1fr] items-center gap-2 rounded-md"
                // Entry and highlight have to share ONE animate object. Spreading
                // entry() and then passing `animate` separately would overwrite the
                // entry's target and strand every row at opacity 0.
                initial={play ? { opacity: 0, y: 8 } : false}
                animate={{
                  opacity: 1,
                  y: 0,
                  // Same hue at both ends, only the alpha moves, so the fade
                  // never passes through a muddy intermediate colour.
                  backgroundColor:
                    r.flag && stage >= 1 ? "rgba(254,242,242,1)" : "rgba(254,242,242,0)",
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.15 + i * 0.06,
                  ease: EASE,
                  backgroundColor: { duration: 0.5, delay: 0, ease: EASE },
                }}
              >
                <span className="num truncate pl-1.5 text-[10px] font-medium text-ink">
                  {r.place}
                </span>
                <span className="num text-right text-[10px] text-slate">{r.sales}</span>
                <span className="pr-1.5 text-right">
                  <Delta tone={r.tone} className="text-[10px]">
                    {r.vs}
                  </Delta>
                </span>
              </motion.div>
            ))}
          </div>
        </Panel>
      </motion.div>

      {/* ---- what Oscar takes out of the document ---- */}
      <motion.div
        className="shrink-0"
        initial={play ? { opacity: 0, y: 10 } : false}
        animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 p-2.5">
          <span className="grid size-4 shrink-0 place-items-center rounded-md bg-navy text-white">
            <Icon name="spark" width={9} height={9} />
          </span>
          <p className="text-[10px] leading-snug text-brand-800">
            Two locations account for the entire shortfall. The other thirty-four netted
            out flat — so this is a two-conversation morning, not a network problem.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   SCENE 5 — Ask
   The payoff. A plain question and a specific answer, with the work
   shown. No conversation history rail — that is application
   furniture and it adds nothing to the argument.
   ================================================================ */

const QUESTION = "Why were we down last week?";
const CHAT_MARKS = [2000, 3000] as const;

const breakdown = [
  { place: "Location #12", value: "−$8.4k", pct: 100, tone: "crit" as Tone },
  { place: "Location #16", value: "−$3.1k", pct: 37, tone: "warn" as Tone },
  { place: "The other 34", value: "+$0.6k", pct: 7, tone: "ok" as Tone },
];

export function SceneChat({ play }: SceneProps) {
  const stage = useStage(play, CHAT_MARKS);
  const typed = useTypewriter(QUESTION, 30, play);

  return (
    <div className="mx-auto flex h-full w-full max-w-[520px] flex-col">
      <Panel className="flex min-h-0 flex-1 flex-col p-3">
        {/* the question */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-mist px-2.5 py-1.5 text-[11px] font-medium leading-snug text-ink">
            {typed}
            {play && stage < 1 && (
              <span className="ml-px inline-block h-[10px] w-[1.5px] translate-y-[1px] animate-caret bg-navy align-middle" />
            )}
          </div>
        </div>

        {/* thinking, then the answer */}
        <div className="mt-3 flex min-h-0 flex-1 gap-2">
          <span className="grid size-5 shrink-0 place-items-center self-start rounded-md bg-navy text-white">
            <Icon name="spark" width={10} height={10} />
          </span>

          <div className="min-w-0 flex-1">
            {stage < 2 ? (
              <div className="flex items-center gap-1 pt-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-line-2"
                    animate={play ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.6 }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={play ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="text-[11px] leading-[1.55] text-slate">
                  Almost all of it came from{" "}
                  <b className="font-semibold text-navy">two locations</b>. #12 lost{" "}
                  <b className="num font-semibold text-navy">$8.4k</b> against its own
                  normal week, and #16 another{" "}
                  <b className="num font-semibold text-navy">$3.1k</b>. The rest of the
                  network was flat to slightly up.
                </p>

                <div className="mt-3 flex flex-col gap-2">
                  {breakdown.map((b, i) => (
                    <div key={b.place}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[9.5px] text-ink">{b.place}</span>
                        <Delta tone={b.tone} className="text-[9.5px]">
                          {b.value}
                        </Delta>
                      </div>
                      <div className="mt-1">
                        <Bar pct={b.pct} tone={b.tone} play={play} delay={0.2 + i * 0.12} />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-[10px] leading-snug text-muted">
                  Both started the same week the afternoon shift changed. Want me to pull
                  the schedules?
                </p>

                {/* Where the answer came from — grounds it as work rather than
                    a guess, without naming a single internal system. */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-line pt-2">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Read
                  </span>
                  {["Sales", "Guest counts", "Schedules"].map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line px-1.5 py-px text-[8.5px] text-slate"
                    >
                      {s}
                    </span>
                  ))}
                  <span className="num text-[8.5px] text-muted">· 12 weeks</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* the input */}
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-mist px-2.5 py-1.5">
          <span className="min-w-0 flex-1 truncate text-[10px] text-muted">
            Ask anything about your locations
          </span>
          <span className="grid size-4 shrink-0 place-items-center rounded bg-navy text-white">
            <Icon name="arrow" width={9} height={9} />
          </span>
        </div>
      </Panel>
    </div>
  );
}
