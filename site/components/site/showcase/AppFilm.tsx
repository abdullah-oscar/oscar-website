"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon, type IconKey } from "@/components/ui/icons";
import { EASE } from "./parts";
import {
  SceneChat,
  SceneMetrics,
  SceneReports,
  SceneScorecards,
  SceneTrends,
} from "./scenes";

/* ================================================================
   The product film.

   One app window that never unmounts — chrome, rail and active-nav pill
   persist while only the body cross-dissolves. That continuity is the
   whole trick: a tab switcher reads as a website, a shell that stays put
   while its contents change reads as software being used.

   A scripted cursor walks to the next rail item and clicks it a beat
   before each cut, so the sequence plays as footage of someone working
   rather than as a slideshow on a timer.
   ================================================================ */

type Scene = {
  id: string;
  label: string;
  short: string;
  icon: IconKey;
  /** Beat length in ms — long enough to read the scene, short enough to move on. */
  ms: number;
  /** Where the cursor drifts mid-scene, as a fraction of the frame. */
  focus: { fx: number; fy: number };
  Comp: (p: { play: boolean }) => ReactElement;
};

/* Five beats that build an argument rather than tour a menu: here is the
   network → here is the pattern → here is the one store → here is it in the
   report you already live in → now just ask. Durations are trimmed from the
   four-scene cut so the whole loop still lands around 26s. */
const scenes: Scene[] = [
  {
    id: "metrics",
    label: "Daily Metrics",
    short: "The morning read",
    icon: "grid",
    ms: 4800,
    focus: { fx: 0.34, fy: 0.66 },
    Comp: SceneMetrics,
  },
  {
    id: "trends",
    label: "Trends",
    short: "The pattern",
    icon: "trend",
    ms: 5200,
    focus: { fx: 0.72, fy: 0.55 },
    Comp: SceneTrends,
  },
  {
    id: "scorecards",
    label: "Scorecards",
    short: "The outlier",
    icon: "radar",
    ms: 4800,
    focus: { fx: 0.26, fy: 0.48 },
    Comp: SceneScorecards,
  },
  {
    id: "reports",
    label: "Reports",
    short: "The paper trail",
    icon: "report",
    ms: 5200,
    focus: { fx: 0.66, fy: 0.6 },
    Comp: SceneReports,
  },
  {
    id: "chat",
    label: "Ask Oscar",
    short: "The answer",
    icon: "chat",
    ms: 6000,
    focus: { fx: 0.7, fy: 0.44 },
    Comp: SceneChat,
  },
];

/** Rail entries below the fold of the film — present for realism, inert. */
const restRail: { label: string; icon: IconKey }[] = [
  { label: "Inventory", icon: "box" },
  { label: "Labor", icon: "people" },
];

type Point = { x: number; y: number };

export function AppFilm() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const [auto, setAuto] = useState(true);
  const [geom, setGeom] = useState<{ nav: Point[]; w: number; h: number } | null>(null);

  const reduced = useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.3 });

  // Autoplay only while the section is actually on screen and the visitor
  // hasn't taken over. Everything downstream keys off this one flag.
  const playing = auto && inView && !reduced;
  const scene = scenes[index];
  const next = (index + 1) % scenes.length;

  // Re-keys the scene and the progress bar together, so the bar can never
  // drift out of sync with the timer that advances the film.
  const playKey = `${index}-${run}-${playing ? 1 : 0}`;

  /* ---- advance ---- */
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setIndex((v) => (v + 1) % scenes.length);
      setRun((r) => r + 1);
    }, scene.ms);
    return () => clearTimeout(t);
  }, [playing, run, index, scene.ms]);

  /* ---- measure the rail so the cursor lands on real pixels ----
     useEffect rather than useLayoutEffect: this component still renders on
     the server, where useLayoutEffect warns, and the cursor doesn't appear
     until the first frame after measurement anyway. */
  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      if (!frame) return;
      const fr = frame.getBoundingClientRect();
      if (!fr.width) return;
      const nav = scenes.map((_, i) => {
        const el = navRefs.current[i];
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.left - fr.left + r.width * 0.5),
          y: Math.round(r.top - fr.top + r.height * 0.5),
        };
      });
      const w = Math.round(fr.width);
      const h = Math.round(fr.height);
      setGeom((prev) =>
        prev &&
        prev.w === w &&
        prev.h === h &&
        prev.nav.every((p, i) => p.x === nav[i].x && p.y === nav[i].y)
          ? prev
          : { nav, w, h }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, []);

  const jump = (i: number) => {
    setIndex(i);
    setRun((r) => r + 1);
    setAuto(false);
  };

  return (
    <div ref={rootRef}>
      {/* ---------------- the window ---------------- */}
      <div className="relative">
        {/* The wash it floats on. z-0, not -z-10 — a negative z-index child
            escapes to the root stacking context and ends up painted beneath
            the enclosing section's background, i.e. invisible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-0 overflow-hidden rounded-[40px]"
        >
          <div className="absolute inset-0 bg-aurora opacity-70 animate-drift" />
        </div>

        <div
          ref={frameRef}
          className="relative z-10 overflow-hidden rounded-xl border border-line bg-white shadow-stage"
        >
          <div className="flex">
            {/* ---- rail ---- */}
            <div className="flex w-[46px] shrink-0 flex-col gap-0.5 border-r border-line bg-white p-1.5 lg:w-[152px] lg:p-2">
              <div className="mb-1.5 flex items-center gap-2 px-1 py-1">
                <span className="grid size-5 shrink-0 place-items-center rounded-md bg-navy text-white">
                  <Icon name="spark" width={11} height={11} />
                </span>
                <span className="hidden text-[12px] font-semibold tracking-[-0.02em] text-navy lg:block">
                  Oscar
                </span>
              </div>

              {scenes.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.id}
                    type="button"
                    ref={(el) => {
                      navRefs.current[i] = el;
                    }}
                    onClick={() => jump(i)}
                    aria-label={s.label}
                    aria-current={active ? "true" : undefined}
                    className={`relative flex items-center gap-2 rounded-md px-1.5 py-1.5 text-left transition-colors lg:px-2 ${
                      active ? "text-brand-700" : "text-slate hover:text-navy"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="railActive"
                        className="absolute inset-0 rounded-md bg-brand-50 ring-1 ring-inset ring-brand-600/15"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    <Icon
                      name={s.icon}
                      width={13}
                      height={13}
                      className="relative z-10 mx-auto shrink-0 lg:mx-0"
                    />
                    <span className="relative z-10 hidden truncate text-[10.5px] font-medium lg:block">
                      {s.label}
                    </span>
                  </button>
                );
              })}

              <div className="my-1.5 border-t border-line" />

              {restRail.map((r) => (
                <span
                  key={r.label}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-muted/70 lg:px-2"
                >
                  <Icon
                    name={r.icon}
                    width={13}
                    height={13}
                    className="mx-auto shrink-0 lg:mx-0"
                  />
                  <span className="hidden truncate text-[10.5px] font-medium lg:block">
                    {r.label}
                  </span>
                </span>
              ))}
            </div>

            {/* ---- main ---- */}
            <div className="min-w-0 flex-1">
              {/* top bar */}
              <div className="flex items-center justify-between gap-2 border-b border-line bg-white px-3 py-2">
                <div className="flex min-w-0 items-center gap-1.5 text-[10.5px]">
                  <span className="text-muted">Oscar AI</span>
                  <span className="text-line-2">/</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={scene.id}
                      className="truncate font-medium text-navy"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22 }}
                    >
                      {scene.label}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="num hidden items-center gap-1.5 rounded-md border border-line px-1.5 py-0.5 text-[9px] text-slate sm:inline-flex">
                    All stores · 36
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
                    Live
                  </span>
                </div>
              </div>

              {/* body — every scene occupies this same box */}
              <div className="relative h-[400px] overflow-hidden bg-mist sm:h-[430px] lg:h-[450px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={playKey}
                    className="absolute inset-0 overflow-hidden p-2.5"
                    initial={{ opacity: 0, y: 10, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <scene.Comp play={playing} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ---- the scripted cursor ----
              Inline-narrowed rather than hoisted to a boolean, so TypeScript
              can see `geom` is non-null inside. Suppressed below ~720px,
              where there is no rail to walk to. */}
          {playing && geom && geom.w > 720 && (
            <motion.div
              key={`cursor-${playKey}`}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-20"
              initial={{
                x: geom.nav[index].x,
                y: geom.nav[index].y,
                opacity: 0,
              }}
              animate={{
                x: [
                  geom.nav[index].x,
                  geom.w * scene.focus.fx,
                  geom.w * scene.focus.fx,
                  geom.nav[next].x,
                ],
                y: [
                  geom.nav[index].y,
                  geom.h * scene.focus.fy,
                  geom.h * scene.focus.fy,
                  geom.nav[next].y,
                ],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: scene.ms / 1000,
                times: [0, 0.3, 0.68, 0.93],
                ease: "easeInOut",
              }}
            >
              <span className="relative block">
                {/* click ripple, timed to land just before the cut */}
                <motion.span
                  className="absolute -left-3 -top-3 size-6 rounded-full bg-brand-500/25"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.6], opacity: [0.9, 0] }}
                  transition={{ duration: 0.55, delay: (scene.ms / 1000) * 0.93 }}
                />
                <svg width="15" height="19" viewBox="0 0 15 19" className="drop-shadow-sm">
                  <path
                    d="M1 1.2 13.2 9.6 7.7 10.4 10.6 16.4 8.2 17.6 5.3 11.5 1 15.4V1.2Z"
                    fill="#0f2438"
                    stroke="#fff"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* ---------------- chapters ---------------- */}
      <div className="mt-4 flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => setAuto((a) => !a)}
          aria-label={auto ? "Pause the walkthrough" : "Play the walkthrough"}
          className="grid size-8 shrink-0 place-items-center self-center rounded-full border border-line bg-white text-slate shadow-e1 transition-colors hover:border-brand-300 hover:text-brand-600"
        >
          <Icon name={auto ? "pause" : "play"} width={12} height={12} />
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {scenes.map((s, i) => {
            const state = i < index ? "past" : i === index ? "now" : "next";
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => jump(i)}
                className="group min-w-0 text-left"
                aria-current={state === "now" ? "step" : undefined}
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-line">
                  <motion.span
                    key={state === "now" ? playKey : `${s.id}-${state}`}
                    className={`absolute inset-y-0 left-0 w-full origin-left rounded-full ${
                      state === "past" ? "bg-brand-200" : "bg-brand-500"
                    }`}
                    initial={{
                      scaleX: state === "past" ? 1 : state === "next" ? 0 : playing ? 0 : 1,
                    }}
                    animate={{ scaleX: state === "next" ? 0 : 1 }}
                    transition={
                      state === "now" && playing
                        ? { duration: s.ms / 1000, ease: "linear" }
                        : { duration: 0.25, ease: EASE }
                    }
                  />
                </span>

                <span className="mt-2 flex items-center gap-1.5">
                  <Icon
                    name={s.icon}
                    width={12}
                    height={12}
                    className={`shrink-0 transition-colors ${
                      state === "now" ? "text-brand-600" : "text-muted"
                    }`}
                  />
                  <span
                    className={`truncate text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                      state === "now" ? "text-navy" : "text-slate group-hover:text-navy"
                    }`}
                  >
                    {s.label}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-muted">
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-muted">
        Illustrative walkthrough — figures are examples, not a real customer account.
      </p>
    </div>
  );
}
