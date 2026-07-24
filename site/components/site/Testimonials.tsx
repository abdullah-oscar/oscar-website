"use client";

import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollColorText } from "@/components/ui/ScrollColorText";
import { Icon } from "@/components/ui/icons";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 16; // card width + gap-4
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="customers" className="bg-white py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Customers"
            title={<ScrollColorText text="What operators actually say" />}
            sub="Real results from real multi-unit operators — plus a few sample quotes standing in until more are in."
          />
          <div className="mb-1 flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
              className="grid size-11 place-items-center rounded-full border border-line text-navy transition-colors hover:border-brand-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:border-line disabled:hover:text-navy"
            >
              <Icon name="arrow" width={18} height={18} className="rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
              className="grid size-11 place-items-center rounded-full border border-line text-navy transition-colors hover:border-brand-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:border-line disabled:hover:text-navy"
            >
              <Icon name="arrow" width={18} height={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          className="[scrollbar-width:none] mask-fade-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name + t.role}
              delay={i % 3}
              className="w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-[46vw] lg:w-[27vw]"
            >
              <figure className="flex h-full flex-col justify-between rounded-[20px] border border-line bg-white p-7 shadow-sm">
                {t.sample && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full border border-line bg-mist px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                    Sample quote
                  </span>
                )}
                <blockquote className="flex-1 text-pretty text-[16px] font-medium leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <div>
                    <div className="text-[12.5px] font-bold text-navy">{t.name}</div>
                    <div className="text-[11px] text-muted">{t.role}</div>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-brand-100 bg-brand-50 text-[11px] font-extrabold text-brand-600">
                    {t.initials}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
