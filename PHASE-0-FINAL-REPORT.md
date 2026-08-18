# Phase 0 final report — BKS Durga Puja 2026

**Date:** 14 August 2026  
**Repository:** `C:\Users\asits\Projects\bks-durga-puja-2026`  
**Class:** Research + architecture + local prototype. Not production. Not a deploy.

---

## A. What Ram Sir’s direction requires

From the Brand System (read-only) and the 14 August 2026 source-of-truth:

- Hierarchy: **BKS → Krishak Samaj → campaign / seasonal context → integrated farming**
- Durga Puja must **not** automatically become a permanent BKS identity (**CONF-PUJA-001**)
- Canonical seal, colours, type, leadership terminology preserved
- No second logo, no competing identity, no unsupported institutional claims

From the meeting transcript / notes (`sources/SRC-BKS-001-meeting-summary.txt`):

- Durga Puja is a current execution
- Theme: **Krishak Samaj**
- Experience on the **BKS platform**, with KarmYog named as mobiliser of the agricultural community toward **integrated farming**
- IFS research for West Bengal to live on the BKS West Bengal website
- Crowdfunding sketch: ~295 constituencies, ~15 people, ~5,000 farmers, ₹1 lakh each; NRI / global donors; launch by Puja
- Voice agent / locality-to-booth mapping — **explicitly out of this workstream**

---

## B. What is already known

- Brand tokens, photography rules, OmniSocial fail V11/V13, no live Donate (Brand System v1.2.0)
- A prior seasonal-**chip** architecture exists in the Brand System; this workstream **extends** it into a full seasonal microsite without editing production
- UNESCO: *Durga Puja in Kolkata* inscribed 2021
- WBPCB / CPCB immersion and materials rules exist as organiser obligations
- UNESCO/UN accessibility SOPs (2025) exist as **reference**, not as BKS venue proof
- No signed BKS 2026 venue, committee, programme, or photography in this archive

---

## C. What research was performed

Desk research covering cultural context; WB / Kolkata / district difference; Barowari / Sarbojanin; committees; pandal–idol–lighting–programme ecosystem; artisans (Kumartuli / *mritshilpi*); dhak; bhog; environment; accessibility; visitor jobs; digital Puja patterns; institutional and festival UX; storytelling; event IA; mobile-first; social; discovery; volunteer/support; farmer connection as **context vs claim**.

Sources were fetched or opened, not paraphrased from SEO blogs as primary evidence.

---

## D. Official sources used

Priority sources (see `RESEARCH-DURGA-PUJA-SOURCES.json`):

- UNESCO ICH element + decision 16.COM 8.B.15 + nomination PDF
- PIB / Ministry of Culture (15 Dec 2021)
- West Bengal Tourism (civic colour; **UNESCO year error noted**)
- AASAN permission portal (civic)
- UNESCO / UN India accessibility SOP (2025) + IIT Kharagpur / GoWB
- CPCB 2020 immersion guidelines; WB 2018 immersion rules; WBPCB 2025 undertaking
- Drik Panchang **Kolkata** 2026 calendar
- timeanddate.com India 2026 holidays
- BKS Brand System + Ram Sir meeting files

---

## E. Proposed product architecture

**Dedicated seasonal campaign microsite** (Model A), hybrid with a thin participation layer and a pointer to BKS knowledge — **not** a city Puja portal, **not** a payment platform, **not** an edit of Brand System production.

Rationale: isolation, seasonal lifecycle, cultural authenticity, CONF-PUJA-001, future JSON for OmniSocial, no false civic authority.

---

## F. Proposed information architecture

**Primary:** Home · The Puja · Programme · Community · Krishak Samaj · Participate  
**Utility:** Accessibility · Sustainability · Contact · EN/বাং  

Rejected as v1 nav: gallery mega-module, sponsor wall, donate, Kolkata pandal map, tickets, voice-agent widget.

---

## G. Brand architecture

Parent BKS identity unchanged. Seasonal chip allowed. No second mark. No vermillion system. KarmYog not on the public prototype pending CONF-PUJA-KARMYOG. After the season, archive the microsite; IFS/BKS remain.

---

## H. Visual direction

Quiet institutional: BKS tokens, editorial type, empty honest slots, no cliché ornament. Hero **H1** recommended (institutional season). H2 (craft/UNESCO civic) and H3 (participation) documented, not mixed into a mash-up.

---

## I. Content model

JSON objects for page, hero, event, person/story, image, participation path, OmniSocial payload. Governance classes on copy. Events machine-readable (`data/events/`).

---

## J. Bengali architecture

Parallel `data/content/bn/site.json`, human-written, neighbourhood register, ordinary day names (মহালয়া, ষষ্ঠী…). Prototype language toggle. Equal, not an afterthought.

---

## K. Accessibility architecture

Digital: skip link, landmarks, 48px targets, focus, bilingual `lang`, reduced motion, text badges not colour-only.  
Physical: **not claimed**. UNESCO SOP is a committee checklist, Proposed.

---

## L. Sustainability considerations

Could explore / Proposed / Recommended only: clay, no PoP, nirmalya bins, no DJ on immersion, post-season honesty note. No “BKS is a green Puja” claim.

---

## M. Event architecture

Schema + six civic-day rows (Mahalaya through Dashami), `verification: pending-ritual-panjika`, no muhurat clocks. Taxonomy: ritual, cultural, community, knowledge, food, volunteer, immersion.

---

## N. OmniSocial readiness

`data/omnisocial/omnisocial-readiness.json` — fields only. **No API. No automation.** Fail if dates unpublished or seal replaced.

---

## O. Open approval decisions

See `DURGA-PUJA-APPROVAL-REGISTER.md`. None closed. Critical: CONF-PUJA-001, purpose, venue, dates, committee, photography, Krishak Samaj public weight, donate, volunteer backend, UNESCO on Home, colours, KarmYog naming, URL.

---

## P. Risks

1. Publishing a blog Dashami (20 vs 21 Oct) misleads a crowd.  
2. Forcing IFS into ritual copy damages cultural credibility.  
3. Crowdfunding copy read as a live ask.  
4. UNESCO used as a BKS badge.  
5. Mixing this repo into Brand System / voice agent / OmniSocial production.  
6. Invented people or stock goddess imagery.  
7. WB Tourism’s 2020 UNESCO date if copied.  
8. File:// prototype missing JSON if opened without a local server.

---

## Q. Missing information

Venue, committee, panjika choice, visarjan police slot, programme, photography, whether BKS hosts or only marks the season, donation vehicle, physical access audit, public URL, hashtags, leadership appearance, KarmYog public credit.

**PENDING RAM SIR CONFIRMATION** remains the correct label for the actual BKS Puja objective beyond the meeting sketch.

---

## R. Files created

In `C:\Users\asits\Projects\bks-durga-puja-2026`:

- `README.md`, `ISOLATION.md`, `.gitignore`
- `RESEARCH-DURGA-PUJA-2026.md`
- `RESEARCH-DURGA-PUJA-SOURCES.json`
- `DURGA-PUJA-2026-DATE-VERIFICATION.md`
- `DURGA-PUJA-PRODUCT-ARCHITECTURE.md`
- `DURGA-PUJA-DESIGN-DIRECTION.md`
- `DURGA-PUJA-CONTENT-ARCHITECTURE.md`
- `DURGA-PUJA-APPROVAL-REGISTER.md`
- `DURGA-PUJA-PERFORMANCE-PLAN.md`
- `PHASE-0-FINAL-REPORT.md`
- `sources/ram-sir/*`
- `data/content/en/site.json`, `data/content/bn/site.json`
- `data/events/*`, `data/images/*`, `data/stories/*`, `data/omnisocial/*`, `data/seo/*`, `data/brand/*`
- `prototype/` (IA proof)
- `_checkpoints/durga-puja-2026-phase0-pre/`
- `_checkpoints/durga-puja-2026-phase0-post/`

---

## S. Files untouched

- `C:\Users\asits\Projects\bks-brand-system` (read only)
- Purulia, Vatika, Biophilic, OmniSocial production
- Supabase, Vercel production, voice agent
- No payment systems

---

## T. Recommended Phase 1 implementation

1. Ram Sir closes CONF-PUJA-001 as **seasonal** (or stops the microsite).  
2. Confirm venue / committee / panjika before any date in the hero.  
3. Prebuild or inline EN strings so LCP does not wait on `fetch`.  
4. Compress seal derivatives; still no hero video.  
5. Add `/programme/{id}` routes only after one verified event.  
6. Keep Support disabled.  
7. If a preview is needed: **new** isolated host.  
8. Do not wire OmniSocial, voice agent, or Brand System production in Phase 1.  
9. Measure Lighthouse on mobile Slow 4G and store `_qa/` — do not invent scores.  
10. Critique the quiet prototype against H1: does a stranger know who / what / next in five seconds without a lie?

Phase 0 is complete as **research → understand → document → architect → content model → design system (tokens reused) → restrained prototype**. Approval and deploy remain later, and deploy is not this phase.
