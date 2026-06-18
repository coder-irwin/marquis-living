'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'framer-motion';

interface Lenis {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number, opts?: { duration?: number }) => void;
}

interface ScrollExpandMediaProps {
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  children?: ReactNode;

  /* ---- TUNABLE KNOBS (adjust these to taste) ---- */
  /** How "open" the reveal is at scroll start. 0 = fully black, 1 = fully revealed. */
  startExpand?: number;
  /** How "open" the reveal is at scroll end (when it unlocks). 1 = fully revealed. */
  endExpand?: number;
  /** Height basis (px) of the subtle top scrim that keeps the navbar legible over the video. */
  navbarGap?: number;
  /** How far (in vw) the two words slide apart at full expansion. */
  splitDistanceVw?: number;
  /** Wheel sensitivity — smaller = more scrolling needed to fully expand. */
  sensitivity?: number;
  /** Auto-lift the black curtain after this many ms of no scrolling. */
  autoExpandMs?: number;
  /** Duration (ms) of the automatic lift animation. */
  autoExpandDurationMs?: number;
  /** After fully expanding, glide down to reveal this fraction of the next section. */
  peekNextPct?: number;
}

const ScrollExpandMedia = ({
  mediaSrc,
  posterSrc,
  title,
  children,
  startExpand = 0,
  endExpand = 1,
  navbarGap = 96,
  splitDistanceVw = 42,
  sensitivity = 0.0008,
  autoExpandMs = 300,
  autoExpandDurationMs = 3000,
  peekNextPct = 0.1,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  // once the curtain has fully lifted (auto or manual) we stop auto-lifting,
  // so a user scrolling back up keeps manual control.
  const autoDoneRef = useRef<boolean>(false);
  // handle to the running auto-lift animation, so manual scroll can cancel it.
  const autoAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  // ----- Smooth progress: a spring follows the raw scroll progress -----
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.4 });

  useEffect(() => {
    progress.set(scrollProgress);
  }, [scrollProgress, progress]);

  // reveal: 0 (curtain fully covers, all black) -> 1 (curtain gone, video shows)
  const reveal = useTransform(smooth, (v) => startExpand + (endExpand - startExpand) * v);
  const curtainY = useTransform(reveal, (r) => `${-r * 100}%`);
  const txNeg = useTransform(reveal, (r) => `translateX(-${r * splitDistanceVw}vw)`);
  const txPos = useTransform(reveal, (r) => `translateX(${r * splitDistanceVw}vw)`);
  // fade the split title out as the reveal completes so nothing lingers at 100%
  const titleOpacity = useTransform(reveal, [0, 0.8, 1], [1, 1, 0]);

  // Unlock ONLY when the *visual* animation has actually finished (the spring
  // reaches the end), so a fast scroll/fling can't blow past the hero before
  // the curtain has fully lifted.
  useMotionValueEvent(smooth, 'change', (v) => {
    if (v >= 0.999 && !mediaFullyExpanded) {
      setMediaFullyExpanded(true);
      setShowContent(true);
    }
  });

  useEffect(() => {
    const reset = () => {
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
    };
    window.addEventListener('resetSection', reset);
    return () => window.removeEventListener('resetSection', reset);
  }, []);

  // Pause Lenis smooth-scroll while the hero is locked, resume once expanded.
  // Lenis is created by a sibling provider, so it may not exist on first mount —
  // retry on rAF until it's available, then apply.
  useEffect(() => {
    if (mediaFullyExpanded) autoDoneRef.current = true;
    let raf = 0;
    const apply = () => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (!lenis) {
        raf = requestAnimationFrame(apply);
        return;
      }
      if (mediaFullyExpanded) lenis.start();
      else lenis.stop();
    };
    apply();
    return () => cancelAnimationFrame(raf);
  }, [mediaFullyExpanded]);

  // Once fully expanded, glide down to reveal a peek of the next section.
  useEffect(() => {
    if (!mediaFullyExpanded) return;
    const vh = window.innerHeight;
    const stageH = stageRef.current?.offsetHeight ?? vh;
    const target = Math.max(0, stageH - vh + peekNextPct * vh);
    const id = window.setTimeout(() => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }, 250);
    return () => clearTimeout(id);
  }, [mediaFullyExpanded, peekNextPct]);

  // Smoothly lift the curtain to 100% over autoExpandDurationMs. Once it
  // starts it runs to completion — input is locked so it can't be interrupted.
  const runAutoLift = useCallback(() => {
    if (mediaFullyExpanded || autoDoneRef.current || autoAnimRef.current) return;
    autoAnimRef.current = animate(progress, 1, {
      duration: autoExpandDurationMs / 1000,
      ease: [0.33, 0, 0.2, 1],
      onComplete: () => {
        autoDoneRef.current = true;
        autoAnimRef.current = null;
        setScrollProgress(1);
        // unlocking is handled by the smooth-gate once the spring settles
      },
    });
  }, [mediaFullyExpanded, autoExpandDurationMs, progress]);

  // Auto-lift if the user doesn't scroll within `autoExpandMs`. The effect
  // re-runs on every scroll tick, so the timer keeps resetting while the user
  // is actively scrolling and only fires once they pause.
  useEffect(() => {
    if (mediaFullyExpanded || autoDoneRef.current) return;
    const t = setTimeout(runAutoLift, autoExpandMs);
    return () => clearTimeout(t);
  }, [scrollProgress, mediaFullyExpanded, autoExpandMs, runAutoLift]);

  // Hard scroll-lock: while the hero is animating nobody can scroll the page.
  useEffect(() => {
    const root = document.documentElement;
    const locked = !mediaFullyExpanded;
    root.style.overflow = locked ? 'hidden' : '';
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      root.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded) return; // expanded: let the page scroll normally
      e.preventDefault(); // locked: block page scroll — wheel only drives the reveal
      if (autoAnimRef.current) return; // auto-lift playing: ignore input
      const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * sensitivity, 0), 1);
      setScrollProgress(newProgress);
      if (newProgress < 0.75) setShowContent(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (mediaFullyExpanded) return;
      e.preventDefault();
      if (autoAnimRef.current || !touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const scrollFactor = deltaY < 0 ? 0.008 : 0.006;
      const newProgress = Math.min(Math.max(scrollProgress + deltaY * scrollFactor, 0), 1);
      setScrollProgress(newProgress);
      if (newProgress < 0.75) setShowContent(false);
      setTouchStartY(touchY);
    };

    const handleTouchEnd = (): void => setTouchStartY(0);

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    // block keyboard scrolling (space / arrows / page / home / end) while locked
    const blockedKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar'];
    const handleKey = (e: KeyboardEvent): void => {
      if (!mediaFullyExpanded && blockedKeys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd as EventListener);
    window.addEventListener('keydown', handleKey, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
      window.removeEventListener('keydown', handleKey);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, sensitivity, progress]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';
  const isYouTube = mediaSrc.includes('youtube.com');

  return (
    <div ref={sectionRef} className='overflow-x-hidden'>
      <section
        ref={stageRef}
        className='relative flex min-h-[100dvh] w-full flex-col items-center justify-start bg-black'
      >
        {/* ---- Video, full-bleed behind the navbar ---- */}
        <div className='absolute inset-0 overflow-hidden'>
          {isYouTube ? (
            <iframe
              className='pointer-events-none h-full w-full'
              src={
                mediaSrc.replace('watch?v=', 'embed/') +
                '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                mediaSrc.split('v=')[1]
              }
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          ) : (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
              disablePictureInPicture
              disableRemotePlayback
              controls={false}
              className='h-full w-full object-cover'
            />
          )}
          <div className='absolute inset-0 bg-black/25' />
          {/* subtle top scrim so the navbar text stays readable over the video */}
          <div
            className='absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 to-transparent'
            style={{ height: `${navbarGap * 1.8}px` }}
          />
        </div>

        {/* ---- Black curtain (80% opacity so the video shows faintly behind) ---- */}
        <motion.div
          className='absolute inset-0 z-10 bg-black/80'
          style={{ y: curtainY, willChange: 'transform' }}
        />

        {/* ---- Brand name only (Marquis ← | → Manor) ---- */}
        <motion.div
          className='pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center mix-blend-difference'
          style={{ opacity: titleOpacity }}
        >
          <motion.h2
            className='font-serif text-6xl font-medium leading-[0.95] text-white md:text-8xl lg:text-[9rem]'
            style={{ transform: txNeg, willChange: 'transform' }}
          >
            {firstWord}
          </motion.h2>
          <motion.h2
            className='font-serif text-6xl font-medium leading-[0.95] text-white md:text-8xl lg:text-[9rem]'
            style={{ transform: txPos, willChange: 'transform' }}
          >
            {restOfTitle}
          </motion.h2>
        </motion.div>
      </section>

      {/* ---- Content revealed once fully expanded ---- */}
      <motion.section
        className='flex w-full flex-col px-8 py-10 md:px-16 lg:py-20'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
