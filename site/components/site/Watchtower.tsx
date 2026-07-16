"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/* Location nodes scattered in a rough map-like field (percent coords). */
const nodes = [
  { x: 14, y: 30 }, { x: 22, y: 58 }, { x: 30, y: 22 }, { x: 33, y: 44 },
  { x: 28, y: 74 }, { x: 40, y: 66 }, { x: 44, y: 30 }, { x: 18, y: 44 },
  { x: 58, y: 24 }, { x: 62, y: 48 }, { x: 56, y: 70 }, { x: 70, y: 34 },
  { x: 72, y: 62 }, { x: 78, y: 22 }, { x: 84, y: 46 }, { x: 80, y: 70 },
  { x: 88, y: 34 }, { x: 66, y: 76 }, { x: 48, y: 52 }, { x: 38, y: 16 },
  { x: 90, y: 60 }, { x: 24, y: 18 },
];

type Tone = "warn" | "info" | "crit";
const kinds: { tone: Tone; label: string }[] = [
  { tone: "crit", label: "Void anomaly detected" },
  { tone: "warn", label: "Labor 6% over target" },
  { tone: "info", label: "Sales dip flagged" },
  { tone: "warn", label: "Break violation" },
  { tone: "info", label: "Discount spike +18%" },
  { tone: "crit", label: "Comp rate doubled" },
  { tone: "warn", label: "Late clock-in" },
  { tone: "info", label: "Out-of-stock risk" },
];

const toneHex: Record<Tone, string> = {
  crit: "#dc2626",
  warn: "#f59e0b",
  info: "#35b8ff",
};

type NodeState = "idle" | "alert" | "resolved";
type LogItem = {
  id: number;
  loc: number;
  tone: Tone;
  label: string;
  status: "detecting" | "resolved";
};

export function Watchtower() {
  const [states, setStates] = useState<NodeState[]>(() => nodes.map(() => "idle"));
  const [activeTone, setActiveTone] = useState<Tone[]>(() => nodes.map(() => "info"));
  const [active, setActive] = useState<number | null>(null);
  const [log, setLog] = useState<LogItem[]>([]);
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const seq = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const cycle = () => {
      const i = Math.floor(Math.random() * nodes.length);
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const id = ++seq.current;

      setActive(i);
      setActiveTone((p) => {
        const n = [...p];
        n[i] = kind.tone;
        return n;
      });
      setStates((p) => {
        const n = [...p];
        n[i] = "alert";
        return n;
      });
      setLog((p) =>
        [
          {
            id,
            loc: 100 + i,
            tone: kind.tone,
            label: kind.label,
            status: "detecting" as const,
          },
          ...p,
        ].slice(0, 5)
      );

      timers.current.push(
        setTimeout(() => {
          setStates((p) => {
            const n = [...p];
            n[i] = "resolved";
            return n;
          });
          setLog((p) =>
            p.map((it) => (it.id === id ? { ...it, status: "resolved" } : it))
          );
        }, 1300)
      );
      timers.current.push(
        setTimeout(() => {
          setStates((p) => {
            const n = [...p];
            n[i] = "idle";
            return n;
          });
        }, 4200)
      );
    };

    cycle();
    const int = setInterval(cycle, 2000);
    const t = timers.current;
    return () => {
      clearInterval(int);
      t.forEach(clearTimeout);
    };
  }, [running]);

  return (
    <section
      id="watchtower"
      className="border-y border-line bg-mist py-20 md:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="kicker text-brand-600">The Watchtower</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.6rem]">
              One analyst watching{" "}
              <span className="text-brand-600">every location</span>, every
              second
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-slate">
              Oscar continuously scans your entire network. The moment something
              drifts from normal, it detects the issue, finds the root cause,
              and routes an action — before it ever reaches your P&amp;L.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div ref={rootRef} className="mt-12 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* Map panel */}
            <div className="relative aspect-[16/11] overflow-hidden rounded-[20px] border border-line bg-white shadow-panel">
              <div className="absolute inset-0 bg-grid opacity-60" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {nodes.map((n, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke={active === i ? toneHex[activeTone[i]] : "#35b8ff"}
                    strokeWidth={active === i ? 0.4 : 0.18}
                    strokeOpacity={active === i ? 0.75 : 0.18}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {nodes.map((n, i) => {
                const st = states[i];
                const color = toneHex[activeTone[i]];
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {st === "alert" && (
                      <span
                        className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ color }}
                      >
                        <span className="pulse-ring absolute inset-0 block rounded-full" />
                      </span>
                    )}
                    <span
                      className="block rounded-full transition-all duration-500"
                      style={{
                        width: st === "idle" ? 7 : 10,
                        height: st === "idle" ? 7 : 10,
                        background:
                          st === "idle"
                            ? "#cfe0ee"
                            : st === "resolved"
                              ? "#16a34a"
                              : color,
                        boxShadow:
                          st === "idle"
                            ? "none"
                            : `0 0 0 4px ${
                                st === "resolved"
                                  ? "rgba(22,163,74,0.16)"
                                  : "rgba(53,184,255,0.18)"
                              }`,
                      }}
                    />
                  </div>
                );
              })}

              {/* Oscar core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="pointer-events-none absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full text-brand-500">
                  <span className="pulse-ring absolute inset-0 block rounded-full" />
                </span>
                <span className="relative grid h-11 place-items-center rounded-xl border border-line bg-white px-3 text-[13px] font-extrabold text-navy shadow-panel">
                  Oscar
                </span>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-full border border-line bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-slate backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-signal-crit" />
                  detected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-signal-ok" />
                  resolved
                </span>
              </div>
              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
                Scanning
              </div>
            </div>

            {/* Detection log */}
            <div className="flex flex-col rounded-[20px] border border-line bg-white p-5 shadow-panel">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Detection log
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
                  live
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {log.length === 0 && (
                    <p className="text-xs text-muted">Awaiting signals…</p>
                  )}
                  {log.map((it) => (
                    <motion.div
                      key={it.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-lg border border-line bg-mist px-3.5 py-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted">
                          Location #{it.loc}
                        </span>
                        <StatusPill status={it.status} />
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ background: toneHex[it.tone] }}
                        />
                        <span className="text-[12.5px] font-medium text-ink">
                          {it.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function StatusPill({ status }: { status: "detecting" | "resolved" }) {
  return status === "resolved" ? (
    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
      Resolved
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
      <span className="size-1 rounded-full bg-amber-500 animate-blink" />
      Detecting
    </span>
  );
}
