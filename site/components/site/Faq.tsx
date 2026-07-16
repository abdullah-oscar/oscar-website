"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { faqs, site } from "@/lib/site";

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

          <ul className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i % 3} as="li">
                  <div
                    className={`overflow-hidden rounded-xl border transition-colors ${
                      isOpen
                        ? "border-brand-200 bg-brand-50"
                        : "border-line bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[1.02rem] font-bold text-navy">
                        {f.q}
                      </span>
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                            : "border-line-2 text-slate"
                        }`}
                      >
                        <Icon name="plus" width={15} height={15} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
