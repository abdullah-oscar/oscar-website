import { trustedBrands } from "@/lib/site";

export function TrustedBy() {
  // Duplicate the list so the marquee can loop seamlessly.
  const row = [...trustedBrands, ...trustedBrands];

  return (
    <section
      aria-label="Trusted by leading operators"
      className="border-y border-line bg-mist py-10"
    >
      <p className="kicker mb-7 text-center text-muted">
        Trusted by operators running thousands of locations
      </p>
      <div className="relative overflow-hidden mask-fade-x pause-hover">
        <div className="flex w-max animate-marquee items-center gap-14">
          {row.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="select-none whitespace-nowrap text-xl font-extrabold tracking-tight text-navy/30 transition-colors hover:text-navy/70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
