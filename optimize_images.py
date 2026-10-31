#!/usr/bin/env python3
"""
Kompresja obrazów do WebP + podmiana odwołań + wymiary (width/height) w HTML.
Uruchom RAZ w folderze strony, po wgraniu do niego wszystkich obrazków:
    pip install pillow
    python3 optimize_images.py
Oryginały trafiają do folderu originals-backup/ (nie wgrywaj go na hosting).
"""
import os, re, shutil, sys
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP = {"favicon.png"}            # ikona zostaje w PNG
MAX_W = 1600                      # maksymalna szerokość zdjęć
QUALITY = 80
BACKUP = os.path.join(ROOT, "originals-backup")
TEXT = (".html", ".css", ".js")

converted, sizes = {}, {}
for name in sorted(os.listdir(ROOT)):
    base, ext = os.path.splitext(name)
    if ext.lower() not in (".png", ".jpg", ".jpeg") or name in SKIP:
        continue
    src = os.path.join(ROOT, name)
    im = Image.open(src)
    im.load()
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "transparency" in im.info else "RGB")
    out = os.path.join(ROOT, base + ".webp")
    im.save(out, "WEBP", quality=QUALITY, method=6)
    before, after = os.path.getsize(src), os.path.getsize(out)
    if after >= before:
        os.remove(out)
        print(f"  {name}: WebP nie jest mniejszy, zostawiam oryginał")
        continue
    os.makedirs(BACKUP, exist_ok=True)
    shutil.move(src, os.path.join(BACKUP, name))
    converted[name] = base + ".webp"
    sizes[base + ".webp"] = im.size
    print(f"  {name} -> {base}.webp  {before//1024} KB -> {after//1024} KB")

for fn in os.listdir(ROOT):
    if not fn.endswith(TEXT):
        continue
    p = os.path.join(ROOT, fn)
    t = open(p, encoding="utf-8").read(); o = t
    for old, new in converted.items():
        t = re.sub(r'(?<![\w.-])' + re.escape(old), new, t)
    if fn.endswith(".html"):
        def dims(m):
            tag = m.group(0)
            if "width=" in tag: return tag
            w, h = sizes.get(m.group(1), (None, None))
            return tag if not w else tag.replace("<img ", f'<img width="{w}" height="{h}" ', 1)
        t = re.sub(r'<img [^>]*?src="([^"]+\.webp)"[^>]*>', dims, t)
    if t != o:
        open(p, "w", encoding="utf-8").write(t)
        print("  zaktualizowano", fn)
print("Gotowe. Sprawdź stronę i wgraj pliki (bez folderu originals-backup).")
