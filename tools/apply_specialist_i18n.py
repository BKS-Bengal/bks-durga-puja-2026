# Patch specialist sites: copy i18n.js, mark chrome strings, boot init.
from __future__ import annotations

import shutil
from pathlib import Path

ROOTS = [
    Path(r"C:\Users\asits\Projects\bks-pujo-sponsor"),
    Path(r"C:\Users\asits\Projects\bks-pujo-government"),
    Path(r"C:\Users\asits\Projects\bks-pujo-farmtech-agritech"),
    Path(r"C:\Users\asits\Projects\bks-pujo-public"),
    Path(r"C:\Users\asits\Projects\bks-pujo-nrb"),
]
SRC = Path(r"C:\Users\asits\Projects\bks-durga-puja-2026\tools\eco-i18n.js")

HTML_SWAPS = [
    ('<a class="skip" href="#main">Skip to content</a>',
     '<a class="skip" href="#main" data-i18n="skip">Skip to content</a>'),
    ('<span class="eco-event">Bharatiya Krishak Samaj Pujo</span>',
     '<span class="eco-event" data-i18n="event">Bharatiya Krishak Samaj Pujo</span>'),
    ('<span class="eco-partner">Bharatiya Krishak Samaj · Organising Partner</span>',
     '<span class="eco-partner" data-i18n="partner">Bharatiya Krishak Samaj · Organising Partner</span>'),
    ('<span>Organised by KarmYog for the 21st Century</span>',
     '<span data-i18n="organiser">Organised by KarmYog for the 21st Century</span>'),
    ('Back to Bharatiya Krishak Samaj Pujo',
     'Back to Bharatiya Krishak Samaj Pujo'),  # handled below with targeted tags
    ('Open in Google Maps',
     'Open in Google Maps'),
    ('<label for="name">Name</label>',
     '<label for="name" data-i18n="name">Name</label>'),
    ('<label for="organisation">Organisation or office <span class="req" aria-hidden="true">*</span></label>',
     '<label for="organisation"><span data-i18n="organisation">Organisation</span> or office <span class="req" aria-hidden="true">*</span></label>'),
    ('<label for="phone">Phone</label>',
     '<label for="phone" data-i18n="phone">Phone</label>'),
    ('<label for="email">Email <span class="opt">(optional)</span></label>',
     '<label for="email"><span data-i18n="email">Email</span> <span class="opt">(optional)</span></label>'),
    ('<label for="locality">Locality / village / area</label>',
     '<label for="locality" data-i18n="locality">Locality / village / area</label>'),
    ('<label for="district">District (if you know it)</label>',
     '<label for="district" data-i18n="district">District (if you know it)</label>'),
    ('<label for="message">Anything you want us to know</label>',
     '<label for="message" data-i18n="message">Anything you want us to know</label>'),
]

LANG_BLOCK = '''        <div class="lang" role="group" aria-label="Language" data-i18n-aria="language">
          <button type="button" data-lang="en" aria-pressed="true">English</button>
          <button type="button" data-lang="bn" aria-pressed="false">বাংলা</button>
          <button type="button" data-lang="hi" aria-pressed="false">हिन्दी</button>
        </div>'''

BANNER = '<div id="lang-pending" class="lang-banner" hidden role="status"></div>'

LANG_CSS = """
.lang {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}
.lang button,
.lang select {
  min-height: 44px;
  min-width: 44px;
  padding: 0.35rem 0.65rem;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.lang button[aria-pressed="true"] {
  background: #c98a1f;
  color: #163a26;
  border-color: #c98a1f;
}
.lang-banner {
  width: min(1180px, calc(100% - 1.5rem));
  margin: 0.5rem auto;
  padding: 0.6rem 0.8rem;
  border: 1px solid #c98a1f;
  background: #f6f1e4;
  color: #163a26;
  font-size: 0.92rem;
}
"""


def patch_html(path: Path) -> None:
    html = path.read_text(encoding="utf-8")
    original = html

    html = html.replace(
        '<a class="skip" href="#main">Skip to content</a>',
        '<a class="skip" href="#main" data-i18n="skip">Skip to content</a>',
    )
    html = html.replace(
        '<span class="eco-event">Bharatiya Krishak Samaj Pujo</span>',
        '<span class="eco-event" data-i18n="event">Bharatiya Krishak Samaj Pujo</span>',
    )
    html = html.replace(
        '<span class="eco-partner">Bharatiya Krishak Samaj · Organising Partner</span>',
        '<span class="eco-partner" data-i18n="partner">Bharatiya Krishak Samaj · Organising Partner</span>',
    )
    html = html.replace(
        '<span>Organised by KarmYog for the 21st Century</span>',
        '<span data-i18n="organiser">Organised by KarmYog for the 21st Century</span>',
    )
    html = html.replace(
        '>Back to Bharatiya Krishak Samaj Pujo</a>',
        ' data-i18n="back">Back to Bharatiya Krishak Samaj Pujo</a>',
    )
    html = html.replace(
        '>Open in Google Maps</a>',
        ' data-i18n="maps">Open in Google Maps</a>',
    )
    html = html.replace(
        '<label for="name">Name</label>',
        '<label for="name" data-i18n="name">Name</label>',
    )
    html = html.replace(
        '<label for="locality">Locality / village / area</label>',
        '<label for="locality" data-i18n="locality">Locality / village / area</label>',
    )
    html = html.replace(
        '<label for="district">District (if you know it)</label>',
        '<label for="district" data-i18n="district">District (if you know it)</label>',
    )
    html = html.replace(
        '<label for="message">Anything you want us to know</label>',
        '<label for="message" data-i18n="message">Anything you want us to know</label>',
    )
    html = html.replace(
        '<label for="phone">Phone</label>',
        '<label for="phone" data-i18n="phone">Phone</label>',
    )
    html = html.replace(
        '<label for="lang-select">Language</label>',
        '<label for="lang-select" data-i18n="language">Language</label>',
    )

    html = html.replace(
        '<button type="button" data-lang="en" aria-pressed="true">EN</button>',
        '<button type="button" data-lang="en" aria-pressed="true">English</button>',
    )
    html = html.replace(
        '<button type="button" data-lang="bn" aria-pressed="false">BN</button>',
        '<button type="button" data-lang="bn" aria-pressed="false">বাংলা</button>',
    )
    html = html.replace(
        '<button type="button" data-lang="hi" aria-pressed="false">HI</button>',
        '<button type="button" data-lang="hi" aria-pressed="false">हिन्दी</button>',
    )
    html = html.replace(
        '<div class="lang" role="group" aria-label="Language">',
        '<div class="lang" role="group" aria-label="Language" data-i18n-aria="language">',
    )

    if 'id="lang-pending"' not in html:
        if '<main id="main">' in html:
            html = html.replace(
                '<main id="main">',
                BANNER + '\n\n  <main id="main">',
                1,
            )
        elif '<main>' in html:
            html = html.replace('<main>', BANNER + '\n\n    <main>', 1)

    name = path.parent.name
    if name == "bks-pujo-farmtech-agritech" and 'data-lang="en"' not in html:
        html = html.replace(
            '      <nav class="site-nav" id="site-nav" aria-label="On this page">',
            LANG_BLOCK + '\n      <nav class="site-nav" id="site-nav" aria-label="On this page">',
            1,
        )
        html = html.replace(
            '<a class="btn btn-primary" href="#participate">Express Farmer Interest</a>',
            '<a class="btn btn-primary" href="#participate" data-i18n="interestNote">Express Farmer Interest</a>',
        )
        html = html.replace(
            '<h2 id="join-title">Express Farmer Interest</h2>',
            '<h2 id="join-title" data-i18n="interestNote">Express Farmer Interest</h2>',
        )
        html = html.replace(
            '<h2 id="farmtech-title">FarmTech + AgriTech are careful tools in the IFS model.</h2>',
            '<h2 id="farmtech-title">FarmTech and AgriTech are careful tools in the IFS model.</h2>',
        )
        html = html.replace(
            '<p class="mast-id">Integrated Farming <span>FarmTech + AgriTech</span></p>',
            '<p class="mast-id"><span data-i18n="ifs">Integrated Farming</span> <span data-i18n="farmtech">FarmTech and AgriTech</span></p>',
        )
        html = html.replace(
            '<h2 id="faq-title">Questions this page should answer</h2>',
            '<h2 id="faq-title" data-i18n="faq">FAQ</h2>',
        )

    if name == "bks-pujo-nrb" and 'data-lang="en"' not in html:
        html = html.replace(
            '      <p class="lang-note" title="Bengali and Hindi translations are pending" aria-label="Language English. Bengali and Hindi pending.">EN</p>',
            LANG_BLOCK,
            1,
        )
        html = html.replace(
            '<a class="btn btn-primary" href="#interest">Express Supporter Interest</a>',
            '<a class="btn btn-primary" href="#interest" data-i18n="interestNote">Express Supporter Interest</a>',
        )
        html = html.replace(
            '<p>English is the language of this page. Bengali and Hindi are pending.</p>',
            '',
            1,
        )

    if name == "bks-pujo-sponsor":
        html = html.replace(
            '<a class="btn" href="#enquire">Express Sponsor Interest</a>',
            '<a class="btn" href="#enquire" data-i18n="interestNote">Express Sponsor Interest</a>',
        )
        html = html.replace(
            '<h2 id="enquire-title">Express Sponsor Interest</h2>',
            '<h2 id="enquire-title" data-i18n="interestNote">Express Sponsor Interest</h2>',
        )
        html = html.replace(
            '<button class="btn" type="submit">Express Sponsor Interest</button>',
            '<button class="btn" type="submit" data-i18n="interestNote">Express Sponsor Interest</button>',
        )
        html = html.replace(
            '          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-panel" id="nav-toggle">\n        Menu\n      </button>',
            '          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-panel" id="nav-toggle" data-i18n="menu">Menu</button>',
        )

    if name == "bks-pujo-public":
        html = html.replace(
            '<a href="#puja">The Puja</a>',
            '<a href="#puja" data-i18n="thePuja">The Puja</a>',
        )
        html = html.replace(
            '<a href="#faq">FAQ</a>',
            '<a href="#faq" data-i18n="faq">FAQ</a>',
        )
        html = html.replace(
            '<span class="visually-hidden">Menu</span>',
            '<span class="visually-hidden" data-i18n="menu">Menu</span>',
        )

    if name == "bks-pujo-government":
        html = html.replace(
            '<button class="btn btn-primary" type="submit">Request a Briefing</button>',
            '<button class="btn btn-primary" type="submit">Request a Briefing</button>',
        )
        html = html.replace(
            '<h2>Place on file</h2>',
            '<h2 data-i18n="placeOnFile">Place on file</h2>',
        )

    if '<script src="i18n.js"></script>' not in html:
        html = html.replace('<script src="app.js"></script>', '<script src="i18n.js"></script>\n  <script src="app.js"></script>')

    if html != original:
        path.write_text(html, encoding="utf-8")
        print("patched html", path)


def patch_app(path: Path) -> None:
    js = path.read_text(encoding="utf-8")
    if "BKS_I18N" in js:
        print("app already has i18n", path)
        return
    if "function boot()" in js:
        js = js.replace("function boot() {", "function boot() {\n    if (window.BKS_I18N) window.BKS_I18N.init();")
    elif "setupNav();" in js:
        js = js.replace("setupNav();", "if (window.BKS_I18N) window.BKS_I18N.init();\n  setupNav();")
    elif "bindNav();" in js:
        js = js.replace("bindNav();", "if (window.BKS_I18N) window.BKS_I18N.init();\n    bindNav();")
    else:
        js += "\n  if (window.BKS_I18N) window.BKS_I18N.init();\n"
    path.write_text(js, encoding="utf-8")
    print("patched app", path)


def patch_css(path: Path) -> None:
    css = path.read_text(encoding="utf-8")
    if ".lang-banner" in css and ".lang button" in css:
        return
    if "/* language */" not in css:
        css += "\n" + LANG_CSS
        path.write_text(css, encoding="utf-8")
        print("patched css", path)


def main() -> None:
    for root in ROOTS:
        shutil.copyfile(SRC, root / "i18n.js")
        patch_html(root / "index.html")
        patch_app(root / "app.js")
        if (root / "eco-chrome.css").exists():
            patch_css(root / "eco-chrome.css")
        print("copied i18n", root.name)


if __name__ == "__main__":
    main()
