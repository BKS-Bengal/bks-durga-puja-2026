# Phase 1 report — BKS Durga Puja 2026

**Date:** 14 August 2026  
**Repository:** `C:\Users\asits\Projects\bks-durga-puja-2026`  
**Class:** Approval-ready prototype. Not production. Not a deploy.  
**Phase 0:** accepted. Not restarted. Product architecture not redesigned.

---

## A. Phase-0 findings carried forward

- Isolated **seasonal campaign microsite** under BKS. Hierarchy for this phase: **BKS → seasonal Durga Puja campaign → community / culture → Krishak Samaj as a bounded pathway**.
- **CONF-PUJA-001 remains OPEN.** Not a permanent BKS identity. No second logo. No festival lockup.
- Civic dates from WB **4188-F(P2)** + Drik Panchang Kolkata may appear as **civic holidays**, not as a BKS invitation. Ritual clocks stay `pending_panjika`.
- UNESCO: *Durga Puja in Kolkata*, **15 December 2021**. BKS is not the inscribed element.
- Venue, committee, programme, photography, native Bengali editorial, Krishak Samaj prominence, donation / volunteer / sponsor models: **not invented**.
- Crowdfunding sketch (~5,000 × ₹1 lakh) is Ram Sir’s **sketch**, not a public programme.
- Voice agent, Purulia, Vatika, Biophilic, OmniSocial production, Brand System production, Supabase: **out of this workstream**.
- Default hero hypothesis (still **PROPOSED**): *“This autumn, the Samaj sits with the Puja — it does not replace it.”*

---

## B. Prototype architecture

Single `prototype/index.html` (hash views), `styles/tokens.css` + `styles/app.css`, deferred `scripts/app.js`. Content from `data/content/en|bn/`, `data/events/events.json`, `data/stories/stories.json`.

**Primary:** Home · The Puja · Programme · Community · Krishak Samaj · Participate  
**Utility:** Accessibility · Sustainability · Contact · EN / বাং  

No gallery, news, sponsor wall, donate, forms, database, or payment.

---

## C. UX improvements (against the Phase-1 critique)

The critique (`PHASE-1-PROTOTYPE-CRITIQUE.md`) was written **before** hardening. Addressed:

1. HTML / JS contract unified (`data-en`/`data-bn`, hash routing, `#nav-toggle`, `aria-current`).
2. Canonical seal in the header (96px derivative).
3. Hero WHO / WHAT / WHEN / WHERE / WHY / NEXT; three labelled **PROPOSED** variants (H1 default).
4. Home CTAs: **Read The Puja** + **Participate** (Krishak Samaj no longer the competing home action).
5. The Puja: cultural context vs BKS-specific claim; public-day meanings without ritual clocks.
6. Programme: civic layer vs EMPTY named BKS programme.
7. Community: eight empty story wells.
8. Participate: six pathways with Coming soon / Not collecting money / Contact slots.
9. Bengali draft banner; Home = প্রথম পাতা.
10. Footer hierarchy aligned to Phase-1 wording.
11. 375 overflow: header tools wrap below 480px; identity `min-width: 0`; H1 wrap.

Not “finished festival UX”. Uncertainty remains visible.

---

## D. Visual system

Foundation: BKS digital tokens (Brand System v1.2.0 values). Quiet, editorial, no vermillion template, no AI goddess, no fake pandal, no particles.

**New token (documented):** `--color-brand-secondary-tint: #fbeecb` — tint of brand gold for the draft/governance banner. Not a seasonal vermillion palette.

Canonical seal copied, not redrawn. Provenance in `data/images/registry.json`.

---

## E. Hero alternatives

All **PROPOSED**. Switcher on Home (H1 / H2 / H3). Same WHO/WHEN/WHERE skeleton; WHERE does not invent a venue.

| ID | Title |
| --- | --- |
| **H1** (default) | This autumn, the Samaj sits with the Puja — it does not replace it. |
| **H2** | Clay, dhak, and a neighbourhood — BKS is a guest, not a second festival. |
| **H3** | Come to understand the Puja. Stay, if you wish, for the Samaj. |

Bengali equivalents live in `data/content/bn/heroes.json` (draft).

---

## F. Bengali status

Same content model as English. Cultural language is natural Bengali, not literal machine translation. Technical labels (PROPOSED, PENDING, EMPTY, UNESCO) stay in English where that is how the prototype speaks to reviewers.

**DRAFT — NATIVE EDIT REQUIRED.** Banner on every view. `CONF-PUJA-BN-001` open.

---

## G. Programme architecture

Event schema fields in use: `event_id`, `title`, `date`, `start_time`/`end_time` (null), `location` (null), `category`, `description`, `audience`, `status` (`civic-only`), `source`, `last_updated`, `verification_status` (`pending_panjika`), `content_status` (`RESEARCH-DERIVED`).

Civic rows are holidays, not invitations. Named BKS programme is an **EMPTY** well. Share copies draft text; no public URL.

---

## H. Community architecture

Wells: People, Craft, Music, Food, Volunteers, Neighbourhood, Tradition, Participation. Reusable card markup. Stories array is empty. Copy: “Story coming soon”.

---

## I. Krishak Samaj architecture

Own page only. Cultural context (harvest, nabapatrika, bhog, artisan season) vs BKS programme (theme named by Ram Sir; 5,000/₹1 lakh as sketch; voice agent out of scope). Future IFS **link**, not a duplicate of the Integrated Farming site. No URL invented.

---

## J. Participation architecture

Visit · Volunteer · Participate · Support · Know more · Contact. No backend. Disabled Coming soon / Not collecting money. Contact slots EMPTY.

---

## K. Accessibility

Semantic views, one H1 each, skip link, `lang` on `<html>`, `aria-current`, `aria-pressed`, `aria-expanded`, focus-visible, 48px targets, reduced-motion in tokens, live region for language, seal alt text, event cards as list items.

Lighthouse accessibility **100** (lab, local). Physical venue access **not claimed**.

---

## L. Performance

See `PHASE-1-PERFORMANCE-REPORT.md`.

Mobile / desktop Lighthouse (Edge as Chrome, localhost): **Performance 100, Accessibility 100, Best Practices 100, SEO 54**.

SEO 54 is `noindex` (intentional) plus invalid fragment `hreflang` (removed after the run). Do not remove `noindex` to chase 100.

LCP mobile 1.3 s / desktop 0.4 s in lab — will worsen when photography is added, correctly.

---

## M. Responsive QA

See `PHASE-1-RESPONSIVE-QA.md` and `_qa/phase1/vp-*.png`.

Widths 375, 390, 414, 768, 1024, 1280, 1440 captured. First 375 pass clipped; CSS wrap applied; recaptured. 768–1440 pass. 375 home H1 length remains a review watch.

---

## N. SEO

Title, description, `og:title` / `og:description` / `og:locale` (no `og:url`, no `og:image` host). `WebPage` JSON-LD. **No Event** JSON-LD. `robots.txt` Disallow all. `noindex, nofollow`. Favicon = seal 96px. No official address, phone, venue, organiser, or public URL.

---

## O. Approval blockers

Nothing here is closed. Highest-priority for Ram Sir:

1. **CONF-PUJA-001** — seasonal vs permanent  
2. Hero variant H1 / H2 / H3 (or rewrite)  
3. Seal on seasonal chrome  
4. Civic calendar as civic-only  
5. Native Bengali editor  

Until 1 is signed, this stays a prototype.

---

## P. Missing real-world information

Venue · committee / organiser · final programme · photography (rights, photographer, location) · named Panjika for ritual clocks · native Bengali sign-off · Krishak Samaj prominence · donation vehicle · volunteer intake · sponsor names · public URL · phone / email · physical accessibility.

---

## Q. Files changed (working tree)

**Prototype:** `prototype/index.html`, `prototype/styles/tokens.css`, `prototype/styles/app.css`, `prototype/scripts/app.js`, `prototype/assets/bks-seal.png`, `prototype/assets/bks-seal-96.png`  
**Data:** `data/content/en/heroes.json`, `data/content/bn/heroes.json`, `data/content/bn/site.json`, `data/events/events.json`, `data/stories/stories.json`, `data/seo/meta.json`, `data/images/registry.json`  
**Docs:** `PHASE-1-PROTOTYPE-CRITIQUE.md`, `PHASE-1-RESPONSIVE-QA.md`, `PHASE-1-PERFORMANCE-REPORT.md`, `PHASE-1-REPORT.md`, `DURGA-PUJA-APPROVAL-REGISTER.md`, `README.md`  
**Other:** `robots.txt`, `.gitignore`  
**QA:** `_qa/phase1/*`  
**Checkpoints:** `_checkpoints/durga-puja-2026-phase1-pre/`, `_checkpoints/durga-puja-2026-phase1-post/`

---

## R. Files untouched

- BKS production sites, Brand System production, Purulia (incl. database / voice agent), Vatika, Biophilic, OmniSocial production, Supabase  
- Phase 0 research corpus (`RESEARCH-DURGA-PUJA-2026.md`, date verification, product/design/content architecture) — not rewritten  
- `_checkpoints/durga-puja-2026-phase0-pre/` and `phase0-post/` — not overwritten  
- No Vercel deploy, no existing BKS URL

`prototype/styles/puja.css` is leftover from Phase 0 and is not linked.

---

## S. Tests actually run

| Test | Result |
| --- | --- |
| `python -m http.server 8765` + GET `/prototype/` | 200 |
| Edge headless screenshots, 7 widths × key pages | 33 PNGs in `_qa/phase1/` |
| Lighthouse mobile + desktop via Edge | Scores in §L; JSON/HTML saved |
| Language `?lang=bn` | Bengali views captured |
| `file://` JSON | Not relied on; HTTP required |

No unit-test suite. No production crawl.

---

## T. Deployment status

**Not deployed.** Local only. `robots.txt` disallows all. `noindex`. If a review URL is needed later: **new isolated preview**, never an overwrite of a BKS Vercel host. Do not deploy until Ram Sir closes the open decisions.

---

## U. Recommended next step

**Review with Ram Sir — do not implement a finished event.**

Ask, in this order:

1. CONF-PUJA-001: confirm seasonal campaign (option A).  
2. Pick hero H1 / H2 / H3 or supply a line.  
3. Confirm canonical seal on this chrome.  
4. Name venue / committee, or confirm digital-only for 2026.  
5. Name a Panjika if ritual clocks are required.  
6. Native Bengali edit of `data/content/bn/`.  
7. Photography with rights, or keep slots.

After those, a later phase may add isolated preview hosting — still not production, still not OmniSocial, still not payments.
