import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageBackdrop } from "@/components/site/PageBackdrop";
import { Metrics } from "@/components/site/Metrics";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { story, team, type TeamMember } from "@/lib/about";
import { site, stats, type Metric } from "@/lib/site";
import { teamPhotos } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} was built by restaurant operators, for restaurant operators — the story, the team, and the ${stats.locationsLabel} locations it watches today.`,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: `About · ${site.name}`,
    description: `${site.name} was built by restaurant operators, for restaurant operators.`,
    url: `${site.url}/about`,
  },
};

/* Bare numbers + a "+" suffix, not the *Label strings: <Metrics /> counts up
   to a numeric value, and "1,400+" would fail Number() and render static. The
   "+" is what keeps the claim approximate. */
const aboutMetrics: Metric[] = [
  { value: stats.locations.toString(), suffix: "+", label: "Locations live today" },
  { value: stats.brands.toString(), suffix: "+", label: "Brands operated on Oscar" },
  { value: stats.integrations.toString(), suffix: "+", label: "Providers integrated" },
  { value: "24", suffix: "/7", label: "Every location, always watched" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* ---- hero ---- */}
        <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-36 md:pb-20">
          <PageBackdrop />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 md:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <span className="kicker text-brand-600">About</span>
              </Reveal>
              <Reveal delay={1}>
                <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem]">
                  Built by restaurant operators,{" "}
                  <span className="text-brand-600">for restaurant operators</span>
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-slate">
                  Oscar didn&rsquo;t start as a software idea. It started inside a
                  Dunkin&rsquo; franchise that couldn&rsquo;t see its own numbers —
                  and it earned its keep there before it earned it anywhere else.
                </p>
              </Reveal>
            </div>
            <Reveal delay={3} className="hidden lg:block">
              <div className="flex justify-center rounded-[20px] border border-line bg-white/70 p-10 shadow-e1 backdrop-blur-sm">
                <Logo variant="full" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- the story ---- */}
        <section className="bg-white py-20 md:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
              <SectionHeading
                kicker="Our story"
                title="It worked at home first"
                sub="The product wasn't imagined in a pitch deck — it was built to fix one operator's mornings, and it spread the way anything real spreads in franchising: operator to operator."
              />
              <ol>
                {story.map((m, i) => (
                  <Reveal key={m.title} delay={i}>
                    <li className="relative flex gap-5 pb-8 last:pb-0">
                      {i < story.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[27px] top-14 h-[calc(100%-3.2rem)] w-px bg-line"
                        />
                      )}
                      <span className="num relative z-10 grid h-10 w-14 shrink-0 place-items-center rounded-full border border-brand-100 bg-brand-50 text-[12px] font-extrabold text-brand-700">
                        {m.year}
                      </span>
                      <div className="pt-1">
                        <h3 className="text-lg font-bold">{m.title}</h3>
                        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate">
                          {m.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* ---- the numbers ---- */}
        <Metrics items={aboutMetrics} />

        {/* ---- pull quote ---- */}
        <section className="bg-navy py-16 md:py-20">
          <Container>
            <Reveal>
              <blockquote className="mx-auto max-w-3xl text-balance text-center text-3xl font-semibold leading-tight !text-white sm:text-4xl">
                &ldquo;Built by restaurant operators, for restaurant
                operators.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={1}>
              <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-white/65">
                Not a tagline — a hiring filter, a roadmap filter, and the reason
                the product answers the questions operators actually ask at 7 AM.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* ---- the team ---- */}
        <section className="border-b border-line bg-mist py-20 md:py-28">
          <Container>
            <SectionHeading
              kicker="The team"
              title="Experienced operators, obsessive builders"
              sub="Leadership that has run franchise businesses, and an engineering team that treats messy operational data as the whole job — not an edge case."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((t, i) => (
                <Reveal key={t.name} delay={i}>
                  <TeamCard t={t} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-white py-16 md:py-20">
          <Container className="flex flex-col items-center gap-6 text-center">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
                See what Oscar catches in your locations
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <a
                href={site.links.demo}
                className="btn-primary rounded-full px-8 py-4 text-sm uppercase tracking-wider"
              >
                Request a demo
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TeamCard({ t }: { t: TeamMember }) {
  const photo = t.photo
    ? teamPhotos().find((p) => p.src.includes(`/${t.photo}.`))
    : undefined;
  return (
    <article className="card-lift flex h-full flex-col rounded-[20px] border border-line bg-white p-6 shadow-e1">
      {photo ? (
        // Headshot dimensions vary and are unknown at build time; CSS sizes them.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt={t.name}
          loading="lazy"
          decoding="async"
          className="size-16 rounded-full border-2 border-brand-100 object-cover"
        />
      ) : (
        <span className="grid size-16 place-items-center rounded-full border-2 border-brand-100 bg-brand-50 text-[15px] font-extrabold text-brand-600">
          {t.initials}
        </span>
      )}
      <h3 className="mt-4 text-[15px] font-bold text-navy">{t.name}</h3>
      <div className="text-[12px] font-semibold text-brand-700">{t.role}</div>
      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate">{t.bio}</p>
      {t.sample && (
        <span className="mt-4 inline-flex w-fit items-center rounded-full border border-line bg-mist px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
          Placeholder bio
        </span>
      )}
    </article>
  );
}
