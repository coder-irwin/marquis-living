// Akaash · Design 6 — "Atelier" content + imagery for Marquis Manor.
//
// Per the latest direction, this design uses the client's own portfolio
// photography (/glocal-portfolio) and the studio showreel video to give it a
// luxury feel. All copy below is original Marquis Manor wording.

const P = "/glocal-portfolio";

// Studio showreel — plays muted/looped in the hero frame.
export const HERO_VIDEO = "/design5bgvideo.mp4";
export const HERO_POSTER = `${P}/portfolio-2-2204562c.webp`;

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

// A single full-bleed hero of finished work, between services and the grid.
export const FEATURE_IMG = `${P}/portfolio-23-11724ad1.webp`;

// Portfolio — the studio's own completed interiors.
export const PORTFOLIO = [
  { src: `${P}/portfolio-2-2204562c.webp`, t: "Open-plan Living" },
  { src: `${P}/portfolio-11-32dcb15a.webp`, t: "Principal Bedroom" },
  { src: `${P}/portfolio-17-4a7a6209.webp`, t: "Dining Room" },
  { src: `${P}/portfolio-30-2e527f6c.webp`, t: "Garden Lounge" },
  { src: `${P}/portfolio-44-32b2df33.webp`, t: "Study & Library" },
  { src: `${P}/portfolio-9-f383f968.webp`, t: "Kitchen" },
];

// Why Marquis Manor — four feature points with teal checks.
export const FEATURES = [
  { t: "An in-house workshop", d: "We make, not just specify — so quality and timeline stay in our hands." },
  { t: "Fixed, honest timelines", d: "A schedule you can plan a life around, agreed before we start." },
  { t: "One studio, end-to-end", d: "Architecture, furniture, lighting and styling under a single roof." },
  { t: "Made to age well", d: "Materials and details chosen to look better in ten years, not worse." },
];
