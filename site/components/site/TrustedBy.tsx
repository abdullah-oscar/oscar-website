import { stats, trustedBrands } from "@/lib/site";
import { customerLogos } from "@/lib/assets";
import { Container } from "@/components/ui/primitives";

export function TrustedBy() {
  const logos = customerLogos();
  const hasLogos = logos.length > 0;

  // Duplicate the row so the marquee loops seamlessly.
  const items = hasLogos
    ? [...logos, ...logos]
    : [...trustedBrands, ...trustedBrands].map((b) => ({ src: "", name: b }));

  return (
    <section
      aria-label="Trusted by leading operators"
      className="border-y border-line bg-white py-10"
    >
      <Container>
        <p className="kicker mb-8 text-center text-muted">
          Trusted by operators running{" "}
          <span className="tnum">{stats.locationsLabel}</span> locations across{" "}
          {stats.brandsLabel} brands
        </p>
        <div className="relative overflow-hidden mask-fade-x pause-hover">
          <div className="flex w-max animate-marquee items-center gap-16">
            {items.map((item, i) =>
              item.src ? (
                // eslint-disable-next-line @next/next/no-img-element -- logo
                // dimensions vary and are unknown at build time; CSS sizes them.
                <img
                  key={`${item.src}-${i}`}
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto max-w-[160px] shrink-0 object-contain transition duration-300 hover:scale-105"
                />
              ) : (
                <span
                  key={`${item.name}-${i}`}
                  className="shrink-0 select-none whitespace-nowrap text-2xl font-extrabold tracking-tight text-navy/50"
                >
                  {item.name}
                </span>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
