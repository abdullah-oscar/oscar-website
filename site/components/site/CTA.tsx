import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { site } from "@/lib/site";

/** Light blue-tint closer with a navy button — mirrors the live site. */
export function CTA() {
  return (
    <section className="border-t border-line bg-brand-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <Reveal>
              <span className="kicker text-brand-600">Get started today</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
                Command your business, effortlessly.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 text-pretty leading-relaxed text-slate">
                Stop letting revenue leak through the cracks. Let Oscar automate
                the watching, the reporting, and the routing — so your team can
                focus on what actually drives growth.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="lock" width={15} height={15} className="text-brand-600" />
                  SOC 2 compliant
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" width={15} height={15} className="text-brand-600" />
                  Live in days
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" width={15} height={15} className="text-brand-600" />
                  No rip-and-replace
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={3}>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={site.links.demo}
                className="btn-navy rounded-full px-8 py-4 text-sm uppercase tracking-wider"
              >
                Request a demo
              </a>
              <a
                href={site.links.login}
                className="btn-ghost rounded-full px-8 py-4 text-sm uppercase tracking-wider"
              >
                Log in
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
