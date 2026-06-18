import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marquis Manor — The Art of Designing & Crafting Luxury Furniture",
  description:
    "Marquis Manor crafts art-inspired luxury furniture collections — Ocean, Astronomica, Jungle Book and more. Grandeur, artistry and effortless panache.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <div className="noise" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
