"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A weighted luxe cursor: a small gold dot that snaps to the pointer and a
 * larger ring that trails with spring physics, growing over interactive
 * elements. Visibility is gated to fine-pointer devices via CSS (.d4-cursor),
 * so there is no setState-in-effect.
 */
export default function Cursor() {
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { damping: 26, stiffness: 260, mass: 0.6 });
  const ry = useSpring(y, { damping: 26, stiffness: 260, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHot(!!el.closest("a, button, [data-hot]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="d4-cursor">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-bright)]"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]"
        style={{ x: rx, y: ry }}
        animate={{
          width: hot ? 56 : 30,
          height: hot ? 56 : 30,
          opacity: hot ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      />
    </div>
  );
}
