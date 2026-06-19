import type { Metadata } from "next";
import Shell from "../../../components/akaash/design11/Shell";
import Contact from "../../../components/akaash/design11/Contact";

export const metadata: Metadata = {
  title: "Contact — Marquis Manor · Aperture",
  description:
    "Tell us about the room, the building, or the idea. A real person reads every message and replies — usually within a day. Remote-first, delivered worldwide.",
};

export default function AkaashDesign11ContactPage() {
  return (
    <Shell cta={false}>
      <Contact />
    </Shell>
  );
}
