import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left: steps */}
          <div>
            <Reveal>
              <span className="kicker text-brand-600">How it works</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05]sm:text-5xl md:text-[3.3rem]">
                Up and running in{" "}
                <span className="text-brand-600">days, not months</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-slate">
                No rip-and-replace. Oscar fits into your current stack and adapts
                to your workflows.
              </p>
            </Reveal>

            <ol className="mt-9">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i}>
                  <li className="relative flex gap-5 pb-8 last:pb-0">
                    {i < steps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-line"
                      />
                    )}
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-sm font-extrabold text-brand-700">
                      {s.n}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-lg font-bold">{s.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Right: pipeline visual */}
          <Reveal delay={2}>
            <PipelineVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PipelineVisual() {
  const sources = ["POS", "Payroll", "PDFs", "APIs", "SFTP", "Sheets"];
  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
          Oscar pipeline
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-blink" />
          Connected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sources.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line bg-mist px-2.5 py-1.5 text-[11px] font-semibold text-slate"
          >
            {s}
          </span>
        ))}
      </div>

      <Connector />

      <div className="rounded-xl border border-brand-100 bg-brand-50 p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-500 text-white">
            <Icon name="radar" width={18} height={18} />
          </span>
          <div>
            <div className="text-[13px] font-extrabold text-navy">
              Oscar reasoning engine
            </div>
            <div className="text-[10.5px] font-medium text-slate">
              normalizing · detecting · routing
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { k: "Revenue", v: "$48.2K", c: "text-emerald-600" },
            { k: "Labor", v: "28.3%", c: "text-brand-600" },
            { k: "Flags", v: "3", c: "text-signal-crit" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-lg border border-line bg-white px-2.5 py-2 text-center"
            >
              <div className={`tnum text-base font-extrabold ${m.c}`}>{m.v}</div>
              <div className="text-[9px] font-bold uppercase tracking-wide text-muted">
                {m.k}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Connector />

      <div className="flex flex-col gap-2">
        <Output tone="warn" text="Alert → District Leader: void anomaly, Loc #14" />
        <Output tone="info" text="Report → Weekly labor summary, all regions" />
        <Output tone="ok" text="Action plan → Prep fix routed to Loc #22 GM" />
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="my-3.5 flex justify-center">
      <span className="flex flex-col items-center text-brand-400">
        <span className="h-5 w-px bg-line" />
        <Icon name="arrow" width={15} height={15} className="rotate-90" />
      </span>
    </div>
  );
}

function Output({ tone, text }: { tone: "warn" | "info" | "ok"; text: string }) {
  const styles = {
    warn: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-brand-100 bg-brand-50 text-brand-700",
    ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[tone];
  const dot = {
    warn: "bg-signal-warn",
    info: "bg-brand-500",
    ok: "bg-signal-ok",
  }[tone];
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] font-semibold ${styles}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
      {text}
    </div>
  );
}
