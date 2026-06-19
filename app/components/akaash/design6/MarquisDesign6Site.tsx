import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import Showcase from "./Showcase";
import Portfolio from "./Portfolio";
import Features from "./Features";
import Footer from "./Footer";

export default function MarquisDesign6Site() {
  // `.d6` scopes the light, airy, teal-accented studio aesthetic — inspired
  // only by the FEEL of the reference site; all content is Marquis Manor's.
  return (
    <div className="d6">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Showcase />
        <Portfolio />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
