"use client";

import { useState } from "react";

const LEFT = ["Collections", "Atelier", "Our Shop", "Contact"];
const RIGHT = ["Instagram", "Careers", "Privacy", "Terms"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  return (
    <footer className="border-t border-[#2f3a48]/12 bg-[#f4f1ec] text-[#2f3a48]">
      <div className="container py-[clamp(48px,8vw,96px)]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: menus + credit */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex gap-16">
              <ul className="flex flex-col gap-3">
                {LEFT.map((l) => (
                  <li key={l}>
                    <a href="#" className="ul-link text-sm">{l}</a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {RIGHT.map((l) => (
                  <li key={l}>
                    <a href="#" className="ul-link text-sm">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <h6 className="text-[0.7rem] uppercase tracking-[0.2em] text-[#2f3a48]/60">
              ©Marquis Manor
            </h6>
          </div>

          {/* Right: newsletter */}
          <div className="flex flex-col gap-6">
            <h6 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
              Newsletter
            </h6>
            <h3 className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug">
              Sign up to our newsletter to receive news on new collections,
              atelier pieces and private viewings.
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="border-b border-[#2f3a48]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#2f3a48]/45 focus:border-[#2f3a48]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  placeholder="First Name"
                  className="border-b border-[#2f3a48]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#2f3a48]/45 focus:border-[#2f3a48]"
                />
                <input
                  type="text"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  placeholder="Last Name"
                  className="border-b border-[#2f3a48]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#2f3a48]/45 focus:border-[#2f3a48]"
                />
              </div>
              <button
                type="submit"
                className="mt-3 self-start border border-[#2f3a48] px-8 py-3 text-[0.78rem] uppercase tracking-[0.2em] transition-colors duration-400 hover:bg-[#2f3a48] hover:text-[#f4f1ec]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
