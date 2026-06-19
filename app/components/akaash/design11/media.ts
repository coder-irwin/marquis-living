/**
 * Real, on-brand Marquis Manor media for the design11 "maximal" build.
 * All paths are local files in /public (guaranteed to load) plus a couple of
 * allowlisted Pexels b-roll clips for full-bleed video bands.
 */

const P = "/glocal-portfolio";

/** Real interior renders shipped in /public/glocal-portfolio. */
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

export const HERO_SHOTS = [
  "/hero/hero1-left.jpg", "/hero/hero1-right.jpg",
  "/hero/hero2-left.jpg", "/hero/hero3-right.jpg",
  "/hero/hero4-left.jpg", "/hero/hero5-right.jpg",
];

export const EXTRA = ["/glocal/living-furnished.jpg", "/glocal/villa-pool.jpg"];

/** Studio showreel that ships in /public. We point every band at the LOCAL file
 *  so videos always play — external (Pexels/Unsplash) hosts are unreliable here. */
export const SHOWREEL = "/design5bgvideo.mp4";
export const VIDEO_BAND = SHOWREEL;
export const VIDEO_BAND_2 = SHOWREEL;

/** Pick n photos starting at an offset (wraps), for varied section galleries. */
export const pick = (n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => PHOTOS[(offset + i) % PHOTOS.length]);
