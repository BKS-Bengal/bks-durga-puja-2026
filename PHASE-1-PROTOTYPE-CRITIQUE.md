# Phase 1 — prototype critique

**Date:** 14 August 2026  
**Subject:** `prototype/index.html` + `styles/app.css` + `scripts/app.js` as left by Phase 0  
**Rule:** This file was written **before** Phase 1 visual hardening. Do not treat later screenshots as this critique.

Phase 0 is accepted. Product architecture is **not** in question. This is a quality critique of the IA proof.

---

## 1. First impression

Honest, calm, and on-brand in colour. It does **not** look like a red-gold festival template. That is a strength.

It also does **not** yet feel like a senior cultural-institution experience. It reads as a well-labelled briefing note: short paragraphs, dashed boxes, few editorial beats, no seal, no rhythm of section openings. A reviewer can understand the ethics in ten seconds and still not feel they have *entered* a gathering.

The prototype currently has a **functional split**: `index.html` uses `data-en` / `data-bn` and hash views; `app.js` looks for `[data-i18n]`, `[data-lang-toggle]`, `[data-nav]` as a **container**, and fetches `site.json`. Those contracts do not match. Language switching and JSON event rendering are therefore unreliable. That is the highest-severity defect.

---

## 2. Hierarchy

**Present:** seasonal chip (“not a second brand”); footer line BKS → Krishak Samaj → season.  
**Weak:** the header seal is a dashed “BKS” rectangle, not the canonical mark. Parent identity is stated in words, not shown as the Brand System requires.  
**Risk:** Krishak Samaj is a primary nav item *and* the home secondary CTA, which can read as the product rather than a bounded path.

CONF-PUJA-001 remains correctly open. The chip must stay. The Samaj must not win the home CTA pair.

---

## 3. Hero

Phase-0 H1 is on the HTML page: *“This autumn, the Samaj sits with the Puja — it does not replace it.”* That is the right hypothesis. It is **PROPOSED**, not approved — the page does not say so next to the H1.

WHO / WHAT / WHY / NEXT are in the lede. WHEN (Sharadiya / civic 2026) is not a labelled hero fact. WHERE is “until a venue is named” inside a sentence, not a pending slot a reviewer can scan.

`data/content/en/site.json` contains a **different** H1 (*“This season, Bengal gathers. BKS is present as Krishak Samaj.”*) which over-weights the Samaj. Dual copy sources will drift.

Three Phase-0 alternatives exist in docs; they are not switchable in the UI for Ram Sir.

---

## 4. Navigation

Primary six matches Phase 0. Utility (Accessibility, Sustainability, Contact) lives only in the footer — acceptable if discoverable; on mobile the footer is far.

Hash routing (`#puja`) is fine for a local prototype. The mobile toggle exists in CSS; JS currently binds a different selector, so the menu may not open.

No `aria-current` update that matches the HTML’s `[data-nav]` links if the other JS path runs.

---

## 5. Typography

Tokens are correct (Baloo Da 2 / Hind Siliguri stack). No webfonts are loaded; system Bengali (Nirmala UI) is the real face. That is acceptable offline. Display H1 is slightly small for an institution hero (`clamp` max 2.75rem). Body measure at `--wrap: 40rem` is editorially right. Card H2s compete with the page H1 because both use the same display size scale.

---

## 6. Whitespace

Generous, not ornamental. Hero slot at 16/9 is a large empty green slab — honest, but it dominates the first screen on mobile and delays “what next”. A shorter slot (4/3 or max-height) would keep honesty without swallowing the lede.

---

## 7. Cultural authenticity

Copy is careful: UNESCO is Kolkata’s; BKS does not claim a pandal. Good.

The Puja page is **too thin** for a cultural institution: UNESCO, barowari, bhog, pending BKS role. Missing from the *experience* (while remaining research-derived): sequence of public days as culture (not as fake timetable), clay/workshop, dhak, homecoming, house vs sarbojanin. Phase 0 research already has this. The prototype does not show it.

---

## 8. BKS brand relationship

Colours match Brand System digital UI. No vermillion. No second mark.  
Seal not present (Brand System `assets/logos` was not available to this workstream at critique time — keep a labelled slot or copy the canonical file with provenance).  
Hierarchy in the brief for Phase 1 is BKS → seasonal campaign → community/culture → Krishak Samaj path. Footer still says BKS → Krishak Samaj → Puja, which slightly inverts the Phase-1 wording. Align footer to Phase-1 without rewriting CONF-PUJA-001.

---

## 9. Puja / Krishak Samaj balance

Home secondary CTA is “Krishak Samaj — a bounded path”. That puts the Samaj equal to “Read the Puja”. For a bounded pathway, home should lead **The Puja** and **Participate** (or Programme). Krishak Samaj belongs in primary nav and its own page, not as the competing home action.

---

## 10. Mobile UX

At 375px: header chip + wordmark wrap; 3-column path cards become a tall stack (CSS does this after 768, so mobile is a single column — good). 48px targets are specified. Event cards untested because JS/HTML mismatch. Lang buttons are 48px but EN/বাং as two controls is good; they may wrap under the wordmark.

---

## 11. Bengali UX

HTML `data-bn` strings are generally natural. `site.json` bn nav uses **নিবাস** for Home — literary, not what a visitor taps. Prefer প্রথম পাতা / হোম. Mixed পুজো / পূজা. No on-page “DRAFT — NATIVE EDIT REQUIRED”. Line-height 1.75 is set for `:lang(bn)` only if `html.lang` changes; broken JS may never set it.

---

## 12. Accessibility

Skip link, one `h1` per view, 48px targets, `prefers-reduced-motion` on tokens, focus-visible. Gaps: views use `hidden` + CSS `display`; hash change focus on H1 is in one JS file, not the other; lang toggle has no live region; contrast of gold on cream for badges is borderline; dashed seal is not an image so no alt; event list empty for SR users if fetch fails.

---

## 13. Performance

Tiny CSS/JS, no libraries, no video. Not measured (no Lighthouse in Phase 0 — correctly not fabricated). Fetch of JSON from `../data/` requires a server; `file://` degrades. Dual CSS (`app.css` + unused `puja.css`) is leftover weight.

---

## 14. Content density

Too low for approval. Community is one empty well. Programme dumps civic dates (if JS works) next to “no named programme” without a visual distinction between **civic holiday** and **BKS event**. Participate cards have no COMING SOON control. Contact is a single dashed line.

---

## 15. CTA clarity

Primary “Read the Puja” is right. Secondary should not be Krishak Samaj. Visit / programme / participate need a visible pending venue fact. Support must stay “not collecting money”, not a gold button that looks live.

---

## 16. Phase 1 hardening list (do not change architecture)

1. Unify HTML, CSS, JS, and JSON contracts.  
2. Keep Phase-0 H1 as default; add three labelled PROPOSED variants.  
3. Hero fact row: WHO / WHAT / WHEN / WHERE (pending) / WHY / NEXT.  
4. Canonical seal if the file can be copied with provenance; otherwise keep an honest slot.  
5. Editorial The Puja from Phase-0 research, still labelled.  
6. Programme: civic layer vs empty BKS programme; `pending_panjika`; no fake confirmed events.  
7. Community story-card framework, empty by design.  
8. Krishak Samaj page as bounded path; home CTA rebalanced.  
9. Participate COMING SOON / CONTACT states, no forms.  
10. Bengali draft banner; fix নিবাস.  
11. OG / language meta; no invented URL or address.  
12. Measure Lighthouse and viewports for real.

No gallery, news, donate, sponsor wall, or production deploy.

---

## Addendum — 15 August 2026 presentation pass

Ram Sir asked for a reviewable local prototype. Architecture was not redesigned. Visual quality was raised:

- Home is an editorial two-column hero (desktop) with a material photograph slot, fact row, and five “inside this gathering” rooms.
- Empty states are designed (clay/field/weave CSS fields, TBA programme template, community story cards). They still say EMPTY / TO BE ANNOUNCED.
- Krishak Samaj is a theme pathway, not an IFS clone.
- Participate is six numbered cards.
- Hero H1/H2/H3 remain PROPOSED and switchable.
- QA and screenshots are driven by **Python** (`python _qa/phase1/qa.py`), with `python -m http.server 8765` as the preview. Node/npx is not required to open or check the prototype.

Residual: 375px English H1 is the longest string — glance it on a phone. Bengali 375 and 768+ read as institutional.

