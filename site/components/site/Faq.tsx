"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { faqs, site } from "@/lib/site";

/**
 * FAQ — a hairline list, not a stack of cards.
 *
 * The previous version boxed every question in its own bordered card and
 * filled the open one with brand-50 behind a brand-200 border. Two framing
 * devices (a box AND a fill) plus a filled circular toggle is a lot of
 * chrome to say "this one is open", and it read as dated.
 *
 * Now: rules between rows, no boxes, no fills. Open state is carried by
 * the question turning brand and the chevron rotating — the answer
 * appearing is itself the strongest signal that anything happened.
 *
 * Type is on the site scale too: questions are `font-semibold` like every
 * other heading here, not `font-bold` at an arbitrary 1.02rem, which is
 * what made this section's text feel like it came from a different kit.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              kicker="FAQ"
              title="Questions, answered"
              sub="Everything you need to know about putting Oscar to work across your locations."
            />
            <Reveal delay={3}>
              <a
                href={site.links.demo}
                className="btn-ghost mt-8 inline-flex rounded-lg px-5 py-2.5 text-sm"
              >
                Still curious? Talk to us
                <Icon name="arrow" width={15} height={15} />
              </a>
            </Reveal>
          </div>

          {/* Top rule included so the first row reads as part of a list
              rather than as a floating heading. */}
          <ul className="flex flex-col border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i % 3} as="li" className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[15.5px] font-semibold leading-snug tracking-[-0.01em] transition-colors ${
                        isOpen ? "text-brand-600" : "text-navy group-hover:text-brand-600"
                      }`}
                    >
                      {f.q}
                    </span>
                    <motion.span
                      aria-hidden
                      className={`mt-0.5 shrink-0 transition-colors ${
                        isOpen ? "text-brand-500" : "text-muted group-hover:text-slate"
                      }`}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                    >
                      <Icon name="chevron" width={16} height={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                      >
                        {/* max-w in ch: long answers stay readable instead of
                            running the full width of the column. */}
                        <p className="max-w-[62ch] pb-6 pr-10 text-[14.5px] leading-relaxed text-slate">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
