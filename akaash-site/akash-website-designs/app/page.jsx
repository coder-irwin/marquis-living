import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0a08",
        color: "#f5efe4",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 300,
        textAlign: "center",
        padding: 32,
        backgroundImage:
          "radial-gradient(120% 80% at 50% 0%, rgba(194,161,97,.08), transparent 60%)",
      }}
    >
      <div>
        <p
          style={{
            color: "#c2a161",
            letterSpacing: ".32em",
            textTransform: "uppercase",
            fontSize: ".72rem",
            marginBottom: 18,
          }}
        >
          ✦ Akash Website Designs
        </p>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(2.4rem,6vw,4rem)",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          A collection of designs.
        </h1>
        <Link
          href="/design-one"
          style={{
            display: "inline-block",
            marginTop: 34,
            color: "#c2a161",
            textDecoration: "none",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            fontSize: ".76rem",
            border: "1px solid rgba(194,161,97,.4)",
            padding: "13px 26px",
            borderRadius: 999,
          }}
        >
          View Design One →
        </Link>
      </div>
    </main>
  );
}
