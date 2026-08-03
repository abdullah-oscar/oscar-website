import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { CommandCenter } from "@/components/site/CommandCenter";
import { DailyBriefs } from "@/components/site/DailyBriefs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Metrics } from "@/components/site/Metrics";
import { Testimonials } from "@/components/site/Testimonials";
import { Newsroom } from "@/components/site/Newsroom";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustedBy />
        <CommandCenter />
        <DailyBriefs />
        {/* <Features /> */}
        <HowItWorks />
        {/* <WhyOscar /> */}
        <Metrics />
        {/* <Industries /> */}
        {/* Results, AboutTeaser and Game are held back for now (manager's
            call). Restoring one means re-adding its import, its nav entry in
            lib/site.ts (Results → /#results, Game → /#game), and — for
            AboutTeaser — nothing else, since /about stays live either way.
            The components themselves are untouched and ready. */}
        {/* <Results /> */}
        <Testimonials />
        <Newsroom />
        {/* <AboutTeaser /> */}
        {/* <Game /> */}
        <Faq />
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
