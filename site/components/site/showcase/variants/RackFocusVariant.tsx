"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { Delta, EASE, Spark, type Tone } from "../parts";
import { FRAME, FRAME_H, useCycle, usePlay } from "./shared";

/* ================================================================
   VARIANT B — "Rack focus"

   Borrowed from film: the lens holds one subject sharp and lets the
   rest of the plate fall away. The grid is real, the density is real,
   and exactly one card is legible at any moment — so the frame reads
   as a working product while a screenshot of it yields a single
   insight rather than a specification.

   The left rail is gone on purpose. A list of module names is the most
   copyable thing on the page and it was never doing persuasive work.
   ================================================================ */

const HOLD = 2800;

type Card = {
  store: string;
  tone: Tone;
  head: string;
  detail: string;
  metric: string;
  delta: string;
  series: number[];
};

const cards: Card[] = [
  {
    store: "Store 5935",
    tone: "crit",
    head: "Comp sales below plan",
    detail: "Four straight days under. Traffic driven, not check size.",
    metric: "−10.4%",
    delta: "vs LY",
    series: [92, 88, 84, 79, 74, 70, 66],
  },
  {
    store: "Store 7464",
    tone: "warn",
    head: "Breakfast labor running hot",
    detail: "Short a shift lead Monday; overtime rebuilt by Wednesday.",
    metric: "54.1%",
    delta: "of sales",
    series: [40, 42, 47, 44, 50, 52, 54],
  },
  {
    store: "Network",
    tone: "warn",
    head: "Drive-thru times slipping",
    detail: "Seven-day high, and it starts with the new lunch item.",
    metric: "+7s",
    delta: "vs LY",
    series: [100, 101, 99, 103, 105, 106, 107],
  },
  {
    store: "Store 9584",
    tone: "ok",
    head: "Recovered after the fix",
    detail: "Back above plan three days after the schedule change.",
    metric: "+4.8%",
    delta: "vs LY",
    series: [70, 72, 78, 85, 90, 95, 99],
  },
  {
    store: "Store 26925",
    tone: "crit",
    head: "Check size falling",
    detail: "Attach rate down on the combo, traffic held flat.",
    metric: "−$0.61",
    delta: "avg check",
    series: [95, 93, 90, 88, 85, 83, 80],
  },
  {
    store: "Store 3310",
    tone: "ok",
    head: "Best week this quarter",
    detail: "Nothing to do here — noted so you know it wasn't luck.",
    metric: "+9.2%",
    delta: "vs LY",
    series: [72, 76, 80, 84, 88, 94, 100],
  },
];

export function RackFocusVariant() {
  const ref = useRef<HTMLDivElement>(null);
  const play = usePlay(ref);
  const focus = useCycle(play, cards.length, HOLD);
  const active = cards[focus];

  return (
    <div ref={ref} className={`${FRAME} ${FRAME_H} flex flex-col`}>
      {/* ---- chrome, kept deliberately thin ---- */}
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="grid size-5 shrink-0 place-items-center rounded-md bg-navy text-white">
            <Icon name="spark" width={11} height={11} />
          </span>
          <span className="text-[11px] font-semibold tracking-[-0.01em] text-navy">
            Oscar
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
          36 locations watched
        </span>
      </div>

      {/* ---- the plate ---- */}
      <div className="relative min-h-0 flex-1 bg-mist p-3">
        <div className="grid h-full grid-cols-2 grid-rows-3 gap-2.5 lg:grid-cols-3 lg:grid-rows-2">
          {cards.map((c, i) => {
            const sharp = i === focus;
            return (
              <motion.div
                key={c.store}
                className="relative min-w-0 overflow-hidden rounded-lg border bg-white p-3"
                animate={{
                  // 6px on 10px type is past the point of reconstruction —
                  // the shape of the product survives, the content does not.
                  filter: sharp ? "blur(0px)" : "blur(6px)",
                  opacity: sharp ? 1 : 0.5,
                  scale: sharp ? 1.015 : 0.99,
                  // Literal hex rather than var(): Motion interpolates colours it
                  // can parse, and a CSS custom property would snap instead.
                  borderColor: sharp ? "#8ad6fa" : "#e4ebf3",
                }}
                transition={{ duration: 0.65, ease: EASE }}
                style={{
                  boxShadow: sharp ? "var(--shadow-e3)" : "none",
                  zIndex: sharp ? 10 : 1,
                }}
              >
                {/* Out-of-focus cards render as geometry, not as blurred text.
                    A CSS filter is a paint-time effect — anyone can delete it
                    in devtools and read what is underneath — so the withholding
                    has to happen in the DOM. Blur is the look; the skeleton is
                    the actual protection. */}
                {sharp ? (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <span className="num truncate text-[11px] font-semibold text-navy">
                        {c.store}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 size-1.5 shrink-0 rounded-full"
                        style={{
                          background:
                            c.tone === "crit"
                              ? "var(--color-signal-crit)"
                              : c.tone === "warn"
                                ? "var(--color-signal-warn)"
                                : "var(--color-signal-ok)",
                        }}
                      />
                    </div>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="num text-[17px] font-semibold tracking-[-0.02em] text-navy">
                        {c.metric}
                      </span>
                      <Delta tone="flat" className="text-[9.5px]">
                        {c.delta}
                      </Delta>
                    </div>

                    <Spark
                      values={c.series}
                      tone={c.tone}
                      play={play}
                      className="mt-1.5 h-7 w-full"
                    />

                    <div className="mt-1.5 text-[10px] font-medium leading-snug text-ink">
                      {c.head}
                    </div>
                  </>
                ) : (
                  <div aria-hidden>
                    <div className="flex items-start justify-between gap-2">
                      <span className="h-2 w-[46%] rounded-full bg-line" />
                      <span className="mt-0.5 size-1.5 rounded-full bg-line-2" />
                    </div>
                    <span className="mt-2.5 block h-4 w-[38%] rounded bg-mist-2" />
                    <span className="mt-2 block h-7 w-full rounded bg-mist-2" />
                    <span className="mt-2 block h-1.5 w-[82%] rounded-full bg-line" />
                    <span className="mt-1.5 block h-1.5 w-[60%] rounded-full bg-line" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Edge vignette — pulls the eye off the corners without hiding
            that there is more product out there. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 42%, rgba(245,248,251,0.72) 100%)",
          }}
        />
      </div>

      {/* ---- the caption does the explaining the blur withholds ---- */}
      <div className="border-t border-line px-4 py-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.store}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="text-[12.5px] font-semibold tracking-[-0.01em] text-navy">
              {active.head}
            </div>
            <div className="mt-0.5 text-[11px] leading-snug text-slate">{active.detail}</div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-2.5 flex gap-1.5">
          {cards.map((c, i) => (
            <motion.span
              key={c.store}
              className="h-[2.5px] flex-1 rounded-full"
              animate={{
                backgroundColor:
                  i === focus ? "var(--color-brand-500)" : "var(--color-line)",
              }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
