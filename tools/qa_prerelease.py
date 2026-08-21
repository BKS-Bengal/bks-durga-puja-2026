"""Pre-release verification against http://127.0.0.1:8781. Does not modify the site."""
from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8781"
OUT = Path(__file__).resolve().parents[1] / "_qa" / "prerelease"
WIDTHS = [375, 768, 1024, 1440]
PATH_ROUTES = ["/", "/start/", "/sponsors/", "/farmers/", "/stakeholders/", "/nrb/", "/public/"]
HASH_ROUTES = [
    "/index.html#home",
    "/index.html#doors",
    "/index.html#puja",
    "/index.html#ifs",
    "/index.html#participate",
    "/index.html#krishak",
    "/index.html#mission",
    "/index.html#programme",
    "/index.html#community",
    "/index.html#contact",
    "/index.html#locator",
    "/index.html#sources",
]


def collect_console(page, bucket):
    def on_console(msg):
        if msg.type == "error":
            bucket.append({"type": "console", "text": msg.text, "url": page.url})
    def on_pageerror(err):
        bucket.append({"type": "pageerror", "text": str(err), "url": page.url})
    page.on("console", on_console)
    page.on("pageerror", on_pageerror)


def snapshot(page):
    return page.evaluate(
        """() => {
          const word = (document.querySelector('.wordmark') || {}).textContent || '';
          const sub = (document.querySelector('.brand-sub') || {}).textContent || '';
          const primary = [...document.querySelectorAll('.nav-desktop a')].map(a => a.textContent.replace(/\\s+/g,' ').trim());
          const audience = [...document.querySelectorAll('.audience-strip a')].map(a => a.textContent.replace(/\\s+/g,' ').trim());
          const imgs = [...document.querySelectorAll('img')].map(img => ({
            src: img.getAttribute('src') || img.currentSrc || '',
            ok: img.complete && img.naturalWidth > 0,
            alt: img.alt || '',
            w: img.naturalWidth
          }));
          const ctas = [...document.querySelectorAll('a.btn, button.btn, main a.btn-primary, main button[type="submit"]')].map(el => ({
            text: el.textContent.replace(/\\s+/g,' ').trim(),
            href: el.getAttribute('href'),
            tag: el.tagName,
            type: el.getAttribute('type')
          }));
          const credits = [...document.querySelectorAll('.hero-credit, figcaption')].map(el => el.textContent.replace(/\\s+/g,' ').trim()).filter(Boolean);
          const metaDesc = (document.querySelector('meta[name="description"]') || {}).content || '';
          const h1el = [...document.querySelectorAll('h1')].find(el => el.offsetParent !== null) || document.querySelector('h1');
          const h1 = (h1el || {}).textContent || '';
          const lang = document.documentElement.lang;
          const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          const placeholders = [...document.querySelectorAll('body *')].filter(el => /lorem ipsum|TODO|FIXME|xxx|coming soon(?!\\))/i.test(el.textContent || '') && el.children.length === 0).map(el => el.textContent.trim()).slice(0, 8);
          return {
            title: document.title,
            h1: h1.replace(/\\s+/g,' ').trim(),
            word: word.replace(/\\s+/g,' ').trim(),
            sub: sub.replace(/\\s+/g,' ').trim(),
            primary,
            audience,
            imgs,
            ctas,
            credits,
            metaDesc,
            lang,
            overflow,
            placeholders,
            hasHeader: !!document.querySelector('.site-header'),
            hasLang: !!document.querySelector('.lang-select, #lang-select, #eco-lang')
          };
        }"""
    )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    report = {
        "routes": [],
        "headers": [],
        "navFollow": [],
        "ctaClicks": [],
        "forms": [],
        "overflow": [],
        "imagesFailed": [],
        "errors": [],
        "broken": [],
        "lang": {},
        "mobileNav": {},
        "internal": [],
        "posts": [],
        "downloads": [],
    }
    errors = []
    posts = []
    failed = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        context = browser.new_context(accept_downloads=True, viewport={"width": 1280, "height": 900})
        page = context.new_page()
        page.set_default_timeout(20000)
        collect_console(page, errors)
        page.on("request", lambda r: posts.append({"url": r.url, "method": r.method}) if r.method in ("POST", "PUT", "PATCH") else None)
        page.on("response", lambda r: failed.append({"url": r.url, "status": r.status}) if r.status >= 400 and "favicon" not in r.url else None)

        all_routes = PATH_ROUTES + HASH_ROUTES
        seen_links = set()

        for path in all_routes:
            resp = page.goto(BASE + path, wait_until="domcontentloaded")
            page.wait_for_selector("h1:visible, .site-header", timeout=15000)
            page.wait_for_timeout(350)
            snap = snapshot(page)
            report["routes"].append({
                "path": path,
                "status": resp.status if resp else None,
                "title": snap["title"],
                "h1": snap["h1"][:160],
                "meta": (snap["metaDesc"] or "")[:180],
                "lang": snap["lang"],
                "hasLang": snap["hasLang"],
                "placeholders": snap["placeholders"],
            })
            report["headers"].append({
                "path": path,
                "wordmark": snap["word"],
                "karmyog": snap["sub"],
                "primary": snap["primary"],
                "audience": snap["audience"],
            })
            report["ctaClicks"].append({"path": path, "ctas": snap["ctas"][:20]})
            bad = [i for i in snap["imgs"] if i["src"] and not i["ok"]]
            if bad:
                report["imagesFailed"].append({"path": path, "failed": bad})
            hrefs = page.evaluate(
                """() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(Boolean)"""
            )
            for href in hrefs:
                if href.startswith("mailto:") or href.startswith("tel:") or href.startswith("http"):
                    continue
                seen_links.add(href)

        # Follow primary + audience from home and sponsors
        for start in ["/", "/sponsors/"]:
            page.goto(BASE + start, wait_until="domcontentloaded")
            page.wait_for_selector("h1:visible")
            hrefs = page.evaluate(
                """() => [...document.querySelectorAll('.nav-desktop a, .audience-strip a')].map(a => a.href)"""
            )
            for href in hrefs:
                r = page.goto(href, wait_until="domcontentloaded")
                page.wait_for_selector("h1:visible", timeout=12000)
                report["navFollow"].append({
                    "from": start,
                    "href": href,
                    "status": r.status if r else None,
                    "title": page.title(),
                    "h1": page.evaluate("() => (document.querySelector('h1')||{}).textContent || ''").strip()[:80],
                })

        # Language on home
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_selector("#lang-select")
        page.select_option("#lang-select", "bn")
        page.wait_for_timeout(500)
        bn = page.evaluate("() => ({lang: document.documentElement.lang, word: (document.querySelector('.wordmark')||{}).textContent, h1: (document.querySelector('h1')||{}).textContent})")
        page.select_option("#lang-select", "hi")
        page.wait_for_timeout(400)
        hi = page.evaluate("() => ({lang: document.documentElement.lang, word: (document.querySelector('.wordmark')||{}).textContent})")
        page.select_option("#lang-select", "en")
        page.wait_for_timeout(400)
        en = page.evaluate("() => ({lang: document.documentElement.lang, word: (document.querySelector('.wordmark')||{}).textContent})")
        report["lang"]["home"] = {"bn": bn, "hi": hi, "en": en}

        # Language on sponsors (eco)
        page.goto(BASE + "/sponsors/", wait_until="domcontentloaded")
        page.wait_for_selector("#eco-lang")
        page.select_option("#eco-lang", "bn")
        page.wait_for_timeout(300)
        note = page.evaluate("() => (document.querySelector('.eco-lang-note, footer .muted, .eco-pending') || {}).textContent || document.body.innerText.slice(0,200)")
        report["lang"]["sponsorsBn"] = {
            "lang": page.evaluate("() => document.documentElement.lang"),
            "h1": page.evaluate("() => (document.querySelector('h1')||{}).textContent"),
            "noteSample": note[:180] if isinstance(note, str) else note,
        }
        page.select_option("#eco-lang", "en")

        # Mobile nav
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto(BASE + "/sponsors/", wait_until="domcontentloaded")
        page.wait_for_selector("#eco-nav-toggle")
        page.click("#eco-nav-toggle")
        page.wait_for_timeout(250)
        report["mobileNav"]["sponsors"] = page.evaluate(
            """() => {
              const d = document.getElementById('eco-drawer');
              const cs = d ? getComputedStyle(d) : null;
              return {
                hiddenAttr: d ? d.hasAttribute('hidden') : null,
                display: cs ? cs.display : null,
                links: d ? [...d.querySelectorAll('a')].map(a => a.textContent.trim()) : []
              };
            }"""
        )
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_selector("#nav-toggle")
        page.click("#nav-toggle")
        page.wait_for_timeout(250)
        report["mobileNav"]["home"] = page.evaluate(
            """() => {
              const d = document.getElementById('nav-drawer');
              return {
                hiddenAttr: d ? d.hasAttribute('hidden') : null,
                links: d ? [...d.querySelectorAll('a')].map(a => a.textContent.replace(/\\s+/g,' ').trim()) : []
              };
            }"""
        )

        # Overflow
        for path in PATH_ROUTES:
            page.goto(BASE + path, wait_until="domcontentloaded")
            page.wait_for_selector("h1:visible")
            for w in WIDTHS:
                page.set_viewport_size({"width": w, "height": 844})
                page.wait_for_timeout(120)
                ov = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
                if ov > 1:
                    report["overflow"].append({"path": path, "w": w, "overflow": ov})

        page.set_viewport_size({"width": 1280, "height": 900})

        def submit_form(url, form_id, fields, extra=None):
            page.goto(BASE + url, wait_until="domcontentloaded")
            page.wait_for_selector("h1:visible")
            page.wait_for_timeout(400)
            if extra:
                extra()
            for name, value in fields.items():
                loc = page.locator(f"#{form_id} [name='{name}']")
                if loc.count() == 0:
                    continue
                tag = loc.evaluate("el => el.tagName")
                if tag == "SELECT":
                    continue
                loc.fill(value)
            consent = page.locator(f"#{form_id} input[name='consent']")
            if consent.count():
                consent.check()
            posts_before = len(posts)
            try:
                with page.expect_download(timeout=8000) as dl_info:
                    page.locator(f"#{form_id} button[type='submit']").click()
                dl = dl_info.value
                report["downloads"].append({
                    "url": url,
                    "form": form_id,
                    "file": dl.suggested_filename,
                    "newPosts": len(posts) - posts_before,
                })
            except Exception as e:
                report["forms"].append({"url": url, "form": form_id, "error": str(e)})

        submit_form("/sponsors/", "eco-sponsor-form", {
            "organisation_name": "Test Org",
            "contact_person": "Test Person",
            "phone": "9999999999",
            "email": "a@b.co",
        })
        submit_form("/farmers/", "eco-farmer-form", {"name": "Test Farmer", "locality": "Test Para"})
        submit_form("/nrb/", "eco-nrb-form", {
            "name": "Test NRB",
            "email": "a@b.co",
            "phone": "9999999999",
            "native_village": "Test Village",
        })
        submit_form("/stakeholders/", "eco-briefing-form", {
            "name": "Test Officer",
            "organisation": "Test Dept",
        })

        def pick_role():
            page.locator("input[name='interest-role']").first.check()

        submit_form("/index.html#participate", "interest-form", {
            "name": "Test Person",
            "locality": "Test Para",
        }, extra=pick_role)

        # Public CTA
        page.goto(BASE + "/public/", wait_until="domcontentloaded")
        page.wait_for_selector("a.btn-primary")
        page.click("a.btn-primary")
        page.wait_for_timeout(600)
        report["publicCta"] = {
            "url": page.url,
            "h1": page.evaluate("() => (document.querySelector('[data-view].is-active h1, h1')||{}).textContent || ''").strip()[:120],
        }

        # Home Participate CTA
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_selector("h1:visible")
        page.click("a.btn-primary")
        page.wait_for_timeout(500)
        report["homeCta"] = {
            "url": page.url,
            "h1": page.evaluate("() => (document.querySelector('[data-view].is-active h1, h1')||{}).textContent || ''").strip()[:120],
        }

        # Resolve unique internal links from home + eco
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_selector("h1:visible")
        for href in sorted(seen_links):
            if href.startswith("#"):
                target = BASE + "/" + href
            elif href.startswith("../") or href.startswith("nrb/") or href.startswith("sponsors/") or href.startswith("start/") or href.startswith("farmers/") or href.startswith("stakeholders/") or href.startswith("public/") or href.startswith("index"):
                target = urljoin(BASE + "/", href)
            elif href.startswith("/"):
                target = BASE + href
            else:
                target = urljoin(BASE + "/", href)
            parsed = urlparse(target)
            if parsed.netloc and parsed.netloc not in ("127.0.0.1:8781", "localhost:8781"):
                continue
            r = page.goto(target, wait_until="domcontentloaded")
            status = r.status if r else None
            try:
                page.wait_for_selector("h1:visible, .site-header", timeout=8000)
                h1 = page.evaluate("() => ([...document.querySelectorAll('h1')].find(el => el.offsetParent !== null) || {}).textContent || ''").strip()[:80]
            except Exception:
                h1 = ""
            item = {"href": href, "resolved": target, "status": status, "h1": h1}
            report["internal"].append(item)
            if status and status >= 400:
                report["broken"].append(item)

        browser.close()

    report["errors"] = errors
    report["posts"] = posts
    report["failedAssets"] = failed[:50]
    report["totals"] = {
        "routes": len(report["routes"]),
        "navFollowed": len(report["navFollow"]),
        "ctaListed": sum(len(x.get("ctas") or []) for x in report["ctaClicks"]),
        "consoleErrors": len([e for e in errors if e.get("type") == "console"]),
        "pageErrors": len([e for e in errors if e.get("type") == "pageerror"]),
        "overflow": len(report["overflow"]),
        "broken": len(report["broken"]),
        "failedAssets": len(failed),
        "downloads": len(report["downloads"]),
        "formErrors": len(report["forms"]),
        "posts": len(posts),
        "imagesFailedPages": len(report["imagesFailed"]),
        "internalChecked": len(report["internal"]),
    }
    out = OUT / "report.json"
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report["totals"], indent=2))
    print("--- headers ---")
    for h in report["headers"]:
        print(h["path"], "|", h["wordmark"], "|", h["karmyog"], "|", h["primary"], "|", h["audience"])
    print("--- downloads ---")
    print(report["downloads"])
    print("--- form errors ---")
    print(report["forms"])
    print("--- overflow ---")
    print(report["overflow"])
    print("--- posts ---")
    print(posts)
    print("--- broken ---")
    print(report["broken"])
    print("--- errors ---")
    print(errors[:20])
    print("--- lang ---")
    print(json.dumps(report["lang"], ensure_ascii=False)[:800])
    print("--- mobile ---")
    print(report["mobileNav"])
    print("--- public/home CTA ---")
    print(report.get("publicCta"), report.get("homeCta"))
    print("wrote", out)


if __name__ == "__main__":
    main()
