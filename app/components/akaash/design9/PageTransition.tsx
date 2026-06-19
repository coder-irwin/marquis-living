"use client";

import { motion } from "framer-motion";

/**
 * Fade-to-black page transition (A21 in the reference) — a full-screen panel
 * that lifts away on mount, giving the site its "this is a film, not a page"
 * entrance. Re-created here as an original implementation.
 */
export default function PageTransition() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] bg-[#060010]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      onAnimationComplete={(def) => {
        // After the reveal, drop the layer entirely so it never intercepts.
        void def;
      }}
      style={{ visibility: "visible" }}
    />
  );
}
