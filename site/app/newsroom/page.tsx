import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { NewsList } from "@/components/site/newsroom/NewsList";
import { PageBackdrop } from "@/components/site/PageBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { sortedNews } from "@/lib/newsroom";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsroom",
  description: `Press releases, product announcements, and media coverage from ${site.name}.`,
  alternates: { canonical: "/newsroom" },
  openGraph: {
    type: "website",
    title: `Newsroom · ${site.name}`,
    description: `Press releases, product announcements, and media coverage from ${site.name}.`,
    url: `${site.url}/newsroom`,
  },
};

export default function NewsroomPage() {
  const items = sortedNews();

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-line pt-32 pb-14 md:pt-36 md:pb-16">
          <PageBackdrop />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
            <Reveal>
              <span className="kicker text-brand-600">Newsroom</span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem]">
                News, press &amp; announcements
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-slate">
                Company news, product releases, and where {site.name} shows up in the
                press. For interviews, data, or commentary, our team is a message
                away.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-14 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <NewsList items={items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
