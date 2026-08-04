"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { OscarMascot } from "./OscarMascot";
import { HeroBackdrop } from "./HeroBackdrop";
import { Icon, type IconKey } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/* ================================================================
   The hero.

   Two acts share the right-hand stage and alternate every two beats:

     FLOOR  — 36 locations breathing, one surfacing an issue, then
              getting routed to a named person.
     OSCAR  — the mascot, saying out loud what he just caught.

   Alternating rather than picking one keeps the brand character in the
   hero without giving up the product story. Oscar also takes the intro
   beat on his own, so the first thing a visitor sees is him introducing
   himself — then he shows them the floor.

   Whichever act is on stage, the headline's rotating noun and the visual
   are describing the same issue at the same moment. That sync is what
   makes it read as a live system rather than two loops sharing a section.
   ================================================================ */

const INTRO_MS = 2600;
const CYCLE_MS = 3600;
const TYPE_MS = 24;

const INTRO_TEXT = "Hi, I'm Oscar — I watch every location, every shift.";

/* Quirky openers, picked at random per visit — the brand's own voice.
   Two lines, not three: the cycle headline below is two lines, and the
   tallest variant here sets the min-height for both. A three-line opener
   bought a permanent gap under every two-line headline. */
const introVariants = [
  ["Ostriches don't blink.", "Neither does Oscar."],
  ["Sharpest eyes on land.", "Now pointed at your P&L."],
  ["Ostriches can't fly.", "They watch instead."],
] as const;

type Tone = "warn" | "crit";

type Issue = {
  /** Completes "Oscar caught ___" — kept short so the headline stays two lines. */
  noun: string;
  loc: string;
  detail: string;
  /** What Oscar says out loud during his act. */
  bubble: string;
  tone: Tone;
  icon: IconKey;
  owner: string;
  /**
   * Every tile currently alerting, as indexes into the 36-tile floor. The
   * first one is `loc`; the rest are the other locations caught by the same
   * sweep. The status pill counts these, so the number a visitor reads and
   * the tiles they can see lighting up are always the same fact.
   */
  nodes: number[];
};

const issues: Issue[] = [
  {
    noun: "comp abuse.",
    loc: "Location #22",
    detail: "Comps spiking +18% vs normal",
    bubble: "Comps are spiking at Location #22.",
    tone: "warn",
    icon: "bolt",
    owner: "Dana R.",
    nodes: [21, 4, 29],
  },
  {
    noun: "void fraud.",
    loc: "Location #14",
    detail: "3 unusual voids in 20 minutes",
    bubble: "3 unusual voids just hit Location #14.",
    tone: "crit",
    icon: "shield",
    owner: "Marcus T.",
    nodes: [13, 26],
  },
  {
    noun: "labor creep.",
    loc: "Location #07",
    detail: "Labor running 4% over target",
    bubble: "Location #07 is 4% over on labor.",
    tone: "warn",
    icon: "trend",
    owner: "Priya N.",
    nodes: [6, 11, 24, 33],
  },
  {
    noun: "a skipped break.",
    loc: "Location #09",
    detail: "Meal break missed on shift 2",
    bubble: "A break violation just hit Location #09.",
    tone: "crit",
    icon: "lock",
    owner: "Sam K.",
    nodes: [8],
  },
];

const toneTile: Record<Tone, string> = {
  warn: "bg-amber-400",
  crit: "bg-red-500",
};
const toneChip: Record<Tone, string> = {
  warn: "border-amber-200 bg-amber-50 text-amber-700",
  crit: "border-red-200 bg-red-50 text-red-600",
};
const toneRing: Record<Tone, string> = {
  warn: "ring-amber-400/50",
  crit: "ring-red-500/50",
};

const NODES = 36;
const FADE = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export function Hero() {
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<"intro" | "cycle">("intro");
  const [index, setIndex] = useState(0);
  // Fixed on the server so hydration matches; randomized right after mount
  // so repeat visits don't always open on the same line.
  const [introIdx, setIntroIdx] = useState(0);
  const [checks, setChecks] = useState(1247);
  const [typed, setTyped] = useState("");
  const [feedTyped, setFeedTyped] = useState("");

  /* The running feed of what Oscar has picked up. Newest first, capped at
     three: the point of it is pace — alerts piling up while you read —
     which one card replacing itself could never show. */
  const [feed, setFeed] = useState<{ id: number; issue: Issue }[]>([]);
  const feedSeq = useRef(0);

  useEffect(() => {
    setIntroIdx(Math.floor(Math.random() * introVariants.length));
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("cycle");
      return;
    }
    const t = setTimeout(() => setPhase("cycle"), INTRO_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  /* Surface the next issue, push it onto the feed, move on. */
  useEffect(() => {
    if (phase !== "cycle" || reduced) return;
    const advance = setTimeout(() => setIndex((i) => (i + 1) % issues.length), CYCLE_MS);
    return () => clearTimeout(advance);
  }, [phase, index, reduced]);

  useEffect(() => {
    if (phase !== "cycle") return;
    feedSeq.current += 1;
    const entry = { id: feedSeq.current, issue: issues[index] };
    setFeed((f) => [entry, ...f].slice(0, 3));
  }, [phase, index]);

  /* The counter that never stops — the cheapest possible proof of "always on". */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setChecks((c) => c + 1 + Math.floor(Math.random() * 3)),
      700
    );
    return () => clearInterval(id);
  }, [reduced]);

  const active = issues[index];
  const alerting = active.nodes.length;

  /* Oscar owns the intro, then the stage alternates two beats at a time. */
  const act: "floor" | "oscar" =
    phase === "intro" || Math.floor(index / 2) % 2 === 1 ? "oscar" : "floor";

  const bubbleText = phase === "intro" ? INTRO_TEXT : active.bubble;

  /* Types out whatever Oscar is currently saying. */
  useEffect(() => {
    if (act !== "oscar") return;
    if (reduced) {
      setTyped(bubbleText);
      return;
    }
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(bubbleText.slice(0, i));
      if (i >= bubbleText.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [act, bubbleText, reduced]);

  /* The same typing tic on the newest line of the feed — it is the detail
     that makes an alert feel like it just landed rather than like it was
     always sitting there. Keyed on the entry id, not the array, so it does
     not restart when an older item drops off the end. */
  const newest = feed[0];
  useEffect(() => {
    if (act !== "floor" || !newest) return;
    const text = newest.issue.detail;
    if (reduced) {
      setFeedTyped(text);
      return;
    }
    setFeedTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setFeedTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [act, newest?.id, reduced]);

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-20">
      <HeroBackdrop />

      {/* z-10: HeroBackdrop sits at z-0, above the section background. */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* ---------------- left: the claim ---------------- */}
        <div>
          {/* Opens calm, then reports what is actually alerting — and the count
              is `active.nodes.length`, the same array the floor lights up, so
              the pill can never claim a number the tiles contradict. */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1 pl-2 pr-3 text-[12px] font-medium text-slate shadow-e1 backdrop-blur-sm">
              <span className="relative grid size-4 place-items-center">
                <span
                  className={`size-1.5 rounded-full ${
                    phase === "intro"
                      ? "bg-emerald-500"
                      : active.tone === "crit"
                        ? "bg-red-500"
                        : "bg-amber-400"
                  }`}
                />
                {!reduced && <span className="pulse-ring absolute inset-0" />}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase === "intro" ? "intro" : alerting}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {phase === "intro" ? (
                    <>Watching all {NODES} locations right now</>
                  ) : (
                    <>
                      Alerting{" "}
                      <b className="num font-semibold text-navy">{alerting}</b>{" "}
                      {alerting === 1 ? "location" : "locations"} right now
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </Reveal>

          {/* No text-balance: the line breaks are authored deliberately. */}
          <Reveal>
            <h1 className="mt-5 min-h-[2.15em] text-[2.9rem] font-semibold leading-[1.02] sm:text-[3.6rem] lg:text-[4.3rem]">
              <AnimatePresence mode="wait">
                {phase === "intro" ? (
                  <motion.span
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    {introVariants[introIdx][0]}
                    <br />
                    <span className="text-brand-600">{introVariants[introIdx][1]}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="cycle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block"
                  >
                    {/* "Oscar caught", not "Oscar already caught": the longer
                        line wrapped at lg and pushed the noun to a third row. */}
                    Oscar caught
                    <br />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-brand-600"
                      >
                        {active.noun}
                      </motion.span>
                    </AnimatePresence>
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-slate">
              An ostrich has the largest eye of any animal on land, and it never
              looks away. Neither does Oscar. He watches every location at once,
              catches the revenue leaks, labor creep and compliance slips the
              moment they surface, and hands the one person who can fix it the
              answer — before anyone thinks to go looking.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={site.links.demo} className="btn-primary rounded-lg px-6 py-3.5 text-[15px]">
                Request a demo
              </a>
              <a href="#command" className="btn-ghost rounded-lg px-6 py-3.5 text-[15px]">
                See what Oscar catches
                <Icon name="arrow" width={16} height={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* ---------------- right: the stage ---------------- */}
        <Reveal delay={2}>
          <div className="relative mx-auto w-full max-w-[440px]">
            {/* Fixed height: both acts are absolutely positioned inside it, so
                swapping them can never shove the headline around. */}
            <div className="relative min-h-[430px] sm:min-h-[450px] lg:min-h-[470px]">
              <AnimatePresence initial={false}>
                {act === "floor" ? (
                  <motion.div
                    key="floor"
                    className="absolute inset-0 flex items-center"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={FADE}
                  >
                    <div className="w-full overflow-hidden rounded-xl border border-line bg-white/95 shadow-stage backdrop-blur-sm">
                      <div className="flex items-center justify-between border-b border-line px-4 py-3">
                        <span className="flex items-center gap-2">
                          <span className="grid size-5 place-items-center rounded-md bg-navy text-white">
                            <Icon name="spark" width={11} height={11} />
                          </span>
                          <span className="text-[12.5px] font-semibold tracking-[-0.01em] text-navy">
                            Oscar is watching
                          </span>
                        </span>
                        <span className="num text-[10.5px] text-muted">
                          {checks.toLocaleString("en-US")} checks today
                        </span>
                      </div>

                      {/* the floor */}
                      <div className="px-4 pt-4">
                        <div className="grid grid-cols-9 gap-1.5">
                          {Array.from({ length: NODES }, (_, i) => {
                            const isActive = active.nodes.includes(i);
                            return (
                              <span key={i} className="relative aspect-square">
                                <span
                                  // No green "routed" state on the tiles any
                                  // more — the feed below carries that, and
                                  // having both say it split the eye in two.
                                  className={`absolute inset-0 rounded-[3px] transition-all duration-500 ${
                                    isActive
                                      ? `${toneTile[active.tone]} scale-125`
                                      : "bg-brand-300 animate-breathe"
                                  }`}
                                  style={
                                    isActive
                                      ? undefined
                                      : {
                                          animationDelay: `${((i % 9) * 0.19 + Math.floor(i / 9) * 0.31).toFixed(2)}s`,
                                        }
                                  }
                                />
                                {isActive && !reduced && (
                                  <span
                                    className={`absolute inset-0 rounded-[3px] ring-2 ${toneRing[active.tone]} animate-blink`}
                                  />
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* The feed. Newest on top, still typing itself out;
                          everything below it has already been routed to a
                          person. Three at once is what sells the pace — a
                          single card replacing itself said "one thing at a
                          time", which is the opposite of the pitch. */}
                      <div className="flex min-h-[150px] flex-col gap-1.5 px-4 pb-4 pt-3.5">
                        <AnimatePresence initial={false} mode="popLayout">
                          {feed.map((f, i) => {
                            const live = i === 0;
                            const extra = f.issue.nodes.length - 1;
                            return (
                              <motion.div
                                key={f.id}
                                layout
                                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                                animate={{ opacity: live ? 1 : 0.62, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex items-start gap-2.5 rounded-lg border bg-white p-2 ${
                                  live ? "border-line shadow-e1" : "border-line/70"
                                }`}
                              >
                                <span
                                  className={`grid size-6 shrink-0 place-items-center rounded-md border ${toneChip[f.issue.tone]}`}
                                >
                                  <Icon name={f.issue.icon} width={12} height={12} />
                                </span>

                                <span className="min-w-0 flex-1">
                                  <span className="flex items-center gap-1.5">
                                    <span className="text-[11.5px] font-semibold leading-tight text-navy">
                                      {f.issue.loc}
                                    </span>
                                    {extra > 0 && (
                                      <span className="num rounded-full bg-mist px-1.5 py-px text-[9px] font-semibold text-slate">
                                        +{extra}
                                      </span>
                                    )}
                                  </span>

                                  {live ? (
                                    <span className="block truncate text-[10.5px] leading-tight text-slate">
                                      {feedTyped}
                                      {!reduced && (
                                        <span className="ml-px inline-block h-[9px] w-[1.5px] translate-y-[1px] animate-caret bg-navy align-middle" />
                                      )}
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[10.5px] leading-tight text-slate">
                                      <span className="grid size-3 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                                        <Icon name="check" width={8} height={8} />
                                      </span>
                                      Routed to{" "}
                                      <b className="truncate font-semibold text-navy">
                                        {f.issue.owner}
                                      </b>
                                    </span>
                                  )}
                                </span>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="oscar"
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={FADE}
                  >
                    {/* Bottom-aligned and scaled about its own base, so he
                        stands on the floor of the stage at any breakpoint. */}
                    <div className="absolute bottom-0 left-1/2 origin-bottom -translate-x-1/2 scale-[0.6] sm:scale-[0.64]">
                      <OscarMascot />
                    </div>

                    {/* Oscar's bubble — positioned against the stage, not the
                        mascot, so the scale transform can't drag it around. */}
                    <div className="absolute left-[48%] top-[2%] w-[215px]">
                      <div className="relative min-h-[3.4rem] rounded-2xl border border-line bg-white px-4 py-3 shadow-e2">
                        <span className="absolute -bottom-1.5 left-6 size-3 rotate-45 border-b border-r border-line bg-white" />
                        <p className="text-[13px] font-medium leading-snug text-ink">
                          {typed}
                          {!reduced && (
                            <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] animate-caret bg-navy align-middle" />
                          )}
                        </p>
                      </div>
                    </div>

                    {/* the tile for whatever he's currently calling out */}
                    {phase === "cycle" && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={index}
                          className="absolute left-0 top-[46%]"
                          initial={{ opacity: 0, y: -12, scale: 0.9, rotate: -4 }}
                          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, y: 10, scale: 0.92 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-line bg-white/95 py-2 pl-2 pr-3.5 shadow-e2 backdrop-blur-sm">
                            <span
                              className={`grid size-7 shrink-0 place-items-center rounded-full border ${toneChip[active.tone]}`}
                            >
                              <Icon name={active.icon} width={13} height={13} />
                            </span>
                            <span>
                              <span className="block text-[11.5px] font-semibold leading-tight text-navy">
                                {active.loc}
                              </span>
                              <span className="block text-[10.5px] leading-tight text-slate">
                                {active.detail}
                              </span>
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-3 text-center text-[11px] text-muted">
              Simulated demo — illustrative locations and figures, not live
              customer data.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
