import PageTransition from "./PageTransition";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import MaskVideo from "./MaskVideo";
import Services from "./Services";
import ZoomParallax from "./ZoomParallax";
import Footer from "./Footer";
import { D9_CSS } from "./styles";

/**
 * Akaash · Design 9 — "Cinema".
 *
 * A faithful re-creation of the studio reference's MOTION SET, rebuilt for
 * Marquis Living with original copy and the client's own imagery. Everything is
 * scoped under `.d9` and the CSS is injected inline (not via globals.css) so the
 * design is fully self-contained and isolated from designs 1–8 and the rest of
 * the app — no shared design components or stylesheets are touched.
 */
export default function MarquisDesign9Site() {
  return (
    <div className="d9">
      <style dangerouslySetInnerHTML={{ __html: D9_CSS }} />
      <PageTransition />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <MaskVideo />
        <Services />
        <ZoomParallax />
      </main>
      <Footer />
    </div>
  );
}
