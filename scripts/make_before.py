"""Derive a 'before renovation' image from each finished 'after' room photo, so
every before/after pair is unmistakably the SAME room (same layout + framing),
just aged: desaturated, dimmed, muddy cast, soft, grainy, vignetted.
Reads public/design23/products/p{1..6}.jpeg -> writes b{1..6}.jpeg."""
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageChops

DIR = "public/design23/products"

def aged(n: int):
    im = Image.open(f"{DIR}/p{n}.jpeg").convert("RGB")
    w, h = im.size

    # 1. drain most of the colour, fade contrast, dim it
    im = ImageEnhance.Color(im).enhance(0.30)
    im = ImageEnhance.Contrast(im).enhance(0.84)
    im = ImageEnhance.Brightness(im).enhance(0.80)

    # 2. muddy beige-grey cast of an old unrenovated room
    cast = Image.new("RGB", (w, h), (150, 140, 120))
    im = Image.blend(im, cast, 0.17)

    # 3. soft / low-quality optics
    im = im.filter(ImageFilter.GaussianBlur(1.0))

    # 4. fine grain
    noise = Image.effect_noise((w, h), 20).convert("L")
    im = ImageChops.overlay(im, Image.merge("RGB", (noise, noise, noise)))

    # 5. vignette — darken the edges
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse(
        [-w * 0.18, -h * 0.18, w * 1.18, h * 1.18], fill=255
    )
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.16))
    dark = ImageEnhance.Brightness(im).enhance(0.5)
    im = Image.composite(im, dark, mask)

    out = f"{DIR}/b{n}.jpeg"
    im.save(out, "JPEG", quality=86)
    print(f"wrote {out}  ({w}x{h})")

for n in range(1, 7):
    aged(n)
