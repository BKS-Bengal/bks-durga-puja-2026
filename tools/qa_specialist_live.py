from playwright.sync_api import sync_playwright
from urllib.parse import urlparse

sites = [
    ("sponsor", "https://bks-pujo-sponsor.vercel.app/", "Express Sponsor Interest"),
    ("government", "https://bks-pujo-government.vercel.app/", "Request a Briefing"),
    ("farmtech", "https://bks-pujo-farmtech-agritech.vercel.app/", "Express Farmer Interest"),
    ("public", "https://bks-pujo-public.vercel.app/", "Explore the Puja"),
    ("nrb", "https://bks-pujo-nrb.vercel.app/", "Express Supporter Interest"),
]
MAIN = "https://bks-durga-puja-2026.vercel.app/site/"
widths = [375, 390, 412, 430, 768, 1024, 1280, 1440]
MAPS = "google.com/maps"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="msedge")
    page = browser.new_page()
    page.set_default_timeout(25000)
    overflow = []
    for name, url, cta in sites:
        errors = []
        failed = []
        page.remove_listener("console", lambda m: None) if False else None
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on(
            "response",
            lambda r: failed.append((r.status, r.url))
            if r.status >= 400 and r.request.resource_type in ("image", "stylesheet", "script", "document")
            else None,
        )
        page.set_viewport_size({"width": 1280, "height": 900})
        page.goto(url, wait_until="domcontentloaded")
        page.wait_for_selector("h1")
        data = page.evaluate(
            """(cta) => {
              const text = document.body.innerText;
              const backs = [...document.querySelectorAll('a')]
                .filter(a => /Back to Bharatiya Krishak Samaj Pujo/.test(a.textContent || ''))
                .map(a => a.href);
              const maps = [...document.querySelectorAll('a')].filter(a => /google\\.com\\/maps/.test(a.href));
              return {
                title: document.title,
                h1: (document.querySelector('h1') || {}).textContent,
                faq: document.querySelectorAll('details').length,
                form: !!document.querySelector('form'),
                ctaFound: text.includes(cta),
                eco: !!document.querySelector('.eco-bar'),
                seal: !!document.querySelector('.eco-bar img[src*="bks-seal"]'),
                kyImg: !!document.querySelector('.eco-bar img[src*="karmyog"]'),
                munshir: /Munshir Bheri/.test(text),
                mapsCount: maps.length,
                mapsHref: maps[0] ? maps[0].href : '',
                backs,
                maya: /\\bMaya\\b/.test(text) || /Maya/.test(document.documentElement.outerHTML),
                palm: /Palm Tech/.test(text),
                payLie: /Pay Now|Donate Now|Book Sponsorship|Register Farmer/.test(text),
                download: /downloads a file|download/i.test(text)
              };
            }""",
            cta,
        )
        bad_back = [b for b in data["backs"] if "/site/" not in b]
        print(name, {k: data[k] for k in data if k != "mapsHref"})
        print("  maps", data["mapsHref"][:90])
        print("  console", errors[:3], "failed", failed[:3], "bad_back", bad_back)
        for w in widths:
            page.set_viewport_size({"width": w, "height": 844})
            page.wait_for_timeout(50)
            n = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
            if n > 1:
                overflow.append((name, w, n))
    page.goto(MAIN, wait_until="domcontentloaded")
    html = page.content()
    doors = [
        "bks-pujo-sponsor.vercel.app",
        "bks-pujo-government.vercel.app",
        "bks-pujo-farmtech-agritech.vercel.app",
        "bks-pujo-public.vercel.app",
        "bks-pujo-nrb.vercel.app",
    ]
    print("MAIN doors", all(d in html for d in doors))
    print("MAIN munshir", "Munshir Bheri" in page.inner_text("body"))
    print("OVERFLOW", overflow)
    browser.close()
