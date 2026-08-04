"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

/* ================================================================
   Shared plumbing for the preview variants.

   These four variants are a review exercise: each one answers "how
   much of the product do we put on a public page?" differently. They
   are deliberately independent of <AppFilm /> so the live homepage
   keeps working while the question is settled.
   ================================================================ */

/** True only while the block is on screen and the visitor hasn't asked for stillness. */
export function usePlay(ref: RefObject<HTMLElement | null>, amount = 0.35) {
  const inView = useInView(ref, { amount });
  const reduced = useReducedMotion();
  return inView && !reduced;
}

/**
 * Step counter that walks through `marks` (ms offsets from the start of play).
 * When not playing it reports the final stage, so a paused or reduced-motion
 * variant renders its finished state rather than a blank frame.
 */
export function useStage(play: boolean, marks: readonly number[]) {
  const [stage, setStage] = useState(play ? 0 : marks.length);

  useEffect(() => {
    if (!play) {
      setStage(marks.length);
      return;
    }
    setStage(0);
    const ids = marks.map((ms, i) => setTimeout(() => setStage(i + 1), ms));
    return () => ids.forEach(clearTimeout);
    // marks is a module-level constant per variant, so identity is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return stage;
}

/** Index that advances every `ms` while playing — used by the travelling-focus variant. */
export function useCycle(play: boolean, length: number, ms: number) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(id);
  }, [play, length, ms]);

  return i;
}

/**
 * Deterministic jitter in [-1, 1] from an integer seed.
 *
 * Math.random() would desync the server and client renders and trip a
 * hydration mismatch, so the scatter in the signal field is hashed from
 * the dot's own index instead.
 */
export function jitter(seed: number) {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

/** Frame every variant shares, so the comparison is like-for-like. */
export const FRAME =
  "relative overflow-hidden rounded-xl border border-line bg-white shadow-stage";
export const FRAME_H = "h-[460px]";
