import Navbar from "./Navbar";
import MarquisHero from "./MarquisHero";
import MarquisParallax from "./MarquisParallax";
import Marquee from "./Marquee";
import Studio from "./Studio";
import Services from "./Services";
import Work from "./Work";
import Stats from "./Stats";
import Process from "./Process";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

export default function MarquisManorSite() {
  return (
    <>
      <Navbar />
      <main>
        <MarquisHero />
        <MarquisParallax />
        <Marquee />
        <Studio />
        <Services />
        <Work />
        <Stats />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
