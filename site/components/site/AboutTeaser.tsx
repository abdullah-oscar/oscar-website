import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { site, stats } from "@/lib/site";

/** Short homepage band pointing at /about — the story is the credibility. */
export function AboutTeaser() {
  const chips = [
    `${stats.locationsLabel} locations`,
    `${stats.brandsLabel} brands`,
    `Founded ${site.founded}`,
  ];
  return (
    <section className="border-b border-line bg-brand-50 py-16 md:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <Reveal>
            <span className="kicker text-brand-600">Our story</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">
              Oscar started inside a Dunkin&rsquo; franchise
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 text-pretty leading-relaxed text-slate">
              Built to fix one operator&rsquo;s disconnected reporting, proven in
              his own locations, and now watching{" "}
              <span className="tnum font-semibold text-navy">
                {stats.locationsLabel}
              </span>{" "}
              of them. Built by restaurant operators, for restaurant operators.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="tnum inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-brand-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={3}>
          <a
            href="/about"
            className="btn-ghost shrink-0 rounded-full px-7 py-3.5 text-sm"
          >
            Meet the team
            <Icon name="arrow" width={15} height={15} />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
