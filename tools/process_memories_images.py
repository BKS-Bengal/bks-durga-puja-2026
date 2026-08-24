# -*- coding: utf-8 -*-
"""Crop device watermarks from uploaded 2025 Mahotsav photographs and copy into site folders."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(r"C:\Users\asits\Projects\bks-durga-puja-2026")
SRC = Path(
    r"C:\Users\asits\.cursor\projects\c-Users-asits-Projects-bks-durga-puja-2026\assets"
)
SHARED = ROOT / "shared" / "memories-2025" / "img"
DESTS = [
    ROOT / "site" / "assets" / "memories-2025",
    ROOT / "specialist-sites" / "bks-pujo-nrb" / "assets" / "memories-2025",
    ROOT / "specialist-sites" / "bks-pujo-government" / "assets" / "memories-2025",
    ROOT / "specialist-sites" / "bks-pujo-farmtech-agritech" / "assets" / "memories-2025",
    ROOT / "specialist-sites" / "bks-pujo-public" / "assets" / "memories-2025",
    ROOT / "specialist-sites" / "bks-pujo-sponsor" / "assets" / "memories-2025",
    ROOT / "site" / "nrb" / "assets" / "memories-2025",
    ROOT / "site" / "stakeholders" / "assets" / "memories-2025",
]


def is_watermark_bar(im: Image.Image) -> int:
    rgb = im.convert("RGB")
    w, h = rgb.size
    probe = max(8, int(h * 0.045))
    band = rgb.crop((0, h - probe, w, h))
    pixels = list(band.getdata())
    if not pixels:
        return 0
    pale = sum(1 for r, g, b in pixels if r > 228 and g > 228 and b > 228)
    if pale / len(pixels) < 0.62:
        return 0
    y = h - 1
    while y > int(h * 0.82):
        row_pale = 0
        for x in range(0, w, max(1, w // 80)):
            r, g, b = rgb.getpixel((x, y))
            if r > 220 and g > 220 and b > 220:
                row_pale += 1
        if row_pale < 40:
            break
        y -= 1
    crop = h - y - 1
    return crop if crop > 10 else 0


def safe_copy(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy2(src, dst)
    except OSError:
        shutil.copyfile(src, dst)


def process() -> list[dict]:
    files = sorted(SRC.glob("*photo_2026-08-22*.jpg"))
    if not files:
        raise SystemExit(f"No 2025 Mahotsav photographs in {SRC}")
    SHARED.mkdir(parents=True, exist_ok=True)
    keep = set()
    manifest = []
    for i, src in enumerate(files, start=1):
        im = Image.open(src)
        im.load()
        crop = is_watermark_bar(im)
        if crop:
            w, h = im.size
            im = im.crop((0, 0, w, h - crop))
        name = f"mem-{i:02d}.jpg"
        keep.add(name)
        out = SHARED / name
        rgb = im.convert("RGB")
        rgb.save(out, "JPEG", quality=86, optimize=True, progressive=True)
        manifest.append(
            {
                "file": name,
                "source": src.name,
                "cropped_px": crop,
                "size": list(rgb.size),
            }
        )
        print(f"{name}  crop={crop}px  {rgb.size}  <- {src.name[-48:]}")
    for old in SHARED.glob("mem-*.jpg"):
        if old.name not in keep:
            old.unlink()
    (ROOT / "shared" / "memories-2025" / "manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )
    css = ROOT / "shared" / "memories-2025" / "memories.css"
    js = ROOT / "shared" / "memories-2025" / "memories.js"
    for dest in DESTS:
        dest.mkdir(parents=True, exist_ok=True)
        for old in dest.glob("mem-*.jpg"):
            if old.name not in keep:
                old.unlink()
        for item in manifest:
            safe_copy(SHARED / item["file"], dest / item["file"])
    site_roots = [
        ROOT / "site",
        ROOT / "specialist-sites" / "bks-pujo-nrb",
        ROOT / "specialist-sites" / "bks-pujo-government",
        ROOT / "specialist-sites" / "bks-pujo-farmtech-agritech",
        ROOT / "specialist-sites" / "bks-pujo-public",
        ROOT / "specialist-sites" / "bks-pujo-sponsor",
        ROOT / "site" / "nrb",
        ROOT / "site" / "stakeholders",
    ]
    for site in site_roots:
        if not site.exists() or not css.exists() or not js.exists():
            continue
        safe_copy(css, site / "memories.css")
        safe_copy(js, site / "memories.js")
    return manifest


if __name__ == "__main__":
    process()
