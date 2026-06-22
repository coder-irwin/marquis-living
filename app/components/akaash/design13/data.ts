/**
 * Akaash · Design 12 — "Loft" — a warm, editorial luxury-builder aesthetic
 * (clone of the loftthirtyone.com design language: Noto Serif Display + Fragment
 * Mono + Inter, sand accent on bone/near-black, Lenis smooth scroll, full-bleed
 * hero video, serif tickers, editorial project rows). Original Marquis Living copy
 * and the studio's own local imagery — nothing reproduced from the reference.
 */

export const BASE = "/akaash/design13";

const P = "/glocal-portfolio";

/** Real Marquis Living renders shipped in /public (reliable — no external hosts). */
export const PHOTOS = [
  `${P}/portfolio-2-2204562c.webp`,
  `${P}/portfolio-23-11724ad1.webp`,
  `${P}/portfolio-11-32dcb15a.webp`,
  `${P}/portfolio-17-4a7a6209.webp`,
  `${P}/portfolio-30-2e527f6c.webp`,
  `${P}/portfolio-44-32b2df33.webp`,
  `${P}/portfolio-9-f383f968.webp`,
  `${P}/portfolio-3-50cf7a05.webp`,
  `${P}/portfolio-37-001f5b16.webp`,
  `${P}/portfolio-45-13a00d43.webp`,
  `${P}/portfolio-26-a24408ad.webp`,
  `${P}/portfolio-6-f7fe65b8.webp`,
  `${P}/portfolio-16-ab714967.webp`,
  `${P}/portfolio-39-c386ceee.webp`,
  `${P}/portfolio-48-4b8ee8b7.webp`,
  `${P}/portfolio-12-0547cb1f.webp`,
  `${P}/portfolio-20-9d96aef7.webp`,
  `${P}/portfolio-50-790d0901.webp`,
  `${P}/portfolio-7-02896555.webp`,
  `${P}/portfolio-31-9fc69750.webp`,
  `${P}/portfolio-43-56fef46a.webp`,
  `${P}/portfolio-46-3fc373be.webp`,
  `${P}/portfolio-15-a3421fe6.webp`,
  `${P}/portfolio-38-02c5ab77.webp`,
];

export const SHOWREEL = "/design5bgvideo.mp4";

export const pick = (n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => PHOTOS[(offset + i) % PHOTOS.length]);

export const NAV = [
  { label: "The Process", href: `${BASE}/process` },
  { label: "Projects", href: `${BASE}/projects` },
  { label: "Gallery", href: `${BASE}/gallery` },
  { label: "The Crew", href: `${BASE}/crew` },
  { label: "Contact", href: `${BASE}/contact` },
];

export const PROJECTS = [
  { n: "01", title: "Bayfront Penthouse", place: "Marina District", year: "2025", type: "Residential", img: PHOTOS[0] },
  { n: "02", title: "Linden House", place: "Hillside Estate", year: "2025", type: "Private home", img: PHOTOS[3] },
  { n: "03", title: "The Quiet Suite", place: "Coastal Retreat", year: "2024", type: "Hospitality", img: PHOTOS[6] },
  { n: "04", title: "Maple & Stone", place: "Garden Terrace", year: "2024", type: "Residential", img: PHOTOS[9] },
  { n: "05", title: "Cedar Pavilion", place: "Lakeside", year: "2023", type: "Pavilion", img: PHOTOS[12] },
  { n: "06", title: "Atrium Offices", place: "Civic Quarter", year: "2023", type: "Commercial", img: PHOTOS[15] },
];

export const PROCESS = [
  { n: "01", h: "Listen", p: "Before a single line is drawn we sit with you — the way you live, the light you love, the hours you keep. Everything begins with the brief." },
  { n: "02", h: "Draw", p: "Accurate geometry, honest proportion, a grey-box pass to lock the composition and the camera before a material ever lands." },
  { n: "03", h: "Light", p: "We study the site's daylight — orientation, hour, season — then build it back so the space reads inhabited, not rendered." },
  { n: "04", h: "Dress", p: "Materials, palette and props tuned together until every surface feels chosen, intentional, and unmistakably yours." },
  { n: "05", h: "Deliver", p: "An in-house review for realism and accuracy, then final delivery in every format — print, web, animation and tour." },
];

export const CREW = [
  { name: "Aria Vance", role: "Creative Director" },
  { name: "Mara Linde", role: "Lead Visualiser" },
  { name: "Tomas Reyes", role: "3D & Modelling" },
  { name: "Iris Cole", role: "Interior Stylist" },
  { name: "Noah Pell", role: "Lighting Artist" },
  { name: "Sena Okoro", role: "Studio Producer" },
];

export const STATS = [
  { n: "11", suf: "", l: "Years drawing daylight into space" },
  { n: "450", suf: "+", l: "Projects modelled, lit and delivered" },
  { n: "12", suf: "", l: "Countries we ship finished work to" },
];
