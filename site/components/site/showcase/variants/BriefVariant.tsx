"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icons";
import { EASE, entry, toneStroke, useCountUp, type Tone } from "../parts";
import { FRAME, FRAME_H, usePlay, useStage } from "./shared";

/* ================================================================
   VARIANT A — "The Brief"

   No application at all. Oscar is an analyst, so the artifact we show
   is the thing an analyst hands you at 6am: a short written brief.

   The overnight work is compressed into one line that counts up and
   then collapses — 36 locations, 1,284 checks, three things worth a
   human. That subtraction *is* the pitch, and it survives being
   screenshotted by a competitor because there is no layout to take.
   ================================================================ */

const MARKS = [2600] as const;

type Finding = { tone: Tone; head: string; body: ReactNode };

/* Prose, not a taxonomy. Each finding names a number and a next step and
   stops there — no module names, no category chips, no scoring rubric. */
const findings: Finding[] = [
  {
    tone: "crit",
    head: "Sales",
    body: (
      <>
        One store came in <b className="num font-semibold text-navy">10.4% under</b> last
        year — its fourth straight day below plan. This is traffic, not check size, so
        discounting won&apos;t fix it. Sent to the district lead with the last four days
        attached.
      </>
    ),
  },
  {
    tone: "warn",
    head: "Labor",
    body: (
      <>
        Breakfast labor ran hot at{" "}
        <b className="num font-semibold text-navy">two locations</b>. Both were short a
        shift lead on Monday, and both rebuilt the same overtime by Wednesday. Worth a
        scheduling conversation, not a memo.
      </>
    ),
  },
  {
    tone: "warn",
    head: "Service",
    body: (
      <>
        Drive-thru times slipped <b className="num font-semibold text-navy">7 seconds</b>{" "}
        network-wide — a seven-day high. It starts the day the new lunch item landed, at
        every store that carries it.
      </>
    ),
  },
];

export function BriefVariant() {
  const ref = useRef<HTMLDivElement>(null);
  const play = usePlay(ref);
  const stage = useStage(play, MARKS);
  const scanned = useCountUp(1284, 1900, play);

  return (
    <div ref={ref} className={`${FRAME} ${FRAME_H} flex flex-col`}>
      {/* ---- letterhead ---- */}
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-navy text-white">
          <Icon name="spark" width={14} height={14} />
        </span>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-navy">
            Oscar
          </div>
          <div className="text-[10.5px] leading-tight text-muted">
            Daily brief · your 36 locations
          </div>
        </div>
        <span className="num ml-auto shrink-0 text-[10.5px] text-muted">Tue, 6:04 AM</span>
      </div>

      {/* ---- the subtraction ----
          The counter is the whole argument: a lot was read, almost none
          of it needs you. It runs once, then the line becomes the headline. */}
      <div className="border-b border-line bg-mist px-5 py-4">
        <AnimatePresence mode="wait" initial={false}>
          {stage < 1 ? (
            <motion.div
              key="scanning"
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="num text-[12px] text-slate">
                Reading{" "}
                <b className="font-semibold text-navy">
                  {Math.round(scanned).toLocaleString("en-US")}
                </b>{" "}
                checks across 36 locations…
              </div>
              <span className="mt-2.5 block h-[3px] w-full overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block h-full origin-left rounded-full bg-brand-500"
                  {...entry(
                    play,
                    { scaleX: 0 },
                    { scaleX: 1 },
                    { duration: MARKS[0] / 1000, ease: "linear" }
                  )}
                />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="verdict"
              initial={play ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-navy">
                Three things need you today.
              </div>
              <div className="num mt-1 text-[11.5px] text-muted">
                1,284 checks read · 33 locations clean · nothing else worth your morning
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- the findings ---- */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3.5 px-5 py-4">
        {findings.map((f, i) => (
          <motion.div
            key={f.head}
            className="flex gap-3"
            // entry() snaps to its END state when the flag is false, so gating
            // it on the stage would reveal the findings before the scan line
            // has finished counting.
            initial={play ? { opacity: 0, y: 10 } : false}
            animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: i * 0.14, ease: EASE }}
          >
            <span
              aria-hidden
              className="mt-1.5 block w-[3px] shrink-0 rounded-full"
              style={{ background: toneStroke[f.tone] }}
            />
            <p className="text-[12.5px] leading-[1.6] text-slate">
              <b className="font-semibold text-navy">{f.head}. </b>
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ---- the follow-up ----
          One affordance, and it is the only hint that software exists
          behind the brief: you can talk back to it. */}
      <div className="border-t border-line px-5 py-3.5">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-mist px-3 py-2">
          <Icon name="chat" width={13} height={13} className="shrink-0 text-muted" />
          <span className="min-w-0 flex-1 truncate text-[11.5px] text-muted">
            Ask a follow-up — “which four days?”
          </span>
          <span className="grid size-5 shrink-0 place-items-center rounded-md bg-navy text-white">
            <Icon name="arrow" width={10} height={10} />
          </span>
        </div>
      </div>
    </div>
  );
}
