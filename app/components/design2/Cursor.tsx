"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor]"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block"
      style={{ x: sx, y: sy, mixBlendMode: "difference" }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: "2px solid #ffffff" }}
        animate={{
          width: hover ? 64 : 18,
          height: hover ? 64 : 18,
          backgroundColor: hover ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}
