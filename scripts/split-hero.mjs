// Downloads the design-4 hero images and physically splits each into a
// left-half and right-half JPEG, written to /public/hero. The split halves are
// what the two hero panels render, so a matching index rejoins one whole photo.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "hero");

// High-resolution luxury interiors (Unsplash, verified live).
const SRC = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=2400&auto=format&fit=crop",
];

await mkdir(OUT, { recursive: true });

for (let i = 0; i < SRC.length; i++) {
  const n = i + 1;
  const res = await fetch(SRC[i]);
  if (!res.ok) throw new Error(`download ${n} failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const img = sharp(buf);
  const { width = 0, height = 0 } = await img.metadata();
  const half = Math.floor(width / 2);

  // left half
  await sharp(buf)
    .extract({ left: 0, top: 0, width: half, height })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT, `hero${n}-left.jpg`));

  // right half (account for odd widths)
  await sharp(buf)
    .extract({ left: half, top: 0, width: width - half, height })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT, `hero${n}-right.jpg`));

  console.log(`hero${n}: ${width}x${height} -> left ${half}px + right ${width - half}px`);
}

// tiny manifest other code can read if needed
await writeFile(
  join(OUT, "manifest.json"),
  JSON.stringify({ count: SRC.length }, null, 2)
);
console.log("done ->", OUT);
