# BKS Durga Puja 2026 — Phase 2 implementation report

**Date:** 17 August 2026  
**Repository:** `C:\Users\asits\Projects\bks-durga-puja-2026`  
**Class:** Isolated static prototype. Not production. Not a deploy.  
**Architecture:** Unchanged. Hash-routed `prototype/index.html` + `styles/` + `scripts/app.js`. Not Next.js.

Phase 2 audit was accepted and is **not** repeated here.

---

## Isolation (verified)

Work stayed in this repository and the isolated GitHub Pages preview repo `Omnidel-ai/bks-durga-puja-2026-preview`.

Not touched: BKS production, Vercel production, DNS, Supabase, Amul/GOBARdhan, Purulia, Arjun, Vatika, Biophilic, OmniSocial, Brand System production, any voice agent.

---

## Checkpoint

`_checkpoints/durga-puja-2026-phase2-pre/` freezes the Phase 1 prototype before these edits. Do not overwrite it.

---

## What changed

### 1. HTML ↔ JSON drift

Live UI remains HTML `data-en` / `data-bn` plus fetches of `heroes.json`, `events.json`, and `stories.json` only.

Page JSON files (`home.json`, `puja.json`, `krishak-samaj.json`, `participate.json`, `site.json`) are **mirrors**, not a new CMS. Hero H2/H3 strings in `site.json` (en + bn) were aligned to `heroes.json`. Home secondary CTA remains **Participate**, not Krishak Samaj.

Approved Phase 1 copy was not silently rewritten.

### 2. Editorial rhythm (not a redesign)

Tokens stay BKS digital (forest, cream, gold). Changes: labelled layer blocks, quieter cards, footer contrast, draft banner inside `<header>`, hero variants as `<section>`, focus/keyboard, reduced-motion, `overflow-x: clip` plus grid `min-width: 0` so the Home H1 wraps at 375 instead of being clipped.

No generic template palette. No AI goddess. No fake pandal photograph.

### 3. The Puja

Page uses three labels only:

| Label | Use |
| --- | --- |
| SOURCE FACT | UNESCO 2021 Kolkata inscription; clay; dhak; house vs sarbojanin; bhog as cultural fact |
| BKS POSITIONING | The Samaj sits beside the Puja; not a second festival |
| PENDING INFORMATION | Venue, committee, programme, ritual clocks, photography |

No invented venue, timings, committee, sponsors, or event photographs.

### 4. Krishak Samaj

Main Phase 2 content pass. Hierarchy on the site remains:

**BKS → seasonal Durga Puja → community / culture → Krishak Samaj → integrated farming**

IFS does not occupy Home or The Puja. Home CTAs: Read The Puja + Participate.

On Krishak Samaj only:

- **A. SOURCE FACT** — West Bengal / ICAR / BCKV / CIFRI / FPO / homestay–livelihoods public research. Not BKS farms or BKS results.
- **B. BKS POSITIONING** — theme named by Ram Sir; link-not-duplicate to Brand System when a public URL exists (none invented).
- **C. FUTURE / PENDING** — 5,000 × ₹1 lakh as campaign vision.

Research file: `BKS-DURGA-PUJA-INTEGRATED-FARMING-RESEARCH.md`. `parallel-cli` was not installed; numbers were not invented.

### 5. 5,000 × ₹1 lakh

Remains **PENDING APPROVAL / CAMPAIGN VISION**. No donation counter, ₹5 crore counter, UPI, payment CTA, funding application, guaranteed farmer benefit, or government-scheme enrolment.

### 6. Bengali

New strings written as natural Bengali. Newly added Bengali is marked **DRAFT — NATIVE REVIEW REQUIRED**. Krishak page shows a `.bn-draft` note when `lang=bn`. CONF-PUJA-BN-001 stays **OPEN**. See `BKS-DURGA-PUJA-BENGALI-REVIEW.md`.

### 7. Voice agent

Not added. Existing agents not modified. Booth search not added. Microphone UI not added. Page states that workstream is out of scope.

---

## Information architecture (unchanged)

Home · The Puja · Programme · Community · Krishak Samaj · Participate  
Utility: Accessibility · Sustainability · Contact · EN / বাং

---

## Isolated preview

Ram Sir URL (unchanged host, Phase 2 files pushed to this repo):

**https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/**

Bengali: `?lang=bn`

Do not send Ram Sir to `bks-durga-puja-2026-preview.vercel.app` or to Brand System production.

---

## Final gate

| Check | Result |
| --- | --- |
| Phase 1 prototype preserved | **YES** — `phase2-pre/` |
| HTML/JSON drift fixed | **YES** — live HTML + heroes; mirrors aligned |
| The Puja editorially strengthened | **YES** |
| Krishak Samaj strengthened | **YES** |
| WB IFS labelled SOURCE FACT | **YES** |
| BKS positioning separated | **YES** |
| 5,000 × ₹1 lakh pending | **YES** |
| No payment / donation functionality | **YES** |
| No fabricated event information | **YES** |
| No fabricated photography | **YES** |
| Bengali additions marked DRAFT | **YES** |
| axe-core = 0 | **YES** — see QA report |
| Responsive QA passed | **YES** — see QA report |
| Lighthouse completed | **YES** — static localhost, not Next.js |
| No unrelated files / production / voice-agent | **YES** |
| Isolated preview updated | **YES** — OmniDel.ai Pages (`63fda63`) |
| `phase2-post` | **Not created.** QA passed; `phase2-pre` is intact. Freeze post-state only after you accept this report. |

---

## Still OPEN (not guessed)

Venue, committee, named programme, Panjika ritual clocks, photography, native Bengali sign-off, hero H1/H2/H3 choice, 5,000 × ₹1 lakh, volunteer intake, donate/sponsor models, CONF-PUJA-001 (seasonal vs permanent identity).

Full table: `DURGA-PUJA-APPROVAL-REGISTER.md`. Phase 2 does not close any row.

---

## Status

**COMPLETED** for the approved Phase 2 implementation pass on the isolated static prototype.  
**NOT** production. **NOT** a live event. **NOT** a Next.js migration.
