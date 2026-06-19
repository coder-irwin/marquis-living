/** Shared content + image helpers for Akaash · Design 11 (Marquis Manor "Aperture"). */

export const BASE = "/akaash/design11";

/** Unsplash helper — bright, architectural interiors that suit the light theme. */
export const U = (id: string, w = 1100) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const NAV_LINKS = [
  { label: "Home", href: BASE },
  { label: "About", href: `${BASE}/about` },
  { label: "Services", href: `${BASE}/services` },
  { label: "Work", href: `${BASE}/work` },
  { label: "Contact", href: `${BASE}/contact` },
];

/** Selected works — used by the home horizontal scroller and the work grid. */
export const WORKS = [
  { id: "photo-1600585154340-be6161a56a0c", title: "Bayfront Penthouse", tag: "Residential", place: "Marina District", cat: "interior" },
  { id: "photo-1600607687939-ce8a6c25118c", title: "Linden House", tag: "Interior", place: "Hillside Estate", cat: "interior" },
  { id: "photo-1618221195710-dd6b41faaea6", title: "Atrium Offices", tag: "Commercial", place: "Civic Quarter", cat: "commercial" },
  { id: "photo-1600566753190-17f0baa2a6c3", title: "The Quiet Suite", tag: "Hospitality", place: "Coastal Retreat", cat: "hospitality" },
  { id: "photo-1600210492486-724fe5c67fb0", title: "Maple & Stone", tag: "Residential", place: "Garden Terrace", cat: "interior" },
  { id: "photo-1616486338812-3dadae4b4ace", title: "Glasshouse", tag: "Exterior", place: "Ridgeline", cat: "exterior" },
  { id: "photo-1615874959474-d609969a20ed", title: "Loft No. 9", tag: "Interior", place: "Old Mill Row", cat: "interior" },
  { id: "photo-1600573472550-8090b5e0745e", title: "Cedar Pavilion", tag: "Exterior", place: "Lakeside", cat: "exterior" },
];

export const SERVICES = [
  {
    img: "photo-1600585154340-be6161a56a0c",
    title: "Architectural Visualisation",
    desc: "Photoreal exteriors, interiors, isometrics and floor plans that turn a blueprint into something a client can feel — and buy into — long before a wall is poured.",
    ideal: "Architects, developers, real-estate, interior studios",
  },
  {
    img: "photo-1600566753086-00f18fb6b3ea",
    title: "3D Modelling",
    desc: "Precise, review-ready models for spaces, products and digital environments — clean topology, accurate scale, and built to flex across render, animation and prototyping.",
    ideal: "Designers, product brands, architects, engineers",
  },
  {
    img: "photo-1615529182904-14819c35db37",
    title: "Interior Styling",
    desc: "We dress the render — materials, light temperature, props and palette — so the space reads as lived-in, intentional and unmistakably yours.",
    ideal: "Interior designers, stagers, hospitality, retail",
  },
  {
    img: "photo-1600607687939-ce8a6c25118c",
    title: "Walkthrough Animation",
    desc: "Cinematic flythroughs and product films with considered pacing and sound design — vision that moves with purpose, not just a camera on rails.",
    ideal: "Developers, architects, agencies, real-estate",
  },
  {
    img: "photo-1600566753190-17f0baa2a6c3",
    title: "Virtual Tours & 360°",
    desc: "Interactive, immersive walkthroughs that let buyers step inside from anywhere — closing distance, and deals, faster.",
    ideal: "Realtors, hotels, property portals, global buyers",
  },
];

export const PROCESS = [
  { n: "01", h: "Brief & Light Study", p: "We start with your intent and the site's daylight — orientation, season, hour — so the mood is grounded in something real." },
  { n: "02", h: "Model & Block", p: "Accurate geometry and a grey-box pass to lock composition, camera and scale before a single material lands." },
  { n: "03", h: "Light & Dress", p: "Materials, styling and lighting tuned together until the space feels inhabited rather than rendered." },
  { n: "04", h: "Review & Reveal", p: "An in-house review for proportion, realism and accuracy — then final delivery in every format you need." },
];

export const VALUES = [
  { n: "I", h: "Daylight first", p: "Every scene begins with the sun. Get the light honest and everything else follows — material, mood, depth." },
  { n: "II", h: "Detail you can trust", p: "Real-world scale, accurate materials and a meticulous review pass on every frame before it leaves the studio." },
  { n: "III", h: "Partners, not vendors", p: "We sit inside your process — brainstorming, suggesting, iterating — and keep communication transparent throughout." },
];

export const TIMELINE = [
  { yr: "2014", h: "A desk and a single licence", p: "Marquis Manor began as a two-person studio rendering interiors for local architects after hours." },
  { yr: "2018", h: "The Daylight method", p: "We formalised our light-first workflow — every project now opens with a site-specific daylight study." },
  { yr: "2021", h: "Across three continents", p: "Our work began shipping to studios in twelve countries, all delivered remotely and on time." },
  { yr: "2026", h: "A full-suite studio", p: "From single stills to interactive virtual tours, Marquis Manor is now a complete visualisation partner." },
];

export const TEAM = [
  { img: "photo-1507003211169-0a1dd7228f2d", name: "Aria Vance", role: "Creative Director" },
  { img: "photo-1494790108377-be9c29b29330", name: "Mara Linde", role: "Lead Visualiser" },
  { img: "photo-1500648767791-00dcc994a43e", name: "Tomas Reyes", role: "3D & Modelling" },
  { img: "photo-1438761681033-6461ffad8d80", name: "Iris Cole", role: "Interior Stylist" },
];
