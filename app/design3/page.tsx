import type { Metadata } from "next";
import Nav from "../components/design3/Nav";
import Hero from "../components/design3/Hero";
import PressBar from "../components/design3/PressBar";
import HowItWorks from "../components/design3/HowItWorks";
import ThreeDFeature from "../components/design3/ThreeDFeature";
import Transformation from "../components/design3/Transformation";
import StyleFinder from "../components/design3/StyleFinder";
import Packages from "../components/design3/Packages";
import Compare from "../components/design3/Compare";
import Projects from "../components/design3/Projects";
import Perks from "../components/design3/Perks";
import RoomIdeas from "../components/design3/RoomIdeas";
import Designers from "../components/design3/Designers";
import Testimonials from "../components/design3/Testimonials";
import Journal from "../components/design3/Journal";
import FAQ from "../components/design3/FAQ";
import Newsletter from "../components/design3/Newsletter";
import CTA from "../components/design3/CTA";
import Footer from "../components/design3/Footer";

export const metadata: Metadata = {
  title: "Design 3 — Marquis Manor · Online Interior Design",
};

export default function Design3Page() {
  return (
    <>
      <Nav />
      <main>
        {/* 01 */}
        <Hero />
        {/* 02 */}
        <PressBar />
        {/* 03 */}
        <HowItWorks />
        {/* 04 */}
        <ThreeDFeature />
        {/* 05 — before/after slider */}
        <Transformation />
        {/* 06 — interactive style finder */}
        <StyleFinder />
        {/* 07 */}
        <Packages />
        {/* 08 — online vs traditional */}
        <Compare />
        {/* 09 */}
        <Projects />
        {/* 10 — count-up stats */}
        <Perks />
        {/* 11 */}
        <RoomIdeas />
        {/* 12 — meet the designers */}
        <Designers />
        {/* 13 */}
        <Testimonials />
        {/* 14 — journal teaser */}
        <Journal />
        {/* 15 */}
        <FAQ />
        {/* 16 — newsletter capture */}
        <Newsletter />
        {/* 17 */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
