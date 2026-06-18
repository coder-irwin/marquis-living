"use client";

import { useState } from "react";
import { AnimatedText } from "../anim";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="border-y border-line bg-surface py-20">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">Stay inspired</p>
          <AnimatedText el="h2" text="Design ideas, in your inbox" className="display text-[clamp(1.8rem,3.5vw,3rem)]" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setSent(true);
          }}
          className="flex w-full flex-col gap-3 sm:flex-row"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="you@home.com"
            data-cursor
            disabled={sent}
            className="flex-1 rounded-full border border-line bg-bg px-6 py-4 text-cream outline-none transition-colors focus:border-cream"
          />
          <button type="submit" className="btn btn-solid justify-center" data-cursor>
            {sent ? "Thanks ✓" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
