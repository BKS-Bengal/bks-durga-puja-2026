"""Copy approved Puja/BKS/KarmYog assets into all five specialist repos."""
import shutil
from pathlib import Path

ROOT = Path(r"C:\Users\asits\Projects")
SRC_PUBLIC = ROOT / "bks-pujo-public" / "assets"
SRC_MAIN = ROOT / "bks-durga-puja-2026" / "site" / "assets"
SITES = [
    "bks-pujo-sponsor",
    "bks-pujo-government",
    "bks-pujo-farmtech-agritech",
    "bks-pujo-public",
    "bks-pujo-nrb",
]
FILES = [
    (SRC_PUBLIC / "idol-durga-2025.jpg", "idol-durga-2025.jpg"),
    (SRC_PUBLIC / "aarti-procession-2025.jpg", "aarti-procession-2025.jpg"),
    (SRC_PUBLIC / "conch-aarti-2025.jpg", "conch-aarti-2025.jpg"),
    (SRC_PUBLIC / "bks-seal-96.png", "bks-seal-96.png"),
    (SRC_PUBLIC / "aarti-2025.jpg" if False else SRC_PUBLIC / "aarti-procession-2025.jpg", "aarti-procession-2025.jpg"),
    (SRC_MAIN / "karmyog" / "karmyog-21st-century-128.png", "karmyog-21st-century-128.png"),
    (SRC_MAIN / "karmyog" / "karmyog-21st-century-256.png", "karmyog-21st-century-256.png"),
    (SRC_MAIN / "puja-2026" / "photo_2026-08-19_11-15-15.jpg", "prep-2026.jpg"),
]

# nrb aarti
NRB_AARTI = ROOT / "bks-pujo-nrb" / "assets" / "aarti-2025.jpg"


def copy(src: Path, dest: Path):
    if not src.exists():
        print("MISSING", src)
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.resolve() == dest.resolve():
        print("same", dest)
        return
    try:
        shutil.copy2(src, dest)
        print("ok", dest)
    except PermissionError:
        print("locked", dest)


def main():
    chrome = Path(r"C:\Users\asits\Projects\bks-durga-puja-2026\tools\eco_chrome.css")
    for name in SITES:
        dest_dir = ROOT / name / "assets"
        copy(SRC_PUBLIC / "idol-durga-2025.jpg", dest_dir / "idol-durga-2025.jpg")
        copy(SRC_PUBLIC / "aarti-procession-2025.jpg", dest_dir / "aarti-procession-2025.jpg")
        copy(SRC_PUBLIC / "conch-aarti-2025.jpg", dest_dir / "conch-aarti-2025.jpg")
        copy(SRC_PUBLIC / "bks-seal-96.png", dest_dir / "bks-seal-96.png")
        if NRB_AARTI.exists():
            copy(NRB_AARTI, dest_dir / "aarti-2025.jpg")
        copy(SRC_MAIN / "karmyog" / "karmyog-21st-century-128.png", dest_dir / "karmyog-21st-century-128.png")
        copy(SRC_MAIN / "karmyog" / "karmyog-21st-century-256.png", dest_dir / "karmyog-21st-century-256.png")
        copy(SRC_MAIN / "puja-2026" / "photo_2026-08-19_11-15-15.jpg", dest_dir / "prep-2026.jpg")
        copy(chrome, ROOT / name / "eco-chrome.css")
        # workspace copies
        ws = ROOT / "bks-durga-puja-2026" / "specialist-sites" / name
        if ws.exists():
            copy(chrome, ws / "eco-chrome.css")


if __name__ == "__main__":
    main()
