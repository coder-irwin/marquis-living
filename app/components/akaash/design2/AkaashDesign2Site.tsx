import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Journey from "./Journey";
import Chapters from "./Chapters";
import Quote from "./Quote";
import Gallery from "./Gallery";
import CTA from "./CTA";
import Footer from "./Footer";

export default function AkaashDesign2Site() {
  // `.d2` scopes the entire dark / sky aesthetic so it never touches the shared
  // light theme used by the other designs.
  return (
    <div className="d2">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Journey />
        <Chapters />
        <Quote />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
