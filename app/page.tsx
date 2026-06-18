import { redirect } from "next/navigation";

// The site currently has one design, served at /design1.
// Add /design2, /design3, … later and turn this root into a chooser if you like.
export default function Home() {
  redirect("/design1");
}
