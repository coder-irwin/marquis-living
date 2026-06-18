// Curated luxury interior & furniture imagery (Unsplash CDN — all verified live).
// One helper keeps sizing/quality consistent and lets us request widths per use.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMG = {
  // interior scenes
  hero: u("1618221195710-dd6b41faaea6", 2000), // modern living room
  about1: u("1556228453-efd6c1ff04f6"), //         styled interior
  about2: u("1505693416388-ac5ce068fe85"), //      bedroom
  cta: u("1493809842364-78817add7ffb", 2000), //   dramatic lounge

  // products / furniture
  console: u("1538688525198-9b88f6f53126"), //     sideboard / console
  crockery: u("1578749556568-bc2c40e68b61"), //    tableware
  sideTable: u("1532372320572-cda25653a26d"), //   side table & decor
  chair: u("1567016432779-094069958ea5"), //       accent chair
  centerTable: u("1499933374294-4584851497cc"), // centre table / decor
  bed: u("1616486338812-3dadae4b4ace"), //         bed

  // collection / scene imagery
  scene1: u("1555041469-a586c61ea9bc"), //         living scene
  scene2: u("1524758631624-e2822e304c36"), //      library / lounge
  bar: u("1470337458703-46ad1756a187"), //         bar
};
