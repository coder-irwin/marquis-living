import type { Metadata } from "next";
import Shell from "../../../components/akaash/design13/Shell";
import Contact from "../../../components/akaash/design13/Contact";

export const metadata: Metadata = {
  title: "Contact — Marquis Manor · Loft",
  description: "Tell us about the room, the building, or the idea. A real person reads every message and replies — usually within a day.",
};

export default function AkaashDesign12ContactPage() {
  return (
    <Shell cta={false}>
      <Contact />
    </Shell>
  );
}
