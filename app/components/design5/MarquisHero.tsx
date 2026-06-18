'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from './ui/scroll-expansion-hero';
import { IMG } from './images';

const VIDEO_SRC =
  'https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4';

export default function MarquisHero() {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('resetSection'));
  }, []);

  return (
    <ScrollExpandMedia
      mediaSrc={VIDEO_SRC}
      posterSrc={IMG.scene2}
      title='Marquis Manor'
      date='The Art of Luxury Furniture'
      scrollToExpand='Scroll to reveal'
      /* ---------- ADJUST THE EXPANSION HERE ---------- */
      startExpand={0} // 0% open at the top of the scroll (fully black)
      endExpand={1} // 100% open when it unlocks (video fully revealed)
      navbarGap={96} // px gap so the video clears the navbar
      splitDistanceVw={42} // how far "Marquis" / "Manor" slide apart
      sensitivity={0.0003} // lower = more scrolling needed to fully expand
      autoExpandMs={2000} // auto-lift the black curtain after 2s of no scrolling
      autoExpandDurationMs={3000} // the auto-lift plays over 3 seconds
      peekNextPct={0.1} // after expanding, glide to reveal 10% of the next section
    >
      <div className='mx-auto max-w-4xl text-center'>
        <p className='eyebrow mb-6'>Grandeur · Artistry · Effortless Panache</p>
        <h2 className='display text-[clamp(2rem,4.5vw,3.6rem)] text-cream'>
          Art-inspired collections, sculpted by hand into the soul of a room.
        </h2>
        <p className='mt-8 text-lg leading-relaxed text-muted'>
          From the depths of the Ocean to the wonder of the cosmos, every Marquis Manor piece begins as a story and
          becomes functional art — crafted from responsibly sourced materials with meticulous attention to proportion,
          line and finish.
        </p>
        <div className='mt-10 flex items-center justify-center gap-4'>
          <a href='#collections' className='btn btn-solid'>
            View all collections
          </a>
          <a href='#work' className='btn'>
            Explore the pieces
          </a>
        </div>
      </div>
    </ScrollExpandMedia>
  );
}
