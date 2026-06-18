"use client";

import { motion } from "framer-motion";
import type { Tile } from "./data";
import InViewVideo from "./InViewVideo";

const EASE = [0.22, 1, 0.36, 1] as const;
const MEDIA =
  "absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]";

export default function MediaTile({
  tile,
  delay = 0,
  priority = false,
  className = "",
}: {
  tile: Tile;
  delay?: number;
  priority?: boolean;
  className?: string;
}) {
  const aspect = tile.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[3/2]";

  return (
    <motion.a
      href={tile.href}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={`group block ${className}`}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {/* base media */}
        {tile.kind === "video" && tile.video ? (
          <InViewVideo src={tile.video} poster={tile.src} className={MEDIA} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tile.src}
            alt={tile.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={MEDIA}
          />
        )}

        {/* hover swap image — only fetched on hover via lazy + interaction */}
        {tile.hover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tile.hover}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}

        {/* readability scrim */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/3 bg-gradient-to-t from-black/45 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {/* post title — always legible, lifts slightly on hover */}
        <div className="absolute bottom-0 left-0 z-10 p-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
          <h5 className="text-[0.7rem] uppercase tracking-[0.22em] opacity-85">
            {tile.category}
          </h5>
          <h5 className="mt-1 font-serif text-xl leading-tight md:text-2xl">
            {tile.title}
          </h5>
        </div>
      </div>
    </motion.a>
  );
}
