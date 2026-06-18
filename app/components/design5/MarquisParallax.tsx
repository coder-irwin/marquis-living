"use client";

import { HeroParallax } from "./ui/hero-parallax";
import { IMG } from "./images";

const products = [
  { title: "Wing Console", link: "#work", thumbnail: IMG.console },
  { title: "Halo Pendant", link: "#work", thumbnail: IMG.pendant },
  { title: "Lotus Side Table", link: "#work", thumbnail: IMG.sideTable },
  { title: "Rossie Chair", link: "#work", thumbnail: IMG.chair },
  { title: "Buckle Center Table", link: "#work", thumbnail: IMG.centerTable },

  { title: "Marquis Bed", link: "#work", thumbnail: IMG.bed },
  { title: "Ocean Collection", link: "#collections", thumbnail: IMG.hero },
  { title: "Astronomica", link: "#collections", thumbnail: IMG.scene1 },
  { title: "House of Cards", link: "#collections", thumbnail: IMG.scene2 },
  { title: "Circus Collection", link: "#collections", thumbnail: IMG.bar },

  { title: "Jungle Book", link: "#collections", thumbnail: IMG.about1 },
  { title: "Marquis Sustainable", link: "#collections", thumbnail: IMG.about2 },
  { title: "The Atelier", link: "#studio", thumbnail: IMG.cta },
  { title: "Twin Lounge Chairs", link: "#work", thumbnail: IMG.chairPair },
  { title: "Aria Sofa", link: "#work", thumbnail: IMG.sofaTan },
];

export default function MarquisParallax() {
  return <HeroParallax products={products} />;
}
