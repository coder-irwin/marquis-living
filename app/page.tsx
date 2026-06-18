import Navbar from "./components/Navbar";
import MarquisHero from "./components/MarquisHero";
import MarquisParallax from "./components/MarquisParallax";
import Marquee from "./components/Marquee";
import Studio from "./components/Studio";
import Services from "./components/Services";
import Work from "./components/Work";
import Stats from "./components/Stats";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
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
