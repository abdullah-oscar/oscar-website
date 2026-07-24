"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OscarMascot } from "./OscarMascot";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const INTRO_MS = 2600;
const CYCLE_MS = 2000;
const TYPE_SPEED_MS = 22;

const INTRO_TEXT = "Hi, I’m Oscar — I watch every location, every shift.";

/** Quirky openers, picked at random per visit — same rhythm as the original,
 *  same pivot from an ostrich trait to Oscar's actual job. */
const introVariants = [
  ["Ostriches don’t", "bury their heads.", "Operators do."],
  ["Ostriches have the", "sharpest eyes on land.", "Oscar never blinks."],
  ["Ostriches can’t fly.", "They just watch, instead.", "So does Oscar."],
] as const;

/**
 * What Oscar is "catching" right now — drives the H1's rotating second
 * line, the chat bubble's specific detail, and the matching falling tile,
 * so all three always agree.
 */
const issues = [
  {
    label: "labor overages.",
    bubble: "Location #07 is 4% over on labor.",
    tone: "warn" as const,
    icon: "trend" as const,
    loc: "Loc #07",
    detail: "Labor 4% over",
    pos: { top: "38%", left: "-16%" },
  },
  {
    label: "void fraud.",
    bubble: "3 unusual voids just hit Location #14.",
    tone: "crit" as const,
    icon: "shield" as const,
    loc: "Loc #14",
    detail: "Void anomaly",
    pos: { top: "6%", left: "-8%" },
  },
  {
    label: "comp abuse.",
    bubble: "Comps are spiking at Location #22.",
    tone: "warn" as const,
    icon: "bolt" as const,
    loc: "Loc #22",
    detail: "Comps spiking",
    pos: { top: "24%", left: "76%" },
  },
  {
    label: "compliance risks.",
    bubble: "A break violation just hit Location #09.",
    tone: "warn" as const,
    icon: "lock" as const,
    loc: "Loc #09",
    detail: "Break violation",
    pos: { top: "66%", left: "2%" },
  },
];

const tileTone = {
  crit: { ring: "border-red-200", bg: "bg-red-50", fg: "text-red-600" },
  warn: { ring: "border-amber-200", bg: "bg-amber-50", fg: "text-amber-700" },
} as const;

export function Hero() {
  const [phase, setPhase] = useState<"intro" | "cycle">("intro");
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  // Index 0 on the server (stable for hydration); randomized on the client
  // right after mount so repeat visits don't always see the same opener.
  const [introIdx, setIntroIdx] = useState(0);

  useEffect(() => {
    setIntroIdx(Math.floor(Math.random() * introVariants.length));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhase("cycle"), INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "cycle") return;
    const int = setInterval(() => {
      setIndex((i) => (i + 1) % issues.length);
    }, CYCLE_MS);
    return () => clearInterval(int);
  }, [phase]);

  // Types out the bubble's current line — intro message first, then each
  // issue's detail line as the cycle rotates.
  useEffect(() => {
    const target = phase === "intro" ? INTRO_TEXT : issues[index].bubble;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [phase, index]);

  const active = issues[index];

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-6 md:pt-32 md:pb-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-50 to-white" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
        {/* Left */}
        <div>
          {/* No text-balance here: it fights the explicit <br>s and produces
              ragged lines. The breaks are authored deliberately. */}
          <Reveal>
            <h1 className="min-h-[3.3em] text-[3rem] font-extrabold leading-[1.0] tracking-[-0.01em] sm:text-[3.8rem] lg:text-[4.6rem] sm:min-h-[3em]">
              <AnimatePresence mode="wait">
                {phase === "intro" ? (
                  <motion.span
                    key="intro-h1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    {introVariants[introIdx][0]}
                    <br />
                    {introVariants[introIdx][1]}
                    <br />
                    <span className="text-brand-600">{introVariants[introIdx][2]}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="cycle-h1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    Oscar already caught
                    <br />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="block text-brand-600"
                      >
                        {active.label}
                      </motion.span>
                    </AnimatePresence>
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-slate">
              You can&rsquo;t watch every location at once. Oscar can — and his
              eyes never close. He catches revenue leaks, labor blowouts, and
              compliance risks the moment they happen, then tells the right
              person exactly what to do.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.links.demo}
                className="btn-primary rounded-lg px-6 py-3.5 text-[15px]"
              >
                Request a demo
              </a>
              <a
                href="#platform"
                className="btn-ghost rounded-lg px-6 py-3.5 text-[15px]"
              >
                See what Oscar catches
                <Icon name="arrow" width={16} height={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — Oscar, watching. Bottom-aligned + clipped so he reads as
            craning up into frame rather than floating. */}
        <div className="relative order-first flex justify-center lg:order-none lg:block">
          <div className="relative mx-auto w-full max-w-[330px]">
            <Reveal delay={2}>
              <OscarMascot className="w-full" />
            </Reveal>

            {/* Oscar's own chat bubble — introduces himself, then cycles
                through what he's catching right now. Text types out rather
                than fading in. */}
            <div
              className="pointer-events-none absolute hidden w-[210px] xl:block"
              style={{ top: "-9%", left: "56%" }}
            >
              <div className="relative min-h-[3.6rem] rounded-2xl border border-line bg-white px-4 py-3 shadow-panel">
                <span className="absolute -bottom-1.5 left-6 size-3 rotate-45 border-b border-r border-line bg-white" />
                <p className="text-[13px] font-semibold leading-snug text-ink">
                  {typed}
                  <span className="ml-0.5 inline-block w-[2px] animate-blink bg-navy align-middle h-[13px]" />
                </p>
              </div>
            </div>

            {/* the tile matching whatever Oscar's currently catching */}
            <AnimatePresence mode="wait">
              {phase === "cycle" && (
                <motion.div
                  key={index}
                  className="pointer-events-none absolute hidden xl:block"
                  style={active.pos}
                  initial={{ opacity: 0, y: -14, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-line bg-white/95 py-2 pl-2 pr-3.5 shadow-lg shadow-navy/10 backdrop-blur-sm">
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border ${tileTone[active.tone].ring} ${tileTone[active.tone].bg} ${tileTone[active.tone].fg}`}
                    >
                      <Icon name={active.icon} width={14} height={14} />
                    </span>
                    <span>
                      <span className="block text-[11.5px] font-extrabold leading-tight text-navy">
                        {active.loc}
                      </span>
                      <span className="block text-[10.5px] font-medium leading-tight text-slate">
                        {active.detail}
                      </span>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* the line that lands the idea */}
          <Reveal delay={4}>
            <p className="mt-2 text-center text-[13px] font-semibold text-muted">
              His eyes never close.{" "}
              <span className="text-brand-600">Move your cursor.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
