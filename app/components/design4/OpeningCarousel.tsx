"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HERO_PAIRS } from "./data";

const EASE = [0.22, 1, 0.36, 1] as const;
const N = HERO_PAIRS.length;
const wrap = (i: number) => ((i % N) + N) % N;

type Side = "left" | "right";

/** One half: renders the pre-cut left- or right-half file and crossfades when
 *  its index changes. The seam-side edge is pinned (object-position) so two
 *  halves at the same index always meet flush into one complete photo. */
function HalfPanel({ side, index, eager }: { side: Side; index: number; eager: boolean }) {
  const src = side === "left" ? HERO_PAIRS[index].left : HERO_PAIRS[index].right;
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={src}
          src={src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          // pin the inner edge (the cut line) to the panel's inner edge
          style={{ objectPosition: side === "left" ? "right center" : "left center" }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function OpeningCarousel() {
  const [left, setLeft] = useState(0);
  // start one apart: halves are clearly mismatched, one scroll rejoins them
  const [right, setRight] = useState(1);
  const [cursor, setCursor] = useState({ x: 0, y: 0, dir: "right" as Side, show: false });

  // arrow direction implied by clientX within a single panel's rect
  const dirIn = (clientX: number, rect: DOMRect): Side =>
    clientX - rect.left < rect.width / 2 ? "left" : "right";

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const panelW = rect.width / 2;
    const localX = x % panelW;
    setCursor({
      x,
      y: e.clientY - rect.top,
      dir: localX < panelW / 2 ? "left" : "right",
      show: true,
    });
  };

  const nav = (panel: Side, dir: Side) => {
    const delta = dir === "right" ? 1 : -1;
    (panel === "left" ? setLeft : setRight)((p) => wrap(p + delta));
  };

  const onClick = (panel: Side) => (e: React.MouseEvent<HTMLElement>) => {
    nav(panel, dirIn(e.clientX, e.currentTarget.getBoundingClientRect()));
  };

  const joined = left === right;

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={() => setCursor((c) => ({ ...c, show: false }))}
      className="relative h-[100svh] min-h-[560px] w-full select-none overflow-hidden bg-[#e9e6e1] md:cursor-none"
    >
      <div className="flex h-full">
        <div className="h-full w-1/2" onClick={onClick("left")}>
          <HalfPanel side="left" index={left} eager />
        </div>
        <div className="h-full w-1/2" onClick={onClick("right")}>
          <HalfPanel side="right" index={right} eager={right < 1} />
        </div>
      </div>

      {/* center seam — fades out once both halves match */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/40 transition-opacity duration-700"
        style={{ opacity: joined ? 0 : 1 }}
      />

      {/* custom arrow cursor (desktop) — thin line arrow, no chrome */}
      {cursor.show && (
        <div
          className="pointer-events-none absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <svg
            width="64"
            height="20"
            viewBox="0 0 64 20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: cursor.dir === "left" ? "scaleX(-1)" : "none",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
            }}
          >
            <line x1="1" y1="10" x2="62" y2="10" />
            <polyline points="52,2 62,10 52,18" />
          </svg>
        </div>
      )}

      {/* touch controls (mobile) */}
      {(["left", "right"] as Side[]).map((panel) => (
        <div
          key={panel}
          className={`absolute bottom-5 z-30 flex w-1/2 justify-center gap-8 md:hidden ${
            panel === "left" ? "left-0" : "right-0"
          }`}
        >
          <button
            aria-label={`Previous ${panel} image`}
            onClick={(e) => {
              e.stopPropagation();
              nav(panel, "left");
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-lg text-black"
          >
            ←
          </button>
          <button
            aria-label={`Next ${panel} image`}
            onClick={(e) => {
              e.stopPropagation();
              nav(panel, "right");
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-lg text-black"
          >
            →
          </button>
        </div>
      ))}
    </section>
  );
}
