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
  chairPair: "/glocal/chairpair-glocal.jpg", //   pair of armchairs + side table (on cream backdrop)
};

export const IMG = {
  // hero / scenes — glocalstudio interiors front and centre
  hero: GLOCAL.livingFurnished, //                   furnished open-plan living (glocalstudio)
  scene1: GLOCAL.loungeMoody, //                     leather lounge (glocalstudio)
  scene2: u("1524758631624-e2822e304c36", 2000), //  library / lounge
  rawBuild: GLOCAL.rawBuild, //                      unfinished build — used ONLY in the before/after slider
  cta: u("1631679706909-1844bbd07221", 2000), //     neutral beige living room

  about1: u("1615875605825-5eb9bb5d52ac"), //        boho living room with shelves
  about2: u("1505693416388-ac5ce068fe85"), //        tufted luxury bedroom

  // products / furniture
  console: u("1538688525198-9b88f6f53126"), //       loft seating / console
  pendant: u("1540932239986-30128078f3c5"), //       brass pendant light cluster
  sideTable: u("1532372320572-cda25653a26d"), //     side table & books
  chair: u("1567538096630-e0c55bd6374c"), //         cream tufted accent chair
  centerTable: u("1499933374294-4584851497cc"), //   living room with centre table
  bed: u("1616594039964-ae9021a400a0"), //           luxury bedroom

  bar: u("1572116469696-31de0f17cc34"), //           moody cocktail bar interior

  // extra interiors — variety for the collection / parallax grids
  chairPair: GLOCAL.chairPair, //                    armchairs + side table (glocalstudio)
  loungeYellow: u("1586023492125-27b2c045efd7"), //  yellow accent chair scene
  sofaTan: u("1540574163026-643ea20ade25"), //       tan leather sofa
  livingGrey: u("1493663284031-b7e3aefcae8e"), //    grey sofa living room
  livingFireplace: u("1616137466211-f939a420be84"), // grey living room with fireplace
  diningChair: u("1598300042247-d088f8ab3a91"), //   upholstered dining chair
  livingBlue: u("1505691938895-1758d7feb511"), //    blue living room with art
};
