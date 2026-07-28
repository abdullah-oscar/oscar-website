"use client";

import { useEffect, useState } from "react";
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
  Ring,
  Spark,
  areaPath,
  entry,
  money,
  smoothPath,
  thousands,
  toneStroke,
  toneText,
  useCountUp,
  useTypewriter,
  type Tone,
} from "./parts";

/* ================================================================
   The four scenes of the product film.

   Every figure here is invented. These are deliberately NOT pixel
   copies of the real app — same information architecture and the same
   kind of answer, redrawn at web scale so the type stays legible when
   the frame is 900px wide instead of 1900px.
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
   SCENE 1 — Daily Metrics
   The morning read: four headline numbers and the three things
   that actually need a human today.
   ================================================================ */

type Row = { k: string; v: string; d: string; tone: Tone };
type Tile = {
  label: string;
  daily: string;
  delta: string;
  tone: Tone;
  accent?: boolean;
  rows: Row[];
};

const tiles: Tile[] = [
  {
    label: "Net sales",
    daily: "$164.8K",
    delta: "+6.4%",
    tone: "ok",
    accent: true,
    rows: [
      { k: "WTD", v: "$1.2M", d: "+4.1%", tone: "ok" },
      { k: "QTD", v: "$4.4M", d: "+4.8%", tone: "ok" },
      { k: "YTD", v: "$36.2M", d: "+6.3%", tone: "ok" },
    ],
  },
  {
    label: "Labor hours",
    daily: "2.6K",
    delta: "+2.4%",
    tone: "ok",
    rows: [
      { k: "WTD", v: "19.7K", d: "+8.6%", tone: "ok" },
      { k: "QTD", v: "72.9K", d: "+5.4%", tone: "ok" },
      { k: "YTD", v: "561K", d: "+7.1%", tone: "ok" },
    ],
  },
  {
    label: "Avg check",
    daily: "$17.02",
    delta: "+$1.16",
    tone: "ok",
    rows: [
      { k: "WTD", v: "$15.74", d: "+$0.78", tone: "ok" },
      { k: "QTD", v: "$15.88", d: "+$0.64", tone: "ok" },
      { k: "YTD", v: "$15.31", d: "+$0.47", tone: "ok" },
    ],
  },
  {
    label: "Speed of service",
    daily: "1m 47s",
    delta: "+7s",
    tone: "crit",
    rows: [
      { k: "WTD", v: "1m 41s", d: "+3s", tone: "crit" },
      { k: "QTD", v: "1m 42s", d: "+4s", tone: "crit" },
      { k: "YTD", v: "1m 40s", d: "0s", tone: "flat" },
    ],
  },
];

const todo = [
  <>
    Net sales <b className="num font-semibold">$164.8K</b>, +6.4% vs last year —{" "}
    <u className="decoration-amber-400 underline-offset-2">8 of 36 stores</u> missed
    target.
  </>,
  <>
    Avg check <b className="num font-semibold">$17.02</b>, +$1.16 vs last year, highest in
    the week.
  </>,
  <>
    Drive-thru <b className="num font-semibold">1m 47s</b>, +7s vs last year and a 7-day
    high.
  </>,
];

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const thisWeek = [166, 158, 181, 178, 212, 174, 165];
const lastWeek = [152, 149, 170, 168, 196, 170, 149];

export function SceneMetrics({ play }: SceneProps) {
  const sales = useCountUp(164_800, 1300, play);
  const labor = useCountUp(2600, 1100, play);
  const w = 300;
  const h = 96;

  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* four headline tiles */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <motion.div
            key={t.label}
            {...entry(
              play,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0 },
              { duration: 0.5, delay: 0.06 * i, ease: EASE }
            )}
          >
            <Panel className="relative h-full overflow-hidden p-2.5">
              {t.accent && (
                <motion.span
                  className="absolute inset-x-0 top-0 h-[2px] origin-left bg-emerald-500"
                  {...entry(
                    play,
                    { scaleX: 0 },
                    { scaleX: 1 },
                    { duration: 0.7, delay: 0.3, ease: EASE }
                  )}
                />
              )}
              <Eyebrow>{t.label}</Eyebrow>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="num text-[17px] font-semibold text-navy">
                  {i === 0 ? money(sales) : i === 1 ? thousands(labor) : t.daily}
                </span>
                <Delta tone={t.tone} className="text-[10px]">
                  {t.delta}
                </Delta>
              </div>

              <div className="mt-2 flex flex-col gap-[3px] border-t border-line pt-1.5">
                {t.rows.map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between">
                    <span className="text-[9px] font-medium text-muted">{r.k}</span>
                    <span className="flex items-baseline gap-1.5">
                      <span className="num text-[10px] font-medium text-ink">{r.v}</span>
                      <Delta tone={r.tone} className="text-[9px]">
                        {r.d}
                      </Delta>
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>

      {/* the note + the trend */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[0.85fr_1fr]">
        <motion.div
          {...entry(
            play,
            { opacity: 0, y: 16, rotate: -2 },
            { opacity: 1, y: 0, rotate: -0.8 },
            { duration: 0.6, delay: 0.45, ease: EASE }
          )}
          className="relative"
        >
          <div className="relative flex h-full flex-col rounded-lg border border-amber-200/80 bg-gradient-to-b from-amber-50 to-amber-100/60 p-2.5 pt-3 shadow-e1">
            <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-red-400 shadow-e1" />
            <div className="mb-1.5 flex items-center justify-between">
              <Eyebrow className="!text-amber-700/70">Today&rsquo;s to-do list</Eyebrow>
              <span className="num text-[9px] font-medium text-amber-700/70">0/3</span>
            </div>
            <ol className="flex flex-col gap-1.5">
              {todo.map((line, i) => (
                <motion.li
                  key={i}
                  className="flex gap-1.5 text-[10px] leading-snug text-amber-950/85"
                  {...entry(
                    play,
                    { opacity: 0, x: -6 },
                    { opacity: 1, x: 0 },
                    { duration: 0.4, delay: 0.75 + i * 0.22, ease: EASE }
                  )}
                >
                  <span className="num font-semibold text-amber-700">{i + 1}.</span>
                  <span>{line}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Below sm there isn't the vertical room for both the note and the
            chart inside the frame — the note carries the point on its own. */}
        <motion.div
          className="hidden sm:block"
          {...entry(
            play,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0 },
            { duration: 0.6, delay: 0.5, ease: EASE }
          )}
        >
          <Panel className="flex h-full flex-col p-2.5">
            <div className="flex items-center justify-between">
              <Eyebrow>Net sales · trailing 7 days</Eyebrow>
              <span className="flex items-center gap-2 text-[8.5px] font-medium text-muted">
                <span className="inline-flex items-center gap-1">
                  <span className="h-[2px] w-2.5 rounded-full bg-emerald-500" />
                  This year
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-0 w-2.5 border-t border-dashed border-line-2" />
                  Prior year
                </span>
              </span>
            </div>

            <div className="mt-1.5 min-h-0 flex-1">
              <svg
                viewBox={`0 0 ${w} ${h}`}
                className="h-full w-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="metricsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[8, 30, 52, 74].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2={w}
                    y1={y}
                    y2={y}
                    stroke="var(--color-line)"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <path
                  d={smoothPath(lastWeek, w, h, 8)}
                  fill="none"
                  stroke="var(--color-line-2)"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  d={areaPath(thisWeek, w, h, 8)}
                  fill="url(#metricsArea)"
                  {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.6, delay: 1.1 })}
                />
                <motion.path
                  d={smoothPath(thisWeek, w, h, 8)}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  {...entry(
                    play,
                    { pathLength: 0 },
                    { pathLength: 1 },
                    { duration: 1.1, delay: 0.7, ease: "easeOut" }
                  )}
                />
              </svg>
            </div>

            <div className="mt-1 flex justify-between text-[8px] font-medium text-muted">
              {week.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   SCENE 2 — Trends
   Zoom out: the same network over a quarter, and what Oscar noticed.
   ================================================================ */

const trendCards: {
  label: string;
  value: string;
  delta: string;
  tone: Tone;
  series: number[];
}[] = [
  {
    label: "Sales",
    value: "$1.28M",
    delta: "↑ +$36.2k",
    tone: "ok",
    series: [42, 46, 44, 51, 48, 55, 52, 61, 58, 64],
  },
  {
    label: "Labor",
    value: "21.5%",
    delta: "↓ −0.5%",
    tone: "warn",
    series: [60, 58, 62, 57, 59, 54, 56, 52, 55, 51],
  },
  {
    label: "Cash",
    value: "−$535",
    delta: "↑ +$7.4k",
    tone: "crit",
    series: [30, 34, 22, 38, 26, 44, 18, 40, 28, 36],
  },
  {
    label: "FSS",
    value: "3.59",
    delta: "→ 0.0",
    tone: "info",
    series: [50, 52, 51, 53, 52, 52, 53, 52, 53, 53],
  },
];

const chips = ["Net sales", "Ticket count", "Check size", "3P sales", "Drive-thru"];

const ranking = [
  { store: "5876", delta: "+$10.7k", pct: 100 },
  { store: "9714", delta: "+$5.6k", pct: 62 },
  { store: "25199", delta: "+$4.2k", pct: 48 },
  { store: "24974", delta: "+$4.0k", pct: 45 },
  { store: "3972", delta: "+$3.8k", pct: 42 },
];

const observations: { tone: Tone; text: ReactNode }[] = [
  {
    tone: "warn",
    text: (
      <>
        <b className="num font-semibold">$1.26M</b> this week, up from $1.22M last week;{" "}
        <b className="font-semibold">23 of 36</b> stores met target.
      </>
    ),
  },
  {
    tone: "crit",
    text: (
      <>
        <b className="font-semibold">18 of 36 stores</b> comp negative vs. last year on 13
        days this period.
      </>
    ),
  },
];

const quarter = [
  118, 124, 116, 131, 127, 122, 138, 129, 142, 134, 151, 143, 139, 158, 149, 162, 154,
  168, 159, 173,
];

export function SceneTrends({ play }: SceneProps) {
  const w = 320;
  const h = 108;

  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* four trend cards */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {trendCards.map((c, i) => (
          <motion.div
            key={c.label}
            {...entry(
              play,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0 },
              { duration: 0.5, delay: 0.05 * i, ease: EASE }
            )}
          >
            <Panel
              className={`relative h-full overflow-hidden p-2.5 ${
                i === 0 ? "ring-1 ring-emerald-500/25" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: toneStroke[c.tone] }}
                />
                <Eyebrow>{c.label}</Eyebrow>
              </div>
              <div className="num mt-1 text-[15px] font-semibold text-navy">{c.value}</div>
              <Delta tone={c.tone} className="text-[9.5px]">
                {c.delta}
              </Delta>
              <Spark
                values={c.series}
                tone={c.tone}
                play={play}
                delay={0.25 + i * 0.08}
                className="mt-1.5 h-6 w-full"
              />
            </Panel>
          </motion.div>
        ))}
      </div>

      {/* metric chips */}
      <motion.div
        className="flex flex-wrap gap-1"
        {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.4, delay: 0.35 })}
      >
        {chips.map((c, i) => (
          <span
            key={c}
            className={`rounded-md px-2 py-[3px] text-[9px] font-medium ${
              i === 0
                ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/15"
                : "text-slate ring-1 ring-inset ring-line"
            }`}
          >
            {c}
          </span>
        ))}
      </motion.div>

      {/* ranking + the long view */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[0.72fr_1fr]">
        {/* Ranking is the first thing to go when the frame narrows: the chart
            and the observations are what carry this scene. */}
        <motion.div
          className="hidden lg:block"
          {...entry(
            play,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0 },
            { duration: 0.55, delay: 0.45, ease: EASE }
          )}
        >
          <Panel className="flex h-full flex-col p-2.5">
            <div className="flex items-center justify-between">
              <Eyebrow>Store ranking</Eyebrow>
              <span className="text-[8.5px] font-medium text-muted">Top 5 · vs last wk</span>
            </div>
            <div className="mt-2 flex flex-1 flex-col justify-between gap-1.5">
              {ranking.map((r, i) => (
                <motion.div
                  key={r.store}
                  {...entry(
                    play,
                    { opacity: 0, x: -8 },
                    { opacity: 1, x: 0 },
                    { duration: 0.4, delay: 0.6 + i * 0.09, ease: EASE }
                  )}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="num text-[10px] font-medium text-ink">
                      <span className="mr-1.5 text-muted">{i + 1}</span>
                      {r.store}
                    </span>
                    <Delta tone="ok" className="text-[9.5px]">
                      {r.delta}
                    </Delta>
                  </div>
                  <Bar pct={r.pct} tone="ok" play={play} delay={0.7 + i * 0.09} />
                </motion.div>
              ))}
            </div>
          </Panel>
        </motion.div>

        <motion.div
          {...entry(
            play,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0 },
            { duration: 0.55, delay: 0.4, ease: EASE }
          )}
          className="flex min-h-0 flex-col gap-2"
        >
          <Panel className="flex min-h-0 flex-1 flex-col p-2.5">
            <div className="flex items-center justify-between">
              <Eyebrow>Total sales · portfolio</Eyebrow>
              <span className="flex items-baseline gap-2">
                <span className="num text-[13px] font-semibold text-navy">$1.28M</span>
                <Delta tone="ok" className="text-[9px]">
                  WoW +3.0% · YoY +4.4%
                </Delta>
              </span>
            </div>
            <div className="mt-1.5 min-h-0 flex-1">
              <svg
                viewBox={`0 0 ${w} ${h}`}
                className="h-full w-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="trendsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                  {/* Wipes the chart in from the left. A mask reveal keeps the
                      area fill and the stroke arriving together, which a
                      pathLength draw on the line alone cannot do. */}
                  <mask id="trendsMask">
                    <motion.rect
                      x="0"
                      y="0"
                      height={h}
                      fill="#fff"
                      {...entry(
                        play,
                        { width: 0 },
                        { width: w },
                        { duration: 1.5, delay: 0.55, ease: "easeInOut" }
                      )}
                    />
                  </mask>
                </defs>
                {[10, 34, 58, 82].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2={w}
                    y1={y}
                    y2={y}
                    stroke="var(--color-line)"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <g mask="url(#trendsMask)">
                  <path d={areaPath(quarter, w, h, 10)} fill="url(#trendsArea)" />
                  <path
                    d={smoothPath(quarter, w, h, 10)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>
            </div>
          </Panel>

          <div className="grid shrink-0 grid-cols-1 gap-1.5 sm:grid-cols-2">
            {observations.map((o, i) => (
              <motion.div
                key={i}
                {...entry(
                  play,
                  { opacity: 0, x: 12 },
                  { opacity: 1, x: 0 },
                  { duration: 0.5, delay: 1.25 + i * 0.18, ease: EASE }
                )}
                className={`rounded-md p-2 text-[9.5px] leading-snug ring-1 ring-inset ${
                  o.tone === "crit"
                    ? "bg-red-50/70 text-red-900 ring-red-600/10"
                    : "bg-amber-50/70 text-amber-900 ring-amber-600/10"
                }`}
              >
                <span className="mb-1 flex items-center gap-1">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: toneStroke[o.tone] }}
                  />
                  <Eyebrow className="!text-[7.5px]">Key observation</Eyebrow>
                </span>
                {o.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   SCENE 3 — Scorecards
   Down to the store: who needs attention, scored and ranked.
   ================================================================ */

const cards: {
  store: string;
  status: string;
  tone: Tone;
  score: number;
  focus?: boolean;
  insights: { tag: string; tagTone: Tone; title: string; body: string }[];
}[] = [
  {
    store: "5935",
    status: "Needs attention",
    tone: "warn",
    score: 71,
    focus: true,
    insights: [
      {
        tag: "Sales",
        tagTone: "ok",
        title: "Comp sales below threshold",
        body: "Down 10.4% year-over-year against a −5% threshold.",
      },
    ],
  },
  {
    store: "7464",
    status: "On track",
    tone: "ok",
    score: 90,
    insights: [
      {
        tag: "Sales",
        tagTone: "ok",
        title: "Traffic decline driving dip",
        body: "Comp down 3.5% MTD while traffic is down 10.3%.",
      },
    ],
  },
  {
    store: "9584",
    status: "On track",
    tone: "ok",
    score: 88,
    insights: [
      {
        tag: "Labor",
        tagTone: "warn",
        title: "Breakfast labor over threshold",
        body: "Running 54.1% against the 40% threshold.",
      },
    ],
  },
  {
    store: "26925",
    status: "Critical",
    tone: "crit",
    score: 64,
    insights: [
      {
        tag: "Labor",
        tagTone: "warn",
        title: "Breakfast labor over budget",
        body: "Running 49.0% against the 40% threshold.",
      },
    ],
  },
];

export function SceneScorecards({ play }: SceneProps) {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <motion.div
        className="flex flex-wrap items-center justify-between gap-2"
        {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.4 })}
      >
        <div className="flex items-center gap-1">
          {["All", "JS Foods", "Redrock", "Legacy"].map((g, i) => (
            <span
              key={g}
              className={`rounded-md px-2 py-[3px] text-[9px] font-medium ${
                i === 0
                  ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/15"
                  : "text-slate ring-1 ring-inset ring-line"
              }`}
            >
              {g}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-[9px] font-medium text-muted">
          <span className="grid size-4 place-items-center rounded-full bg-navy text-[7px] font-semibold text-white">
            S
          </span>
          Stasha · 6 stores
        </span>
      </motion.div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.store}
            {...entry(
              play,
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0 },
              { duration: 0.55, delay: 0.08 * i, ease: EASE }
            )}
            className="relative min-h-0"
          >
            {/* Oscar surfacing the one that matters — a soft pulse rather than
                a hard border, so it reads as attention not as an error. */}
            {c.focus && play && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-[3px] rounded-[13px] ring-2 ring-amber-400/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.35, 1, 0.5] }}
                transition={{ duration: 2.2, delay: 1.5, ease: "easeInOut" }}
              />
            )}
            <Panel className="flex h-full flex-col overflow-hidden p-2.5">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <div className="num text-[13px] font-semibold text-navy">{c.store}</div>
                  <Pill tone={c.tone} className="mt-1">
                    {c.status}
                  </Pill>
                </div>
                <Ring value={c.score} tone={c.tone} play={play} delay={0.35 + i * 0.1} />
              </div>

              <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5 border-t border-line pt-2">
                <Eyebrow>Insights · {c.insights.length} open</Eyebrow>
                {c.insights.map((ins, j) => (
                  <motion.div
                    key={ins.title}
                    {...entry(
                      play,
                      { opacity: 0, y: 10 },
                      { opacity: 1, y: 0 },
                      { duration: 0.45, delay: 0.65 + i * 0.1 + j * 0.12, ease: EASE }
                    )}
                    className="rounded-md border-l-2 bg-mist/70 p-1.5"
                    style={{ borderLeftColor: toneStroke[ins.tagTone] }}
                  >
                    <Pill tone={ins.tagTone} className="!text-[7.5px]">
                      {ins.tag}
                    </Pill>
                    <div className="mt-1 text-[9.5px] font-semibold leading-tight text-navy">
                      {ins.title}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-slate">
                      {ins.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   SCENE 4 — Reports
   The artifact operators actually live in: a dense recap table. The
   beat that matters is the last one — the table lands, then Oscar
   lights up the exceptions inside it.

   District-manager names are invented. The real app shows staff names
   here and none of them belong on a marketing site.
   ================================================================ */

const REPORT_MARKS = [1900] as const; // table settles → exceptions light up

const reportCols = ["Store", "District", "Net sales", "Comp", "Trans.", "Cash +/−"];

type ReportRow = {
  store: string;
  dm: string;
  sales: string;
  comp: string;
  compTone: Tone;
  trans: string;
  cash: string;
  /** Outside tolerance — highlighted once the table has settled. */
  flag?: boolean;
};

const reportRows: ReportRow[] = [
  { store: "1626", dm: "A. Rivera", sales: "$2,063", comp: "−4.3%", compTone: "crit", trans: "103", cash: "−$13.29", flag: true },
  { store: "1994", dm: "A. Rivera", sales: "$2,878", comp: "+25.5%", compTone: "ok", trans: "178", cash: "−$0.25" },
  { store: "2927", dm: "A. Rivera", sales: "$3,260", comp: "−9.4%", compTone: "crit", trans: "188", cash: "+$10.15", flag: true },
  { store: "4551", dm: "M. Chen", sales: "$2,527", comp: "−11.0%", compTone: "crit", trans: "147", cash: "−$0.42" },
  { store: "1038", dm: "M. Chen", sales: "$2,569", comp: "−3.9%", compTone: "crit", trans: "164", cash: "−$0.30" },
  { store: "1493", dm: "M. Chen", sales: "$3,526", comp: "+13.7%", compTone: "ok", trans: "137", cash: "+$0.91" },
];

const reportTotal: ReportRow = {
  store: "Total",
  dm: "6 stores",
  sales: "$16,823",
  comp: "−3.4%",
  compTone: "crit",
  trans: "917",
  cash: "−$3.20",
};

export function SceneReports({ play }: SceneProps) {
  const stage = useStage(play, REPORT_MARKS);

  return (
    <div className="flex h-full flex-col gap-2">
      {/* report tabs + toolbar */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-2"
        {...entry(play, { opacity: 0 }, { opacity: 1 }, { duration: 0.4 })}
      >
        <div className="flex items-center gap-3">
          {["Daily Recap", "PTD Recap", "By channel"].map((t, i) => (
            <span
              key={t}
              className={`relative pb-1 text-[10px] font-medium ${
                i === 0 ? "text-navy" : "text-muted"
              }`}
            >
              {t}
              {i === 0 && (
                <motion.span
                  className="absolute inset-x-0 -bottom-px h-[1.5px] origin-left rounded-full bg-brand-500"
                  {...entry(play, { scaleX: 0 }, { scaleX: 1 }, { duration: 0.45, delay: 0.15, ease: EASE })}
                />
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="num rounded-md border border-line bg-white px-1.5 py-0.5 text-[9px] text-slate">
            Jul 27
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-navy px-1.5 py-[3px] text-[9px] font-medium text-white">
            <Icon name="report" width={8} height={8} />
            Export
          </span>
        </div>
      </motion.div>

      {/* the table */}
      <motion.div
        className="min-h-0 flex-1"
        {...entry(play, { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.1, ease: EASE })}
      >
        <Panel className="flex h-full flex-col overflow-hidden">
          {/* grouped header band, as in the real recap */}
          <div className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_1fr] bg-brand-500/90 text-white">
            <span className="col-span-2 border-r border-white/25 px-2 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.12em]">
              Restaurant
            </span>
            <span className="col-span-4 px-2 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.12em]">
              Sales
            </span>
          </div>

          <div className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_1fr] border-b border-line bg-mist">
            {reportCols.map((c, i) => (
              <span
                key={c}
                className={`px-2 py-1.5 text-[8.5px] font-semibold uppercase tracking-wider text-slate ${
                  i >= 2 ? "text-right" : ""
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="min-h-0 flex-1 divide-y divide-line">
            {reportRows.map((r, i) => (
              <motion.div
                key={r.store}
                className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_1fr] items-center"
                {...entry(
                  play,
                  { opacity: 0, x: -8 },
                  { opacity: 1, x: 0 },
                  { duration: 0.35, delay: 0.3 + i * 0.09, ease: EASE }
                )}
              >
                <span className="num px-2 py-[7px] text-[9.5px] font-medium text-navy">
                  {r.store}
                </span>
                <span className="truncate px-2 text-[9.5px] text-slate">{r.dm}</span>
                <span className="num px-2 text-right text-[9.5px] text-ink">{r.sales}</span>
                <span className={`num px-2 text-right text-[9.5px] ${toneText[r.compTone]}`}>
                  {r.comp}
                </span>
                <span className="num px-2 text-right text-[9.5px] text-slate">{r.trans}</span>
                <span className="px-2 text-right">
                  {r.flag ? (
                    <motion.span
                      className="num inline-block rounded px-1 py-px text-[9.5px] font-medium"
                      initial={play ? { backgroundColor: "rgba(254,226,226,0)", color: "#0f2438" } : false}
                      animate={
                        stage >= 1
                          ? { backgroundColor: "rgba(254,226,226,1)", color: "#b91c1c" }
                          : { backgroundColor: "rgba(254,226,226,0)", color: "#0f2438" }
                      }
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      {r.cash}
                    </motion.span>
                  ) : (
                    <span className="num text-[9.5px] text-slate">{r.cash}</span>
                  )}
                </span>
              </motion.div>
            ))}

            {/* subtotal */}
            <motion.div
              className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr_0.8fr_1fr] items-center bg-mist"
              {...entry(
                play,
                { opacity: 0 },
                { opacity: 1 },
                { duration: 0.4, delay: 0.3 + reportRows.length * 0.09, ease: EASE }
              )}
            >
              <span className="px-2 py-[7px] text-[9.5px] font-semibold text-navy">
                {reportTotal.store}
              </span>
              <span className="px-2 text-[9.5px] text-muted">{reportTotal.dm}</span>
              <span className="num px-2 text-right text-[9.5px] font-semibold text-navy">
                {reportTotal.sales}
              </span>
              <span
                className={`num px-2 text-right text-[9.5px] font-semibold ${toneText[reportTotal.compTone]}`}
              >
                {reportTotal.comp}
              </span>
              <span className="num px-2 text-right text-[9.5px] font-semibold text-navy">
                {reportTotal.trans}
              </span>
              <span className="num px-2 text-right text-[9.5px] font-semibold text-navy">
                {reportTotal.cash}
              </span>
            </motion.div>
          </div>
        </Panel>
      </motion.div>

      {/* what Oscar did with it */}
      <motion.div
        className="flex shrink-0 items-center gap-1.5 rounded-md bg-brand-50/70 px-2 py-1.5 ring-1 ring-inset ring-brand-600/10"
        initial={play ? { opacity: 0, y: 8 } : false}
        animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
      >
        <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
          <Icon name="spark" width={9} height={9} />
        </span>
        <span className="text-[9.5px] leading-snug text-navy">
          <b className="font-semibold">2 cash variances</b> outside tolerance — flagged and
          routed to their district manager.
        </span>
      </motion.div>
    </div>
  );
}

/* ================================================================
   SCENE 5 — Ask Oscar
   The payoff: a plain question, a specific answer, with the work shown.
   ================================================================ */

const QUESTION = "Which stores had the worst sales comp last week?";
const CHAT_MARKS = [2100, 3100] as const; // question typed → thinking → answer

const history = [
  { q: "Summarize yesterday's Daily Recap.", when: "Today, 08:12" },
  { q: "Break down drive-thru times by daypart.", when: "Yesterday" },
  { q: "Any themes in customer comments?", when: "Mon" },
];

const answer = [
  { k: "Store 5935", v: "−10.4%", note: "Traffic −8.2%" },
  { k: "Store 26925", v: "−7.8%", note: "Check size −$0.61" },
  { k: "Store 7464", v: "−3.5%", note: "Traffic −10.3%" },
];

export function SceneChat({ play }: SceneProps) {
  const stage = useStage(play, CHAT_MARKS);
  const typed = useTypewriter(QUESTION, 26, play);

  return (
    <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-[0.6fr_1fr]">
      {/* history rail */}
      <motion.div
        className="hidden min-h-0 sm:block"
        {...entry(
          play,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0 },
          { duration: 0.5, ease: EASE }
        )}
      >
        <Panel className="flex h-full flex-col p-2.5">
          <div className="flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1.5 text-[10px] font-medium text-brand-700 ring-1 ring-inset ring-brand-600/15">
            <Icon name="plus" width={11} height={11} />
            New chat
          </div>
          <Eyebrow className="mt-2.5">Recent</Eyebrow>
          <div className="mt-1.5 flex flex-col gap-1.5">
            {history.map((h, i) => (
              <motion.div
                key={h.q}
                {...entry(
                  play,
                  { opacity: 0, x: -6 },
                  { opacity: 1, x: 0 },
                  { duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }
                )}
                className="border-b border-line pb-1.5 last:border-0"
              >
                <div className="truncate text-[9.5px] font-medium text-ink">{h.q}</div>
                <div className="text-[8.5px] text-muted">{h.when}</div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </motion.div>

      {/* the thread */}
      <motion.div
        className="min-h-0"
        {...entry(
          play,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0 },
          { duration: 0.5, delay: 0.1, ease: EASE }
        )}
      >
        <Panel className="flex h-full flex-col p-2.5">
          {/* the question, typing */}
          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-lg rounded-tr-sm bg-mist px-2.5 py-1.5 text-[10.5px] font-medium leading-snug text-ink">
              {typed}
              {play && stage < 1 && (
                <span className="ml-px inline-block h-[10px] w-[1.5px] translate-y-[1px] animate-caret bg-navy align-middle" />
              )}
            </div>
          </div>

          {/* Oscar working */}
          {stage === 1 && (
            <motion.div
              className="mt-2 flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Icon name="spark" width={9} height={9} />
              </span>
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="size-1 rounded-full bg-muted"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.16 }}
                />
              ))}
              <span className="text-[9px] text-muted">Reading 36 stores · 7 days…</span>
            </motion.div>
          )}

          {/* the answer */}
          {stage >= 2 && (
            <motion.div
              className="mt-2 min-h-0 flex-1"
              initial={play ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex items-start gap-1.5">
                <span className="mt-px grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                  <Icon name="spark" width={9} height={9} />
                </span>
                <div className="min-w-0 flex-1 rounded-lg rounded-tl-sm border border-brand-100 bg-brand-50/60 p-2">
                  <p className="text-[10.5px] font-medium leading-snug text-navy">
                    Three locations lagged the network last week.
                  </p>

                  <div className="mt-1.5 flex flex-col gap-1 border-t border-brand-200/50 pt-1.5">
                    {answer.map((r, i) => (
                      <motion.div
                        key={r.k}
                        className="flex items-baseline justify-between gap-2"
                        initial={play ? { opacity: 0, x: -6 } : false}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 + i * 0.14, ease: EASE }}
                      >
                        <span className="num text-[10px] text-slate">{r.k}</span>
                        <span className="flex items-baseline gap-2">
                          <span className="text-[8.5px] text-muted">{r.note}</span>
                          <Delta tone="crit" className="text-[10px] font-semibold">
                            {r.v}
                          </Delta>
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    className="mt-1.5 border-t border-brand-200/50 pt-1.5 text-[9.5px] text-slate"
                    initial={play ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.7 }}
                  >
                    Want the root-cause breakdown for 5935?
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}

          {/* composer */}
          <div className="mt-auto flex items-center gap-1.5 rounded-lg border border-line bg-mist/60 px-2 py-1.5">
            <span className="flex-1 text-[9.5px] text-muted">Message Oscar…</span>
            <span className="grid size-4 place-items-center rounded-md bg-brand-500 text-white">
              <Icon name="arrow" width={9} height={9} />
            </span>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}
