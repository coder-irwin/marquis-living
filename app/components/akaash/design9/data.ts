// Akaash · Design 9 — "Cinema" content + imagery for Marquis Manor.
//
// This design re-creates the MOTION SET of the studio reference (full-screen
// video masthead, word-by-word reveal, text-masked video, infinite marquees,
// gradient shine text, glowing gradient button, slide-swap links and a scroll
// zoom-parallax gallery). Every word below is original Marquis Manor copy and
// every asset is the client's own — nothing is copied from the reference.

const P = "/glocal-portfolio";

// Studio showreel — plays muted/looped behind the masthead and inside the
// text-masked section.
export const HERO_VIDEO = "/design5bgvideo.mp4";
export const HERO_POSTER = `${P}/portfolio-2-2204562c.webp`;

// Hero headline, revealed word-by-word (the signature reveal).
export const HEADLINE = ["We", "design", "spaces", "you", "feel", "first."];

// Gradient "shine" subline beneath the headline.
export const SHINE = "See the craft. Believe the budget.";

// Marquee ticker strip.
export const MARQUEE = [
  "Interior Architecture",
  "Bespoke Furniture",
  "Lighting Design",
  "Styling & Art",
  "Turnkey Delivery",
  "Consultation",
];

// Text punched out of the masked-video section.
export const MASK_TEXT = "MADE TO BE LIVED IN";

// Services — six reasons clients stay, echoing the reference's six-card grid.
export const SERVICES = [
  { no: "01", t: "Studio-grade craft", d: "The quality of a name atelier, without the agency-level invoice." },
  { no: "02", t: "Fixed, honest timelines", d: "A schedule you can plan a life around — delivered to the day, every time." },
  { no: "03", t: "Designed for real life", d: "Global design standards, shaped around how you actually live in the space." },
  { no: "04", t: "A creative partner", d: "More than a contractor — one team that owns the outcome with you." },
  { no: "05", t: "End to end, one roof", d: "Architecture, furniture, lighting and styling from a single studio." },
  { no: "06", t: "Made in-house", d: "Pieces built in our own workshop, to the millimetre, for your rooms." },
];

// Zoom-parallax gallery — the studio's own completed interiors.
export const GALLERY = [
  { src: `${P}/portfolio-2-2204562c.webp`, t: "Open-plan Living" },
  { src: `${P}/portfolio-11-32dcb15a.webp`, t: "Principal Bedroom" },
  { src: `${P}/portfolio-17-4a7a6209.webp`, t: "Dining Room" },
  { src: `${P}/portfolio-30-2e527f6c.webp`, t: "Garden Lounge" },
  { src: `${P}/portfolio-44-32b2df33.webp`, t: "Study & Library" },
  { src: `${P}/portfolio-9-f383f968.webp`, t: "Kitchen" },
  { src: `${P}/portfolio-23-11724ad1.webp`, t: "Entrance Hall" },
];
