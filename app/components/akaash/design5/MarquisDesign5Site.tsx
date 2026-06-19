import Nav from "./Nav";
import Hero from "./Hero";
import Aperture from "./Aperture";
import Ethos from "./Ethos";
import Fan from "./Fan";
import Stats from "./Stats";
import CTA from "./CTA";
import Footer from "./Footer";

export default function MarquisDesign5Site() {
  // `.d5` scopes the white, centered, minimal premium aesthetic.
  return (
    <div className="d5">
      <div className="d5-grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Aperture />
        <Ethos />
        <Fan />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
