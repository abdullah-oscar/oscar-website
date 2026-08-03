import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { PipelineVisual } from "@/components/site/PipelineVisual";
import { integrationProviders, stats, steps } from "@/lib/site";
import { integrationLogos } from "@/lib/assets";

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: steps */}
          <div>
            <Reveal>
              <span className="kicker text-brand-600">How it works</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.3rem]">
                Up and running in{" "}
                <span className="text-brand-600">30 days, not months</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-slate">
                No rip-and-replace. Oscar fits into your current stack and adapts
                to your workflows.
              </p>
            </Reveal>

            <ol className="mt-9">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i}>
                  <li className="relative flex gap-5 pb-8 last:pb-0">
                    {i < steps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-line"
                      />
                    )}
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-sm font-extrabold text-brand-700">
                      {s.n}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-lg font-bold">{s.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Right: pipeline visual */}
          <Reveal delay={2}>
            <div>
              <PipelineVisual />
              <IntegrationsStrip />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Provider strip under the pipeline. Logos are discovered from
 * /public/integrations at build time — drop files in and they render
 * with no code change; until then the generic wordmarks stand in.
 */
function IntegrationsStrip() {
  const logos = integrationLogos();
  return (
    <div className="mt-5 rounded-xl border border-line bg-white px-4 py-3.5 shadow-e1">
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
        Works with <span className="tnum text-brand-700">{stats.integrations}+</span>{" "}
        providers you already use
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {logos.length > 0
          ? logos.map((l) => (
              // Logo dimensions vary and are unknown at build time; CSS sizes them.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={l.src}
                src={l.src}
                alt={l.name}
                loading="lazy"
                decoding="async"
                className="h-6 w-auto max-w-[96px] object-contain"
              />
            ))
          : integrationProviders.map((p) => (
              <span key={p} className="text-[12px] font-semibold text-slate/70">
                {p}
              </span>
            ))}
      </div>
    </div>
  );
}
