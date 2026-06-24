# design25 — high-quality asset map

Drop high-resolution files here with these EXACT names and Claude will wire each into
the page and verify sharpness. Target: nothing upscaled/blurred on a large screen.

## Video (hero film)
- `hero.mp4`  ✅ in use (currently the supplied 1280×720 clip).
  For razor-sharp on big screens, replace with a **1920×1080 (or higher)** export, same ~10s.
- `hero-poster.jpg` ✅ generated from the film's first frame.

## Photos — need ≥ 2000px on the long edge (these display large, so low-res = blur)
| filename            | where it's used on the page          | good subject                     |
|---------------------|--------------------------------------|----------------------------------|
| `intro.jpg`         | Introduction figure (tall portrait)  | a considered study / living room |
| `features.jpg`      | "Inside every commission" image      | warm-stone kitchen / joinery     |
| `work-living.jpg`   | Portfolio — wide tile                 | hero living room                 |
| `work-bedroom.jpg`  | Portfolio — tall tile                 | master suite                     |
| `work-bath.jpg`     | Portfolio — half tile                 | spa bathroom                     |
| `work-study.jpg`    | Portfolio — small tile                | study / library                  |
| `work-kitchen.jpg`  | Portfolio — small tile                | kitchen                          |
| `work-dining.jpg`   | Portfolio — small tile                | dining                           |
| `case-before.jpg`   | Before/After slider — BEFORE          | the same room, unfinished        |
| `case-after.jpg`    | Before/After slider — AFTER           | the same room, finished          |

Portraits (testimonials) are shown tiny, so the current ones are fine.

## How to make them high-res if you don't have pro photos
- **Upscayl** (free, open-source, runs offline) — 4× AI-upscale the current images to ~2000px+.
- Or regenerate at high resolution, or use your own professional photography.

Export photos as JPG quality ~85 (sharp but not huge). Tell Claude once they're in.
