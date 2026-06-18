import Navbar from "./Navbar";
import MarquisHero from "./MarquisHero";
import MarquisParallax from "./MarquisParallax";
import Marquee from "./Marquee";
import Studio from "./Studio";
import Services from "./Services";
import Work from "./Work";
import CollectionScroller from "./CollectionScroller";
import MarqueeColumns from "./MarqueeColumns";
import StackingCards from "./StackingCards";
import GalleryGrid from "./GalleryGrid";
import Transformation from "./Transformation";
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
          <Transformation />
        <MarqueeColumns />
        <Studio />
        <Services />
        <Work />
        <CollectionScroller />
        <GalleryGrid />
        <StackingCards />
       
        
        <Stats />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
