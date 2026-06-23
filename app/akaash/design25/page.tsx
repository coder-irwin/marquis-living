import type { Metadata } from "next";
import Site from "../../components/akaash/design25/Site";

export const metadata: Metadata = {
  title: "Marquis Living — Meridian · A UX-Led Luxury Experience",
  description:
    "Design 25 'Meridian' — a single, premium Marquis Living experience that maps the full user journey (Awareness → Advocacy) onto a complete website anatomy: hero, manifesto, services, process, work, proof, voices, team, pricing, FAQ, CTA, contact and retention.",
};

export default function AkaashDesign25Page() {
  return <Site />;
}
