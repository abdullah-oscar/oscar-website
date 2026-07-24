import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { CommandCenter } from "@/components/site/CommandCenter";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Metrics } from "@/components/site/Metrics";
import { Testimonials } from "@/components/site/Testimonials";
import { Game } from "@/components/site/Game";
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
        {/* <Features /> */}
        <HowItWorks />
        {/* <WhyOscar /> */}
        <Metrics />
        {/* <Industries /> */}
        <Testimonials />
        <Game />
        <Faq />
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
