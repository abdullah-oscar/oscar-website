import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="customers" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          kicker="Customers"
          title="What operators actually say"
          sub="Real results from real multi-unit operators."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* Lead quote on brand blue — the signature block from the live site */}
          <Reveal>
            <figure className="flex h-full flex-col rounded-[20px] bg-brand-500 p-8 md:p-10">
              <div className="text-lg leading-none text-white/80" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote className="mt-6 flex-1 text-pretty text-xl font-semibold leading-snug text-white md:text-[1.6rem]">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-white/25 pt-6">
                <span className="grid size-11 place-items-center rounded-full bg-white/15 text-xs font-extrabold text-white">
                  {lead.initials}
                </span>
                <div>
                  <div className="text-sm font-bold text-white">{lead.name}</div>
                  <div className="text-xs text-white/70">{lead.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-4">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={i + 1}>
                <figure className="flex h-full flex-col rounded-[20px] border border-line bg-white p-8">
                  <div className="text-base leading-none text-amber-400" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid size-11 place-items-center rounded-full border-2 border-brand-100 bg-brand-50 text-xs font-extrabold text-brand-600">
                      {t.initials}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-navy">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
