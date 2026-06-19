// Akaash · Design 2 — content + imagery for "Aakash" interior studio.
// All paths are self-hosted glocalstudio interior/portfolio shots so nothing
// depends on an external CDN. The IMG map from the shared module gives a couple
// of extra verified interior scenes for the hero / CTA.
import { IMG } from "../../images";

export const HERO_IMG = IMG.hero; // furnished open-plan living (glocalstudio)
export const CTA_IMG = IMG.cta;

const P = "/glocal-portfolio";

// Curated room/product showcase — each is a "chapter" in the home's story.
export const CHAPTERS = [
  {
    no: "01",
    kicker: "The Threshold",
    title: "Where the day begins",
    body: "A living room is the first sentence of a home's story — light, an honest material, a place to gather. We compose it like an opening line.",
    img: `${P}/portfolio-2-2204562c.webp`,
    tag: "Living",
  },
  {
    no: "02",
    kicker: "The Quiet Hours",
    title: "Rooms that hold rest",
    body: "Bedrooms ask for restraint. Soft grain, warm shadow, nothing that shouts — a chapter written in low tones so sleep comes easily.",
    img: `${P}/portfolio-11-32dcb15a.webp`,
    tag: "Bedroom",
  },
  {
    no: "03",
    kicker: "The Gathering",
    title: "A table worth lingering at",
    body: "The dining room is where stories are actually told. We design the long pause after a meal — the seat nobody wants to leave.",
    img: `${P}/portfolio-17-4a7a6209.webp`,
    tag: "Dining",
  },
  {
    no: "04",
    kicker: "The Flourish",
    title: "The details that finish a sentence",
    body: "Joinery, brass, stone, the turn of a handle. The closing punctuation that makes a space feel authored rather than assembled.",
    img: `${P}/portfolio-23-11724ad1.webp`,
    tag: "Detail",
  },
];

// The user / design journey — four movements from first call to handover.
export const JOURNEY = [
  {
    step: "Dream",
    sub: "We listen",
    body: "Your story, your light, the way you actually live. Every project starts with the brief you can't quite put into words.",
  },
  {
    step: "Plan",
    sub: "We map",
    body: "Layouts, moodboards, a walk-through you can step inside before a single wall moves. The journey becomes visible.",
  },
  {
    step: "Craft",
    sub: "We make",
    body: "Bespoke furniture and finishes, built by hands that have done it a thousand times. Materials chosen to age beautifully.",
  },
  {
    step: "Live",
    sub: "We hand over",
    body: "The reveal — and then the part that matters most: the years you spend inside the story we wrote together.",
  },
];

// Masonry gallery — a wall of finished work.
export const GALLERY = [
  `${P}/portfolio-3-50cf7a05.webp`,
  `${P}/portfolio-9-f383f968.webp`,
  `${P}/portfolio-15-a3421fe6.webp`,
  `${P}/portfolio-20-9d96aef7.webp`,
  `${P}/portfolio-29-4a8acfd3.webp`,
  `${P}/portfolio-30-2e527f6c.webp`,
  `${P}/portfolio-38-02c5ab77.webp`,
  `${P}/portfolio-44-32b2df33.webp`,
  `${P}/portfolio-46-3fc373be.webp`,
];

export const MARQUEE_WORDS = [
  "Interiors",
  "Bespoke Furniture",
  "Spatial Storytelling",
  "Turnkey Design",
  "Lighting",
  "Joinery",
  "Styling",
];
