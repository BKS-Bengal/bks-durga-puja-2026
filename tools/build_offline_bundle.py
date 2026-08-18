# Build bundled JSON + local woff2 fonts for site/
import json
import re
import shutil
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
DATA = ROOT / "data"
FONTS = SITE / "fonts"
SCRIPTS = SITE / "scripts"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"

PACK_FILES = [
    "ui.json",
    "heroes.json",
    "home.json",
    "krishak-samaj.json",
    "integrated-farming.json",
    "mission.json",
    "participate.json",
    "locator.json",
    "sources.json",
]

FONT_CSS_URL = (
    "https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500;600;700"
    "&family=Hind:wght@400;500;600"
    "&family=Hind+Siliguri:wght@400;500;600"
    "&family=Playfair+Display:wght@600;700&display=swap"
)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def copy_runtime_data():
    dest = SITE / "data"
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    for rel in [
        "content",
        "events/events.json",
        "stories/stories.json",
    ]:
        src = DATA / rel
        out = dest / rel
        if src.is_dir():
            shutil.copytree(src, out)
        else:
            out.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, out)


def build_bundle():
    packs = {}
    for lang in ("en", "bn", "hi"):
        pack = {}
        for name in PACK_FILES:
            path = DATA / "content" / lang / name
            key = name.replace(".json", "").replace("-samaj", "").replace("krishak", "krishak")
            # keys expected by applyPack
            mapping = {
                "ui": "ui",
                "heroes": "heroes",
                "home": "home",
                "krishak-samaj": "krishak",
                "integrated-farming": "ifs",
                "mission": "mission",
                "participate": "participate",
                "locator": "locator",
                "sources": "sources",
            }
            pack[mapping[name.replace(".json", "")]] = load_json(path)
        packs[lang] = pack
    files = {
        "events/events.json": load_json(DATA / "events" / "events.json"),
        "stories/stories.json": load_json(DATA / "stories" / "stories.json"),
        "content/nav.json": load_json(DATA / "content" / "nav.json"),
        "content/campaign.json": load_json(DATA / "content" / "campaign.json"),
    }
    payload = {"packs": packs, "files": files}
    out = SCRIPTS / "offline-data.js"
    out.write_text(
        "window.BKS_DATA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print("wrote", out, "bytes", out.stat().st_size)


def download_fonts():
    FONTS.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(FONT_CSS_URL, headers={"User-Agent": USER_AGENT})
    css = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
    urls = list(dict.fromkeys(re.findall(r"url\((https://fonts.gstatic.com/[^)]+)\)", css)))
    local_css = css
    for i, url in enumerate(urls, start=1):
        ext = ".woff2" if ".woff2" in url else Path(url.split("?")[0]).suffix or ".woff2"
        name = f"font-{i:02d}{ext}"
        dest = FONTS / name
        urllib.request.urlretrieve(url, dest)
        local_css = local_css.replace(url, "../fonts/" + name)
        print("font", name, dest.stat().st_size)
    (SITE / "styles" / "fonts.css").write_text(local_css, encoding="utf-8")
    print("fonts", len(urls))


if __name__ == "__main__":
    copy_runtime_data()
    build_bundle()
    download_fonts()
    print("ok")
