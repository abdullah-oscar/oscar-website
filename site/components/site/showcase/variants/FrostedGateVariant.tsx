"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { EASE, entry, smoothPath } from "../parts";
import { FRAME, FRAME_H, jitter, usePlay } from "./shared";

/* ================================================================
   VARIANT D — "Frosted gate"

   Turns the constraint into the message. There is obviously a dense
   product back there; you get one finding out of it for free and the
   rest in a live walkthrough. Confidence rather than secrecy — and it
   asks for the meeting at the exact moment curiosity peaks.

   The layer behind the glass is pure geometry: no product strings
   exist in the DOM, so deleting the blur in devtools reveals grey
   rectangles. That matters — a frosted screenshot is not withheld,
   it is just hard to read.
   ================================================================ */

const CHART = [38, 44, 41, 52, 49, 61, 58, 70, 66, 78];

/** Abstract dashboard furniture — shape only, deliberately wordless. */
function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 flex select-none">
      {/* rail */}
      <div className="flex w-[132px] shrink-0 flex-col gap-2 border-r border-line bg-white p-3">
        <span className="mb-2 flex items-center gap-2">
          <span className="size-5 shrink-0 rounded-md bg-navy/80" />
          <span className="h-2 w-14 rounded-full bg-line-2" />
        </span>
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="size-3 shrink-0 rounded bg-line-2" />
            <span
              className="h-2 rounded-full bg-line"
              style={{ width: `${52 + jitter(i) * 22}px` }}
            />
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1 bg-mist p-3">
        {/* top bar */}
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2.5 w-32 rounded-full bg-line-2" />
          <span className="h-4 w-20 rounded-md bg-line" />
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="rounded-lg border border-line bg-white p-2.5">
              <span className="block h-1.5 w-[62%] rounded-full bg-line" />
              <span className="mt-2 block h-4 w-[70%] rounded bg-mist-2" />
              <span className="mt-2 block h-1.5 w-[44%] rounded-full bg-line" />
            </span>
          ))}
        </div>

        {/* chart + list */}
        <div className="mt-2 grid grid-cols-[1.5fr_1fr] gap-2">
          <span className="block rounded-lg border border-line bg-white p-2.5">
            <span className="block h-1.5 w-[38%] rounded-full bg-line" />
            <svg viewBox="0 0 120 46" preserveAspectRatio="none" className="mt-2 h-[132px] w-full">
              <path
                d={smoothPath(CHART, 120, 46, 4)}
                fill="none"
                stroke="var(--color-brand-400)"
                strokeWidth="1.8"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          <span className="flex flex-col gap-2 rounded-lg border border-line bg-white p-2.5">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-line-2" />
                <span
                  className="h-1.5 rounded-full bg-line"
                  style={{ width: `${58 + jitter(i + 7) * 26}%` }}
                />
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FrostedGateVariant() {
  const ref = useRef<HTMLDivElement>(null);
  const play = usePlay(ref);

  return (
    <div ref={ref} className={`${FRAME} ${FRAME_H}`}>
      <Backdrop />

      {/* the glass */}
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-[9px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(245,248,251,0.86) 100%)",
        }}
      />

      {/* the one thing you get to read */}
      <div className="absolute inset-0 grid place-items-center p-6">
        <motion.div
          className="w-full max-w-md rounded-xl border border-line bg-white/95 p-6 shadow-e4"
          {...entry(
            play,
            { opacity: 0, y: 14, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1 },
            { duration: 0.6, ease: EASE }
          )}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-slate">
            <Icon name="lock" width={10} height={10} />
            One finding, on the house
          </span>

          <p className="mt-3.5 text-[15px] font-semibold leading-snug tracking-[-0.015em] text-navy">
            “One of your 36 stores is{" "}
            <span className="num text-brand-600">10.4% under</span> last year — fourth day
            running, and it&apos;s traffic, not check size.”
          </p>

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate">
            Oscar found that at 4am, without being asked, in data you already have. The
            other thirty-five were fine, which is why nobody had to hear about them.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white shadow-e2 transition-colors hover:bg-brand-600"
            >
              See the live product
              <Icon name="arrow" width={12} height={12} />
            </a>
            <span className="text-[11.5px] text-muted">20 minutes, your own data</span>
          </div>
        </motion.div>
      </div>

      {/* a small tell that there is a real surface under the glass */}
      <span className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
        <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
        36 locations live
      </span>
    </div>
  );
}
