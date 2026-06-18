"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying background video that only fetches/plays while on screen.
 * preload="none" keeps it off the critical path; playback (and therefore the
 * network request) starts when the element scrolls into view and pauses when
 * it leaves, so we never decode video the user can't see.
 */
export default function InViewVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}
