import Nav from "./Nav";
import Hero from "./Hero";
import Journey from "./Journey";
import Footer from "./Footer";

export default function MarquisDesign3Site() {
  // `.d3` scopes the warm-paper "ink & atelier" aesthetic so it never touches
  // the shared light theme or the other designs.
  return (
    <div className="d3">
      <Nav />
      <main>
        <Hero />
        <Journey />
      </main>
      <Footer />
    </div>
  );
}
