"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { site } from "@/lib/site";

type Tone = "crit" | "warn" | "info" | "ok";
type Option = { label: string; correct: boolean };
type Alert = { text: string; tone: Tone; options: Option[] };

const ALERTS: Alert[] = [
  { text: "Location #14 — 3 unusual voids in 90 minutes", tone: "crit", options: [{ label: "Flag for review", correct: true }, { label: "Ignore it", correct: false }, { label: "Approve all", correct: false }] },
  { text: "Location #07 — Labor 18% over target right now", tone: "warn", options: [{ label: "Cut next shift early", correct: true }, { label: "Hire more staff", correct: false }, { label: "Do nothing", correct: false }] },
  { text: "Location #22 — Breakfast item 86'd 3 mornings straight", tone: "info", options: [{ label: "Check prep & equipment", correct: true }, { label: "Run a promo", correct: false }, { label: "Remove from menu", correct: false }] },
  { text: "Location #03 — 2 employees missed meal breaks", tone: "crit", options: [{ label: "Log & notify manager", correct: true }, { label: "Ignore, it happens", correct: false }, { label: "Write up staff", correct: false }] },
  { text: "Location #19 — Sales down 22% vs last Tuesday", tone: "warn", options: [{ label: "Investigate root cause", correct: true }, { label: "Assume weather", correct: false }, { label: "Lower prices", correct: false }] },
  { text: "Location #11 — 4 negative reviews in 2 hours", tone: "warn", options: [{ label: "Alert GM immediately", correct: true }, { label: "Reply next week", correct: false }, { label: "Flag later", correct: false }] },
  { text: "Location #31 — Revenue up 12% week-over-week", tone: "ok", options: [{ label: "Share with team", correct: true }, { label: "Investigate anomaly", correct: false }, { label: "Do nothing", correct: false }] },
  { text: "Location #08 — Manager clocked in 40 min late", tone: "warn", options: [{ label: "Log & follow up", correct: true }, { label: "Mark on time", correct: false }, { label: "Close location", correct: false }] },
  { text: "Location #26 — POS system showing offline", tone: "crit", options: [{ label: "Contact support now", correct: true }, { label: "Wait and see", correct: false }, { label: "Send staff home", correct: false }] },
  { text: "Location #05 — Comp rate doubled this week", tone: "warn", options: [{ label: "Review void reports", correct: true }, { label: "Approve comp policy", correct: false }, { label: "Ignore variance", correct: false }] },
];

type Card = {
  id: number;
  alert: Alert;
  timeLeft: number;
  total: number;
  result?: "good" | "bad" | "oscar";
};

const toneStyle: Record<Tone, { chip: string; label: string; bar: string }> = {
  crit: { chip: "bg-red-50 text-red-700 border-red-200", label: "Critical", bar: "#dc2626" },
  warn: { chip: "bg-amber-50 text-amber-700 border-amber-200", label: "Warning", bar: "#f59e0b" },
  info: { chip: "bg-brand-50 text-brand-700 border-brand-100", label: "Info", bar: "#35b8ff" },
  ok: { chip: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Good news", bar: "#16a34a" },
};

export function Game() {
  const [view, setView] = useState<"idle" | "playing" | "over">("idle");
  const [cards, setCards] = useState<Card[]>([]);
  const [score, setScore] = useState(100);
  const [resolved, setResolved] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [oscarCharges, setOscarCharges] = useState(3);
  const [shaking, setShaking] = useState(false);

  const scoreRef = useRef(100);
  const resolvedRef = useRef(0);
  const levelRef = useRef(1);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const oscarChargesRef = useRef(3);
  const runningRef = useRef(false);
  const idRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sync = useCallback(() => {
    setScore(scoreRef.current);
    setResolved(resolvedRef.current);
    setLevel(levelRef.current);
    setStreak(streakRef.current);
    setBestStreak(bestStreakRef.current);
    setOscarCharges(oscarChargesRef.current);
  }, []);

  // Re-triggers the shake CSS animation even if it's already mid-run, by
  // dropping the class for a frame before re-adding it.
  const triggerShake = useCallback(() => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  }, []);

  const stopLoops = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
    tickRef.current = null;
    spawnRef.current = null;
  }, []);

  const endGame = useCallback(() => {
    runningRef.current = false;
    stopLoops();
    setCards([]);
    setView("over");
  }, [stopLoops]);

  const scheduleSpawn = useCallback(() => {
    const delay = Math.max(1400, 3000 - levelRef.current * 220);
    spawnRef.current = setTimeout(() => {
      if (!runningRef.current) return;
      setCards((prev) => {
        if (prev.length >= 4) return prev;
        const alert = ALERTS[Math.floor(Math.random() * ALERTS.length)];
        const limit = Math.max(4200, 8500 - levelRef.current * 500);
        return [{ id: ++idRef.current, alert, timeLeft: limit, total: limit }, ...prev];
      });
      scheduleSpawn();
    }, delay);
  }, []);

  const start = useCallback(() => {
    scoreRef.current = 100;
    resolvedRef.current = 0;
    levelRef.current = 1;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    oscarChargesRef.current = 3;
    runningRef.current = true;
    idRef.current = 0;
    sync();
    setView("playing");

    // Front-load a couple of distinct alerts so the arena isn't empty while
    // the first scheduled spawn is still ticking down.
    const pool = [...ALERTS];
    const initial: Card[] = [];
    for (let i = 0; i < 2 && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      const alert = pool.splice(idx, 1)[0];
      const limit = Math.max(4200, 8500 - levelRef.current * 500);
      initial.push({ id: ++idRef.current, alert, timeLeft: limit, total: limit });
    }
    setCards(initial);

    tickRef.current = setInterval(() => {
      setCards((prev) => {
        let changed = false;
        let missed = false;
        const next: Card[] = [];
        for (const c of prev) {
          if (c.result) {
            next.push(c);
            continue;
          }
          const tl = c.timeLeft - 100;
          if (tl <= 0) {
            scoreRef.current = Math.max(0, scoreRef.current - 10);
            streakRef.current = 0;
            changed = true;
            missed = true;
          } else {
            next.push({ ...c, timeLeft: tl });
          }
        }
        if (changed) {
          sync();
          if (missed) triggerShake();
          if (scoreRef.current <= 0) setTimeout(endGame, 0);
        }
        return next;
      });
    }, 100);

    scheduleSpawn();
  }, [endGame, scheduleSpawn, sync, triggerShake]);

  const answer = useCallback(
    (id: number, correct: boolean) => {
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, result: correct ? "good" : "bad" } : c))
      );
      if (correct) {
        resolvedRef.current += 1;
        streakRef.current += 1;
        bestStreakRef.current = Math.max(bestStreakRef.current, streakRef.current);
        const comboBonus = Math.min(5, streakRef.current - 1);
        scoreRef.current = Math.min(100, scoreRef.current + 5 + comboBonus);
        levelRef.current = Math.floor(resolvedRef.current / 8) + 1;
      } else {
        streakRef.current = 0;
        scoreRef.current = Math.max(0, scoreRef.current - 15);
        triggerShake();
      }
      sync();
      setTimeout(() => {
        setCards((prev) => prev.filter((c) => c.id !== id));
        if (scoreRef.current <= 0) endGame();
      }, 750);
    },
    [endGame, sync, triggerShake]
  );

  // Limited-use power-up: instantly resolves the single most urgent open
  // alert (critical first, then soonest to expire) — a live demonstration
  // of what Oscar does automatically, dropped into the middle of the game.
  const callOscar = useCallback(() => {
    if (oscarChargesRef.current <= 0) return;
    setCards((prev) => {
      const open = prev.filter((c) => !c.result);
      if (open.length === 0) return prev;
      const rank = (c: Card) => (c.alert.tone === "crit" ? 0 : c.alert.tone === "warn" ? 1 : 2);
      const target = [...open].sort((a, b) => rank(a) - rank(b) || a.timeLeft - b.timeLeft)[0];

      oscarChargesRef.current -= 1;
      resolvedRef.current += 1;
      streakRef.current += 1;
      bestStreakRef.current = Math.max(bestStreakRef.current, streakRef.current);
      scoreRef.current = Math.min(100, scoreRef.current + 5);
      levelRef.current = Math.floor(resolvedRef.current / 8) + 1;
      sync();

      const id = target.id;
      setTimeout(() => {
        setCards((p) => p.filter((c) => c.id !== id));
      }, 900);

      return prev.map((c) => (c.id === target.id ? { ...c, result: "oscar" } : c));
    });
  }, [sync]);

  useEffect(() => () => stopLoops(), [stopLoops]);

  const barColor =
    score > 60 ? "bg-brand-500" : score > 30 ? "bg-amber-500" : "bg-red-500";

  return (
    <section id="game" className="border-y border-line bg-mist py-20 md:py-28">
      <Container className="max-w-3xl">
        <div className="text-center">
          <Reveal>
            <span className="kicker text-brand-600">Playable demo</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
              You&rsquo;re the District Manager.{" "}
              <span className="text-brand-600">Can you keep up?</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-slate">
              Alerts are flying in across your locations. Triage them before your
              score tanks. This is the chaos Oscar handles automatically — 24/7,
              without breaking a sweat.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div
            onAnimationEnd={() => setShaking(false)}
            className={`mt-10 rounded-[20px] border border-line bg-white p-5 shadow-panel sm:p-6 ${
              shaking ? "animate-shake" : ""
            }`}
          >
            {/* HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Stat label="Score" value={score} tone="navy" />
              <div className="flex items-center gap-6">
                <Stat label="Level" value={level} tone="brand" />
                <Stat label="Resolved" value={resolved} tone="emerald" />
                <StreakStat streak={streak} />
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${barColor}`}
                style={{ width: `${score}%` }}
              />
            </div>

            {view === "playing" && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium text-muted">
                  Overwhelmed? Let Oscar catch one for you.
                </p>
                <button
                  type="button"
                  onClick={callOscar}
                  disabled={oscarCharges === 0 || cards.every((c) => c.result)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold text-brand-700 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="bolt" width={13} height={13} />
                  Call Oscar
                  <span className="tnum rounded-full bg-white px-1.5 py-0.5 text-[10px]">
                    ×{oscarCharges}
                  </span>
                </button>
              </div>
            )}

            {/* Arena */}
            <div className="mt-5 min-h-[240px]">
              {view === "playing" && (
                <div className="flex flex-col gap-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {cards.map((c) => (
                      <GameCard key={c.id} card={c} onAnswer={answer} />
                    ))}
                  </AnimatePresence>
                  {cards.length === 0 && (
                    <p className="py-16 text-center text-sm font-medium text-muted">
                      Watching for signals…
                    </p>
                  )}
                </div>
              )}

              {view !== "playing" && (
                <div className="grid place-items-center rounded-xl border border-line bg-mist px-6 py-12 text-center">
                  {view === "idle" ? (
                    <>
                      <Image
                        src="/logos/oscar-mascot.avif"
                        alt=""
                        width={96}
                        height={96}
                        aria-hidden
                        className="h-24 w-24 object-contain"
                      />
                      <div className="mt-4 text-xl font-extrabold text-navy">
                        34 locations need you
                      </div>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate">
                        Alerts appear below. Pick the right action before time
                        runs out. Miss too many and your score tanks — but
                        you&rsquo;ve got a few Call Oscar assists if it gets
                        overwhelming.
                      </p>
                      <button
                        onClick={start}
                        className="btn-primary mt-6 rounded-lg px-7 py-3 text-[15px]"
                      >
                        Start your shift
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl">
                        {resolved >= 20 ? "🏆" : resolved >= 10 ? "👍" : "😅"}
                      </div>
                      <div className="mt-4 text-xl font-extrabold text-navy">
                        {resolved >= 20
                          ? "Incredible shift!"
                          : resolved >= 10
                            ? "Decent shift!"
                            : "Rough day at the office"}
                      </div>
                      <p className="mt-2 text-sm text-slate">
                        You resolved{" "}
                        <span className="font-bold text-navy">{resolved} alerts</span>{" "}
                        across{" "}
                        <span className="font-bold text-navy">
                          {level} {level === 1 ? "level" : "levels"}
                        </span>
                        .
                      </p>
                      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted">
                        <span>
                          Longest streak{" "}
                          <span className="font-bold text-navy">{bestStreak}</span>
                        </span>
                        <span>
                          Oscar assists used{" "}
                          <span className="font-bold text-navy">{3 - oscarCharges}</span>
                        </span>
                      </div>
                      <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted">
                        Oscar would&rsquo;ve caught every one of these — instantly,
                        24/7, across every location, without missing a beat.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          onClick={start}
                          className="btn-ghost rounded-lg px-6 py-3 text-[15px]"
                        >
                          Play again
                        </button>
                        <a
                          href={site.links.demo}
                          className="btn-primary rounded-lg px-6 py-3 text-[15px]"
                        >
                          Let Oscar handle this
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function StreakStat({ streak }: { streak: number }) {
  const color = streak >= 5 ? "text-red-600" : streak >= 3 ? "text-amber-600" : "text-muted";
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Streak</span>
      <motion.span
        key={streak}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`tnum text-xl font-extrabold ${color}`}
      >
        {streak > 0 ? `🔥${streak}` : 0}
      </motion.span>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "navy" | "brand" | "emerald";
}) {
  const color =
    tone === "brand"
      ? "text-brand-600"
      : tone === "emerald"
        ? "text-emerald-600"
        : "text-navy";
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className={`tnum text-xl font-extrabold ${color}`}>{value}</span>
    </div>
  );
}

function GameCard({
  card,
  onAnswer,
}: {
  card: Card;
  onAnswer: (id: number, correct: boolean) => void;
}) {
  const pct = Math.max(0, (card.timeLeft / card.total) * 100);
  const s = toneStyle[card.alert.tone];
  const barCol = pct > 50 ? s.bar : pct > 25 ? "#f59e0b" : "#dc2626";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-xl border p-4 transition-colors ${
        card.result === "good"
          ? "border-emerald-300 bg-emerald-50"
          : card.result === "bad"
            ? "border-red-300 bg-red-50"
            : card.result === "oscar"
              ? "border-brand-300 bg-brand-50"
              : "border-line bg-white"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${s.chip}`}
        >
          {s.label}
        </span>
        <span className="text-[13.5px] font-semibold text-ink">
          {card.alert.text}
        </span>
      </div>

      {!card.result ? (
        <>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-linear"
              style={{ width: `${pct}%`, background: barCol }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {card.alert.options.map((o) => (
              <button
                key={o.label}
                onClick={() => onAnswer(card.id, o.correct)}
                className="rounded-lg border border-line bg-mist px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      ) : card.result === "oscar" ? (
        <div className="mt-2 flex items-center gap-1.5 text-[12.5px] font-bold text-brand-700">
          <Icon name="bolt" width={12} height={12} />
          Oscar caught this instantly
        </div>
      ) : (
        <div
          className={`mt-2 text-[12.5px] font-bold ${
            card.result === "good" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {card.result === "good" ? "✓ Good call" : "✗ Wrong move"}
        </div>
      )}
    </motion.div>
  );
}
