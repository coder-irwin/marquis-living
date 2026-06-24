# Troubleshooting & Deployment Log

This document does two things:
1. **Part A** — a step-by-step guide to deploy this project on **Vercel** and push changes.
2. **Part B** — a log of every error encountered while getting this project to build/run,
   and exactly how each was solved (so you can fix it again if it recurs).

---

# Part A — Deploy on Vercel, step by step

## Prerequisites
- A [GitHub](https://github.com) account (the repo remote is already
  `https://github.com/akaash-headfield/akaash-neweb.git`).
- A [Vercel](https://vercel.com) account (sign in with GitHub — easiest).
- Node.js 20+ locally.

## Step 1 — Make sure the project builds locally
Never push something that doesn't build. From the project root:

```bash
npm install
npm run build
```

You should see `✓ Compiled successfully` and a route list ending without errors.
If the build fails, fix it first (see Part B for known issues).

## Step 2 — Commit your work
Large source media is already git-ignored, so this is safe:

```bash
git status            # review what will be committed
git add -A
git commit -m "Restore app, fix build, add docs"
```

## Step 3 — Push to GitHub
The branch `akaash` already tracks `origin/akaash`:

```bash
git push
```

If you instead want this on `main` (Vercel's default production branch), do:

```bash
git push origin akaash:main      # push your branch up as main
# or merge akaash into main locally, then: git push origin main
```

> If `git push` asks for credentials, use a **GitHub Personal Access Token** as the
> password (Settings → Developer settings → Personal access tokens), or set up the
> [GitHub CLI](https://cli.github.com): `gh auth login`.

## Step 4 — Import the project into Vercel
1. Go to **https://vercel.com/new**.
2. Click **Import** next to `akaash-headfield/akaash-neweb` (authorize Vercel to
   access the repo if prompted).
3. Vercel auto-detects:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (leave default)
   - **Output Directory:** (leave default — Next.js managed)
   - **Install Command:** `npm install` (default)
4. **Root Directory:** leave as `./` (repo root). Do **not** point it at `akaash-site/`.
5. (Optional) **Node.js Version:** Project Settings → General → set to **20.x or 22.x**.
6. Click **Deploy**.

The first build takes a few minutes. When it finishes you get a live URL like
`https://akaash-neweb.vercel.app`.

## Step 5 — Set the production branch (if needed)
Vercel treats one branch as Production (default `main`). If you deploy from `akaash`:
- **Project Settings → Git → Production Branch →** set it to `akaash`, then redeploy.
- Every push to that branch = a Production deploy. Every push to other branches = a
  Preview deploy with its own URL.

## Step 6 — Push changes (the everyday loop)
```bash
# make your edits, then:
git add -A
git commit -m "Describe the change"
git push
```
Vercel automatically builds and deploys each push. Watch progress in the Vercel
dashboard → Deployments.

## Optional — deploy straight from your laptop (no GitHub)
```bash
npm i -g vercel
vercel            # first run: links/creates the project (preview deploy)
vercel --prod     # promote to production
```

## Vercel-specific things to know about THIS repo
- **Multiple lockfiles:** there's a nested `akaash-site/akash-website-designs/` with its
  own `package.json`. Vercel builds only the **root** project, so this is harmless. We
  also pinned the workspace root in `next.config.ts` (`turbopack.root`) to avoid a
  local "inferred workspace root" warning.
- **Giant media stays local:** `Gulshan Dynasty.mov` (~5 GB) and the root `.mp4`/`.png`
  files are git-ignored. They are **not** needed by the deployed site — the app serves
  pre-extracted JPEG frames and small videos from `public/`. Never `git add -f` them;
  GitHub rejects files > 100 MB and Vercel doesn't need them.
- **Native modules:** `lightningcss` and `@next/swc` are platform-specific. Vercel
  installs the correct Linux binaries during its own `npm install`, so the macOS copy
  on your machine is irrelevant to the deploy.

---

# Part B — Error log (what broke & how it was fixed)

Each entry: **symptom → root cause → fix**.

### 1. The entire `app/` directory was missing
- **Symptom:** `git status` showed 255 files under `app/` as deleted (`D`); the app
  could not run — no pages, no `layout.tsx`.
- **Root cause:** the working tree had an **unstaged, uncommitted mass deletion**. The
  files were intact in the last commit (`HEAD`).
- **Fix:**
  ```bash
  git restore app/
  ```
  Also restored the deleted source-image folders so the tree matched HEAD:
  ```bash
  git restore "gulsha-images2/" "gulshan before images/" "gulshan-images/"
  ```

### 2. `next`/`tsc` failed with "Permission denied"
- **Symptom:**
  `sh: .../node_modules/.bin/tsc: Permission denied`
- **Root cause:** this folder is a *copy* ("…secure - Copy"); copying stripped the
  **executable bit** off everything in `node_modules/.bin/`.
- **Fix:**
  ```bash
  chmod +x node_modules/.bin/*
  ```

### 3. Build crashed: `Cannot find module '../lightningcss.darwin-arm64.node'`
- **Symptom:** `next build` failed while processing `app/globals.css`:
  ```
  Error: Cannot find module '../lightningcss.darwin-arm64.node'
  Require stack: …/lightningcss/node/index.js → @tailwindcss/node → @tailwindcss/postcss
  ```
- **Root cause:** Tailwind v4 uses the **native `lightningcss`** CSS engine. The
  platform-specific package `lightningcss-darwin-arm64` (which holds the `.node`
  binary) was **missing** from the copied `node_modules` — copies often drop optional
  platform packages.
- **Fix:** reinstall so npm pulls the correct optional/native deps for this machine:
  ```bash
  npm install
  ```
  (On a fresh clone, a plain `npm install` avoids this entirely. The same applies to
  `@next/swc-*`.)

### 4. Warning: "Next.js inferred your workspace root… multiple lockfiles"
- **Symptom:**
  ```
  ⚠ We detected multiple lockfiles and selected …/package-lock.json as the root…
  Detected additional lockfiles: …/akaash-design 25 secure - Copy/package-lock.json
  ```
- **Root cause:** a stray `~/package-lock.json` in the home directory made Next pick the
  wrong workspace root.
- **Fix:** pin the root explicitly in `next.config.ts`:
  ```ts
  const nextConfig: NextConfig = {
    turbopack: { root: __dirname },
    // …
  };
  ```
  (Deleting the stray `~/package-lock.json` also works, but pinning is non-destructive.)

### 5. Repo bloat — multi-GB media in the working tree
- **Symptom:** the working directory is ~6 GB; a 5.1 GB `Gulshan Dynasty.mov` and
  several root `.mp4`/`.png` files sit alongside the code.
- **Root cause:** source media kept next to the project.
- **Status / fix:** verified these are **git-ignored** (`git check-ignore` confirms) and
  **not in git history** (no blob > 50 MB), so pushes to GitHub/Vercel are unaffected.
  No history rewrite needed. Keep them ignored; never force-add them.

---

## After the fixes — verified working
- `npm run build` → ✓ compiles, TypeScript passes, all 29 routes prerender, 0 errors.
- `npm run start` → server live on `http://localhost:3000`.
- Every route returns `200` (or `307` for `/` → `/design1`).
</content>
