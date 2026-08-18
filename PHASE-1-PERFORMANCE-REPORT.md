# Phase 1 — performance report

**Date:** 14 August 2026  
**URL tested:** `http://127.0.0.1:8765/prototype/` (local `python -m http.server 8765`)  
**Tooling note (15 Aug):** Lighthouse JSON below was produced on 14 Aug 15:23 UTC, **before** the presentation visual pass. Those files were **re-read with Python** (`python _qa/phase1/qa.py`). npx/Node is not required to review the prototype. Scores were not invented. A new Lighthouse run was not forced after the visual pass.

Optional Google Fonts (`display=optional`) may load when online; the system stack still works offline.
  
**Artefacts:** `_qa/phase1/lighthouse-mobile.report.json` / `.html`, `_qa/phase1/lighthouse-desktop.report.json` / `.html`  
**Rule:** Numbers below are from those files. Do not treat them as production scores. Content was not stripped to inflate them.

Chrome was not installed on this machine. Edge was the only Chromium present.

Lighthouse’s process exited 1 after writing reports (`EPERM` deleting its temp profile). The JSON/HTML were written first; scores are taken from those files.

---

## Scores (actual)

| Form | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile (simulated) | **100** | **100** | **100** | **54** |
| Desktop (preset) | **100** | **100** | **100** | **54** |

---

## Lab metrics (actual)

| Metric | Mobile | Desktop |
| --- | --- | --- |
| First Contentful Paint | 1.1 s (99) | 0.4 s (100) |
| Largest Contentful Paint | 1.3 s (100) | 0.4 s (100) |
| Total Blocking Time | 0 ms (100) | 0 ms (100) |
| Cumulative Layout Shift | 0 (100) | 0 (100) |
| Speed Index | 1.1 s (100) | 0.4 s (100) |
| Time to Interactive | 1.3 s (100) | 0.4 s (100) |

These are **lab** numbers on localhost with almost no bytes beyond HTML, two CSS files, deferred JS, and a 96px seal. They will fall when approved photography is added. That is expected and preferred to a fake empty page.

---

## Accessibility audits (sample, all passed in this run)

`color-contrast`, `heading-order`, `html-has-lang`, `document-title`, `meta-description`, `link-text`, `image-alt`, `target-size`.

Physical ramps, toilets, or quiet rooms are **not** claimed anywhere. The Accessibility page says venue access is PENDING.

---

## SEO 54 — not a defect to “fix” by going live

Failing / n/a audits in the mobile report:

| Audit | Result | Decision |
| --- | --- | --- |
| `is-crawlable` | **FAIL** — `noindex, nofollow` | **Keep.** This is not a public host. CONF-PUJA-001 is open. |
| `hreflang` | **FAIL** — fragment `href="#home"` is not a valid alternate URL | Removed after the run. `hreflang` will return when a public URL is approved. Do not invent one. |
| `robots-txt` | n/a | `robots.txt` with `Disallow: /` added at repo root after the run (local server). |
| `canonical` | n/a | No public canonical invented. |
| `structured-data` | n/a | `WebPage` JSON-LD only. **No Event** schema (no venue, no organiser). |

Title and meta description **pass**. They do not name a venue, phone, or event URL.

Do **not** remove `noindex` to chase 100 SEO.

---

## What was kept light

- No UI framework, no animation library, no video, no autoplay audio.  
- Header seal is `bks-seal-96.png` (~20 KB), not the 1.1 MB canonical file.  
- Photography is a CSS slot (zero image weight).  
- JS is one deferred file; English HTML is first paint.  
- Unused `prototype/styles/puja.css` is leftover from Phase 0 and is **not** linked.

---

## What will hurt these scores later (do not avoid the content)

- Rights-cleared photography (necessary).  
- Optional web fonts for Baloo Da 2 / Hind Siliguri.  
- A real public host (TBT, RTT, cache).  

Measure again after photography, not by deleting The Puja.

---

## Seasonal tokens (weight)

One documented extra custom property: `--color-brand-secondary-tint: #fbeecb` (tint of brand gold, draft banner). Not a vermillion festival palette. No extra CSS framework.
