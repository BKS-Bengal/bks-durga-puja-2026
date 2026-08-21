"""Local pre-screenshot QA for six-experience routes. No deploy."""
from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "_qa" / "eco-prescreen"
BASE = "http://127.0.0.1:8781"
MOBILE = [375, 390, 412, 430]
DESKTOP = [768, 1024, 1280, 1440]
ROUTES = [
    ("home", "/"),
    ("umbrella", "/start/"),
    ("sponsors", "/sponsors/"),
    ("farmers", "/farmers/"),
    ("stakeholders", "/stakeholders/"),
    ("nrb", "/nrb/"),
    ("public", "/public/"),
]
EXPECTED_CTA = {
    "home": None,
    "umbrella": "Choose a path",
    "sponsors": "Express Sponsor Interest",
    "farmers": "Express farmer interest",
    "stakeholders": "Request a briefing",
    "nrb": "Express interest",
    "public": "Explore the Puja",
}


def eval_page(page, name):
    return page.evaluate(
        """(name) => {
          const issues = [];
          const doc = document;
          const overflow = Math.max(0, doc.documentElement.scrollWidth - doc.documentElement.clientWidth);
          if (overflow > 1) issues.push('horizontal-overflow:' + overflow);

          const creds = [...doc.querySelectorAll('.eco-cred')];
          creds.forEach((el, i) => {
            const cs = getComputedStyle(el);
            if (cs.flexDirection !== 'row' || cs.flexWrap !== 'nowrap') {
              issues.push('cred-not-row:' + i + ':' + cs.flexDirection + '/' + cs.flexWrap);
            }
          });

          const titleOpen = [...doc.querySelectorAll('.eco-title-open, #title-slot')].map(el => el.textContent.trim().slice(0, 80));
          const pending = [...doc.querySelectorAll('.eco-pending')].map(el => el.textContent.trim());
          const h1 = (doc.querySelector('h1') || {}).textContent || '';
          const kicker = (doc.querySelector('.eco-kicker') || {}).textContent || '';
          const primary = [...doc.querySelectorAll('.eco-hero .btn-primary')].map(a => ({text: a.textContent.trim(), href: a.getAttribute('href')}));
          const broken = [...doc.querySelectorAll('a[href]')].filter(a => {
            const href = a.getAttribute('href') || '';
            return href === '#' || href === '' || href === 'javascript:void(0)';
          }).map(a => a.textContent.trim());
          const entry = [...doc.querySelectorAll('.eco-entry a')].map(a => ({text: a.textContent.trim(), href: a.getAttribute('href')}));
          const consolePending = pending.some(t => /definition pending/i.test(t));
          return {
            name,
            title: doc.title,
            h1: h1.trim(),
            kicker: kicker.trim(),
            overflow,
            titleOpen,
            pending,
            definitionPending: consolePending,
            primary,
            broken,
            entry,
            experience: doc.documentElement.getAttribute('data-experience'),
            errors: issues
          };
        }""",
        name,
    )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    report = {"pages": [], "console": [], "cta": [], "screenshots": []}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        for name, path in ROUTES:
            page_notes = {"name": name, "path": path, "viewports": []}
            console_msgs = []
            page_errors = []
            context = browser.new_context(viewport={"width": 1280, "height": 800})
            page = context.new_page()
            page.on("console", lambda msg: console_msgs.append({"type": msg.type, "text": msg.text}))
            page.on("pageerror", lambda err: page_errors.append(str(err)))
            resp = page.goto(BASE + path, wait_until="load", timeout=20000)
            page.wait_for_selector("h1", timeout=10000)
            shot = OUT / f"{name}-1280.png"
            page.screenshot(path=str(shot), full_page=False)
            report["screenshots"].append(str(shot.relative_to(ROOT)))
            info = eval_page(page, name)
            info["status"] = resp.status if resp else None
            info["pageErrors"] = page_errors
            info["consoleErrors"] = [m for m in console_msgs if m["type"] == "error"]
            expected = EXPECTED_CTA.get(name)
            if expected:
                texts = [c["text"] for c in info["primary"]]
                info["ctaOk"] = expected in texts
                if not info["ctaOk"]:
                    report["cta"].append({"name": name, "expected": expected, "got": texts})
            # title sponsor leakage
            if name in ("farmers", "stakeholders", "nrb", "public", "umbrella"):
                leaked = [t for t in info["titleOpen"] if t]
                info["titleSponsorLeaked"] = leaked
            else:
                info["titleSponsorLeaked"] = []
            page_notes["desktop1280"] = info

            for w in MOBILE + [768, 1024, 1440]:
                page.set_viewport_size({"width": w, "height": 812 if w < 768 else 900})
                page.wait_for_timeout(120)
                ov = page.evaluate("() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)")
                cred = page.evaluate(
                    """() => [...document.querySelectorAll('.eco-cred')].map(el => {
                      const cs = getComputedStyle(el);
                      return cs.flexDirection + '/' + cs.flexWrap;
                    })"""
                )
                note = {"w": w, "overflow": ov, "creds": cred}
                if name == "sponsors" and w in (375, 1280):
                    shot2 = OUT / f"sponsors-{w}.png"
                    page.screenshot(path=str(shot2), full_page=False)
                    report["screenshots"].append(str(shot2.relative_to(ROOT)))
                if ov > 1 or any(c != "row/nowrap" for c in cred):
                    page_notes["viewports"].append(note)
                elif w in (375, 430, 768, 1440):
                    page_notes["viewports"].append({**note, "ok": True})
            context.close()
            report["pages"].append(page_notes)
            if page_errors:
                report["console"].append({"name": name, "errors": page_errors})
        browser.close()
    out_json = OUT / "report.json"
    out_json.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(out_json.read_text(encoding="utf-8"))


if __name__ == "__main__":
    main()
