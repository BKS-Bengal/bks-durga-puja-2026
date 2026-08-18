# BKS Durga Puja 2026 — Next version localhost test report

**Date:** 18 August 2026  
**Class:** Local review prototype. Not production. Not a deploy.  
**Server:** `python -m http.server 8765` from the repo root  
**URL:** http://127.0.0.1:8765/prototype/

---

## Result

**PARTIALLY COMPLETED — local review-ready.** Functional, JSON, route, language and screenshot checks passed. Lighthouse was **not** re-scored in this session (Chrome launcher failed; scores are not fabricated). No git push. No Vercel deploy.

---

## Routes tested

Served over HTTP (200):

- `#home` `#puja` `#krishak` `#ifs` `#mission` `#participate` `#locator` `#sources`
- `#programme` `#community` `#contact` `#accessibility` `#sustainability`

Content JSON 200 for `en`, `bn`, `hi`: ui, heroes, home, krishak-samaj, integrated-farming, mission, participate, locator, sources.

Also 200: `data/events/events.json`, `data/stories/stories.json`, `data/api/locality-lookup.contract.json`, CSS, JS, seal PNG.

Python `_qa/next/qa.py`: **qa-ok**.

---

## Viewport screenshots

Edge headless, `_qa/next/vp-*.png`. All 14 captured (size > 1 KB):

- 375, 390, 414, 768, 1024, 1280, 1440 — Home (EN)
- 375 IFS, 375 locator, 768 Mission, 1440 Participate
- 375 Home BN, 375 Home HI, 768 Krishak BN

Visual notes:

- Desktop/tablet: BKS green header, gold EN, H1 “A Durga Puja that sits with the farmer.”, Know the Initiative + The Puja, empty photo slot, mission stats labelled NOT ACHIEVED / CALCULATED TARGET.
- Participate states no payment and no server storage. Farmer / supporter / volunteer / partner cards present.
- Locator shows locality-first hierarchy and unmapped booth policy.
- Hindi Home switches wordmark, chip, H1 and CTAs.
- 375 Edge `--window-size` screenshots can clip a few letters at the right edge (window chrome vs CSS viewport). CSS uses `overflow-wrap: break-word` and header tools wrap below 900px. Treat as a QA-tool artefact unless a real 375 CSS-pixel browser repeats it.

---

## Languages

- `?lang=en` `?lang=bn` `?lang=hi`
- Switcher: EN / বাং / हिं
- Hash preserved via `history.replaceState`
- Bengali and Hindi marked **DRAFT — NATIVE REVIEW REQUIRED**

---

## Accessibility (structural)

Present: skip link, landmarks, sticky header, 48px targets, visible focus, `lang` on `<html>`, form labels, error nodes, `prefers-reduced-motion` in tokens, IFS nodes `tabindex="0"` plus a text summary (not animation-only).

Playwright/axe was **not** run in this session. Keyboard-only pass is **inferred from structure**, not a recorded human keyboard tour.

Physical venue access is **not claimed**.

---

## Performance

Previous isolated prototype: local Lighthouse 100 / 100 / 100 (Phase 1).  

This session: `npx lighthouse` failed (no Chrome install; Edge retry hit a temp-dir EPERM). **Do not treat any new Lighthouse number as measured.** Stack is still static HTML/CSS/deferred JS, no new animation libraries, no video.

---

## Functional

- No UPI, gateway, bank, 80G, or fake payment flow.
- Interest form validates, downloads `bks-durga-puja-interest.json`, states it is not stored.
- Locator does **not** call `/api/locality-lookup`; contract is documented only.
- Mission ₹50 crore labelled **CALCULATED TARGET** (5,000 × ₹1,00,000).
- ~295 constituencies labelled brief arithmetic, with a note that public research records 294 West Bengal ACs.
- Awards, nominations, sponsorship, and 2025 KarmYog stats from live `/puja` were **not** carried into this version.

Console: static pages do not inject third-party analytics. JSON fetch errors surface the events fallback if the site is opened as a file URL.

---

## Fixes applied during QA

- Header language tools wrap below 900px so EN / বাং / हिं / Menu can share a row.
- Headings and body use `overflow-wrap: break-word` rather than mid-word `anywhere`.
- Locator hierarchy lines wrap instead of clipping.

---

## Not done (stop conditions)

- No git commit, push, or repository publication.
- No Vercel deploy. Target remains ambiguous (`bks-bangla` `/puja` vs `bkswbengal.org/durga-puja-2026`).
- Production systems untouched: Amul/GOBARdhan, Purulia voice agent, Supabase, OmniSocial.
- Venue, committee, programme, official photography still empty.
