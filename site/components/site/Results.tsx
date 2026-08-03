import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconKey } from "@/components/ui/icons";
import { useCases, type UseCase } from "@/lib/site";

/**
 * Results — Barry's use-case section. One substantiated case (the Burger
 * King savings) gets the featured card; claimed-but-unconfirmed stats
 * from the sell-in deck render with a visible "Pending verification"
 * chip until the detail lands (see the TODO on `useCases` in lib/site.ts).
 */

const coverage: { icon: IconKey; label: string }[] = [
  { icon: "trend", label: "Sales & Revenue" },
  { icon: "people", label: "Labor" },
  { icon: "shield", label: "Voids, discounts & fraud" },
  { icon: "box", label: "Product availability" },
  { icon: "chat", label: "Customer experience" },
];

export function Results() {
  const featured = useCases.find((u) => u.featured);
  const rest = useCases.filter((u) => !u.featured);

  return (
    <section id="results" className="border-b border-line bg-mist py-20 md:py-28">
      <Container>
        <SectionHeading
          kicker="Results"
          title="What operators get back"
          sub="Real recoveries, not dashboards for their own sake — and no additional staffing required to get them."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {featured && <FeaturedCase u={featured} />}

          <div className="flex flex-col gap-4">
            {rest.map((u, i) => (
              <Reveal key={u.stat + u.category} delay={i + 1}>
                <StatCase u={u} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={2}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13px] font-medium text-slate">
            <li className="kicker text-muted">Where Oscar watches</li>
            {coverage.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5">
                <Icon name={c.icon} width={14} height={14} className="text-brand-600" />
                {c.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function FeaturedCase({ u }: { u: UseCase }) {
  return (
    <Reveal>
      <article className="card-lift flex h-full flex-col justify-between rounded-[20px] border border-brand-100 bg-brand-50 p-8 shadow-panel">
        <div>
          <div className="flex items-center justify-between gap-3">
            <CategoryChip label={u.category} />
            <span className="grid size-9 place-items-center rounded-lg bg-brand-500 text-white">
              <Icon name={u.icon as IconKey} width={18} height={18} />
            </span>
          </div>
          <div className="num mt-6 text-6xl font-extrabold tracking-tight text-navy md:text-7xl">
            {u.stat}
          </div>
          <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand-700">
            {u.statLabel}
          </div>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-slate">
            {u.desc}
          </p>
        </div>
        <Link
          href="/#customers"
          className="mt-8 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-brand-700 transition-colors hover:text-brand-600"
        >
          Hear it from the franchisee
          <Icon name="arrow" width={14} height={14} />
        </Link>
      </article>
    </Reveal>
  );
}

function StatCase({ u }: { u: UseCase }) {
  return (
    <article className="card-lift flex items-start gap-4 rounded-[16px] border border-line bg-white p-5 shadow-e1">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600">
        <Icon name={u.icon as IconKey} width={18} height={18} />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="num text-2xl font-extrabold text-navy">{u.stat}</span>
          <span className="text-[12.5px] font-semibold text-slate">{u.statLabel}</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate">{u.desc}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <CategoryChip label={u.category} />
          {u.unverified && (
            <span className="inline-flex w-fit items-center rounded-full border border-line bg-mist px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
              Pending verification
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function CategoryChip({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-brand-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-700">
      {label}
    </span>
  );
}
