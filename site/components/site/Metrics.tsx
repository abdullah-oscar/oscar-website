"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { metrics } from "@/lib/site";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ target, run }: { target: number; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let t0: number | null = null;
    let raf = 0;
    const dur = 1400;
    const tick = (t: number) => {
      if (t0 === null) t0 = t;
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{val.toLocaleString()}</>;
}

export function Metrics() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="border-b border-line bg-white py-16">
      <Container>
        <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {metrics.map((m) => {
            const numeric = Number(m.value);
            return (
              <div key={m.label} className="text-center">
                <div className="tnum text-4xl font-extrabold tracking-tight text-navy sm:text-[2.75rem]">
                  {Number.isNaN(numeric) ? (
                    m.value
                  ) : (
                    <Counter target={numeric} run={inView} />
                  )}
                  {m.suffix && <span className="text-brand-500">{m.suffix}</span>}
                </div>
                <div className="mx-auto mt-2.5 max-w-[11rem] text-sm leading-snug text-slate">
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
