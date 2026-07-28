import { AppFilm } from "./showcase/AppFilm";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";

const proof = [
  "Reads the messy data you already have",
  "Learns what normal looks like per location",
  "Routes the fix to the right person",
];

/**
 * "What Oscar sees" — the product moment.
 *
 * The film gets the full container width rather than sharing a two-column
 * split with the copy: a four-KPI dashboard squeezed into half a grid is
 * where product screenshots go to become unreadable.
 *
 * NOTE: <AppFilm /> is an illustrative reconstruction, not real screenshots.
 * When real captures land in /public/product they can replace individual
 * scenes without touching the timeline.
 */
export function CommandCenter() {
  return (
    <section
      id="command"
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white via-mist to-white py-20 md:py-28"
    >
      {/* z-0, not -z-10: a negative z-index child escapes this section's
          (non-)stacking context and paints beneath its own background. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-fine mask-radial opacity-[0.55]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="kicker text-brand-600">What Oscar sees</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem]">
              Every location. Every shift.{" "}
              <span className="text-brand-600">All at once.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-slate">
              While your district leaders sleep, Oscar is reconciling sales, labor,
              and compliance across the whole network — and surfacing only the
              handful of things that actually need a human.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-7 flex flex-wrap justify-center gap-2">
              {proof.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-ink shadow-e1 backdrop-blur-sm"
                >
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                    <Icon name="check" width={10} height={10} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="mt-14">
            <AppFilm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
