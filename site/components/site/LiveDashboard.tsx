"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ---------- count-up hook ---------- */
function useCountUp(target: number, duration = 1400, start = true) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const tick = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(eased * target);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start]);
  return value;
}

const bars = [62, 74, 55, 83, 68, 94, 71, 88];
const flagged = 2;
const highlight = 5;

type Alert = { tone: "warn" | "info" | "ok"; text: string };
const feedSource: Alert[] = [
  { tone: "warn", text: "Loc #14 — Void anomaly: 3 unusual comps in 2 hrs" },
  { tone: "info", text: "Loc #07 — Labor 4% over target · alerted GM" },
  { tone: "ok", text: "Loc #31 — Sales anomaly resolved · staffing gap" },
  { tone: "warn", text: "Loc #22 — Discount rate spiked +18% today" },
  { tone: "info", text: "Loc #03 — Weekend labor forecast updated" },
  { tone: "ok", text: "Weekly compliance report delivered to 34 DLs" },
];

const toneStyles: Record<Alert["tone"], string> = {
  warn: "border-amber-200 bg-amber-50 text-amber-800",
  info: "border-brand-100 bg-brand-50 text-brand-700",
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
};
const toneDot: Record<Alert["tone"], string> = {
  warn: "bg-signal-warn",
  info: "bg-brand-500",
  ok: "bg-signal-ok",
};

export function LiveDashboard() {
  const [live, setLive] = useState(false);
  const [feed, setFeed] = useState<(Alert & { id: number })[]>(
    feedSource.slice(0, 3).map((a, i) => ({ ...a, id: i }))
  );
  const idRef = useRef(3);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const revenue = useCountUp(48200, 1600, live);
  const labor = useCountUp(28.3, 1200, live);
  const flags = useCountUp(3, 900, live);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const int = setInterval(() => {
      setFeed((prev) => {
        const next = feedSource[idRef.current % feedSource.length];
        idRef.current += 1;
        return [{ ...next, id: idRef.current }, ...prev].slice(0, 3);
      });
    }, 3400);
    return () => clearInterval(int);
  }, [live]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[20px] border border-line bg-white shadow-panel"
    >
      {/* header — navy bar, as in the brand's own dashboard */}
      <div className="flex items-center justify-between bg-navy px-5 py-3.5">
        <div>
          <div className="text-sm font-bold text-white">Oscar AI</div>
          <div className="text-[11px] text-white/45">
            Live operations · 34 locations
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-blink" />
          Live
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
        <Kpi
          label="Revenue today"
          value={`$${Math.round(revenue).toLocaleString()}`}
          delta="↑ 6.4% vs last week"
          tone="up"
        />
        <Kpi
          label="Labor %"
          value={`${labor.toFixed(1)}%`}
          delta="Within target"
          tone="flat"
        />
        <Kpi
          label="Flags today"
          value={`${Math.round(flags)}`}
          delta="Needs review"
          tone="down"
          valueClass="text-signal-crit"
        />
      </div>

      {/* chart */}
      <div className="px-5 pt-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
          Revenue by location · this week
        </div>
        {/* h-full on the wrapper is required for the bars' % heights to resolve */}
        <div className="mt-3 flex h-[78px] items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <motion.div
                className={`w-full rounded-t-[3px] ${
                  i === flagged
                    ? "bg-red-300"
                    : i === highlight
                      ? "bg-brand-500"
                      : "bg-brand-100"
                }`}
                initial={{ height: 0 }}
                animate={live ? { height: `${h}%` } : { height: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15 + i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] font-medium text-muted">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
      </div>

      {/* feed */}
      <div className="px-4 pb-4 pt-4">
        <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-muted">
          Recent alerts
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {feed.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${toneStyles[a.tone]}`}
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${toneDot[a.tone]}`}
                />
                <span className="truncate text-[11.5px] font-medium">
                  {a.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone,
  valueClass = "text-navy",
}: {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down" | "flat";
  valueClass?: string;
}) {
  const deltaTone =
    tone === "up"
      ? "text-emerald-600"
      : tone === "down"
        ? "text-signal-crit"
        : "text-muted";
  return (
    <div className="bg-white px-4 py-3">
      <div className="text-[9.5px] font-bold uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className={`tnum mt-1 text-xl font-extrabold ${valueClass}`}>
        {value}
      </div>
      <div className={`mt-0.5 text-[10.5px] font-semibold ${deltaTone}`}>
        {delta}
      </div>
    </div>
  );
}
