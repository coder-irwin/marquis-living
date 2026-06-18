import MediaTile from "./MediaTile";
import type { Tile } from "./data";

/** Two portrait/landscape tiles side by side */
export function TwoColumnMedia({ tiles }: { tiles: [Tile, Tile] }) {
  return (
    <section className="py-[clamp(28px,5vw,64px)]">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
          <MediaTile tile={tiles[0]} />
          <MediaTile tile={tiles[1]} delay={0.08} />
        </div>
      </div>
    </section>
  );
}

/** One tile occupying only the right column (left empty) */
export function SingleRightMedia({ tile }: { tile: Tile }) {
  return (
    <section className="py-[clamp(28px,5vw,64px)]">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
          <div className="hidden md:block" />
          <MediaTile tile={tile} />
        </div>
      </div>
    </section>
  );
}

/** Full-width feature media */
export function LargeMedia({ tile, priority = false }: { tile: Tile; priority?: boolean }) {
  return (
    <section className="py-[clamp(28px,5vw,64px)]">
      <div className="container">
        <MediaTile tile={tile} priority={priority} />
      </div>
    </section>
  );
}
