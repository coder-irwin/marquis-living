// Akaash · Design 6 — "Atelier" content + imagery for Marquis Manor.
//
// IMPORTANT: this design deliberately uses ONLY the Unsplash-sourced interior
// photos from the shared IMG map (the `u(...)` entries). It does NOT use any
// of the /glocal or /glocal-portfolio images, since those were pulled from
// glocalstudio.in — the site we took layout/motion inspiration from but must
// not borrow assets from. All copy below is original Marquis Manor wording.
import { IMG } from "../../images";

export const HERO_IMG = IMG.cta;     // neutral beige living room (Unsplash)

// hero headline, revealed word-by-word
export const HEADLINE = ["Interiors", "made", "to", "be", "lived", "in."];

// Services — a 3-column grid of six.
export const SERVICES = [
  { no: "01", t: "Interior Architecture", d: "Spatial planning, joinery and the bones of a home — reworked around how you actually live." },
  { no: "02", t: "Bespoke Furniture", d: "Pieces designed and built in our own workshop, made to the millimetre for your rooms." },
  { no: "03", t: "Lighting Design", d: "Layered, considered light — the single biggest change to how a space feels at night." },
  { no: "04", t: "Styling & Art", d: "The final layer: textiles, objects and art chosen to make a room feel authored, not staged." },
  { no: "05", t: "Turnkey Delivery", d: "One team from first sketch to the day you walk in. Fixed scope, fixed timeline, no surprises." },
  { no: "06", t: "Consultation", d: "A focused session for a single room or a second opinion — our eyes on your space." },
];

// Portfolio — six Unsplash interiors (no glocal assets).
export const PORTFOLIO = [
  { src: IMG.about1, t: "Shelved Living Room" },
  { src: IMG.bed, t: "Principal Bedroom" },
  { src: IMG.sideTable, t: "Sunlit Dining" },
  { src: IMG.bar, t: "Evening Bar" },
  { src: IMG.sofaTan, t: "Tan Lounge" },
  { src: IMG.livingFireplace, t: "Fireside Living" },
];

// Why Marquis Manor — four feature points with teal checks.
export const FEATURES = [
  { t: "An in-house workshop", d: "We make, not just specify — so quality and timeline stay in our hands." },
  { t: "Fixed, honest timelines", d: "A schedule you can plan a life around, agreed before we start." },
  { t: "One studio, end-to-end", d: "Architecture, furniture, lighting and styling under a single roof." },
  { t: "Made to age well", d: "Materials and details chosen to look better in ten years, not worse." },
];
