"use client";

import { AnimatedText } from "../anim";

/** Big editorial statement, left-aligned, ~half width */
export function LargeText({ text }: { text: string }) {
  return (
    <section className="py-[clamp(64px,12vw,160px)]">
      <div className="container">
        <AnimatedText
          el="h2"
          text={text}
          className="display max-w-[16ch] text-[clamp(2rem,5vw,4.2rem)] text-[#2f3a48]"
        />
      </div>
    </section>
  );
}

/** Centered small paragraph block */
export function SmallText({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-[clamp(48px,9vw,120px)]">
      <div className="container">
        <div className="mx-auto flex max-w-[640px] flex-col gap-6 text-center text-[1.05rem] leading-relaxed text-[#2f3a48]/85">
          {children}
        </div>
      </div>
    </section>
  );
}
