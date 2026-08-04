import { Container, SectionHeading } from "@/components/ui/primitives";
import { ScrollColorText } from "@/components/ui/ScrollColorText";
import { testimonials, type Testimonial } from "@/lib/site";

/**
 * Testimonials — two marquee rows travelling in opposite directions.
 *
 * Replaces the arrow-driven horizontal scroller: nothing moved unless a
 * visitor clicked, so most never saw past the third card. Counter-running
 * rows read as motion rather than as a control, and every quote gets seen
 * without anyone doing anything.
 *
 * Deliberately no star ratings, unlike the reference this is modelled on.
 * Seven of these eight quotes are marked `sample: true` — placeholders
 * standing in until the real ones land — and putting five gold stars on a
 * quote nobody actually said would be inventing a review. The chip stays
 * until the copy is real.
 *
 * Server-rendered on purpose: the whole thing is CSS animation, so there
 * is no reason to ship it as a Client Component.
 */

/* Both rows carry the FULL set rather than half each.
 *
 * The -50% keyframe only wraps without a visible gap if one copy of the row
 * is at least as wide as the viewport: the animation slides the strip by
 * exactly one copy, so a copy narrower than the screen runs out of content
 * before the next one arrives. Four cards (~1,450px) fails on any normal
 * desktop; eight (~2,900px) clears it comfortably.
 *
 * The second row is rotated so the two rows never show the same quote
 * side by side and don't read as a mirror of each other.
 */
const rowOne = testimonials;
const rowTwo = [...testimonials.slice(4), ...testimonials.slice(0, 4)];

export function Testimonials() {
  return (
    // overflow-hidden: the rows are wider than the viewport by design and
    // must not give the page a horizontal scrollbar.
    <section id="customers" className="overflow-hidden bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker="Customers"
          title={<ScrollColorText text="What operators actually say" />}
          sub="Real results from real multi-unit operators — plus a few sample quotes standing in until more are in."
        />
      </Container>

      <div className="mt-12 flex flex-col gap-4">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x pause-hover relative overflow-hidden">
      <div
        className={`flex w-max items-stretch gap-4 ${
          reverse ? "animate-marquee-r" : "animate-marquee-l"
        }`}
      >
        {items.map((t) => (
          <Card key={t.name + t.role} t={t} />
        ))}
        {items.map((t) => (
          <Card key={`dup-${t.name}${t.role}`} t={t} ariaHidden />
        ))}
      </div>
    </div>
  );
}

function Card({ t, ariaHidden = false }: { t: Testimonial; ariaHidden?: boolean }) {
  return (
    <figure
      aria-hidden={ariaHidden || undefined}
      className="flex w-[300px] shrink-0 flex-col justify-between rounded-[20px] border border-line bg-mist/60 p-5 sm:w-[350px]"
    >
      <div>
        {t.sample && (
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-line bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
            Sample quote
          </span>
        )}
        <blockquote className="text-pretty text-[13.5px] font-medium leading-relaxed text-ink">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center gap-2.5 border-t border-line pt-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-brand-100 bg-brand-50 text-[10px] font-extrabold text-brand-600">
          {t.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-bold text-navy">{t.name}</div>
          <div className="truncate text-[10.5px] text-muted">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
