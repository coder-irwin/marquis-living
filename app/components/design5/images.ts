// Interior & furniture imagery — every image verified to be a real interior room
// or furniture piece (no cartoons / characters / exteriors / blueprints).
//
// "/glocal/*" are the genuine interior shots pulled from glocalstudio.in. Their site
// is mostly 3D-character / arch-viz / product-render work, so only the real interior
// and furniture images were kept; the rest is filled with verified interior
// photography from the Unsplash CDN for variety.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

// glocalstudio.in interiors (self-hosted under /public/glocal)
const GLOCAL = {
  livingFurnished: "/glocal/living-furnished.jpg", // furnished, styled open-plan living — primary hero
  rawBuild: "/glocal/4-af932dda.png", //          same room, unfinished build — ONLY for the before/after slider
  loungeMoody: "/glocal/2-9eb1d05f.jpg", //        moody leather lounge with sideboard
  villaPool: "/glocal/villa-pool.jpg", //          indoor–outdoor pavilion + infinity pool (glocalstudio)
};

// glocalstudio.in /portfolio interiors (self-hosted under /public/glocal-portfolio).
// 30 verified, un-branded interior rooms — distributed so every section gets a unique set.
const pf = (n: string) => `/glocal-portfolio/${n}`;
export const PF = {
  openLiving: pf("portfolio-11-32dcb15a.webp"),
  livingFire1: pf("portfolio-6-f7fe65b8.webp"),
  livingGarden: pf("portfolio-50-790d0901.webp"),
  livingFire2: pf("portfolio-14-19639cd9.webp"),
  livingKitchen: pf("portfolio-15-a3421fe6.webp"),
  livingBrown: pf("portfolio-12-0547cb1f.webp"),
  balconyLounge: pf("portfolio-3-50cf7a05.webp"),
  bedWood: pf("portfolio-2-2204562c.webp"),
  bedSunset: pf("portfolio-16-ab714967.webp"),
  bedWhite: pf("portfolio-17-4a7a6209.webp"),
  bedSofa: pf("portfolio-20-9d96aef7.webp"),
  bedMinimal: pf("portfolio-23-11724ad1.webp"),
  bedGold: pf("portfolio-37-001f5b16.webp"),
  bedBlue: pf("portfolio-38-02c5ab77.webp"),
  bedBotanical: pf("portfolio-44-32b2df33.webp"),
  kids1: pf("portfolio-31-9fc69750.webp"),
  kids2: pf("portfolio-34-6ff5a7d2.webp"),
  kids3: pf("portfolio-39-c386ceee.webp"),
  diningGold: pf("portfolio-9-f383f968.webp"),
  diningNavy: pf("portfolio-26-a24408ad.webp"),
  diningBubble: pf("portfolio-30-2e527f6c.webp"),
  kitchen1: pf("portfolio-29-4a8acfd3.webp"),
  kitchen2: pf("portfolio-43-56fef46a.webp"),
  bath: pf("portfolio-24-63c173be.webp"),
  office1: pf("portfolio-7-02896555.webp"),
  office2: pf("portfolio-10-b338ec9f.webp"),
  office3: pf("portfolio-45-13a00d43.webp"),
  office4: pf("portfolio-46-3fc373be.webp"),
  office5: pf("portfolio-48-4b8ee8b7.webp"),
  bedGreen: pf("portfolio-18-34f07eb4.webp"),
};

export const IMG = {
  // hero / scenes — glocalstudio interiors front and centre
  hero: GLOCAL.livingFurnished, //                   furnished open-plan living (glocalstudio)
  scene1: GLOCAL.loungeMoody, //                     leather lounge (glocalstudio)
  scene2: PF.openLiving, //                          MarquisHero poster (portfolio)
  rawBuild: GLOCAL.rawBuild, //                      unfinished build — used ONLY in the before/after slider
  cta: PF.bedBlue, //                                CTA background (portfolio)

  about1: PF.diningNavy, //                          Studio — dining setting (portfolio)
  about2: PF.bedBotanical, //                        Studio — bedroom setting (portfolio)

  // products / furniture
  console: u("1538688525198-9b88f6f53126"), //       loft seating / console
  pendant: u("1616137466211-f939a420be84"), //       living room with fireplace
  sideTable: u("1602872030219-ad2b9a54315c"), //     bright sunlit dining room
  chair: GLOCAL.villaPool, //                        indoor–outdoor pavilion (glocalstudio)
  centerTable: u("1499933374294-4584851497cc"), //   living room with centre table
  bed: u("1616594039964-ae9021a400a0"), //           luxury bedroom

  bar: u("1572116469696-31de0f17cc34"), //           moody cocktail bar interior

  // extra interiors — variety for the collection / parallax grids
  chairPair: u("1505691938895-1758d7feb511"), //     blue coastal living room
  loungeYellow: u("1586023492125-27b2c045efd7"), //  yellow accent chair scene
  sofaTan: u("1540574163026-643ea20ade25"), //       tan leather sofa
  livingGrey: u("1493663284031-b7e3aefcae8e"), //    grey sofa living room
  livingFireplace: u("1616137466211-f939a420be84"), // grey living room with fireplace
  diningChair: u("1598300042247-d088f8ab3a91"), //   upholstered dining chair
  livingBlue: u("1505691938895-1758d7feb511"), //    blue living room with art
};
