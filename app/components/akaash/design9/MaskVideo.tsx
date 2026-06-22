"use client";

import { motion } from "framer-motion";
import { HERO_VIDEO, HERO_POSTER } from "./data";

/**
 * Text-masked video (A4) — the reference's signature moment, where the showreel
 * plays *inside* the letterforms. Re-created with an SVG knockout mask: a panel
 * in the page colour covers the video everywhere except the text, which is
 * punched out (black in the mask) to reveal the footage beneath.
 */
const PAPER = "#f6f4ef"; // must match .d9 --bg

export default function MaskVideo() {
  return (
    <section className="relative bg-[var(--bg)] py-[clamp(3rem,8vw,7rem)]">
      <div className="container">
        <motion.div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#060010]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Marquis Living showreel, masked into the headline"
          />
          {/* Knockout panel: covers the video except where the text is cut out. */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 675"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="Made to be lived in"
          >
            <defs>
              <mask id="d9-knockout">
                <rect width="1200" height="675" fill="#fff" />
                <text
                  x="600"
                  y="300"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: 150,
                    letterSpacing: "-6px",
                  }}
                >
                  MADE TO BE
                </text>
                <text
                  x="600"
                  y="460"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#000"
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: 150,
                    letterSpacing: "-6px",
                  }}
                >
                  LIVED IN
                </text>
              </mask>
            </defs>
            <rect width="1200" height="675" fill={PAPER} mask="url(#d9-knockout)" />
          </svg>
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-[var(--soft)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Rooms are not photographs. We design for the light at 7am, the second
          cup of coffee, and the way a house sounds when it&apos;s full.
        </motion.p>
      </div>
    </section>
  );
}
