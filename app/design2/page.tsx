import type { Metadata } from "next";
import Cursor from "../components/design2/Cursor";
import Nav from "../components/design2/Nav";
import Preloader from "../components/design2/Preloader";
import Hero from "../components/design2/Hero";
import VelocityMarquee from "../components/design2/VelocityMarquee";
import SplitFeature from "../components/design2/SplitFeature";
import CollectionScroller from "../components/design2/CollectionScroller";
import HoverList from "../components/design2/HoverList";
import TiltGallery from "../components/design2/TiltGallery";
import KineticType from "../components/design2/KineticType";
import HorizontalScroll from "../components/design2/HorizontalScroll";
import Manifesto from "../components/design2/Manifesto";
import MarqueeColumns from "../components/design2/MarqueeColumns";
import StackingCards from "../components/design2/StackingCards";
import TrailSection from "../components/design2/TrailSection";
import Accordion from "../components/design2/Accordion";
import Process from "../components/design2/Process";
import Numbers from "../components/design2/Numbers";
import ParallaxBand from "../components/design2/ParallaxBand";
import Testimonials from "../components/design2/Testimonials";
import GalleryGrid from "../components/design2/GalleryGrid";
import MarqueePress from "../components/design2/MarqueePress";
import CTA from "../components/design2/CTA";
import Footer from "../components/design2/Footer";

export const metadata: Metadata = {
  title: "Design 2 — Marquis Manor",
};

export default function Design2Page() {
  return (
    <div className="hide-cursor">
      <Cursor />
      <Preloader />
      <Nav />

      <main>
        {/* 01 — 3D mouse-parallax hero */}
        <Hero />
        {/* 02 — scroll-velocity marquee */}
        <VelocityMarquee text="Functional Art" />
        {/* 03 — atelier, opposing parallax images */}
        <SplitFeature />
        {/* 04 — scrollytelling collections crossfade */}
        <CollectionScroller />
        {/* 05 — collections hover-list */}
        <HoverList />
        {/* 06 — tilt + glare product cards */}
        <TiltGallery />
        {/* 07 — kinetic typography */}
        <KineticType />
        {/* 08 — pinned horizontal gallery */}
        <HorizontalScroll />
        {/* 09 — scroll-scrubbed manifesto */}
        <Manifesto />
        {/* 11 — parallax image columns */}
        <MarqueeColumns />
        {/* 12 — sticky stacking cards */}
        <StackingCards />
        {/* 13 — cursor image trail */}
        <TrailSection />
        {/* 14 — materials accordion */}
        <Accordion />
        {/* 15 — craft process */}
        <Process />
        {/* 16 — count-up numbers */}
        <Numbers />
        {/* 17 — parallax quote band */}
        <ParallaxBand />
        {/* 18 — testimonials slider */}
        <Testimonials />
        {/* 19 — hover-grow showroom */}
        <GalleryGrid />
        {/* 20 — press marquee */}
        <MarqueePress />
        {/* 21 — parallax CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
