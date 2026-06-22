"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// design14 "The Approach", ported into design23.
const IMG_1 = "/glocal-portfolio/portfolio-11-32dcb15a.webp";
const IMG_2 = "/glocal-portfolio/portfolio-16-ab714967.webp";
const IMG_3 = "/glocal-portfolio/portfolio-29-4a8acfd3.webp";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEAD = ["Every", "great", "home", "begins", "as", "one", "considered", "idea."];

export default function Approach() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="apr">
      <style dangerouslySetInnerHTML={{ __html: APR_CSS }} />
      <div className="wrap apr-head">
        <span className="ey rv">The Approach</span>
        <h2 className="serif apr-title">
          {HEAD.map((w, i) => (
            <span key={i} className="apr-word">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                className={w === "idea." ? "apr-em" : ""}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h2>
        <p className="apr-lead rv">
          Before a wall is moved or a single stone is chosen, we sit with you and listen — to your mornings, your
          gatherings, the quiet you come home for. Only then do we begin. The result never looks designed. It looks like you.
        </p>
      </div>

      <div className="wrap apr-imgs">
        <motion.figure style={{ y: y1 }} className="ir"><img src={IMG_1} alt="Interior" /></motion.figure>
        <motion.figure style={{ y: y2 }} className="ir apr-mid"><img src={IMG_2} alt="Interior" /></motion.figure>
        <motion.figure style={{ y: y3 }} className="ir"><img src={IMG_3} alt="Interior" /></motion.figure>
      </div>
    </section>
  );
}

const APR_CSS = `
.d23 .apr { background:var(--paper); padding:clamp(110px,18vh,260px) 0; overflow:hidden; }
.d23 .apr-head { max-width:56rem; display:flex; flex-direction:column; align-items:center; gap:28px; text-align:center; }
.d23 .apr-title { font-size:clamp(2.2rem,6vw,5.4rem); }
.d23 .apr-word { display:inline-block; overflow:hidden; padding-bottom:.1em; vertical-align:bottom; }
.d23 .apr-word > span { display:inline-block; }
.d23 .apr-em { font-style:italic; }
.d23 .apr-lead { max-width:36rem; line-height:1.75; color:var(--muted); }
.d23 .apr-imgs { margin-top:clamp(64px,9vh,112px); display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(12px,2vw,24px); }
.d23 .apr-imgs figure { aspect-ratio:3/4; overflow:hidden; border-radius:3px; }
.d23 .apr-mid { margin-top:clamp(32px,6vw,64px); }
`;
