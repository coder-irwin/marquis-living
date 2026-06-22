import { IMG } from "../images";

export const STEPS = [
  {
    no: "01",
    title: "Share your style",
    desc: "Take a short style quiz and tell us about your space, your budget and how you want to live in it.",
  },
  {
    no: "02",
    title: "Get matched",
    desc: "We pair you with a Marquis Living designer whose taste fits yours — and book a one-to-one consultation.",
  },
  {
    no: "03",
    title: "See your concepts",
    desc: "Receive multiple photorealistic 3D concepts for your room, then refine the one you love together.",
  },
  {
    no: "04",
    title: "Shop the look",
    desc: "Get a curated shopping list of Marquis Living pieces — delivered, styled and ready to live in.",
  },
];

export const PACKAGES = [
  {
    name: "Classic",
    price: "$449",
    unit: "/ room",
    tagline: "A considered refresh.",
    features: ["1 design concept", "Style consultation", "Curated shopping list", "Two revision rounds"],
    featured: false,
  },
  {
    name: "Premium",
    price: "$649",
    unit: "/ room",
    tagline: "Most loved.",
    features: ["2 designer concepts", "1-on-1 video consultation", "Full 3D render", "Unlimited revisions", "Trade pricing on furniture"],
    featured: true,
  },
  {
    name: "Platinum",
    price: "$1,290",
    unit: "/ room",
    tagline: "The full atelier.",
    features: ["3 designer concepts", "Dedicated lead designer", "Photoreal 3D walkthrough", "White-glove install", "Bespoke commissions"],
    featured: false,
  },
];

export const ROOMS = [
  { name: "Living Room", img: IMG.hero },
  { name: "Bedroom", img: IMG.about2 },
  { name: "Dining", img: IMG.about1 },
  { name: "Home Office", img: IMG.scene1 },
  { name: "Hospitality", img: IMG.bar },
  { name: "Commercial", img: IMG.scene2 },
];

export const PROJECTS = [
  { title: "Modern Coastal Living Room", tag: "Ocean", img: IMG.hero },
  { title: "Glam & Elegant Interior", tag: "Astronomica", img: IMG.scene1 },
  { title: "Warm Apartment Makeover", tag: "Sustainable", img: IMG.about1 },
  { title: "Sleek Home Office", tag: "House of Cards", img: IMG.scene2 },
];

export const FAQS = [
  { q: "How does online interior design work?", a: "You share your space and style, we match you with a Marquis Living designer, and you receive photorealistic concepts plus a curated shopping list — all online, on your timeline." },
  { q: "What does it cost?", a: "Flat per-room packages from $449. No hourly surprises — you know the price before you begin, and furniture is offered at trade pricing." },
  { q: "How long does it take?", a: "Most rooms move from first concept to final design in two to three weeks, depending on the package and revision rounds." },
  { q: "Can I keep some of my existing pieces?", a: "Absolutely. Your designer works around the pieces you love and fills the gaps with Marquis Living originals." },
  { q: "Do you deliver and install?", a: "With Premium and Platinum we coordinate delivery, and Platinum includes a white-glove install and styling day." },
];
