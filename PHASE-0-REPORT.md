# Phase 0 report — BKS Durga Puja 2026

**Date:** 14 August 2026  
**Workspace:** `C:\Users\asits\Projects\bks-durga-puja-2026`  
**Mode:** research → architecture → content model → restrained local IA prototype  
**Deploy:** none

---

## A. What Ram Sir’s direction requires

From the recorded briefing [SRC-BKS-001] and the BKS Brand System hierarchy [SRC-BKS-BRAND-001]:

- 2026 Durga Puja **theme: Krishak Samaj**
- An **experience on the BKS platform**
- Integrated farming as a **whole-system** idea (examples he named: agro-tourism, retail, storage — illustrations, not a facility list)
- IFS research for the **BKS West Bengal website** (already a Brand System workstream; not rebuilt here)
- A **crowdfunding sketch**: ~295 constituencies, ~15 people, ~5,000 farmers, ₹1 lakh seed, NRI/India donors, launch by Puja
- Voice-agent locality→booth mapping in the **same meeting** — **out of scope** for this repo

Brand hierarchy that remains authoritative:

**BKS → Krishak Samaj → campaign / seasonal context → integrated farming / substance**

Until CONF-PUJA-001 option B is explicit: **Durga Puja is a seasonal campaign experience**, not a permanent identity. No second logo.

---

## B. What is already known

- BKS Brand System v1.2.0 (DRAFT): seal, field green / paddy gold / cream, typography, content classes, CONF-PUJA-001 already open as a seasonal chip
- Legal/display name in that system: Bharatiya Krishak Samaj (CONF-NAME-001 still open)
- No named 2026 BKS pandal, address, committee, or photography of *this* gathering
- UNESCO inscription is **Durga Puja in Kolkata**, 15 December 2021
- West Bengal 2026 civic Puja holidays exist in notification 4188-F(P2)

---

## C. What research was performed

Deep pass across the brief’s A–W: cultural context; WB traditions; Kolkata vs district; barowari/sarbojanin; committees; pandal/idol/lighting; artisans; dhak; bhog; environment; accessibility; visitor UX; digital Puja models; institutional festival/heritage sites; storytelling; event IA; mobile UX; social; discovery; volunteer; sponsor architecture; farmer connection without forcing agriculture into rites.

Primary sources first: UNESCO, PIB/Ministry of Culture, WB Tourism, WB Finance holiday notification, CPCB, WB immersion rules, British Council/WB Tourism creative-economy mapping, Guha-Thakurta / CSSSC, W3C WCAG, Schema.org.

---

## D. Official sources used

See `RESEARCH-DURGA-PUJA-SOURCES.json`. Highest-weight:

- UNESCO ICH element + 2021 inscription + 2025 accessibility SOPs
- PIB Ministry of Culture PRID 1781868
- WB Tourism Durga Puja page (UNESCO **year error** documented)
- WB 4188-F(P2) 27 Nov 2025 holiday calendar
- Drik Panchang Kolkata 2026
- CPCB idol immersion guidelines 12 May 2020
- WB 2018 immersion rules + festival SOP
- British Council *Mapping the Creative Economy around Durga Puja 2019*

**Discrepancies recorded, not silently resolved:**

1. WB Tourism: UNESCO date 15 Dec **2020** vs UNESCO/PIB **2021**
2. 2026 ritual blogs split 16–20 Oct vs 17–21 Oct; civic + Drik Kolkata support **Saptami 18 → Dashami 21**
3. UNESCO article ₹38,000 crore vs British Council **₹32,377 crore** (2.58% of 2019 state GDP)

---

## E. Proposed product architecture

**One recommendation:** seasonal campaign **microsite** (hybrid A + D-lite + E-as-architecture).

Isolated repo; child of BKS; culture first; Krishak Samaj bounded; event JSON ready; participation designed without backend.

Not: a section that swallows the Brand System IFS campaign; not a thin landing poster; not a live community platform; not a second brand.

---

## F. Proposed information architecture

Primary: Home · The Puja · Programme · Community · Krishak Samaj · Participate  
Utility: Accessibility · Sustainability · Contact · EN/বাং  

Rejected until content exists: gallery, news, sponsor wall, fake map, donation, farmers-in-every-section.

---

## G. Brand architecture

Parental BKS. Canonical seal (not redrawn in prototype — slot labelled BKS). Digital tokens only. Seasonal chip, not a lockup. Terracotta remains Brand System accent, not a sindoor system. Leadership titles not invented. Hashtags not invented.

---

## H. Visual direction

Institutional, warm, documentary, bilingual, empty-states as design. Anti-cliché: no red-gold gradients, stock goddess, lotus wallpaper, particles, AI pandals. Photography = provenance or slot. Motion = 200ms and `prefers-reduced-motion`.

Three hero directions; **H1 recommended**: “This autumn, the Samaj sits with the Puja — it does not replace it.”

---

## I. Content model

`/data/content/en/` and `/data/content/bn/` with identical keys. Governance on claim blocks. Story, image, event, SEO, OmniSocial **shapes** defined. JSON-LD only when verified + venue present. No invented host.

---

## J. Bengali architecture

Human copy in `bn` files and prototype `data-bn` attributes. Spoken rhythm, not calque. Native editor review still PENDING before any public launch.

---

## K. Accessibility architecture

Digital: WCAG 2.2 AA target, 48px targets, skip link, focus, bilingual `lang`.  
Physical: UNESCO/IIT Kharagpur 2025 SOP as **reference only**. No ramp/toilet/route claims.

---

## L. Sustainability considerations

CPCB + WB rules summarised as RESEARCH-DERIVED. BKS practices: “could explore / proposed” until a named Puja is verified.

---

## M. Event architecture

`data/events/schema.json` + civic-only 2026 rows with `verification: pending-ritual-panjika`. Categories include `knowledge` for Samaj talks later. Share paths reserved. No muhurat clocks.

---

## N. OmniSocial readiness

`data/omni-social/contract.json`: campaign `krishak-samaj-ifs-2026`, tag `durga-puja-2026`, fail rules V11–V13. **`connected: false`.** No APIs.

---

## O. Open approval decisions

See `DURGA-PUJA-APPROVAL-REGISTER.md`. None closed. Critical: CONF-PUJA-001, dates, venue, committee, photography, Krishak Samaj lead strength, 5,000/₹1 lakh, donate, volunteer, sponsor, cultural figures, logo-on-chrome.

---

## P. Risks

- Building a generic Puja website that ignores Krishak Samaj — or the inverse, an IFS advert in ritual clothing
- Publishing unverified dates from blogs
- Claiming UNESCO for BKS
- Mixing this repo into Brand System production
- Inventing people, venue, or ramps
- Connecting crowdfunding before legal/vehicle approval
- Using Odisha or stock photography as West Bengal Puja ground

---

## Q. Missing information

Venue, committee, whether a physical Puja exists, programme, photography with rights, Panjika for ritual clocks, Ram Sir close of CONF-PUJA-001, public stance on 5,000/₹1 lakh, contact channels, Bengali native edit, official URL (must not be invented).

---

## R. Files created (this workstream)

- `README.md`, `ISOLATION.md`, `.gitignore`, `PHASE-0-REPORT.md`
- All eight required research/architecture documents
- `data/content/en|bn/*`, `data/events/*`, `data/images/registry.json`, `data/stories/stories.json`, `data/seo/meta.json`, `data/omni-social/contract.json`
- `prototype/` IA demo (HTML/CSS/JS, no framework)
- `_checkpoints/durga-puja-2026-phase0-pre/` and `phase0-post/`
- `sources/` copies of Ram Sir meeting notes

---

## S. Files untouched

- Entire `bks-brand-system` tree (read only)
- Purulia voice agent and booth extraction
- Vatika / Newtown / Rosedale / Biophilic
- OmniSocial production
- Supabase, Vercel production, chapter sites
- No payment systems, no API keys

---

## T. Recommended Phase 1 implementation

1. Keep this repo isolated. Do not merge into Brand System until Ram Sir wants a public link from the seasonal chip.
2. Do not deploy.
3. Close or explicitly defer CONF-PUJA-001, venue, and dates before visual richness.
4. If Phase 1 proceeds: real `srcset` photography only with registry rows; copy seal from Brand System with provenance; measure Lighthouse locally and store JSON under `_qa/` (do not invent scores).
5. Add a native Bengali edit pass.
6. Still no forms, donations, OmniSocial, or voice agent.
7. If Ram Sir drops the public Puja layer: archive the prototype; leave research standing.

Phase 0 is complete when this report and the post-checkpoint exist. Beauty is not the deliverable. A culturally respectful, institutionally honest architecture is.
