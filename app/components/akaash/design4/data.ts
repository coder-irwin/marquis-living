// Akaash · Design 4 — "Atrium" content + imagery for Marquis Manor.
import { IMG } from "../../images";

const P = "/glocal-portfolio";

export const THRESHOLD_IMG = IMG.hero;
export const SPOTLIGHT_IMG = `${P}/portfolio-23-11724ad1.webp`;
export const REVEAL_IMG = IMG.cta;

// Layered planes for the scroll "descent" (back → front).
export const DESCENT = [
  { img: `${P}/portfolio-2-2204562c.webp`, depth: 0.12, label: "Atrium" },
  { img: `${P}/portfolio-17-4a7a6209.webp`, depth: 0.26, label: "Salon" },
  { img: `${P}/portfolio-11-32dcb15a.webp`, depth: 0.42, label: "Chamber" },
];

// Material study — physically-named finishes.
export const MATERIALS = [
  { name: "Travertine", note: "Roman, unfilled", hex: "#cdbfa9" },
  { name: "Burl Walnut", note: "Hand-oiled", hex: "#5a3a24" },
  { name: "Patinated Brass", note: "Living finish", hex: "#9d7e44" },
  { name: "Bouclé Ivory", note: "Belgian wool", hex: "#e7e0d2" },
  { name: "Verde Alpi", note: "Book-matched", hex: "#2f4438" },
  { name: "Smoked Oak", note: "Wide plank", hex: "#3f342a" },
];

export const CHAPTERS = [
  { n: "I", t: "Threshold" },
  { n: "II", t: "The Descent" },
  { n: "III", t: "Light Study" },
  { n: "IV", t: "Materials" },
  { n: "V", t: "The Reveal" },
];
