import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconKey } from "@/components/ui/icons";
import { industries } from "@/lib/site";

export function Industries() {
  return (
    <section id="industries" className="border-b border-line bg-mist py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker="Who it's for"
          title={
            <>
              Built for operators running{" "}
              <span className="text-brand-600">dozens or hundreds</span> of
              locations
            </>
          }
          sub="From restaurants to healthcare, Oscar powers smarter operations across every industry with complex, multi-location workflows."
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.title} delay={i}>
              <article className="card-lift group flex h-full flex-col rounded-xl border border-line bg-white p-6">
                <span className="grid size-12 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={ind.icon as IconKey} width={24} height={24} />
                </span>
                <h3 className="mt-5 text-[1.02rem] font-bold leading-snug">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {ind.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
