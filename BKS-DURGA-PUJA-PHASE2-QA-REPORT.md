# BKS Durga Puja 2026 — Phase 2 QA report

**Date:** 17 August 2026  
**URL tested:** `http://127.0.0.1:8765/prototype/`  
**Server:** `python -m http.server 8765` (static). **No Next.js build.**  
**Browser:** Microsoft Edge (`msedge.exe`). Chrome was not installed.  
**Artefacts:** `_qa/phase2/`

Numbers below are from files on disk. They were not invented. They are **lab** scores on localhost, not production Lighthouse.

---

## 1. Static contract (`qa.py`)

- JSON under `data/` parses.
- Views: `home,puja,programme,community,krishak,participate,accessibility,sustainability,contact`.
- SOURCE FACT / PENDING APPROVAL labels present.
- No donate-now / Razorpay / Stripe / ₹5 crore language.
- No `<form>`, no payment href.
- `overflow-x: clip` and `prefers-reduced-motion` present.
- Result: `phase2-qa-ok`.

---

## 2. axe-core

**Tool:** axe-core 4.10.3 via Playwright, `channel: "msedge"`.

| Page | Violations |
| --- | ---: |
| EN Home | 0 |
| EN The Puja | 0 |
| EN Krishak Samaj | 0 |
| EN Participate | 0 |
| BN Home | 0 |
| BN The Puja | 0 |
| BN Krishak Samaj | 0 |

Saved: `_qa/phase2/axe-home.json`, `_qa/phase2/runtime-qa.json`.

Target **0 violations** met on the pages run. Physical venue access is still **not** claimed.

---

## 3. Responsive QA

Widths: **375, 390, 414, 768, 1024, 1280, 1440**. Languages: **EN and BN**.

Screenshots: **30/30** in `_qa/phase2/*.png` (Edge headless).

Playwright document overflow (`scrollWidth − innerWidth`) after the grid `min-width: 0` fix:

| Width | EN overflow px | BN overflow px | Menu (≤767) |
| ---: | ---: | ---: | --- |
| 375 | 0 | 0 | visible |
| 390 | 0 | 0 | visible |
| 414 | 0 | 0 | visible |
| 768 | 0 | 0 | hidden; full nav |
| 1024 | 0 | 0 | full nav |
| 1280 | 0 | 0 | full nav |
| 1440 | 0 | 0 | full nav |

Active Home H1 at 375: **338px** wide (right edge 357 in a 375 viewport). Text wraps. It is not clipped.

Checked: no horizontal page overflow, nav present (Menu below 768; bar from 768), bilingual shell, empty photo slots still labelled EMPTY / forthcoming.

---

## 4. Lighthouse (static localhost)

**Tool:** Lighthouse 12.8.2. Chrome path = Edge. CLI exit code 1 is the known Windows `EPERM` on temp-profile delete **after** JSON is written (same pattern as Phase 1). Scores are read from the JSON files.

| Form | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Desktop (`--preset=desktop`) | **96** | **100** | **100** | **66** |
| Mobile (default form-factor) | **90** | **100** | **100** | **66** |

### Lab metrics (actual)

| Metric | Mobile | Desktop |
| --- | --- | --- |
| First Contentful Paint | 2.9 s (52) | 1.1 s (80) |
| Largest Contentful Paint | 2.9 s (80) | 1.1 s (92) |
| Total Blocking Time | 0 ms (100) | 0 ms (100) |
| Cumulative Layout Shift | 0 (100) | 0 (100) |
| Speed Index | 2.9 s (95) | 1.1 s (95) |
| Time to Interactive | 2.9 s (96) | 1.1 s (100) |

Fetch times in the reports: desktop `2026-08-17T06:23:27.980Z`, mobile `2026-08-17T06:29:21.661Z`.

### Why SEO is 66 (not a go-live defect)

Audit `is-crawlable` **fails** because the page is intentionally `noindex, nofollow, noarchive` and `robots.txt` disallows `/`. That is correct for a review prototype. Other SEO audits (title, description, alt, hreflang, robots.txt validity) passed. Canonical is N/A (no production URL).

Do not remove `noindex` to inflate SEO.

### Other failed audits (expected on this stack)

- Render-blocking: Google Fonts stylesheet (`display=optional`). System Bengali/Latin stack still works if fonts fail.
- Text compression: local `http.server` does not gzip. GitHub Pages will compress in transit; this lab penalty is the local server, not the HTML.
- Network-dependency-tree / render-blocking insights: same fonts.

Content was not stripped to chase 100. Photography, when approved, will lower performance. That is preferred to a fake empty page.

---

## 5. Keyboard / semantics (implementation, then axe)

- Skip link, `lang` toggle, `aria-label` on EN/বাং, `aria-current` on nav, `aria-expanded` on Menu.
- Hash change focuses the active view `h1`.
- Live region `#live` inside the header.
- Draft banner inside `<header>` (landmark).
- Hero variants are `<section class="variant-panel">`.
- Footer gold on deep green (`#e3c36a`) for contrast.
- `prefers-reduced-motion: reduce` disables smooth scroll and card transition.

---

## 6. Regression

| Item | Result |
| --- | --- |
| IA unchanged | Pass |
| No extra nav items | Pass |
| No payment UI | Pass |
| No voice / mic / booth UI | Pass |
| Stories still empty | Pass |
| Civic dates only on Programme | Pass |

---

## 7. What was not run

- No Next.js build (forbidden).
- No Lighthouse against GitHub Pages in this pass (lab = localhost).
- No production Vercel.
- axe was not run on Accessibility / Sustainability / Contact views; those views did not gain Phase 2 copy. Home, Puja, Krishak, Participate (EN) and Home/Puja/Krishak (BN) are the Phase 2 surfaces.

---

## Status

**QA PASSED** for the Phase 2 static prototype on localhost.  
**NOT** a production performance claim.
