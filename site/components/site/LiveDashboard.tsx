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

type Period = { label: string; value: string; delta: string; good?: boolean };
type KpiData = {
  label: string;
  accent?: boolean;
  daily: Period;
  wtd: Period;
  qtd: Period;
  ytd: Period;
};

/** KPI cards matching the shape of the real Daily Metrics page — a Daily
 * headline figure plus WTD/QTD/YTD rows. Illustrative numbers only. */
const kpis: KpiData[] = [
  {
    label: "Sales",
    accent: true,
    daily: { label: "Daily", value: "$58.2K", delta: "+2.8%", good: true },
    wtd: { label: "WTD", value: "$398K", delta: "+4.1%", good: true },
    qtd: { label: "QTD", value: "$3.6M", delta: "+5.2%", good: true },
    ytd: { label: "YTD", value: "$31.4M", delta: "+6.1%", good: true },
  },
  {
    label: "Labor hours",
    daily: { label: "Daily", value: "2.4K", delta: "+1.6%", good: true },
    wtd: { label: "WTD", value: "10.9K", delta: "+2.3%", good: true },
    qtd: { label: "QTD", value: "61.2K", delta: "+3.8%", good: true },
    ytd: { label: "YTD", value: "512K", delta: "+4.9%", good: true },
  },
  {
    label: "Avg check",
    daily: { label: "Daily", value: "$16.20", delta: "+$0.28", good: true },
    wtd: { label: "WTD", value: "$15.95", delta: "+$0.42", good: true },
    qtd: { label: "QTD", value: "$16.05", delta: "+$0.55", good: true },
    ytd: { label: "YTD", value: "$15.80", delta: "+$0.60", good: true },
  },
  {
    label: "Speed of service",
    daily: { label: "Daily", value: "1m 58s", delta: "−5s", good: true },
    wtd: { label: "WTD", value: "2m 01s", delta: "−3s", good: true },
    qtd: { label: "QTD", value: "2m 06s", delta: "+2s", good: false },
    ytd: { label: "YTD", value: "2m 04s", delta: "0s" },
  },
];

const todo = [
  <>Net sales <b>$58.2K</b>, +2.8% vs last year — 5 of 34 stores missed target.</>,
  <>Avg check <b>$16.20</b>, up $0.28 vs last year, rising 3 days straight.</>,
  <>Drive-thru time <b>1m 58s</b>, 5s faster than last year — best pace this month.</>,
];

/* trailing 7-day sales trend — hand-set illustrative points, this year vs prior year */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const xs = [6, 48, 89, 130, 172, 213, 254];
const thisYearY = [18, 32, 44, 30, 33, 12, 16];
const priorYearY = [26, 38, 50, 36, 38, 20, 24];
const yLabels = ["$64K", "$58K", "$52K", "$46K", "$40K"];
const gridY = [4, 26, 48, 70, 92];

const toPoints = (ys: number[]) => xs.map((x, i) => `${x},${ys[i]}`).join(" ");
const toAreaPath = (ys: number[]) => {
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  return `${line} L${xs[xs.length - 1]},96 L${xs[0]},96 Z`;
};

function fmtK(n: number, prefix = "") {
  return `${prefix}${(n / 1000).toFixed(1)}K`;
}

export function LiveDashboard() {
  const [live, setLive] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const sales = useCountUp(58200, 1400, live);
  const laborHours = useCountUp(2400, 1000, live);

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

      {/* KPI grid — Daily headline + WTD/QTD/YTD rows, 4 independent cards */}
      <div className="grid grid-cols-2 gap-2.5 bg-mist/60 p-3.5">
        <Kpi
          data={{
            ...kpis[0],
            daily: { ...kpis[0].daily, value: fmtK(sales, "$") },
          }}
        />
        <Kpi
          data={{
            ...kpis[1],
            daily: { ...kpis[1].daily, value: fmtK(laborHours) },
          }}
        />
        <Kpi data={kpis[2]} />
        <Kpi data={kpis[3]} />
      </div>

      {/* to-do note + trailing chart */}
      <div className="grid grid-cols-1 gap-3 border-t border-line p-3.5 sm:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-muted">
              Today&rsquo;s to-do list
            </span>
            <span className="text-[9.5px] font-bold text-muted">0/3 done</span>
          </div>
          <div className="relative flex-1 -rotate-1 rounded-lg border border-amber-200 bg-amber-50 p-3 pt-3.5 shadow-sm">
            <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-red-400 shadow-sm" />
            <span className="absolute bottom-0 right-0 size-3.5 bg-white/80 [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
            <ol className="flex flex-col gap-1.5 text-[10.5px] leading-snug text-amber-900">
              {todo.map((line, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="font-bold">{i + 1}.</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-wider text-muted">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sales · trailing 7 days
            </span>
            <span className="flex items-center gap-2.5 text-[9px] font-semibold text-muted">
              <span className="inline-flex items-center gap-1">
                <span className="h-[2px] w-2.5 rounded-full bg-emerald-500" /> This year
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-[2px] w-2.5 rounded-full border-t border-dashed border-line-2" /> Prior year
              </span>
            </span>
          </div>

          <div className="mt-1.5 flex gap-2">
            <div className="flex h-20 w-8 shrink-0 flex-col justify-between text-right text-[8px] font-medium tabular-nums text-muted">
              {yLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <svg viewBox="0 0 260 96" className="h-20 w-full" aria-hidden>
              <defs>
                <linearGradient id="salesArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {gridY.map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="260"
                  y1={y}
                  y2={y}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  strokeDasharray="2.5 3"
                />
              ))}
              <motion.path
                d={toAreaPath(thisYearY)}
                fill="url(#salesArea)"
                initial={{ opacity: 0 }}
                animate={live ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
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
                stroke="#10b981"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={live ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              {live &&
                xs.map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={thisYearY[i]}
                    r="2.6"
                    fill="#10b981"
                    stroke="white"
                    strokeWidth="1"
                  />
                ))}
            </svg>
          </div>
          <div className="mt-1 flex gap-2">
            <span className="w-8 shrink-0" />
            <div className="flex flex-1 justify-between text-[9px] font-medium text-muted">
              {days.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ data }: { data: KpiData }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-white p-3">
      {data.accent && (
        <span className="absolute inset-x-0 top-0 h-[3px] bg-emerald-500" />
      )}
      <div className="text-[9px] font-bold uppercase tracking-wider text-muted">
        {data.label}
      </div>
      <div className="mt-1 text-[8.5px] font-semibold uppercase tracking-wide text-muted/70">
        {data.daily.label}
      </div>
      <div className="tnum mt-0.5 flex items-baseline gap-1.5">
        <span className="text-lg font-extrabold text-navy">{data.daily.value}</span>
        <DeltaTag delta={data.daily.delta} good={data.daily.good} />
      </div>
      <div className="tnum mt-1.5 flex flex-col gap-1 border-t border-line pt-1.5">
        {[data.wtd, data.qtd, data.ytd].map((p) => (
          <div key={p.label} className="flex items-baseline justify-between text-[10px]">
            <span className="font-semibold text-muted">{p.label}</span>
            <span className="flex items-baseline gap-1.5">
              <span className="font-bold text-navy">{p.value}</span>
              <DeltaTag delta={p.delta} good={p.good} small />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeltaTag({
  delta,
  good,
  small,
}: {
  delta: string;
  good?: boolean;
  small?: boolean;
}) {
  const color = good === undefined ? "text-muted" : good ? "text-emerald-600" : "text-red-500";
  return (
    <span className={`font-bold ${color} ${small ? "text-[9.5px]" : "text-[10px]"}`}>
      {delta}
    </span>
  );
}
