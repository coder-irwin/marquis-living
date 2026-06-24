# Marquis Living — Concept Design Portfolio

A [Next.js 16](https://nextjs.org) application showcasing ~15 self-contained luxury
interior-design website concepts for the (fictional) brand **Marquis Living**, a
Dubai interior-design house. Each concept is a distinct, independent design direction
you can browse and compare from a single app.

> **Heads up for AI agents / contributors:** This uses **Next.js 16**, which has
> breaking changes vs. older versions. See `AGENTS.md` — read the relevant guide in
> `node_modules/next/dist/docs/` before changing framework-level code.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| UI | React 19.2 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + per-design scoped CSS, global `app/globals.css` |
| Animation | Framer Motion, Lenis (smooth scroll), canvas scroll-scrub |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Fonts | `next/font` (Fraunces + Inter) |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (hot reload)
npm run dev
# → http://localhost:3000

# 3. Or build + serve the optimized production build
npm run build
npm run start
```

Open **http://localhost:3000** (redirects to `/design1`).
The full concept index lives at **http://localhost:3000/akaash**.

### Requirements
- **Node.js 20+** (Node 18.18+ minimum for Next 16).
- macOS/Linux/Windows. Native modules (`lightningcss`, `@next/swc`) are installed
  automatically by `npm install` for your platform — if you copy `node_modules`
  between machines they will break (see `TROUBLESHOOTING.md`).

---

## Routes

| Route | What it is |
|-------|-----------|
| `/` | Redirects to `/design1` |
| `/design1` … `/design5` | Original "Marquis Manor" design directions |
| `/akaash` | **Concept index** — links to every numbered design |
| `/akaash/design25` | Flagship "Meridian" — full UX-led single-page experience |
| `/akaash/design23`, `design13`, `design11`, `design9`, `design6`, `design5`, `design4`, `design3`, `design2` | Numbered concepts (some have sub-pages: about, work, contact, gallery…) |

---

## Project structure

```
app/
├─ layout.tsx            Root layout: fonts, globals.css, <SmoothScroll> wrapper
├─ page.tsx              "/" → redirect to /design1
├─ globals.css           Shared global styles
├─ design1…design5/      Older designs (thin route → big component)
├─ akaash/
│   ├─ page.tsx          The concept index page
│   └─ designN/          Newer "akaash" concept routes
└─ components/
    ├─ <shared>          Navbar, Footer, MarquisHero, MarquisManorSite, …
    ├─ ui/               Reusable effects (hero-parallax, image-trail, zoom-parallax…)
    ├─ designN/          Component set for each older design
    └─ akaash/designN/   Component set for each newer design (e.g. design25/Site.tsx)

public/                  Web-served assets: image frames, gallery photos, fonts, videos
scripts/                 Asset-prep tooling (Python + Node): frame extraction, etc.
akaash-site/             Archived standalone prototype (NOT part of the Next build)
```

**Design pattern:** each concept is one self-contained client component (e.g.
`app/components/akaash/design25/Site.tsx`) that scopes all its CSS under a single root
class (`.d25`) injected from a sibling `styles.ts`, and runs all interactivity in one
`useEffect` with disciplined cleanup. Designs never collide.

### Signature feature: scroll-scrub video
`ScrubHero.tsx` / `ScrubTransform.tsx` pre-load a 240-frame JPEG sequence (exported
from source video) and draw it to `<canvas>` frame-by-frame on scroll, with smoothing
and reduced-motion support.

---

## NPM scripts

| Script | Action |
|--------|--------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Deployment (Vercel)

This is a standard Next.js app — Vercel auto-detects everything. See the
**step-by-step guide in `TROUBLESHOOTING.md`** for first-time setup, environment notes,
and every error we hit (and how it was fixed). The short version:

1. Push to GitHub (remote already configured: `akaash-headfield/akaash-neweb`).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto). Build: `next build`. Output: auto.
4. Deploy.

> **Large source media** (the multi-GB `.mov` and root `.mp4`/`.png` files) is
> **git-ignored on purpose** — it is source material, not web assets, and must never
> be committed (GitHub blocks files > 100 MB). The web-served media in `public/` is
> all small and committed normally.

### Pushing changes

```bash
git add -A
git commit -m "Describe your change"
git push            # pushes the current branch (akaash) to origin
```

Vercel auto-builds and deploys every push to a connected branch (Production for the
production branch, Preview for others).

---

## License / status

Concept / portfolio work. © 2026 Marquis Living — concept experiences.
</content>
</invoke>
