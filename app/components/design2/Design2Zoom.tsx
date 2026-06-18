import { ZoomParallax } from "../ui/zoom-parallax";
import { IMG } from "../images";

const images = [
  { src: IMG.hero, alt: "Marquis interior" },
  { src: IMG.console, alt: "Wing Console" },
  { src: IMG.chair, alt: "Rossie Chair" },
  { src: IMG.centerTable, alt: "Buckle Center Table" },
  { src: IMG.sideTable, alt: "Lotus Side Table" },
  { src: IMG.bed, alt: "Marquis Bed" },
  { src: IMG.crockery, alt: "Beetle Crockery" },
];

export default function Design2Zoom() {
  return (
    <section className="bg-bg">
      <div className="container flex flex-col items-center pt-24 text-center md:pt-32">
        <p className="eyebrow mb-6">Showcase</p>
        <h2 className="display text-[clamp(2.2rem,6vw,5rem)]">Into the detail</h2>
        <p className="mt-6 max-w-xl text-muted">Keep scrolling — the pieces open out around you, one at a time.</p>
      </div>
      <ZoomParallax images={images} />
    </section>
  );
}
