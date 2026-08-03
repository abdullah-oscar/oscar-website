import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { dailyBriefs, type DailyBrief } from "@/lib/site";

/**
 * Daily briefs — "same data, same morning, three different actions."
 * One overnight run fans out into three role-shaped messages: the DM
 * digest customers keep telling us is the selling point. Styled as chat
 * DMs (the hero speech-bubble recipe), deliberately server-static: the
 * section's Reveals are the only motion, so it costs nothing.
 *
 * Figures live in `dailyBriefs` in lib/site.ts and stay inside the same
 * simulated 36-store universe as the hero and the product film — the
 * caption below carries the same honesty disclaimer.
 */

const tones = {
  warn: {
    row: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-signal-warn",
    avatar: "border-amber-200 bg-amber-50 text-amber-700",
  },
  info: {
    row: "border-brand-100 bg-brand-50 text-brand-700",
    dot: "bg-brand-500",
    avatar: "border-brand-100 bg-brand-50 text-brand-700",
  },
  ok: {
    row: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-signal-ok",
    avatar: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
} as const;

export function DailyBriefs() {
  return (
    <section id="briefs" className="border-b border-line bg-mist py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          kicker="Daily briefs"
          title={
            <>
              Same data. Same morning.{" "}
              <span className="text-brand-600">Three different actions.</span>
            </>
          }
          sub="Every morning Oscar reconciles the overnight run, then sends each person the version they can act on — not the same dashboard three times."
        />

        {/* the shared source everything below fans out from */}
        <Reveal delay={2}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-3 pr-4 text-[12.5px] font-medium text-slate shadow-e1">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
            Overnight run complete
            <span className="text-line-2">·</span>
            <span className="tnum">36 stores reconciled</span>
            <span className="text-line-2">·</span>
            <span className="tnum">3 exceptions</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {dailyBriefs.map((b, i) => (
            <Reveal key={b.role} delay={i}>
              <BriefCard b={b} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-muted">
          Illustrative messages — not a real customer account.
        </p>
      </Container>
    </section>
  );
}

function BriefCard({ b }: { b: DailyBrief }) {
  const tone = tones[b.tone];
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-line bg-white p-5 shadow-panel">
      {/* recipient */}
      <div className="flex items-center gap-2.5 border-b border-line pb-3.5">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border-2 text-[11px] font-extrabold ${tone.avatar}`}
        >
          {b.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-bold text-navy">
            {b.name} · {b.role}
          </div>
          <div className="num text-[10.5px] text-muted">from Oscar · {b.time}</div>
        </div>
        <span className="ml-auto grid size-6 shrink-0 place-items-center rounded-md bg-navy text-white">
          <Icon name="spark" width={12} height={12} />
        </span>
      </div>

      {/* the message bubble — hero speech-bubble recipe */}
      <div className="relative mt-4 flex-1 rounded-2xl border border-line bg-mist/60 px-4 py-3.5">
        <span className="absolute -top-1.5 left-6 size-3 rotate-45 border-l border-t border-line bg-mist/60" />
        <div className="flex items-baseline gap-2">
          <span className="num text-2xl font-extrabold text-navy">{b.metric}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-slate">
          {b.metricLabel}
        </p>
        <ul className="mt-3.5 flex flex-col gap-2">
          {b.actions.map((a) => (
            <li key={a} className="flex items-start gap-2 text-[12.5px] leading-snug text-ink">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Icon name="check" width={9} height={9} />
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* what kind of message this is — pipeline Output row recipe */}
      <div
        className={`mt-3.5 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${tone.row}`}
      >
        <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} />
        {b.callout}
      </div>
    </article>
  );
}
