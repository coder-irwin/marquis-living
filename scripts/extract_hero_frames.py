"""Decode public/design23/hero.mp4 into JPG frames for the scroll-scrub hero
(same mechanic as the original house.mp4 walkthrough). Writes
public/design23/hero-frames/frame_0001.jpg ... and prints the count."""
import os, av
from PIL import Image

SRC = "public/design23/hero.mp4"
OUT = "public/design23/hero-frames"
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    if f.endswith(".jpg"):
        os.remove(os.path.join(OUT, f))

container = av.open(SRC)
stream = container.streams.video[0]
i = 0
for frame in container.decode(stream):
    img = frame.to_image()  # PIL RGB
    w, h = img.size
    if w > 1280:
        img = img.resize((1280, round(h * 1280 / w)))
    i += 1
    img.save(f"{OUT}/frame_{i:04d}.jpg", "JPEG", quality=85)
print("FRAMES", i)
