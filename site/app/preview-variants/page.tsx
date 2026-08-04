import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppFilm } from "@/components/site/showcase/AppFilm";
import { BriefVariant } from "@/components/site/showcase/variants/BriefVariant";
import { RackFocusVariant } from "@/components/site/showcase/variants/RackFocusVariant";
import { SignalFieldVariant } from "@/components/site/showcase/variants/SignalFieldVariant";
import { FrostedGateVariant } from "@/components/site/showcase/variants/FrostedGateVariant";

/* ================================================================
   Internal review page — four answers to "how much of the product
   goes on a public page?", side by side with what we ship today.

   Not linked from the nav and explicitly noindexed. Once a direction
   is picked, the winning variant moves into <CommandCenter /> and
   this route gets deleted.
   ================================================================ */

export const metadata: Metadata = {
  title: "Product preview — options for review",
  robots: { index: false, follow: false },
};

type Option = {
  n: string;
  name: string;
  pitch: string;
  shows: string;
  protects: string;
  cost: string;
  effort: string;
  frame: ReactNode;
};

const options: Option[] = [
  {
    n: "A",
    name: "The Brief",
    pitch:
      "No application on screen at all. Oscar is an analyst, so we show what an analyst hands you: a short written brief at 6am. The overnight work counts up, then collapses to three things worth a human.",
    shows: "That Oscar reads everything and interrupts you about almost nothing.",
    protects:
      "Everything structural. No navigation, no layout, no scoring, no category system — there is nothing to reconstruct from a screenshot.",
    cost:
      "Buyers who want to see software may read it as 'where's the product?'. Needs the demo CTA close by.",
    effort: "Lowest — it is prose in a card.",
    frame: <BriefVariant />,
  },
  {
    n: "B",
    name: "Rack Focus",
    pitch:
      "A film technique: the lens holds one card sharp and lets the rest of the plate fall away. Real density, real product feel, exactly one legible insight at any moment. The left rail is gone.",
    shows:
      "A working product with real breadth — the eye goes exactly where we point it.",
    protects:
      "The full-surface layout and the module list. Out-of-focus cards are skeleton geometry in the DOM, not blurred text, so removing the filter in devtools reveals nothing.",
    cost:
      "The six findings still ship in the JS bundle, since the caption cycles through them anyway. Density is implied but visible.",
    effort: "Medium — closest to what exists today.",
    frame: <RackFocusVariant />,
  },
  {
    n: "C",
    name: "Signal Field",
    pitch:
      "Thirty-six locations as a breathing field of dots. Almost all stay quiet; two warm up, one goes red, and only then does a single sentence surface to say what happened there.",
    shows:
      "The posture — watching everything, interrupting about one thing. Scale made visceral.",
    protects:
      "Effectively all of it. There is no product surface on screen to copy, only a stance.",
    cost:
      "Most abstract of the four. It sells the idea, not the tool, so it has to sit next to something concrete.",
    effort: "Medium — new component, but self-contained.",
    frame: <SignalFieldVariant />,
  },
  {
    n: "D",
    name: "Frosted Gate",
    pitch:
      "Makes the constraint the message. There is obviously a dense product back there; you get one finding for free and the rest in a live walkthrough. Confidence rather than secrecy.",
    shows:
      "That there is real depth, plus one concrete proof point — and it asks for the meeting at peak curiosity.",
    protects:
      "Total. The layer behind the glass is wordless geometry, so unblurring it yields grey rectangles.",
    cost:
      "The most 'salesy' of the four, and it only works if the demo booking flow is genuinely good.",
    effort: "Low — and it doubles as a conversion surface.",
    frame: <FrostedGateVariant />,
  },
];

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate">{children}</p>
    </div>
  );
}

export default function PreviewVariantsPage() {
  return (
    <main className="min-h-screen bg-mist py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* ---- the brief ---- */}
        <header className="max-w-2xl">
          <span className="kicker text-brand-600">Internal review</span>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-navy sm:text-5xl">
            How much of the product goes on a public page?
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-slate">
            The concern was that the walkthrough published the shape of the real
            application — the module list down the left rail, the card grid, the way
            insights were categorised and scored. The figures were never the issue; they
            have always been invented. The exposure was the information architecture.
          </p>
          <p className="mt-4 rounded-lg border border-line bg-white p-4 text-[13px] leading-relaxed text-slate">
            <b className="font-semibold text-navy">Where it landed:</b> keep the walkthrough
            format, replace what is inside it with dummy views. That is now live on the
            homepage and shown first below. The four alternatives that were built are kept
            underneath as the record — worth a look if the dummy views feel like they still
            give away too much.
          </p>
        </header>

        {/* ---- what ships today ---- */}
        <section className="mt-14">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
              Chosen · now live on the homepage
            </span>
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-navy">
              The walkthrough, with dummy views
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate">
            The decision was to keep this format and redraw what is inside it. The five
            beats and the scripted cursor survive; the layouts, the metric vocabulary and
            the scoring device are all invented, the rail carries ordinary words instead of
            module names, and the two unshipped modules are gone. Options A–D below are
            kept as the record of what else was on the table.
          </p>
          <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-e2 md:p-6">
            <AppFilm />
          </div>
        </section>

        {/* ---- the options ---- */}
        {options.map((o) => (
          <section key={o.n} className="mt-16 scroll-mt-8" id={`option-${o.n.toLowerCase()}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600">
                Option {o.n}
              </span>
              <h2 className="text-xl font-semibold tracking-[-0.015em] text-navy">
                {o.name}
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate">{o.pitch}</p>

            <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-e2 md:p-6">
              {o.frame}
              <p className="mt-4 text-center text-[11px] text-muted">
                Illustrative — figures are examples, not a real customer account.
              </p>
            </div>

            <div className="mt-6 grid gap-6 rounded-2xl border border-line bg-white/60 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <Spec label="What it shows">{o.shows}</Spec>
              <Spec label="What it protects">{o.protects}</Spec>
              <Spec label="What it costs">{o.cost}</Spec>
              <Spec label="Effort to ship">{o.effort}</Spec>
            </div>
          </section>
        ))}

        {/* ---- recommendation ---- */}
        <section className="mt-16 rounded-2xl border border-line bg-white p-6 shadow-e2 md:p-8">
          <span className="kicker text-brand-600">Still on the table</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-navy">
            If the dummy views still feel like too much.
          </h2>
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-slate">
            A, B and D stack rather than compete: The Brief proves Oscar is an analyst and
            gives away nothing, Rack Focus proves there is real software behind it, and the
            Frosted Gate converts the curiosity the other two create. Option C is the
            strongest single image if we ever need one hero visual — it is also the only one
            that survives being screenshotted into a competitor&apos;s deck with nothing
            useful attached.
          </p>
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-slate">
            The honest caveat, whichever way this goes: none of it stops a competitor who
            books a demo under a false name. What it stops is the free, no-effort,
            no-attribution copy — and that is most of the actual risk.
          </p>
        </section>
      </div>
    </main>
  );
}
