"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * "Ask Oscar" — a small, glossy chat snippet showing the conversational side
 * of the product. Question + answer are illustrative examples, not a real
 * customer's data (see the caption in ProductShowcase).
 */
const question = "Why did labor run over at Location #12 this week?";
const answerLines = [
  "Thursday and Friday closes were both scheduled at full headcount against a forecasted slow period.",
  "Recommended fix: cut Friday close by one shift — saves ~$340/week without hurting service.",
];

export function AskOscarChat() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStage(1);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (stage === 0) return;
    const timers = [
      setTimeout(() => setStage(2), 900), // show typing indicator
      setTimeout(() => setStage(3), 2100), // reveal answer
    ];
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[20px] border border-line bg-white shadow-panel"
    >
      <div className="flex items-center justify-between bg-navy px-5 py-3.5">
        <div>
          <div className="text-sm font-bold text-white">Oscar AI</div>
          <div className="text-[11px] text-white/45">Ask anything · 34 locations</div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-blink" />
          Live
        </span>
      </div>

      <div className="flex min-h-[268px] flex-col justify-end gap-3 px-5 py-5">
        <motion.div
          className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-mist px-4 py-2.5 text-[13px] font-medium text-ink"
          initial={{ opacity: 0, y: 8 }}
          animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {question}
        </motion.div>

        {stage === 2 && (
          <motion.div
            className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-brand-50 px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-brand-400 animate-blink"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            className="max-w-[92%] rounded-2xl rounded-tl-sm border border-brand-100 bg-brand-50 px-4 py-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1.5">
              {answerLines.map((line, i) => (
                <p key={i} className="text-[13px] leading-snug text-navy">
                  {i === 1 && (
                    <span className="mr-1.5 font-bold text-brand-700">→</span>
                  )}
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
