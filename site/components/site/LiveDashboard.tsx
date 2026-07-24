"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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

/** KPI tiles matching the shape of the real Daily Metrics page — a Daily
 * headline figure plus a WTD line underneath. Illustrative numbers only. */
const kpis = [
  { label: "Sales", daily: "$62,400", dailyDelta: "+3.1%", wtd: "$412K WTD", wtdDelta: "+4.8%" },
  { label: "Labor hours", daily: "210", dailyDelta: "+1.2%", wtd: "1,380 WTD", wtdDelta: "+2.0%" },
  { label: "Avg check", daily: "$18.40", dailyDelta: "+$0.35", wtd: "$18.10 WTD", wtdDelta: "+$0.20" },
  { label: "Speed of service", daily: "2m 05s", dailyDelta: "−8s", wtd: "2m 10s WTD", wtdDelta: "−5s" },
] as const;

const todo = [
  <>Net sales <b>$62.4K</b>, +3.1% vs last year — 2 of 34 stores missed target.</>,
  <>Avg check <b>$18.40</b>, up $0.35 vs last year, rising 3 days straight.</>,
  <>Drive-thru time <b>2m 05s</b>, 8s faster than last year — best pace this month.</>,
];

/* trailing 7-day sales trend — hand-set illustrative points, this year vs prior year */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const xs = [8, 51, 94, 137, 180, 223, 266];
const thisYearY = [42, 36, 46, 26, 32, 14, 18];
const priorYearY = [48, 44, 48, 40, 42, 36, 34];
const toPoints = (ys: number[]) => xs.map((x, i) => `${x},${ys[i]}`).join(" ");

export function LiveDashboard() {
  const [live, setLive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const sales = useCountUp(62400, 1400, live);
  const laborHours = useCountUp(210, 1000, live);

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
            Daily metrics · 34 locations
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-blink" />
          Live
        </span>
      </div>

      {/* KPI grid — Daily headline + WTD line, 4 metrics like the real page */}
      <div className="grid grid-cols-2 gap-px border-b border-line bg-line">
        <Kpi
          label="Sales"
          value={`$${Math.round(sales).toLocaleString()}`}
          delta={kpis[0].dailyDelta}
          sub={kpis[0].wtd}
          subDelta={kpis[0].wtdDelta}
        />
        <Kpi
          label="Labor hours"
          value={`${Math.round(laborHours)}`}
          delta={kpis[1].dailyDelta}
          sub={kpis[1].wtd}
          subDelta={kpis[1].wtdDelta}
        />
        <Kpi
          label="Avg check"
          value={kpis[2].daily}
          delta={kpis[2].dailyDelta}
          sub={kpis[2].wtd}
          subDelta={kpis[2].wtdDelta}
        />
        <Kpi
          label="Speed of service"
          value={kpis[3].daily}
          delta={kpis[3].dailyDelta}
          sub={kpis[3].wtd}
          subDelta={kpis[3].wtdDelta}
        />
      </div>

      {/* to-do note + trailing chart */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_1.1fr]">
        <div className="-rotate-1 rounded-lg border border-amber-200 bg-amber-50 p-3.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-800">
              Today&rsquo;s to-do
            </span>
            <span className="text-[9.5px] font-bold text-amber-700">0/3</span>
          </div>
          <ol className="flex flex-col gap-1.5 text-[10.5px] leading-snug text-amber-900">
            {todo.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="font-bold">{i + 1}.</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-muted">
              Sales · trailing 7 days
            </span>
            <span className="flex items-center gap-2.5 text-[9px] font-semibold text-muted">
              <span className="inline-flex items-center gap-1">
                <span className="h-[2px] w-2.5 rounded-full bg-brand-500" /> This yr
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-[2px] w-2.5 rounded-full bg-line-2" /> Prior yr
              </span>
            </span>
          </div>
          <svg viewBox="0 0 274 56" className="mt-2 h-14 w-full" aria-hidden>
            <polyline
              points={toPoints(priorYearY)}
              fill="none"
              stroke="var(--color-line-2)"
              strokeWidth="1.5"
              strokeDasharray="3.5 3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.polyline
              points={toPoints(thisYearY)}
              fill="none"
              stroke="var(--color-brand-500)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={live ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>
          <div className="mt-1 flex justify-between text-[9px] font-medium text-muted">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  sub,
  subDelta,
}: {
  label: string;
  value: string;
  delta: string;
  sub: string;
  subDelta: string;
}) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="text-[9px] font-bold uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="tnum mt-1 flex items-baseline gap-1.5">
        <span className="text-lg font-extrabold text-navy">{value}</span>
        <span className="text-[10px] font-bold text-emerald-600">{delta}</span>
      </div>
      <div className="tnum mt-1 flex items-baseline gap-1.5 border-t border-line pt-1">
        <span className="text-[10px] font-semibold text-slate">{sub}</span>
        <span className="text-[9.5px] font-bold text-emerald-600">{subDelta}</span>
      </div>
    </div>
  );
}
