# Copy specialist sites to independent folders, then create GitHub repos.
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(r"C:\Users\asits\Projects\bks-durga-puja-2026")
SRC = ROOT / "specialist-sites"
PARENT = Path(r"C:\Users\asits\Projects")
ASSETS = ROOT / "site" / "assets"

SITES = [
    ("bks-pujo-sponsor", "Sponsor V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-government", "Government and influencers V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-farmtech-agritech", "Farmer FarmTech AgriTech V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-public", "Public Puja V1 for Bharatiya Krishak Samaj Pujo"),
    ("bks-pujo-nrb", "NRB supporters V1 for Bharatiya Krishak Samaj Pujo"),
]

GITIGNORE = """.vercel
.DS_Store
Thumbs.db
*.log
"""


def copy_if(src: Path, dest: Path):
    if src.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        print("copied", src.name, "->", dest)


def run(cmd, cwd):
    print("+", " ".join(cmd), "cwd=", cwd)
    subprocess.run(cmd, cwd=cwd, check=True)


def main():
    karmyog = ASSETS / "karmyog" / "karmyog-21st-century-256.png"
    karmyog_sm = ASSETS / "karmyog" / "karmyog-21st-century-128.png"
    prep = ASSETS / "puja-2026" / "photo_2026-08-19_11-15-15.jpg"
    seal_candidates = list((ROOT / "site" / "assets").glob("bks-seal*.png"))

    for name, desc in SITES:
        src = SRC / name
        dest = PARENT / name
        if dest.exists() and (dest / ".git").exists():
            print("exists git", dest)
        else:
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(src, dest, ignore=shutil.ignore_patterns(".git"))
        (dest / ".gitignore").write_text(GITIGNORE, encoding="utf-8")
        assets = dest / "assets"
        assets.mkdir(exist_ok=True)
        copy_if(karmyog, assets / "karmyog-21st-century-256.png")
        copy_if(karmyog_sm, assets / "karmyog-21st-century-128.png")
        copy_if(prep, assets / "prep-2026.jpg")
        for seal in seal_candidates:
            copy_if(seal, assets / seal.name)

    print("folders ready")


if __name__ == "__main__":
    main()
