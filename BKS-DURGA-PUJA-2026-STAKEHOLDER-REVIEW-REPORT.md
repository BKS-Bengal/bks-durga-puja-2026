# BHARATIYA KRISHAK SAMAJ PUJO
## Local Website Review & Stakeholder Brief

**Six-Audience Digital Ecosystem**  
**Pre-Commit / Pre-Deploy Review**

**Date:** 21 August 2026  
**Addressed to:** Ram Sir / Mahacharya Ji  
**Status:** LOCAL REVIEW BUILD · READY FOR STAKEHOLDER REVIEW · NOT READY FOR PRODUCTION DEPLOYMENT  
**NO COMMIT · NO PUSH · NO DEPLOY**

This is a product / website review document. It is not a developer changelog and not a marketing brochure. Uncertain items are labelled as such. Nothing here is a claim of final approval.

---

## 1. Purpose of this review

This document is prepared so that Ram Sir / Mahacharya Ji can answer seven questions from one brief:

1. What was requested?
2. What has been implemented?
3. What does the current local version look like?
4. What has been preserved?
5. What is still incomplete?
6. What information or decisions are still required?
7. What should the next development brief be?

The current local build exists to test the six-experience direction **before** production deployment. It has **not** been committed, pushed, or deployed.

---

## 2. Executive summary

The project has evolved from a single Puja website into a **six-experience digital ecosystem**.

The six intended experiences are:

1. Sponsor
2. Farmer / Integrated Farming
3. Government & Influencers
4. General Public
5. NRB / Supporters
6. Meta / Umbrella

The current local build tests this direction without replacing the existing public homepage. **`/` remains the preserved holding / public surface.** Audience-specific experiences have been added as separate routes. `/start/` is an **interim review router**. It is **not** approved as a permanent replacement for the current homepage.

No final approval is claimed.

---

## 3. Original strategic problem

Mahacharya’s review identified that the previous site attempted to speak simultaneously to sponsors, donors, NRBs, farmers, government stakeholders, influencers, general public, and Puja visitors.

That produced:

- messaging dilution
- excessive navigation (previously a 19-link mix of pages and in-page jumps)
- unclear conversion paths
- mixed audience motivations on one scroll
- an unclear relationship between the Puja and Integrated Farming

The new strategic direction, as recorded in the six-experience specification, is:

**ONE ECOSYSTEM + AUDIENCE-SPECIFIC EXPERIENCES**

Same identity, credentials, and visual DNA. Different hero, story order, and primary ask for each audience. This is additive development, not a destructive rebuild.

---

## 4. Six-experience architecture

| Experience | Audience | Primary question | Primary CTA (current local copy) | Current route | Current status |
|---|---|---|---|---|---|
| Sponsor | Corporate / organisational sponsors | Why should my organisation enter? | Express Sponsor Interest | `/sponsors/` | Local review — implemented |
| Farmer / Integrated Farming | Farmers and IFS readers | What is the IFS opportunity and how do I join? | Express farmer interest | `/farmers/` | Local review — implemented |
| Government & Influencers | Institutions, officers, influencers | What is being executed, and what is my role? | Request a briefing | `/stakeholders/` | Local review — implemented |
| General Public | Festival visitors | What is this Puja and why engage? | Explore the Puja | `/public/` | Local review — implemented |
| NRB / Supporters | Non-Resident Bengalis and supporters | How do I take part from wherever I am? | Express interest | `/nrb/` | Local review — implemented |
| Meta / Umbrella | First-time visitors who need a door | What is the ecosystem, and where do I belong? | Choose a path | `/start/` | **Interim review route** — not a confirmed homepage replacement |
| Holding public surface | Existing public homepage | What is Bharatiya Krishak Samaj Pujo? | Participate | `/` | **Preserved.** Remains the public holding URL |

`/start/` must not be described as the new homepage unless Sir explicitly approves that change.

---

## 5. What was implemented

### Brand / naming

- Event name in chrome: **Bharatiya Krishak Samaj Pujo**
- Organisation: **Bharatiya Krishak Samaj**
- Organiser line: **Organised by KarmYog for the 21st Century**
- BKS is represented as **organising partner**, not title sponsor
- Title sponsorship is **not assigned to BKS**
- Current public treatment of the vacant title slot: **“Title sponsorship opportunity — Pending confirmation”** (not shown as an open commercial campaign unless Sir confirms that wording)

### Header / design

- Unified dark-green header across holding homepage and audience routes
- BKS seal treated as partner credential, clipped to a circle so the PNG’s white square corners do not show
- KarmYog circular mark retained beside the organiser line
- Mobile logo + text pairing (grid; each brand stays in a row)
- Accessible language control (English / Bangla / Hindi), dark text on cream options

### Navigation

- Primary desktop navigation reduced from 19 undifferentiated links to five stable items: Home · The Puja · Integrated Farming · Participate · Bharatiya Krishak Samaj
- Audience-specific secondary strip: Supporters / NRB · Sponsors · Government & Institutions · Farmers · How would you like to participate?
- Mobile drawer groups PAGE vs ON THIS PAGE, and includes the five audience routes
- `/start/` is the ecosystem router

### Content

- Hero messaging clarified: farmer-centred Pujo; organised by KarmYog; BKS as organising partner; venue to be announced; nothing on the page takes money
- Cryptic “One story in order” fragments rewritten in English as a readable sequence: Puja → farmer → recognition → Integrated Farming → live farm → seed / about 5,000
- 5,000 and ₹1 lakh treated as **target / proposed**, not achieved
- ₹50 crore labelled as **arithmetic of the target**, not funds already raised

### Audience experiences (current local copy)

- **Sponsor:** conversation around the Pujo, not a four-day booking; Season 1 language is on the page and **requires confirmation**; Palm Tech / 3C are **not** used as public marketing claims on the current page
- **Farmer / IFS:** livelihood you can walk; live demonstration being built; interest note is not enrolment
- **Government & Influencers:** briefing tone; 294 assembly seats described as scale of the stakeholder universe, **not** endorsements; no government partnership claimed
- **NRB:** belonging from wherever you are; 5,000 is a mobilisation target; no payment
- **Public:** Puja / cultural focus; venue, committee and ritual clocks remain to be announced
- **Umbrella (`/start/`):** six doors (Farmer, Supporter/NRI, Sponsor, Volunteer, Institution, The Puja) plus a Home button. It reads as a router, not another long homepage

### Forms / CTA

Current forms **download a local JSON file**. They do **not** submit to a backend. There is **no POST**. Privacy copy states that sending the file to BKS is outside this website. Primary buttons were corrected so they do not imply payment, enrolment, allocation, or a live database.

### Claim governance (this pass)

- Unsupported reach claims removed or softened (including “millions of visitors” / “hundreds of thousands of creators”)
- IFS model figures labelled **illustrative**
- Government endorsement **not claimed**
- Payment **not implied**
- Title sponsorship marked **pending confirmation**
- Bangla / Hindi of new experience copy is **pending native review**; unsafe older native strings were not silently rewritten as new marketing copy

---

## 6. What was preserved

This was **additive development**, not a destructive rebuild. Intentionally preserved:

- existing homepage (`/`) as the holding public surface
- existing hash routes (The Puja, Integrated Farming, Participate, Bharatiya Krishak Samaj, Mission, Programme, Stories, Contact, utilities)
- approved photographs already on file (including 2025 Mahotsav record and 19 August 2026 preparation stills)
- Puja content
- Integrated Farming material
- existing forms (behaviour now honest download; forms themselves were not discarded)
- language infrastructure (EN / BN / HI)
- existing programme / award material
- 20 August Mahacharya corrections (naming, header pairing, story sequence, language-control contrast)
- responsive behaviour
- accessibility work (skip link, focus, tap targets, `lang`)

---

## 7. Visual evidence — local review build

See the contact sheet: `BKS-DURGA-PUJA-2026-STAKEHOLDER-SCREENSHOT-CONTACT-SHEET.png`

Screenshots below describe the **current local implementation** captured on 21 August 2026 after the controlled honesty pass. Earlier six-experience frames in `_qa/eco-review/` show a previous per-page header (including a title-sponsor “Open” box and, on the sponsor hero, Palm Tech / 3C wording). Those earlier frames are in Appendix B and are **not** the current public chrome.

### Sponsor — `/sponsors/`

The current desktop hero uses a 2025 evening-gathering photograph (captioned as people together, not a product shot of the idol). The kicker is “For corporate sponsors.” The H1 is: “A sponsorship conversation around Bharatiya Krishak Samaj Pujo — not a four-day booking.” The lede states that no audience, media-reach, or return is guaranteed, and that the ask is a conversation, not an online payment. CTAs: **Express Sponsor Interest** and **Why this is not four days**. Branding matches the holding homepage header. Title sponsorship is **not** in the header; further down the page it sits in a dashed box: **Pending confirmation**. Palm Tech / 3C are **not** in the current hero.

**Requires stakeholder review:** (a) whether “Season 1 of a three-year movement” should remain public; (b) whether the title slot should read Open rather than Pending confirmation; (c) three stacked navigation rows (site nav + audience strip + page anchors) may feel busy.

### Farmer / Integrated Farming — `/farmers/`

Farming-oriented dark teal hero, type-led rather than photographic. H1: “A farming livelihood you can walk — not a slogan on a pandal wall.” Copy states the live demonstration is being built and that joining a farm programme is not a fake registration on this page. CTAs: **Express farmer interest** and **See the live farm**. The section below opens Integrated Farming as a loop versus single-crop risk.

**Requires stakeholder review:** the farmer door is visually thinner than Sponsor / NRB / Public because it has no hero photograph. Browser title remains “Integrated Farming” rather than “Farmers.” Transformation stages below the fold are empty frames pending approved photographs.

### Government & Influencers — `/stakeholders/`

Briefing / execution tone on a cream page, also type-led. H1: “What is being built — and why it matters to the state that must feed itself.” Copy states that nothing here is a claimed government partnership or scheme. CTAs: **Request a briefing** and **See the transformation**. Institutional positioning is restrained.

**Requires stakeholder review:** like Farmers, this door has no distinct photographic identity. Whether “the state that must feed itself” is the approved institutional line is not confirmed in writing beyond the local review copy.

### NRB / Supporters — `/nrb/`

Belonging visual language: 19 August 2026 preparation photograph of community with hands raised, captioned as people, not a product shot. H1: “From wherever you are, this Pujo is a way to take part in Bengal’s farming story.” 5,000 patrons / 5,000 farms is labelled a mobilisation target, not a completed count. Nothing on the page takes money. CTAs: **Express interest** and **Learn how it works**.

**Requires stakeholder review:** `/start/` card label uses “Supporter / NRI” while this route and the audience strip say “NRB.” Terminology should be locked.

### Public — `/public/`

Puja / cultural focus using the 2025 Mahotsav idol photograph. H1: “A Durga Puja that puts the farmer in the gathering.” A pending box states venue, committee and ritual clocks from a named Panjika remain to be announced. CTAs: **Explore the Puja** and **Awards and visit**, which lead back into the existing holding-site Puja material.

### Umbrella — `/start/`

Choice architecture, not another long homepage. H1: “How would you like to participate?” Six path cards plus Home. Volunteer card honestly says no shifts are open. Institution card says no endorsement is claimed. The page is short and readable as a router.

**Requires stakeholder review:** `/start/` is an interim review route only. It should not replace `/` unless Sir approves.

### Holding homepage — `/`

Preserved first screen: Sharadiya 2026, farmer-in-the-gathering H1, When / Where, Participate / Read the story, no payment. Audience strip now sits under the existing five-item nav so visitors can enter an experience without losing the public homepage.

---

## 8. Cross-site consistency

| Layer | Observation |
|---|---|
| Branding | One event name and partner/organiser lockup across `/` and the six doors |
| Header | Unified dark-green chrome; earlier per-page cream header with title-sponsor box has been superseded |
| Typography | Display + body pairing retained; not a second brand |
| Colour | Forest, cream, gold, sindoor — shared |
| Navigation | Same five primary items; same audience strip; page-level anchors differ by experience |
| CTA language | Interest / briefing / explore — not pay / enrol / allocate |
| Partner credentials | BKS seal small; KarmYog organiser line retained |
| Mobile | Logo+text pairing holds; audience strip wraps; hamburger opens grouped drawer |
| Section hierarchy | Photograph-led doors (home, sponsors, NRB, public) versus type-led doors (farmers, stakeholders) |

**Does it feel like one Bharatiya Krishak Samaj Pujo ecosystem while keeping different audience experiences?**  
From the current screenshots: **yes at the chrome and claim-governance layer.** The doors share identity. They do **not** yet have equally strong visual worlds — Farmers and Government remain text-first. That difference is a product choice for Sir, not a defect hidden in this report.

---

## 9. Content / claim governance

| Claim / information | Current treatment | Status | Stakeholder action required |
|---|---|---|---|
| 5,000 farmers / farms | Shown as mobilisation **target**, not achieved | TARGET | Confirm public framing |
| ₹1 lakh seed-support | **Proposed** seed per farm, or ₹20,000 every two months; not collected here | PROPOSED | Confirm public framing |
| ₹50 crore | 5,000 × ₹1 lakh, labelled arithmetic of the target, not funds raised | TARGET (arithmetic) | Confirm whether the rupee total should remain visible |
| IFS 365-day model | Labelled illustrative model | ILLUSTRATIVE | Confirm whether model boards stay public |
| 3×–5× model | Labelled illustrative model | ILLUSTRATIVE | Same |
| 50–70% model | Labelled illustrative; not a guarantee | ILLUSTRATIVE | Same |
| 2025 visitors / reach | 2025 impact-report figures retained with source note; unaudited reach language removed | INTERNAL ESTIMATE / sourced | Confirm what 2025 numbers may remain |
| 2025 ₹1.8 crore estimate | Cited as internal estimate from the 2025 impact report, not audited | INTERNAL ESTIMATE | Confirm |
| Title sponsorship | “Pending confirmation”; BKS does not occupy the slot | PENDING CONFIRMATION | Confirm Open vs Pending, and public wording |
| Palm Tech / 3C | **Absent** from current public hero/copy (earlier review frames named them with a disclaimer) | NOT YET SUPPLIED for public use | Confirm whether to name, and supply approved terminology |
| Government relationships | Engagement invited; **no endorsement / scheme / partnership claimed** | NOT CLAIMED | Confirm institutional language |
| Dump-yard transformation | Described as intended story; “dump-yard-like”; photographs empty on purpose | PENDING CONFIRMATION | Confirm whether this story may be public |
| East Kolkata Wetlands reference | Live demo “being built”, 500 m from Sector V — already on file | ON FILE / being built | Confirm whether this plot is also the transformation story |
| Year 2 / Year 3 | Explicitly **not published**; Season 1 language is on the sponsor page | PENDING CONFIRMATION | Confirm three-year wording |
| Venue | To be announced | NOT YET SUPPLIED | Supply when ready |
| Programme | Existing material retained; clocks not invented | NOT YET SUPPLIED (clocks) | Supply |
| Committee | Not invented | NOT YET SUPPLIED | Supply |
| Awards | Bharatiya Krishak Samaj Awards naming aligned; nominations remain | ON FILE | Confirm any remaining award copy |

Statuses have **not** been upgraded.

---

## 10. Technical QA

Latest verified local QA (`_qa/prerelease/report.json`, 21 August 2026), after the controlled honesty pass:

| Check | Result |
|---|---|
| Routes tested | **18** (all HTTP 200) |
| Audience / header follows | **20** |
| Form surfaces on the site | **12** (4 audience + interest + 6 holding-site + locator stub) |
| Forms exercised as local JSON download | **11** (locator remains a stub) |
| POST requests | **0** |
| Console errors | **0** |
| Broken links | **0** |
| Failed image URLs | **0** (`failedAssets: 0`) |
| Horizontal overflow | **0** at 375 / 768 / 1024 / 1440 |
| Language selector | Present; works |
| Mobile navigation | Drawer opens; audience routes included |
| CTA resolution | Audience CTAs resolve to in-page forms or holding-site views as designed |
| Local form download | JSON files download; `stored: false`; website does not submit to BKS |

Note: one Playwright snapshot flagged below-fold images as not yet decoded (`imagesFailedPages: 1`). Those files return HTTP 200. This is recorded as a snapshot-timing false positive, not a missing asset.

Known technical leftovers (not production blockers for this review, but not final):

- Hash-page metadata still reuses the homepage description
- `/farmers/` document title is still “Integrated Farming”
- Image decode warning above

---

## 11. What is still not final

### A. Business / stakeholder decisions

- Title sponsorship: Open opportunity, or remain “Pending confirmation”?
- Palm Tech + 3C: public use, and approved terminology?
- “Season 1 of a three-year movement” — approved public language?
- Dump-yard / site transformation story — public or internal only?
- Before / transformation photographs — may they be used, and which files?
- Approximately 5,000 farmer/farm target framing
- ₹1 lakh proposed seed-support framing
- Existing assumed sponsor package figures (₹10 lakh title / ₹2.5 lakh category and related amounts in campaign data) — remain visible, or freeze pending commercial approval?

### B. Content approvals

- Exact venue
- Programme and ritual timing from a named Panjika
- Committee names
- Year 2 / Year 3 detail (currently unpublished, correctly)
- Farmer intake mechanism beyond the interest note
- Sambhavana rewrite (20 August: reviewer would send; **not yet supplied**)

### C. Native language review

- Native Bangla for new experience copy
- Native Hindi for new experience copy
- Holding-site BN/HI hero and story bodies still pending approved native rewrite

### D. Technical polish

- Hash-page metadata
- `/farmers/` title
- Image decode / lazy-load snapshot warning
- Whether `/start/` remains an interim route or becomes the public umbrella (product decision, then technical)

---

## 12. Decisions / brief required from Ram Sir / Mahacharya Ji

These are the product decisions that actually unblock the next implementation pass. Technical leftovers are listed above and should not occupy this list.

1. **Confirm BKS = Organising Partner.** Public chrome already uses this. Please confirm it should remain. **Already aligned in local copy — please confirm it stands.**
2. **Confirm KarmYog relationship wording:** “Organised by KarmYog for the 21st Century.” **Already aligned in local copy — please confirm it stands.**
3. **Confirm whether Title Sponsorship should be shown as an open opportunity**, or remain “Pending confirmation.”
4. **Confirm whether Palm Tech + 3C should be publicly used**, and provide approved terminology if yes. They are currently **not** on the public sponsor hero.
5. **Confirm “Season 1 of a three-year movement” wording.** It is currently on the sponsor experience.
6. **Confirm whether the dump-yard / site transformation story can be publicly presented.**
7. **Confirm use of before / transformation photographs** (none are published now; frames are empty on purpose).
8. **Confirm approximately 5,000 farmer / farm target framing.**
9. **Confirm ₹1 lakh proposed seed-support framing.**
10. **Confirm whether existing sponsor package figures** (including ₹10 lakh / ₹2.5 lakh class amounts already in campaign data) **should remain visible or remain frozen pending commercial approval.**

---

## 13. Request for a consolidated brief

Sir, the current local review build has been developed against the feedback and strategic direction shared so far. Before we proceed to final content lock, commit and deployment, we request **one consolidated brief** covering the remaining business, content and positioning decisions identified in this report.

The next implementation pass will be based strictly on that brief so that the team does not repeatedly reinterpret individual feedback or make assumptions.

---

## 14. Final status

**LOCAL REVIEW BUILD**  
**READY FOR STAKEHOLDER REVIEW**  
**NOT READY FOR PRODUCTION DEPLOYMENT**  
**NO COMMIT**  
**NO PUSH**  
**NO DEPLOY**

---

## Appendix A — Screenshot contact sheet

File: `BKS-DURGA-PUJA-2026-STAKEHOLDER-SCREENSHOT-CONTACT-SHEET.png`  
Source: current local implementation, 21 August 2026.

## Appendix B — Full screenshot evidence

Current captures: `_qa/stakeholder-review/`  
Earlier six-experience frames (superseded chrome): `_qa/eco-review/`  
20 August header pairing evidence: `_qa/feedback-2026-08-20/verify-header-*.png`

## Appendix C — Route / QA summary

See Section 10. Source: `_qa/prerelease/report.json`.

## Appendix D — Pending decisions

See Sections 11–12.
