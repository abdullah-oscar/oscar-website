import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { valueProps, site } from "@/lib/site";

/**
 * The one deliberately dark moment on the page — mirrors the navy
 * "You already have data" band on the live oscar.ai site.
 */
export function WhyOscar() {
  return (
    <section id="why" className="bg-navy py-20 md:py-28">
      <Container>
        <Reveal>
          <span className="kicker text-brand-400">Why Oscar</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-[1.12] tracking-tight !text-white sm:text-4xl md:text-[2.6rem]">
            You already have the data. Oscar makes it{" "}
            <span className="text-brand-400">actionable.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-white/60">
            Built specifically for the complexity of multi-location operations.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v, i) => (
            <Reveal key={v.n} delay={i}>
              <article className="flex h-full flex-col rounded-xl bg-brand-50 p-6 transition-transform duration-300 hover:-translate-y-1">
                <span
                  aria-hidden
                  className="text-4xl font-extrabold leading-none text-brand-200"
                >
                  {v.n}
                </span>
                <h3 className="mt-4 text-[1.02rem] font-bold leading-snug">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {v.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* brand-blue call-out bar, straight from the live site */}
        <Reveal delay={2}>
          <div className="mt-4 flex flex-col items-start justify-between gap-6 rounded-xl bg-brand-500 p-8 md:flex-row md:items-center">
            <p className="max-w-2xl text-balance text-xl font-bold leading-snug text-white md:text-2xl">
              We&rsquo;ve automated thousands of workflows across thousands of
              locations — saving teams time, money, and guesswork.
            </p>
            <a
              href={site.links.demo}
              className="btn-navy shrink-0 rounded-full px-6 py-3.5 text-sm uppercase tracking-wider"
            >
              Request a demo
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
