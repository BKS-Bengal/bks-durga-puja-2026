from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8781"

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(BASE + "/public/", wait_until="load")
        page.wait_for_selector("h1")
        page.click("text=Explore the Puja")
        page.wait_for_timeout(800)
        print("after public CTA", page.url)
        print("puja view", page.evaluate("""() => {
          const v = document.querySelector('[data-view=puja]');
          return {
            hidden: v && v.hidden,
            active: v && v.classList.contains('is-active'),
            h1: v && v.querySelector('h1') ? v.querySelector('h1').textContent.trim() : null
          };
        }"""))
        page.goto(BASE + "/sponsors/", wait_until="load")
        page.wait_for_selector("#enquire")
        page.click(".eco-hero .btn-primary")
        page.wait_for_timeout(400)
        print("sponsor enquire", page.evaluate("""() => {
          const el = document.getElementById('enquire');
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top), inView: r.top < innerHeight && r.bottom > 0 };
        }"""))
        overflows = []
        for path in ["/", "/start/", "/sponsors/", "/farmers/", "/stakeholders/", "/nrb/", "/public/"]:
            for width in [390, 412, 1024]:
                page.set_viewport_size({"width": width, "height": 844})
                page.goto(BASE + path, wait_until="load")
                page.wait_for_selector("h1")
                overflow = page.evaluate(
                    "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
                )
                if overflow > 1:
                    overflows.append((path, width, overflow))
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto(BASE + "/sponsors/", wait_until="load")
        page.wait_for_selector("h1")
        Path("_qa/eco-prescreen").mkdir(parents=True, exist_ok=True)
        page.screenshot(path="_qa/eco-prescreen/sponsors-375.png")
        print("header", page.evaluate("() => !!document.querySelector('.site-header')"))
        print("lockups", page.evaluate("""() => [...document.querySelectorAll('.brand-lockup')].map(el => {
          const cs = getComputedStyle(el);
          return cs.flexDirection + '/' + cs.flexWrap;
        })"""))
        print("pagenav", page.evaluate("""() => {
          const el = document.querySelector('.eco-page-nav');
          return el ? getComputedStyle(el).display : null;
        }"""))
        print("overflow375", page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth"))
        print("overflows", overflows)
        browser.close()

if __name__ == "__main__":
    main()
