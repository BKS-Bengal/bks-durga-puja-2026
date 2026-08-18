# BKS Durga Puja 2026 — production asset fix report

**Date:** 17 August 2026  
**Acceptance:** CORRECTLY RENDERED + CORRECTLY STYLED + ASSETS LOADED + RESPONSIVE + ACCESSIBLE + REGRESSION SAFE  
**Not accepted on HTML HTTP 200 alone.**

Production URL: https://www.bkswbengal.org/durga-puja-2026

---

## A. Root cause

The page document URL is **`/durga-puja-2026` with no trailing slash**. Next.js / Vercel 308 `/durga-puja-2026/` → `/durga-puja-2026`.

The static microsite used **directory-relative** URLs (`styles/app.css`, `scripts/app.js`, `assets/bks-seal-96.png`, `fetch("data/...")`).

A browser resolves those against the parent of the document URL. With no trailing slash, the parent is the **site root**:

| Declared | Browser requested | Result |
| --- | --- | --- |
| `styles/app.css` | `https://www.bkswbengal.org/styles/app.css` | **404 HTML** |
| `scripts/app.js` | `https://www.bkswbengal.org/scripts/app.js` | **404 HTML** |
| `assets/bks-seal-96.png` | `https://www.bkswbengal.org/assets/bks-seal-96.png` | **404 HTML** |
| `data/content/en/heroes.json` | `https://www.bkswbengal.org/data/content/en/heroes.json` | **404 HTML** |

The files **were already on production** at `/durga-puja-2026/styles/app.css` (200 `text/css`), `/durga-puja-2026/scripts/app.js` (200 JS), seal PNG, and JSON. They were never missing from the build. The HTML 200 was real; the **render failed because CSS/JS/images were requested from the wrong path and returned HTML 404 pages**.

GitHub Pages preview works because its URL is `/prototype/` **with a trailing slash**, so relative URLs stay inside that directory.

This was not an Amul, Next.js rewrite, or missing-file problem.

---

## B. Failed asset URLs (pre-fix, live)

Audit: `_qa/asset-fix/production-asset-audit.json`

| Kind | Declared | Requested | Status | Content-Type | Expected |
| --- | --- | --- | --- | --- | --- |
| CSS | `styles/tokens.css` | `/styles/tokens.css` | 404 | `text/html` | `/durga-puja-2026/styles/tokens.css` (200 `text/css`) |
| CSS | `styles/app.css` | `/styles/app.css` | 404 | `text/html` | `/durga-puja-2026/styles/app.css` (200 `text/css`) |
| JS | `scripts/app.js` | `/scripts/app.js` | 404 | `text/html` | `/durga-puja-2026/scripts/app.js` (200 `application/javascript`) |
| IMG | `assets/bks-seal-96.png` | `/assets/bks-seal-96.png` | 404 | `text/html` | `/durga-puja-2026/assets/bks-seal-96.png` (200 `image/png`) |
| JSON | `data/content/en/heroes.json` | `/data/content/en/heroes.json` | 404 | `text/html` | `/durga-puja-2026/data/content/en/heroes.json` (200 JSON) |
| JSON | `data/content/bn/heroes.json` | `/data/content/bn/heroes.json` | 404 | `text/html` | same prefix |
| JSON | `data/events/events.json` | `/data/events/events.json` | 404 | `text/html` | same prefix |
| JSON | `data/stories/stories.json` | `/data/stories/stories.json` | 404 | `text/html` | same prefix |

Google Fonts CSS (`fonts.googleapis.com/css2?...`) was already 200 `text/css` (absolute URL). `preconnect` hosts returning 404 is not a stylesheet failure.

---

## C. Corrected asset architecture

Keep the approved static microsite. Do **not** set global `trailingSlash` (would rewrite the whole BKS site). Do **not** rewrite into Next.js.

Production copy only:

1. `<base href="/durga-puja-2026/">`
2. Root-relative tags: `/durga-puja-2026/styles/*.css`, `/durga-puja-2026/scripts/app.js`, `/durga-puja-2026/assets/bks-seal-96.png`
3. `app.js` fetch base: `const dataBase = "/durga-puja-2026/";`

The isolated prototype at `prototype/` (GitHub Pages) stays relative so `/prototype/` still works.

Hash links (`#puja`) are unchanged.

---

## D. Files changed

```
public/durga-puja-2026/index.html
public/durga-puja-2026/scripts/app.js
```

Commit `66e8910` — `fix: restore Durga Puja production assets`  
No Amul, header, footer, homepage, `.env`, or secrets.

---

## E. Local test results

No-slash document URL simulated by `_qa/asset-fix/serve_puja.py` on port 3011 (Vercel-like: `/durga-puja-2026` serves `index.html` without changing the path).

| Resource | Status | MIME |
| --- | --- | --- |
| `/durga-puja-2026` | 200 | `text/html` |
| `/durga-puja-2026/styles/app.css` | 200 | `text/css` (not HTML) |
| `/durga-puja-2026/styles/tokens.css` | 200 | `text/css` |
| `/durga-puja-2026/scripts/app.js` | 200 | javascript |
| `/durga-puja-2026/assets/bks-seal-96.png` | 200 | `image/png` |
| JSON heroes/events | 200 | `application/json` |

Playwright (Edge) against `http://127.0.0.1:3011/durga-puja-2026`:

- `styled: true`
- seal `naturalWidth` 96
- header `rgb(22, 58, 38)`
- primary button `rgb(201, 138, 31)`
- `h1` font includes Baloo Da 2
- `documentElement.lang` becomes `bn` after click
- `failedAssets: []`, `consoleErrors: []`

`next start` on :3010 confirmed Amul `/amul` 200 and BKS `/` 200; local Next 404s the directory URL without `index.html` (Vercel does serve `/durga-puja-2026`). That local Next quirk is not the production bug.

---

## F. Browser test results

**Production Playwright (Edge, headless) on https://www.bkswbengal.org/durga-puja-2026** after promote:

```
styled: true
logoNatural: 96
headerBg: rgb(22, 58, 38)
btnBg: rgb(201, 138, 31)
h1Font: "Baloo Da 2", "Nirmala UI", "Noto Sans Bengali", system-ui, sans-serif
bnLang: bn
failedAssets: []
consoleErrors: []
```

Screenshot `_qa/asset-fix/local-en-1280.png` (post-deploy run overwrote the local shot with the live page): dark green header, visible BKS seal, gold EN + Read The Puja, cream body, white cards, photograph slot, footer hierarchy. Matches the approved Phase 2.5 preview system, not raw HTML.

EN and BN both exercised. Mobile 375 and desktop 1440 screenshots captured.

---

## G. axe results

axe-core 4.10.3 on production URL (en-home, en-puja, bn-home): **0 violations** (`axeFail: []`).

Skip link, semantic headings, and language buttons remain from the approved prototype.

---

## H. Responsive results

Widths 375, 390, 414, 768, 1024, 1280, 1440 × EN+BN: **`overflowFail: []`** (0 px over inner width). Mobile menu control present at 375.

---

## I. Production deployment ID

| Item | Value |
| --- | --- |
| PR | https://github.com/Omnidel-ai/bks-west-bengal-website/pull/6 **MERGED** |
| Merge commit | `d085854341be657917ced0443760bea689269fa3` |
| Feature commit | `66e8910` |
| Preview | `dpl_5A9o1BxnY6eQMp85KkxYGshvRqkc` |
| **Production** | **`dpl_41rzdmFroWvzk9LAAVzmsf67sos2`** |
| Project | existing `bks-west-bengal` |
| DNS / new Vercel project | not changed |

---

## J. Post-deploy asset results

Live (not 200-HTML-only):

| URL | Status | Content-Type | HTML body? |
| --- | --- | --- | --- |
| `/durga-puja-2026` | 200 | `text/html` | yes (the page) |
| `/durga-puja-2026/styles/app.css` | 200 | `text/css` | **no** |
| `/durga-puja-2026/styles/tokens.css` | 200 | `text/css` | **no** |
| `/durga-puja-2026/scripts/app.js` | 200 | `application/javascript` | **no** |
| `/durga-puja-2026/assets/bks-seal-96.png` | 200 | `image/png` | **no** |
| `/durga-puja-2026/data/content/en/heroes.json` | 200 | `application/json` | **no** |

HTML contains `/durga-puja-2026/styles/app.css` and `<base href="/durga-puja-2026/">`. Browser network: no failed required Puja assets.

---

## K. Existing BKS regression results

Live titles after promote:

| Path | Title |
| --- | --- |
| `/` | Bharatiya Krishak Samaj — West Bengal |
| `/about` | About BKS \| Bharatiya Krishak Samaj, West Bengal |
| `/presence` | Our Presence \| Bharatiya Krishak Samaj, West Bengal |
| `/ai` | AI for Annadata \| Bharatiya Krishak Samaj, West Bengal |
| `/apply` | Bharatiya Krishak Samaj — West Bengal |

Shell files were not in the diff.

---

## L. Amul/GOBARdhan regression results

Not in the diff. Live:

| Path | Title |
| --- | --- |
| `/initiatives/amul-gobardhan` | Amul Opportunity & GOBARdhan Initiative \| … |
| `/initiatives/amul-gobardhan/amul` | Amul Opportunity \| … |
| `/initiatives/amul-gobardhan/gobardhan` | GOBARdhan Initiative \| … |
| `/initiatives/amul-gobardhan/assistant` | Ask the BKS Amul & GOBARdhan Assistant \| … |

---

## M. Final production URL

**https://www.bkswbengal.org/durga-puja-2026**

Bengali: `?lang=bn`

Reference preview (unchanged relative architecture): https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/
