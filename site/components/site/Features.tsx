import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconKey } from "@/components/ui/icons";
import { features } from "@/lib/site";

export function Features() {
  return (
    <section id="platform" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <SectionHeading
            kicker="What Oscar detects"
            title={
              <>
                Everything your team shouldn&rsquo;t have to{" "}
                <span className="text-brand-600">chase manually</span>
              </>
            }
          />
          <Reveal delay={2}>
            <p className="text-pretty leading-relaxed text-slate md:pb-2">
              Oscar monitors your operations around the clock — surfacing the
              exact issues that eat into revenue, inflate labor cost, and create
              compliance risk. One analyst that never sleeps, across every
              location.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i % 3}>
              <article className="card-lift group flex h-full flex-col rounded-xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-navy text-white transition-colors group-hover:bg-brand-500">
                    <Icon name={f.icon as IconKey} width={22} height={22} />
                  </span>
                  {f.metric && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      {f.metric}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-[1.02rem] font-bold leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {f.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
