# Durga Puja 2026 — performance plan

**Status:** PLAN — no fabricated Lighthouse scores  
**Date:** 14 August 2026  
**Target:** premium, lightweight, mobile-first. LCP ≤ 2.5s where realistically achievable on a mid-range phone / 4G.

This phase does **not** publish production. Measure locally before any isolated preview.

---

## 1. What not to build

- Hero video
- Uncompressed PNG photography
- Particle / WebGL backgrounds
- Animation libraries
- Carousel plugins
- Icon-font kits
- Autoplay audio
- Client-side frameworks for a content site

---

## 2. Stack (Phase 1 implementation)

| Layer | Choice | Why |
| --- | --- | --- |
| Pages | Static HTML | Progressive enhancement, no hydrate |
| CSS | One tokens file + one layout file | No unused utility CSS |
| JS | Small `app.js`: language, nav, event render | Deferred; site readable with JS off |
| Images | WebP/AVIF + width variants when photos exist | Slots now = zero image weight |
| Fonts | System stack first; optional Baloo Da 2 / Hind Siliguri with `font-display: optional` | Avoid FOIT on Bengali |
| Hosting later | Isolated preview only | Do not overwrite BKS production |

---

## 3. Image policy (when photos exist)

- `srcset` / `sizes` for 480 / 768 / 1200
- `width` `height` to stop CLS
- `loading="lazy"` below the fold; hero `fetchpriority="high"` only if a real hero image is approved
- Poster, never autoplay, if a later video is approved
- Budget: hero ≤ 120 KB compressed; gallery thumb ≤ 40 KB

---

## 4. JavaScript budget

- First load JS < 20 KB uncompressed for chrome + i18n subset, or inline critical strings from JSON via build-time inlining in a later step
- Phase 0 prototype may fetch local JSON on `file://` fallback: embed a copy in `content.generated.js` so the prototype works offline without a server
- No analytics until approved

---

## 5. Measurement (do not invent scores)

When a prototype is viewable:

1. Serve with `python -m http.server` (not `file://` for Lighthouse).
2. Chrome Lighthouse: 375px, Slow 4G, no extensions.
3. Record in `_qa/lighthouse-phase0.json` the **actual** JSON.
4. Also record transfer size of HTML+CSS+JS from the Network panel.

If LCP > 2.5s: remove webfonts, then any image, then JS. Do not add animation to “feel faster”.

---

## 6. Core Web Vitals plan

| Metric | Plan |
| --- | --- |
| LCP | Text hero + CSS gradient until photo; then optimised WebP |
| INP | No heavy listeners; nav toggle only |
| CLS | Reserved slot aspect-ratio 16/9; no late webfont swap on H1 if possible |
| TTFB | Static files |

---

## 7. Reduced motion and data

- Honour `prefers-reduced-motion`
- Honour `Save-Data` later: skip webfonts
- Bengali font subset if a webfont is introduced

---

## 8. Phase 0 prototype expectation

The local prototype in `/prototype` is an **IA and content-model demonstration**. It should be small. It is not a festival film. Performance evidence is collected when Phase 1 visual implementation is requested — not faked now.
