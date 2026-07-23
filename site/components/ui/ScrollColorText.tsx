"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, ["#a8bccb", "#0a1f35"]);
  return (
    <motion.span style={{ color }} className="will-change-[color]">
      {children}
    </motion.span>
  );
}

/**
 * Inline span whose words darken from muted to ink as the block scrolls
 * through the lower half of the viewport — a restrained, one-time reveal
 * rather than a scrubbed animation the reader has to chase. Renders inline
 * so it can drop into an existing heading element (e.g. SectionHeading's
 * `title` prop) instead of introducing a second <h2>.
 */
export function ScrollColorText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.4"],
  });
  const words = text.split(" ");

  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <span key={i}>
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
