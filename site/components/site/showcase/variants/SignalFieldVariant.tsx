"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { EASE, entry, useCountUp } from "../parts";
import { FRAME, FRAME_H, jitter, usePlay, useStage } from "./shared";

/* ================================================================
   VARIANT C — "Signal field"

   The most abstract of the four: no application, no cards, no chrome.
   Thirty-six locations as a breathing field of dots. Almost all of
   them stay quiet. Two warm up, one goes red, and only then does a
   single sentence surface to say what happened there.

   It shows the one thing that is genuinely hard to copy — the posture
   of watching everything and interrupting you about almost none of it
   — while disclosing nothing about how the product is built.
   ================================================================ */

const COLS = 9;
const ROWS = 4;
const COUNT = COLS * ROWS;

const CRIT = 11; // row 1, col 2 — the dot the story lands on
const WARN = new Set([5, 30]);

const MARKS = [1900, 3200] as const;

/** Loose grid with hashed scatter, so the field reads as a map and not a table. */
function place(i: number) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    x: 8 + col * (84 / (COLS - 1)) + jitter(i) * 2.2,
    y: 18 + row * (56 / (ROWS - 1)) + jitter(i + 99) * 3,
  };
}

const anchor = place(CRIT);
const CARD = { x: 34, y: 52 };

export function SignalFieldVariant() {
  const ref = useRef<HTMLDivElement>(null);
  const play = usePlay(ref);
  const stage = useStage(play, MARKS);
  const checks = useCountUp(1284, 2400, play);

  return (
    <div ref={ref} className={`${FRAME} ${FRAME_H} flex flex-col bg-mist`}>
      {/* ---- header ---- */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-white px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-navy text-white">
            <Icon name="radar" width={14} height={14} />
          </span>
          <div>
            <div className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-navy">
              Overnight, across your network
            </div>
            <div className="num text-[10.5px] leading-tight text-muted">
              36 locations · {Math.round(checks).toLocaleString("en-US")} checks read
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
          Watching
        </span>
      </div>

      {/* ---- the field ---- */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40" />

        {/* connector, drawn once the finding surfaces */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <motion.line
            x1={anchor.x}
            y1={anchor.y}
            x2={CARD.x + 4}
            y2={CARD.y}
            stroke="var(--color-signal-crit)"
            strokeWidth="1"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
            {...entry(
              play,
              { pathLength: 0, opacity: 0 },
              { pathLength: stage >= 2 ? 1 : 0, opacity: stage >= 2 ? 0.45 : 0 },
              { duration: 0.5, ease: EASE }
            )}
          />
        </svg>

        {Array.from({ length: COUNT }, (_, i) => {
          const { x, y } = place(i);
          const isCrit = i === CRIT && stage >= 1;
          const isWarn = WARN.has(i) && stage >= 1;
          const tone = isCrit
            ? "var(--color-signal-crit)"
            : isWarn
              ? "var(--color-signal-warn)"
              : "var(--color-brand-400)";

          return (
            <motion.span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{
                width: isCrit ? 13 : isWarn ? 10 : 7,
                height: isCrit ? 13 : isWarn ? 10 : 7,
                backgroundColor: tone,
                opacity: isCrit || isWarn ? 1 : 0.3,
              }}
              transition={{ duration: 0.6, delay: isWarn ? 0.25 : 0, ease: EASE }}
            >
              {/* one halo, on the one dot that earned it */}
              {isCrit && (
                <motion.span
                  className="absolute -inset-2 rounded-full"
                  style={{ background: "var(--color-signal-crit)" }}
                  animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.span>
          );
        })}

        {/* ---- the single sentence the field earns ---- */}
        <motion.div
          className="absolute w-[58%] rounded-lg border border-line bg-white p-3.5 shadow-e3"
          style={{ left: `${CARD.x}%`, top: `${CARD.y}%` }}
          {...entry(
            play,
            { opacity: 0, y: 10, scale: 0.97 },
            {
              opacity: stage >= 2 ? 1 : 0,
              y: stage >= 2 ? 0 : 10,
              scale: stage >= 2 ? 1 : 0.97,
            },
            { duration: 0.5, ease: EASE }
          )}
        >
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-red-500" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-red-600">
              Needs a human
            </span>
          </div>
          <p className="mt-1.5 text-[12px] leading-[1.55] text-slate">
            One store is <b className="num font-semibold text-navy">10.4% under</b> last
            year for the fourth day running. It&apos;s traffic, not check size — already
            with the district lead.
          </p>
        </motion.div>
      </div>

      {/* ---- the closing line ---- */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-5 py-3">
        <span className="text-[11.5px] text-slate">
          <b className="font-semibold text-navy">33 quiet.</b> Three worth your morning.
        </span>
        <span className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.1em] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-brand-400 opacity-40" /> Normal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-500" /> Watch
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-red-500" /> Act
          </span>
        </span>
      </div>
    </div>
  );
}
