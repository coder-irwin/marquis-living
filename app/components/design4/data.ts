import { IMG } from "../images";

// --- Split hero: each source photo was physically cut into a left + right
// half (see scripts/split-hero.mjs -> /public/hero). The left panel cycles the
// left halves, the right panel the right halves; matching index = one photo.
export type HeroPair = { left: string; right: string };
export const HERO_PAIRS: HeroPair[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  left: `/hero/hero${n}-left.jpg`,
  right: `/hero/hero${n}-right.jpg`,
}));

export type Tile = {
  kind: "image" | "video";
  orientation: "portrait" | "landscape";
  src: string; // image src or video poster
  video?: string;
  hover?: string;
  category: string;
  title: string;
  href: string;
};

// --- Two-column media blocks (Marquis Manor collections & pieces) ---
const VID = "https://videos.pexels.com/video-files";

export const ROW_1: Tile[] = [
  {
    kind: "video",
    orientation: "portrait",
    src: IMG.scene1,
    video: `${VID}/7578548/7578548-uhd_2560_1440_30fps.mp4`,
    hover: IMG.scene2,
    category: "Collection",
    title: "Astronomica",
    href: "#",
  },
  {
    kind: "image",
    orientation: "portrait",
    src: IMG.hero,
    hover: IMG.about1,
    category: "Collection",
    title: "Ocean",
    href: "#",
  },
];

export const ROW_2: Tile[] = [
  {
    kind: "image",
    orientation: "portrait",
    src: IMG.about2,
    hover: IMG.bar,
    category: "Atelier",
    title: "The Atelier",
    href: "#",
  },
  {
    kind: "image",
    orientation: "portrait",
    src: IMG.bed,
    hover: IMG.chair,
    category: "Collection",
    title: "Ocean Suite",
    href: "#",
  },
];

export const ROW_3: Tile[] = [
  {
    kind: "image",
    orientation: "portrait",
    src: IMG.centerTable,
    hover: IMG.sideTable,
    category: "Piece",
    title: "Buckle Centre Table",
    href: "#",
  },
  {
    kind: "video",
    orientation: "landscape",
    src: IMG.console,
    video: `${VID}/3773486/3773486-hd_1920_1080_30fps.mp4`,
    hover: IMG.pendant,
    category: "Shop",
    title: "Blue Console",
    href: "#",
  },
];

// single right-column tile (left column intentionally empty)
export const ROW_4_RIGHT: Tile = {
  kind: "image",
  orientation: "landscape",
  src: IMG.chair,
  hover: IMG.sideTable,
  category: "Shop",
  title: "Accent Chair",
  href: "#",
};

// --- Large full-width media blocks ---
export const LARGE_1: Tile = {
  kind: "image",
  orientation: "landscape",
  src: IMG.about1,
  hover: IMG.cta,
  category: "Collection",
  title: "The Jungle Book",
  href: "#",
};

export const LARGE_2: Tile = {
  kind: "image",
  orientation: "landscape",
  src: IMG.scene2,
  hover: IMG.bar,
  category: "Collection",
  title: "Astronomica",
  href: "#",
};

// --- Instagram strip ---
export const INSTAGRAM = [
  IMG.console,
  IMG.pendant,
  IMG.sideTable,
  IMG.chair,
  IMG.centerTable,
  IMG.bed,
  IMG.scene1,
  IMG.scene2,
  IMG.bar,
  IMG.hero,
];
