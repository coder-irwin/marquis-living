# Marquis Manor — Scroll-Driven Interior Design Site

A premium, single-page **scroll-driven house walkthrough**. As the visitor scrolls,
a 240-frame video of a luxury villa is "scrubbed" on a `<canvas>`, room by room.
Chapter captions, a live "now viewing" concierge, and a progress rail are all
timed to the actual rooms in the footage.

Below the walkthrough the page continues with: a **stats band**, a gap-free
**photo gallery**, an image-led **services** grid, a 4-step **process**,
**testimonials** (with room photos + ratings), a gold **CTA banner**, and a
**contact** section that pairs a lead form with a "Visit the atelier / head
office" card. It is fully responsive (desktop → tablet → phone) and ships with a
favicon, social/Open-Graph tags and a `theme-color`.

It is **100% static** — plain HTML, CSS and vanilla JavaScript. No build step,
no framework, no dependencies.

> ### ⚠️ Replace before publishing (placeholder content)
> The copy is real but the business details are **placeholders** — search
> `index.html` and swap them for the real ones:
> - **Head office address** — `14 Mulholland Terrace, Los Angeles, CA 90077`
> - **Phone** — `+1 (310) 555-0142`  ·  **Email** — `hello@marquismanor.studio`
> - **Opening hours**, **stats** (`120+`, `Est. 2014`, …) and the three
>   **testimonials** (names + quotes)

---

## 1. Project structure

```
gemini vid generation/
├── README.md                        ← this file
├── Create_an_ultra_realistic_hig.mp4  ← original source video (10s, 1280×720, 24fps)
└── site/                            ← the deployable website (this is all you need to host)
    ├── index.html                   ← markup: walkthrough, gallery, panels, modal
    ├── styles.css                   ← all styling + design tokens (:root)
    ├── script.js                    ← the scroll/frame engine
    └── assets/
        ├── house.mp4                ← copy of the source clip
        └── frames/                  ← 240 stills: frame_0001.jpg … frame_0240.jpg
```

> **Only the `site/` folder needs to be deployed.** The `.mp4` files and this
> README are not required at runtime.

---

## 2. Run it locally

The page loads the 240 frames over HTTP and draws them to a canvas. Opening
`index.html` directly with `file://` can fail (browsers restrict canvas image
access and `fetch` over `file://`), so **serve it over a local web server**.

Pick any one of these from inside the `site/` folder:

```bash
cd "site"

# Option A — Python 3 (already on macOS / most Linux)
python3 -m http.server 8000

# Option B — Node.js
npx serve .          # or:  npx http-server -p 8000

# Option C — PHP
php -S localhost:8000
```

Then open **http://localhost:8000** and scroll.

> VS Code users can instead right-click `index.html` → **Open with Live Server**.

---

## 3. Deploy (any static host)

Upload the **contents of `site/`** to any static host — no configuration needed:

- **Netlify** — drag the `site/` folder onto https://app.netlify.com/drop
- **Vercel** — `vercel` in the `site/` folder (framework: "Other")
- **GitHub Pages** — push `site/` to a repo, enable Pages on that folder/branch
- **Cloudflare Pages / S3 / Firebase Hosting** — point them at `site/`

Make sure `assets/frames/` (all 240 jpgs) ships with the upload.

---

## 4. Regenerating the frames from a video

The frames were extracted from the 10-second clip at 24fps (10 × 24 = 240).
To rebuild them (e.g. after replacing the video), install
[ffmpeg](https://ffmpeg.org) and run from the `site/` folder:

```bash
mkdir -p assets/frames
ffmpeg -i assets/house.mp4 -vf "fps=24,scale=1280:720:flags=lanczos" -q:v 3 \
  assets/frames/frame_%04d.jpg
```

- `fps=24` controls how many stills per second. `total frames = duration × fps`.
- Keep the `frame_%04d.jpg` naming (zero-padded to 4 digits).
- If the count changes, update `FRAME_COUNT` in `script.js` (see §5) to match
  exactly how many files were produced.

To check the source video's duration / fps:

```bash
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 assets/house.mp4
ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=nw=1:nk=1 assets/house.mp4
```

---

## 5. Customizing

All the knobs live in two files.

### Brand, copy & rooms — `index.html`
- **Site name**: search for `MARQUIS MANOR` (nav, preloader, footer) and
  `Marquis Manor` (eyebrows, modal, gallery text, email).
- **Chapter captions**: the `<article class="chapter …">` blocks inside
  `#overlays`. Each has a `data-chapter` key that must match an entry in the
  `CHAPTERS` array in `script.js`.
- **Gallery**: the `.gallery__grid` figures. Layout tiles perfectly in a
  6-column grid — each row must sum to 6: `shot--full`=6, `shot--half`=3,
  `shot--third`=2.
- **Section images**: the services cards (`.card__img`), testimonials
  (`.quote__thumb`) and the visit panel (`.visit__img`) all reuse frames from
  `assets/frames/`. Swap the `src` to use your own photography — just keep the
  aspect ratios similar so the layout stays tidy.
- **Visit / head office**: the `.visit` block in the contact section holds the
  address, hours and phone (see the placeholder warning at the top).

### Fonts & colors — `styles.css`
Edit the design tokens at the top:
```css
:root{
  --bg: #0b0a08;     /* page background (espresso) */
  --paper: #f5efe4;  /* light text / light panels  */
  --accent: #c2a161; /* champagne gold accent      */
  --font-serif: "Cormorant Garamond", …;  /* display */
  --font-sans:  "Jost", …;                 /* body/UI */
}
```
Fonts are loaded from Google Fonts via the `<link>` in `index.html`.

### Frame engine & timing — `script.js`
- `FRAME_COUNT` — number of frames (must equal the file count in `assets/frames/`).
- `CHAPTERS` — when each caption appears, in scroll-progress space `0…1`
  (`p = (frame − 1) / (FRAME_COUNT − 1)`). Each entry: `{ key, in, out, fade }`.
- `ROOMS` — the "now viewing" concierge thresholds (`until` in `0…1`).
- Rail dots & nav links — `data-go="0.40"` attributes in `index.html` jump to a
  scroll-progress point.
- **Scroll smoothness** — the `SMOOTH` constant (default `7.5`). Higher tracks
  your finger more tightly; lower feels more floaty/cinematic.

---

## 6. How the smooth scroll works

- Every frame is **decoded up front** during the preloader (`img.decode()`), so
  no JPEG ever decodes mid-scroll — the main source of stutter is removed.
- A **single `requestAnimationFrame` loop** reads the scroll position itself
  (no work on the bursty `scroll` event) and eases the displayed frame toward
  the target using **frame-rate-independent** smoothing, so it feels identical
  on 60 Hz and 120 Hz (ProMotion) displays.
- The canvas sits on its own GPU layer and redundant redraws are skipped.
- Respects `prefers-reduced-motion` (instant frame mapping).

---

## 7. Browser support

Modern evergreen browsers (Chrome, Edge, Safari, Firefox). Uses `<canvas>`,
`requestAnimationFrame`, `Image.decode()`, CSS Grid and `aspect-ratio` — all
broadly supported. Best experienced on desktop; fully responsive on mobile.

---

## 8. Notes

- First load fetches ~240 small JPEGs (~15 MB total) behind a percentage
  preloader; they are then cached by the browser.
- Everything is self-contained — the only external requests are the Google
  Fonts stylesheet.
