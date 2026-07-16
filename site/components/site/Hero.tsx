"use client";

import { motion } from "motion/react";
import { OscarMascot } from "./OscarMascot";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { heroStats, site } from "@/lib/site";

/** Alerts that drift around Oscar — the things he's catching while you read. */
const chips = [
  { tone: "crit", text: "Loc #14 — void anomaly", top: "8%", left: "-6%", delay: 0 },
  { tone: "warn", text: "Loc #07 — labor 4% over", top: "40%", left: "-14%", delay: 1.6 },
  { tone: "ok", text: "Loc #31 — resolved", top: "68%", left: "2%", delay: 3.1 },
  { tone: "warn", text: "Loc #22 — comps spiking", top: "22%", left: "74%", delay: 2.3 },
  { tone: "ok", text: "Report delivered", top: "58%", left: "78%", delay: 4.2 },
] as const;

const chipStyle = {
  crit: "border-red-200 bg-red-50 text-red-700",
  warn: "border-amber-200 bg-amber-50 text-amber-800",
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

const chipDot = {
  crit: "bg-signal-crit",
  warn: "bg-signal-warn",
  ok: "bg-signal-ok",
} as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-50 to-white" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
        {/* Left */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500 animate-blink" />
              Meet Oscar · AI-powered franchise intelligence
            </span>
          </Reveal>

          {/* No text-balance here: it fights the explicit <br>s and produces
              ragged lines. The breaks are authored deliberately. */}
          <Reveal delay={1}>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-[3.2rem] lg:text-[3.6rem]">
              Ostriches don&rsquo;t
              <br />
              bury their heads.
              <br />
              <span className="text-brand-600">Operators do.</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-slate">
              You can&rsquo;t watch every location at once. Oscar can — and his
              eyes never close. He catches revenue leaks, labor blowouts, and
              compliance risks the moment they happen, then tells the right
              person exactly what to do.
            </p>
          </Reveal>

          <Reveal delay={3}>
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

          <Reveal delay={4}>
            <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-7">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-tight text-navy">
                    {s.value}
                  </dd>
                  <dd className="mt-1 max-w-[10rem] text-xs leading-snug text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — Oscar, watching. Bottom-aligned + clipped so he reads as
            craning up into frame rather than floating. */}
        <div className="relative order-first flex justify-center lg:order-none lg:block">
          <div className="relative mx-auto w-full max-w-[330px]">
            <Reveal delay={2}>
              <OscarMascot className="w-full" />
            </Reveal>

            {/* alerts he's catching */}
            {chips.map((c) => (
              <motion.div
                key={c.text}
                className="pointer-events-none absolute hidden xl:block"
                style={{ top: c.top, left: c.left }}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                transition={{
                  duration: 5,
                  delay: c.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                  times: [0, 0.12, 0.8, 1],
                  ease: "easeOut",
                }}
              >
                <span
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11.5px] font-bold shadow-panel ${chipStyle[c.tone]}`}
                >
                  <span className={`size-1.5 rounded-full ${chipDot[c.tone]}`} />
                  {c.text}
                </span>
              </motion.div>
            ))}
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
