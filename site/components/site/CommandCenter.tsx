import { ProductShowcase } from "./ProductShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/icons";

/**
 * "What Oscar sees" — the product moment.
 *
 * NOTE: this is the natural home for real product screenshots. When they land
 * in /public/product, swap <ProductShowcase /> for the real thing (or keep the
 * live mocks beside a screenshot). Real always beats invented.
 */
export function CommandCenter() {
  return (
    <section id="command" className="border-b border-line bg-mist py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <span className="kicker text-brand-600">What Oscar sees</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-[3.3rem]">
                Every location. Every shift.{" "}
                <span className="text-brand-600">All at once.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-slate">
                While your district leaders sleep, Oscar is reconciling sales,
                labor, and compliance across the whole network — and surfacing
                only the handful of things that actually need a human.
              </p>
            </Reveal>

            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Reads the messy data you already have",
                "Learns what normal looks like per location",
                "Routes the fix to the right person, automatically",
              ].map((t, i) => (
                <Reveal key={t} delay={i + 2}>
                  <li className="flex items-center gap-3 text-[0.95rem] font-medium text-ink">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <Icon name="check" width={12} height={12} />
                    </span>
                    {t}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={2}>
            <ProductShowcase />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
