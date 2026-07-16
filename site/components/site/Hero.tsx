import { LiveDashboard } from "./LiveDashboard";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { heroStats, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-24">
      {/* soft brand wash — light, not a dark glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-brand-50 to-white" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        {/* Left */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500 animate-blink" />
              AI-powered franchise intelligence
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-6 text-balance text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.35rem]">
              Stop managing data.
              <br />
              Start <span className="text-brand-600">commanding</span> your
              business.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-5 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-slate">
              Oscar is the AI analyst that watches every location 24/7 —
              catching revenue leaks, labor inefficiencies, and compliance
              risks automatically, so your team fixes problems before they cost
              you.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.links.demo}
                className="btn-primary rounded-lg px-6 py-3.5 text-[15px]"
              >
                Request a demo
              </a>
              <a
                href="#how"
                className="btn-ghost rounded-lg px-6 py-3.5 text-[15px]"
              >
                See how it works
                <Icon name="arrow" width={16} height={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-7">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-tight text-navy">
                    {s.value}
                  </dd>
                  <dd className="mt-1 max-w-[10rem] text-xs leading-snug text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — dashboard. Extra padding reserves room for the floating
            cards so they sit beside the panel rather than on top of it. */}
        <div className="relative lg:pb-12 lg:pl-10">
          <Reveal delay={2}>
            <LiveDashboard />
          </Reveal>

          <div className="pointer-events-none absolute -left-2 bottom-0 hidden animate-float lg:block">
            <FloatCard
              icon="bolt"
              label="Issues auto-resolved this week"
              value="24 across 18 locations"
            />
          </div>
          <div className="pointer-events-none absolute -right-4 -top-7 hidden animate-float-slow xl:block">
            <FloatCard
              icon="check"
              label="Live since"
              value="3 days after sign-up"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  icon,
  label,
  value,
}: {
  icon: "bolt" | "check";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-panel">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Icon name={icon} width={18} height={18} />
      </span>
      <div className="leading-tight">
        <div className="text-[10px] font-medium text-muted">{label}</div>
        <div className="text-[13px] font-extrabold text-navy">{value}</div>
      </div>
    </div>
  );
}
