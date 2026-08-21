"""Capture current local-review screenshots. Does not modify the website."""
from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_qa" / "stakeholder-review"
BASE = "http://127.0.0.1:8782"

ROUTES = [
    ("01-home", "/", "Holding homepage", "/"),
    ("02-start", "/start/", "Umbrella / participate router", "/start/"),
    ("03-sponsors", "/sponsors/", "Sponsor experience", "/sponsors/"),
    ("04-farmers", "/farmers/", "Farmer / Integrated Farming", "/farmers/"),
    ("05-stakeholders", "/stakeholders/", "Government & Influencers", "/stakeholders/"),
    ("06-nrb", "/nrb/", "NRB / Supporters", "/nrb/"),
    ("07-public", "/public/", "General public / The Puja", "/public/"),
]


def shot(page, path: Path) -> None:
    page.wait_for_timeout(700)
    page.screenshot(path=str(path), full_page=False, animations="disabled")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        context = browser.new_context(
            device_scale_factor=1,
            locale="en-IN",
            reduced_motion="reduce",
        )
        page = context.new_page()

        for slug, route, _label, _path in ROUTES:
            url = BASE + route
            page.set_viewport_size({"width": 1440, "height": 900})
            page.goto(url, wait_until="load", timeout=60000)
            page.wait_for_timeout(900)
            shot(page, OUT / f"{slug}-desktop-1440.png")

            page.set_viewport_size({"width": 375, "height": 812})
            page.goto(url, wait_until="load", timeout=60000)
            page.wait_for_timeout(900)
            shot(page, OUT / f"{slug}-mobile-375.png")

        # Start router: full first-screen is short; capture full page at desktop.
        page.set_viewport_size({"width": 1440, "height": 900})
        page.goto(BASE + "/start/", wait_until="load", timeout=60000)
        page.wait_for_timeout(500)
        page.screenshot(
            path=str(OUT / "02-start-desktop-1440-full.png"),
            full_page=True,
            animations="disabled",
        )

        # Sponsors: scroll to title-sponsorship note if present.
        page.goto(BASE + "/sponsors/", wait_until="load", timeout=60000)
        page.wait_for_timeout(900)
        loc = page.locator("text=Title sponsorship").first
        if loc.count():
            loc.scroll_into_view_if_needed()
            page.wait_for_timeout(400)
            shot(page, OUT / "03-sponsors-desktop-1440-title-slot.png")

        # Home mobile drawer.
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto(BASE + "/", wait_until="load", timeout=60000)
        page.wait_for_timeout(900)
        btn = page.locator(".nav-toggle").first
        if btn.count():
            btn.click()
            page.wait_for_timeout(500)
            shot(page, OUT / "01-home-mobile-375-drawer.png")

        # Sponsors mobile drawer (audience strip + primary).
        page.goto(BASE + "/sponsors/", wait_until="load", timeout=60000)
        page.wait_for_timeout(900)
        btn = page.locator(".nav-toggle").first
        if btn.count():
            btn.click()
            page.wait_for_timeout(500)
            shot(page, OUT / "03-sponsors-mobile-375-drawer.png")

        # Tablet sample of holding homepage.
        page.set_viewport_size({"width": 768, "height": 1024})
        page.goto(BASE + "/", wait_until="load", timeout=60000)
        page.wait_for_timeout(900)
        shot(page, OUT / "01-home-tablet-768.png")

        browser.close()

    print("wrote", OUT)
    for f in sorted(OUT.glob("*.png")):
        print(f.name, f.stat().st_size)


if __name__ == "__main__":
    main()
