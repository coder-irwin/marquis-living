"use client";

import { HeroParallax } from "./ui/hero-parallax";
import { PF } from "./images";

// 15 unique portfolio interiors — no repeats with Work or Services.
const products = [
  { title: "Ocean", link: "#collections", thumbnail: PF.openLiving },
  { title: "Astronomica", link: "#collections", thumbnail: PF.bedWood },
  { title: "Jungle Book", link: "#collections", thumbnail: PF.diningGold },
  { title: "House of Cards", link: "#collections", thumbnail: PF.livingFire1 },
  { title: "Circus", link: "#collections", thumbnail: PF.bedSunset },

  { title: "Marquis Sustainable", link: "#collections", thumbnail: PF.kitchen1 },
  { title: "The Atelier", link: "#studio", thumbnail: PF.livingGarden },
  { title: "Mask", link: "#collections", thumbnail: PF.bedGold },
  { title: "Coastal Suite", link: "#work", thumbnail: PF.diningNavy },
  { title: "Hearth & Home", link: "#work", thumbnail: PF.livingFire2 },

  { title: "The Nursery", link: "#work", thumbnail: PF.kids1 },
  { title: "Spa Retreat", link: "#work", thumbnail: PF.bath },
  { title: "Lounge No. 12", link: "#work", thumbnail: PF.livingBrown },
  { title: "Azure Suite", link: "#work", thumbnail: PF.bedBlue },
  { title: "The Study", link: "#work", thumbnail: PF.office3 },
];

export default function MarquisParallax() {
  return <HeroParallax products={products} />;
}
