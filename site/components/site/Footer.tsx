import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/icons";
import { nav, site } from "@/lib/site";
import { complianceBadges } from "@/lib/assets";

export function Footer() {
  const badges = complianceBadges();
  return (
    <footer className="bg-navy">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo variant="light" />
            <p className="mt-4 text-sm font-semibold text-brand-400">
              One Platform. Total Insight. Immediate Action.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              The AI analyst for multi-location operators. Oscar watches every
              location so your team can command the business.
            </p>
            {badges.length > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {badges.map((b) => (
                  // eslint-disable-next-line @next/next/no-img-element -- badge
                  // dimensions vary; sized with CSS. White card keeps the badge
                  // legible against the navy footer.
                  <img
                    key={b.src}
                    src={b.src}
                    alt={`${b.name} certified`}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto rounded-lg bg-white/95 p-1.5"
                  />
                ))}
              </div>
            ) : (
              <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2">
                <span className="grid size-7 place-items-center rounded-md bg-brand-500/20 text-brand-400">
                  <Icon name="lock" width={15} height={15} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-white/70">
                  SOC 2 Compliant
                </span>
              </div>
            )}
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] font-bold uppercase tracking-wider !text-white/45">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-400"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider !text-white/45">
              Company
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "Log in", href: site.links.login },
                { label: "Request a demo", href: site.links.demo },
                { label: "Terms of Service", href: site.links.terms },
                { label: "Privacy Policy", href: site.links.privacy },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <a
            href={site.links.linkedin}
            aria-label="Oscar AI on LinkedIn"
            className="grid size-9 place-items-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            <Icon name="linkedin" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
