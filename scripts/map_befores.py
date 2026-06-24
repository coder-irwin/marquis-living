"""Convert the supplied real 'before' renovation photos into the matched
b{n}.jpeg slots for the design23 product showcase."""
import os
from PIL import Image

SRC = "gulshan before images"
OUT = "public/design23/products"

# before file -> product slot (p1 living, p2 study, p3 kitchen, p4 bedroom, p5 bath, p6 dining)
MAP = {
    "image.png": 3,          # unfinished kitchen
    "image copy 2.png": 5,   # gutted bathroom
    "image copy.png": 4,     # old room w/ bed -> bedroom
    "image copy 3.png": 1,   # gutted room w/ chandelier -> living
}

for fname, n in MAP.items():
    im = Image.open(os.path.join(SRC, fname)).convert("RGB")
    w, h = im.size
    if w > 1400:
        im = im.resize((1400, round(h * 1400 / w)))
    out = f"{OUT}/b{n}.jpeg"
    im.save(out, "JPEG", quality=88)
    print(f"{fname}  ->  b{n}.jpeg  ({im.size[0]}x{im.size[1]})")
