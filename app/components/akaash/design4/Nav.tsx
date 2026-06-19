"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 1.2 }}
    >
      <nav className="container flex h-[72px] items-center justify-between">
        <a href="#top" data-hot className="serif text-xl tracking-tight text-[var(--bone)]">
          Marquis<span className="text-[var(--gold)]">·</span>Manor
        </a>
        <a href="#invitation" data-hot className="d4-link text-sm">
          Request an invitation
        </a>
      </nav>
    </motion.header>
  );
}
