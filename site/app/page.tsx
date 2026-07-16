import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { Features } from "@/components/site/Features";
import { Watchtower } from "@/components/site/Watchtower";
import { HowItWorks } from "@/components/site/HowItWorks";
import { WhyOscar } from "@/components/site/WhyOscar";
import { Metrics } from "@/components/site/Metrics";
import { Industries } from "@/components/site/Industries";
import { Testimonials } from "@/components/site/Testimonials";
import { Game } from "@/components/site/Game";
import { Faq } from "@/components/site/Faq";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustedBy />
        <Features />
        <Watchtower />
        <HowItWorks />
        <WhyOscar />
        <Metrics />
        <Industries />
        <Testimonials />
        <Game />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
