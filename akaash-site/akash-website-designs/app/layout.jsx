export const metadata = {
  title: "Akash Website Designs",
  description: "A collection of website design concepts by Akash.",
};

export const viewport = {
  themeColor: "#0b0a08",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
