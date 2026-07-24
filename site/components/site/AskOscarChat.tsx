"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/icons";

type Response = {
  q: string;
  headline: string;
  rows?: { k: string; v: string; delta?: string }[];
  bullets?: string[];
  follow: string;
};

/**
 * The 4 suggested prompts from the real Oscar chat experience, and a
 * placeholder response for each — illustrative content standing in until
 * real examples are dropped in (see the caption in ProductShowcase).
 */
const responses: Response[] = [
  {
    q: "Summarize yesterday's Daily Recap.",
    headline: "Here's the summary for yesterday across all 34 locations:",
    rows: [
      { k: "Net sales", v: "$62,400", delta: "+3.1%" },
      { k: "Customers", v: "4,120", delta: "+1.8%" },
      { k: "Avg check", v: "$18.40", delta: "+$0.35" },
      { k: "OT hours", v: "62", delta: "−4" },
    ],
    follow: "Want me to drill into any location?",
  },
  {
    q: "Which stores had the worst sales comp last week?",
    headline: "3 locations lagged the network last week:",
    rows: [
      { k: "Loc #22", v: "−6.2%" },
      { k: "Loc #14", v: "−4.8%" },
      { k: "Loc #09", v: "−3.1%" },
    ],
    follow: "Want the root-cause breakdown for Loc #22?",
  },
  {
    q: "Any themes in customer comments from the last 7 days?",
    headline: "3 themes stood out in the last 7 days of reviews:",
    bullets: [
      "Wait times mentioned in 18% of reviews, up from 11%",
      "Staff friendliness praised in 42% of reviews",
      "3 mentions of a specific menu item being out of stock",
    ],
    follow: "Want me to route the wait-time trend to ops?",
  },
  {
    q: "What did the daypart breakdown look like yesterday?",
    headline: "Yesterday's traffic split by daypart:",
    rows: [
      { k: "Breakfast", v: "22%" },
      { k: "Lunch", v: "38%" },
      { k: "Dinner", v: "31%" },
      { k: "Late night", v: "9%" },
    ],
    follow: "Want this broken out by location?",
  },
];

export function AskOscarChat() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-panel">
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

      <div className="min-h-[280px] p-5">
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="prompts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-center text-[12.5px] leading-snug text-slate">
                Ask about your reports, KPIs, or customer comments and Oscar
                will pull the data for you.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {responses.map((r, i) => (
                  <button
                    key={r.q}
                    type="button"
                    onClick={() => setSelected(i)}
                    className="rounded-xl border border-line bg-mist px-3.5 py-3 text-left text-[12px] font-medium leading-snug text-ink transition-colors hover:border-brand-400 hover:bg-brand-50"
                  >
                    {r.q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thread"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-muted transition-colors hover:text-brand-600"
              >
                <Icon name="arrow" width={12} height={12} className="rotate-180" />
                New chat
              </button>

              <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-mist px-4 py-2.5 text-[13px] font-medium text-ink">
                {responses[selected].q}
              </div>

              <div className="mt-3 max-w-[95%] rounded-2xl rounded-tl-sm border border-brand-100 bg-brand-50 px-4 py-3">
                <p className="text-[12.5px] font-semibold leading-snug text-navy">
                  {responses[selected].headline}
                </p>

                {responses[selected].rows && (
                  <div className="mt-2.5 flex flex-col gap-1 border-t border-brand-100 pt-2.5">
                    {responses[selected].rows!.map((row) => (
                      <div key={row.k} className="flex items-baseline justify-between gap-3 text-[11.5px]">
                        <span className="text-slate">{row.k}</span>
                        <span className="tnum font-bold text-navy">
                          {row.v}
                          {row.delta && (
                            <span className="ml-1.5 font-semibold text-emerald-600">{row.delta}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {responses[selected].bullets && (
                  <ul className="mt-2.5 flex flex-col gap-1.5 border-t border-brand-100 pt-2.5">
                    {responses[selected].bullets!.map((b) => (
                      <li key={b} className="flex gap-1.5 text-[11.5px] leading-snug text-navy">
                        <span className="text-brand-500">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-2.5 border-t border-brand-100 pt-2.5 text-[11.5px] italic text-slate">
                  {responses[selected].follow}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
