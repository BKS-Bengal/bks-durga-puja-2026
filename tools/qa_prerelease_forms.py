"""Supplemental form and caption checks. Does not modify the site."""
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8781"


def main():
    posts = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        ctx = browser.new_context(accept_downloads=True, viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.on("request", lambda r: posts.append(r.method) if r.method in ("POST", "PUT") else None)
        page.set_default_timeout(20000)
        page.goto(BASE + "/", wait_until="domcontentloaded")
        page.wait_for_selector("#nrb-pledge-form")
        page.wait_for_timeout(600)

        def submit(form_id, fills, checks):
            page.locator("#" + form_id).scroll_into_view_if_needed()
            for name, value in fills.items():
                loc = page.locator("#%s [name='%s']" % (form_id, name))
                if loc.count() == 0:
                    continue
                tag = loc.first.evaluate("el => el.tagName")
                if tag == "SELECT":
                    page.select_option("#%s [name='%s']" % (form_id, name), index=1)
                else:
                    loc.first.fill(value)
            for name in checks:
                page.locator("#%s [name='%s']" % (form_id, name)).first.check()
            btn = page.locator("#%s button[type=submit]" % form_id).first
            label = btn.inner_text().strip().replace("\n", " ")
            try:
                with page.expect_download(timeout=8000) as info:
                    btn.click()
                filename = info.value.suggested_filename
            except Exception as exc:
                print("FAIL", form_id, label, str(exc))
                return
            statuses = page.evaluate(
                """() => {
                  const ids = ['nrb-pledge-status','nrb-bulk-status','nrb-village-status','nrb-operator-status','nomination-status','sponsor-status'];
                  const o = {};
                  ids.forEach(id => { const el = document.getElementById(id); if (el) o[id] = el.textContent; });
                  return o;
                }"""
            )
            print("OK", form_id, "|", label, "|", filename)
            print("  status", statuses.get(form_id.replace("-form", "-status")) or statuses)

        submit("nrb-pledge-form", {"name": "A", "email": "a@b.co", "phone": "9999999999", "native_village": "X"}, ["consent"])
        submit("nrb-village-form", {"block_village": "Test"}, [])
        submit("nrb-operator-form", {"operator_name": "Op", "contact": "9999999999"}, [])
        submit("nrb-bulk-form", {"name": "Org", "email": "a@b.co", "phone": "9999999999", "farm_count": "2"}, ["consent"])

        page.locator("#nomination-form input[name=nominator_type]").first.check()
        submit(
            "nomination-form",
            {"farmer_name": "Farmer", "farmer_phone": "9999999999", "innovation_summary": "test method"},
            ["consent_contact", "consent_data"],
        )
        submit(
            "sponsor-form",
            {"organisation_name": "Org", "contact_person": "P", "phone": "9999999999"},
            ["consent_contact"],
        )

        page.goto(BASE + "/index.html#ifs", wait_until="domcontentloaded")
        page.wait_for_timeout(500)
        ifs = page.evaluate(
            """() => [...document.querySelectorAll('[data-view=ifs] a.btn')].map(a => ({t: a.textContent.trim(), href: a.getAttribute('href')}))"""
        )
        print("IFS", ifs)

        for path in ["/sponsors/", "/nrb/", "/public/", "/farmers/", "/start/"]:
            page.goto(BASE + path, wait_until="domcontentloaded")
            page.wait_for_selector("h1:visible")
            caps = page.evaluate(
                """() => [...document.querySelectorAll('.hero-credit, figcaption')].map(el => el.textContent.replace(/\\s+/g,' ').trim()).filter(Boolean)"""
            )
            print("CAPS", path, caps)

        page.goto(BASE + "/start/", wait_until="domcontentloaded")
        cards = page.evaluate(
            """() => [...document.querySelectorAll('.eco-path')].map(a => ({t: a.querySelector('h2').textContent, href: a.getAttribute('href')}))"""
        )
        print("START", cards)
        print("POSTS", posts)
        browser.close()


if __name__ == "__main__":
    main()
