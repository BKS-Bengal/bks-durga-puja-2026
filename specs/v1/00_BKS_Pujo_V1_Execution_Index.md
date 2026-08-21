# Bharatiya Krishak Samaj Pujo — V1 Execution Index

**Document status:** V1 EXECUTION SPECIFICATION  
**Source status:** Derived from approved project material + current stakeholder review + Ram Sir execution direction.  
**Date:** 21 August 2026  
**This file is not an audience experience.** It is the master index for six execution specifications.

**Implementation status of this document set:** SPECIFICATION ONLY. No coding, commit, push, or Vercel deployment in this phase.

---

## 1. Purpose

This index exists so implementation does not start from memory, screenshots, or a 45-page strategic document read in isolation.

Ram Sir’s latest instruction: convert approved strategic direction, the 21 August 2026 local website review, Mahacharya feedback, and current implementation into **six proper, execution-ready Markdown specifications**. Those six files — plus this index — are the source documents for the next V1 implementation and, only after later gates, Vercel deployment.

When the target stakeholder reads a V1 experience, they must not be left asking basic unanswered questions. Where a fact is missing, the specification must say so. It must not invent the answer.

---

## 2. Source-of-truth hierarchy

Use materials in this order. Do not silently replace a higher source with a lower one.

1. **Ram Sir’s latest execution instruction** (this specification phase; FarmTech and AgriTech terminology; six MD files; V1 then QA then Vercel).
2. **Mahacharya’s website / strategic feedback** (20 August 2026 naming, header, story sequence, language control; multi-audience dilution problem).
3. **Approved BKS project brief and six-experience direction** (`BKS-DURGA-PUJA-2026-SIX-EXPERIENCE-DESIGN-SPEC.md` and related architecture).
4. **Latest 21 August 2026 stakeholder review report** (`BKS-DURGA-PUJA-2026-STAKEHOLDER-REVIEW-REPORT.md`).
5. **Current local implementation and screenshots** (`site/`, `_qa/stakeholder-review/`).
6. **Existing approved website content** (`data/content/`, campaign, IFS, Puja, NRB, forms).

If sources conflict: identify the conflict, do not invent a resolution, mark **REQUIRES STAKEHOLDER DECISION**.

Known conflicts (not resolved here):

| Conflict | Higher / later source | Older source | V1 treatment until Sir decides |
|---|---|---|---|
| Title sponsorship wording | Current local: “Pending confirmation” | Six-experience spec: “Open / To be confirmed” | Keep **Pending confirmation**. Do not show “Open” as locked public language. |
| Sector language | Ram Sir now: **FarmTech and AgriTech** | Earlier briefs: Palm Tech / 3C | Use FarmTech and AgriTech. Do not revive Palm Tech / 3C in public copy. Definition: **[STAKEHOLDER DEFINITION REQUIRED]**. |
| NRB CTA | Current honest CTA: Express interest | Older spec: “Register farm adoption” | Use **Express interest**. Do not imply live adoption. |
| Umbrella URL | Current: `/` holding homepage; `/start/` interim router | Spec imagined umbrella later at `/` | Keep **Option A** unless Sir approves Option B. |
| NRB vs NRI | Audience strip: Supporters / NRB | `/start/` card: Supporter / NRI | Lock public label as **Supporter / NRB**. |
| 294 vs 295 constituencies | Current local: 294 seats as universe, not endorsements | Some conversation used 295 | Use **294** as currently on file, as scale only. |

---

## 3. Six-experience map

| # | Experience | Audience | Primary question | Route | Spec file |
|---|---|---|---|---|---|
| 01 | Sponsor | Corporate / organisational sponsors | Why should my organisation enter? | `/sponsors/` | `01_BKS_Pujo_Sponsor_V1.md` |
| 02 | Farmer / Integrated Farming | Farmers and serious IFS readers | What is the IFS opportunity and how do I join? | `/farmers/` | `02_BKS_Pujo_Farmer_Integrated_Farming_V1.md` |
| 03 | Government & Influencers | Institutions, officials, influencers | What is being executed, why does it matter, and what is my role? | `/stakeholders/` | `03_BKS_Pujo_Government_Influencers_V1.md` |
| 04 | General Public / Puja | Visitors, neighbours, families | What is this Puja and why does the farmer belong at its centre? | `/public/` | `04_BKS_Pujo_Public_Puja_V1.md` |
| 05 | NRB / Supporter | Non-Resident Bengalis and supporters | How can I take part from wherever I am? | `/nrb/` | `05_BKS_Pujo_NRB_Supporter_V1.md` |
| 06 | Meta / Umbrella | First-time visitors who need a door | How would you like to participate? | `/start/` (interim) | `06_BKS_Pujo_Meta_Umbrella_V1.md` |

**Holding public surface:** `/` remains the preserved homepage. It is not one of the six experience files. It must not be demolished to ship V1.

**`/start/`** is currently an interim review router. It **must not** automatically become the permanent homepage.

---

## 4. Global brand rules

Canonical public identity:

- **Bharatiya Krishak Samaj**
- **Bharatiya Krishak Samaj Pujo**

Canonical organiser positioning (every experience):

- Event: Bharatiya Krishak Samaj Pujo
- Organised by **KarmYog for the 21st Century**
- **Bharatiya Krishak Samaj** = organising partner
- Bharatiya Krishak Samaj is **not** the title sponsor

Do not:

- create another Puja brand
- shorten the public identity to “Krishak Samaj Pujo” where the full identity is required (theme-name exception on The Puja page remains documented, not a new org short-name)
- introduce a competing commercial brand
- use the internal conversational/agent name in any public surface, metadata, SEO, structured data, attribution, author fields, downloadable files, UI, footer, or source labels

---

## 5. Global claim rules

Never convert:

- TARGET → ACHIEVEMENT
- PROPOSED → CONFIRMED
- ILLUSTRATIVE → GUARANTEED
- INTENDED → COMPLETED

Never imply, unless explicitly supplied:

- money collected or distributed on this website
- farmer enrolment as a live programme
- guaranteed ₹1 lakh
- government endorsement, partnership, or scheme
- confirmed sponsorship
- guaranteed audience, media reach, or ROI
- completed farm
- confirmed venue, programme, or ritual timing

Status labels (use exactly):

CONFIRMED · TARGET · PROPOSED · ILLUSTRATIVE · MODEL-BASED · INTENDED · PENDING CONFIRMATION · TO BE ANNOUNCED · NOT YET AVAILABLE

Known current framing (do not strengthen):

| Item | Status |
|---|---|
| About 5,000 farmers / farms | TARGET |
| ₹1 lakh seed-support | PROPOSED |
| ₹50 crore | TARGET (arithmetic of 5,000 × ₹1 lakh), not money raised |
| IFS 365-day / 3×–5× / 50–70% | ILLUSTRATIVE / MODEL-BASED |
| Live demo, East Kolkata Wetlands, 500 m from Sector V | ON FILE / being built |
| Civic dates 16–20 October 2026, Kolkata | CONFIRMED as currently published civic window |
| Exact pandal address | TO BE ANNOUNCED |
| Title sponsorship | PENDING CONFIRMATION |
| FarmTech and AgriTech definition | [STAKEHOLDER DEFINITION REQUIRED] |
| Season 1 of a three-year movement | PENDING CONFIRMATION as locked public language |
| Dump-yard / transformation photographs | PENDING CONFIRMATION |

---

## 6. Global CTA rules

Every CTA must describe what actually happens.

V1 technical truth:

- Forms download a **local JSON file**
- **No POST**
- **No backend submission**
- **No live payment gateway**
- **No live farmer enrolment backend**
- **No live database allocation**

Forbidden unless a later approved workflow exists:

Donate · Pay now · Fund a farm · Adopt now · Register farmer · Receive ₹1 lakh · Book sponsorship · BKS will allocate · BKS will match · Enquiry received · Published by BKS

Preferred vocabulary:

Express interest · Learn how it works · Request a briefing · Explore the Puja · See the model · See the live farm · Read the story · Download this note · Participate · Express Sponsor Interest · Express farmer interest

---

## 7. Global form / data rules

V1 behaviour (every experience that has a form):

1. Visitor completes fields.
2. Website **downloads** a JSON file to the visitor’s device.
3. Website does **not** store the information on a server.
4. Website does **not** automatically send it to BKS.
5. If the visitor later emails or otherwise sends the file, that handling is **outside this website**.
6. Confirmation copy must say the file was downloaded, not that BKS received an enquiry.

A future backend, if proposed, is **FUTURE / NOT LIVE**.

Contact already on file (holding site / ecosystem footer): `contact@bkswbengal.org` · `+91 86552 46764` · Bharatiya Krishak Samaj, West Bengal · F 127, Downtown Mall, Uniworld City, New Town, Kolkata 700 156.

---

## 8. Global image rules

Classification:

| Class | Meaning |
|---|---|
| **A** | Verified current 2026 (this gathering / this preparation) |
| **B** | Historical / reference (including 2025 Mahotsav) |
| **C** | Illustrative (diagram, model, not a photographed outcome) |
| **D** | Placeholder / pending |

Never use B, C, or D as if they were current verified outcomes.

On file now:

- 2025 Puja / Mahotsav photographs = **B**
- 19 August 2026 preparation photograph = **A** (community / preparation, not a completed farm)
- Transformation before-frames = **D** until approved stills exist
- IFS loop diagram = **C**

Caption every photograph with date, place, organiser credit where known, and what the image must **not** imply.

---

## 9. Global navigation

**Primary (every experience):**

Home · The Puja · Integrated Farming · Participate · Bharatiya Krishak Samaj

**Audience strip (every experience):**

Supporters / NRB · Sponsors · Government & Institutions · Farmers · How would you like to participate?

**Holding homepage:** `/`  
**Participate router:** `/start/` until Option B is approved.

Do not restore a 19-link undifferentiated nav.

---

## 10. Common design system

**Design read:** institutional cultural-agricultural programme pages for named stakeholders; editorial, warm, credible; existing BKS forest/cream system; not a SaaS landing and not a festival poster.

Reuse from `site/styles` — do not invent a second brand:

| Token | Value |
|---|---|
| Forest | `#163a26` |
| Gold | `#c98a1f` |
| Sindoor | `#8f2d1e` |
| Cream | `#f6f1e4` |
| Pond | `#143d4a` |
| Display | Baloo Da 2 |
| Body | Hind Siliguri / Hind |

Shared: header as credential (not billboard), sindoor primary action, photography as document, 48px tap targets, reduced-motion, language `<select>`, skip link, focus, `lang`.

Do not introduce: excessive gradients, glassmorphism, random 3D, excessive animation, generic AI landing patterns, Inter as a replacement face.

Same DNA. Different hero, story order, and primary ask.

---

## 11. FarmTech and AgriTech (global)

Ram Sir’s correction: do **not** use Palm Tech / 3C in the new execution documents.

Use **FarmTech and AgriTech** where the concept is relevant.

Do **not** invent a sector definition. On-file support is limited to the existing IFS technology pillar (careful tools / monitoring on a model farm: sensors, drip, solar aeration, digital diagnostics as **illustrative model**). Anything beyond that is:

**[STAKEHOLDER DEFINITION REQUIRED]**

Public copy may say the platform is relevant to FarmTech and AgriTech organisations **without** claiming named companies, guaranteed buyers, or a defined product category until Sir supplies the definition.

---

## 12. Cross-experience dependency map

```text
/  (holding homepage — preserved)
|
+-- /start/     router (interim) ----+
|                                    |
+-- /public/    Puja / visitors      |
+-- /farmers/   IFS / farmers        +-- shared chrome, claims, forms
+-- /nrb/       supporters           |
+-- /sponsors/  organisations        |
+-- /stakeholders/ institutions      |
|
existing hash views on /index.html remain as depth:
#puja #ifs #participate #krishak #mission #programme #awards #visit ...
```

- Public experience may deep-link into holding-site `#puja`, `#awards`, `#visit`, `#programme`.
- Farmer experience may deep-link into `#ifs` as optional encyclopedia, not as the hero.
- NRB must not lead with sponsor packages.
- Sponsor must not lead with NRB ₹1 lakh form.
- Government must not sell commercial packages.
- Transformation module may be shared; surrounding sentence must change by audience.
- Volunteer path on the router points to existing `#participate` interest form; no volunteer roster is live.

---

## 13. Stakeholder decision register

Only genuinely blocking or lock-sensitive items. Not a 25-item dump.

| # | Decision | Current local state | Blocks V1 public lock? |
|---|---|---|---|
| 1 | BKS = organising partner | Already aligned | Confirm it stands (does not block a review V1) |
| 2 | KarmYog “Organised by…” | Already aligned | Confirm it stands |
| 3 | Title sponsorship Open vs Pending confirmation | Pending confirmation | **Yes**, if Sir wants “Open” |
| 4 | FarmTech and AgriTech definition | Term directed; definition missing | **Partial** — may mention the words; must not define |
| 5 | Season 1 / three-year wording | On sponsor page | **Yes**, as locked slogan |
| 6 | Dump-yard / transformation story public? | Intended; photos empty | **Yes**, for photographic story |
| 7 | Before / transformation photographs | None published | **Yes**, for filled frames |
| 8 | ~5,000 target framing | Shown as TARGET | Confirm framing |
| 9 | ₹1 lakh proposed seed-support | Shown as PROPOSED | Confirm framing |
| 10 | ₹10 lakh / ₹2.5 lakh class figures | Shown as ASSUMED on sponsor page | **Yes**, freeze vs show |
| 11 | Exact venue | TBA | Does not block V1 if TBA remains honest |
| 12 | Programme / ritual timings | Not invented | Does not block V1 if TBA remains honest |
| 13 | Committee | Not invented | Does not block V1 |
| 14 | Year 2 / Year 3 detail | Unpublished | Keep unpublished |
| 15 | Farmer intake mechanism | Interest note only | Do not fake enrolment |
| 16 | Sambhavana rewrite | Not yet supplied | Leave Sambhavana on holding site unchanged |
| 17 | Native Bangla | Pending | EN V1 may ship with pending-native note |
| 18 | Native Hindi | Pending | Same |
| 19 | `/start/` vs `/` as umbrella | Option A in force | **Yes**, before changing the public homepage |

---

## 14. Implementation sequence

Do **not** skip gates.

| Phase | Work | Allowed now? |
|---|---|---|
| 1 | Six MD specifications + this index | **This phase** |
| 2 | Stakeholder review of the six MDs | After Phase 1 |
| 3 | Consolidated corrections to the MDs | After Sir / Mahacharya |
| 4 | V1 implementation against locked MDs | After Phase 3 |
| 5 | Responsive QA | After Phase 4 |
| 6 | Accessibility QA | After Phase 4 |
| 7 | Content / claim QA | After Phase 4 |
| 8 | Route / CTA / form QA | After Phase 4 |
| 9 | SEO QA | After Phase 4 |
| 10 | Production readiness | After 5–9 |
| 11 | Commit | Only when instructed |
| 12 | Push | Only when instructed |
| 13 | Vercel deployment | Only when instructed |

No commit, push, or deployment during this specification phase.

---

## 15. QA gate (before production readiness)

Minimum, matching the latest verified local review standard:

- All six experience routes + holding `/` return 200
- Header and audience-strip follows work
- 0 POST
- 0 console errors
- 0 broken links
- 0 failed image URLs
- 0 horizontal overflow at 375 / 768 / 1024 / 1440
- Language selector operable
- Mobile drawer includes audience routes
- Every CTA does what its label says
- Forms download JSON; confirmation copy does not claim BKS received the file
- No Palm Tech / 3C in public copy
- No agent-internal name in public copy
- Claim labels intact (TARGET / PROPOSED / ILLUSTRATIVE / TBA)

---

## 16. Vercel readiness gate

Do not deploy until:

1. Stakeholder consolidated brief received (or explicit instruction to ship V1 with labelled pending items).
2. Phases 5–9 pass.
3. `noindex` / review vs production indexing is an explicit product decision.
4. Isolation rule remains: this surface must not overwrite other BKS production properties.
5. Native language: either approved BN/HI exists, or the pending-native-review note remains honest.
6. Commit and push have been explicitly requested.

---

## 17. File list

```text
specs/v1/00_BKS_Pujo_V1_Execution_Index.md          (this file)
specs/v1/01_BKS_Pujo_Sponsor_V1.md
specs/v1/02_BKS_Pujo_Farmer_Integrated_Farming_V1.md
specs/v1/03_BKS_Pujo_Government_Influencers_V1.md
specs/v1/04_BKS_Pujo_Public_Puja_V1.md
specs/v1/05_BKS_Pujo_NRB_Supporter_V1.md
specs/v1/06_BKS_Pujo_Meta_Umbrella_V1.md
```

---

## V1 Ready-to-Build Checklist

- [ ] Six experience MDs reviewed by Ram Sir / Mahacharya Ji
- [ ] Conflicts in §2 still marked, not silently resolved
- [ ] FarmTech / AgriTech used; Palm Tech / 3C not restored
- [ ] `/` still the holding homepage unless Option B approved
- [ ] CTA and form rules unchanged
- [ ] Claim statuses not upgraded
- [ ] Native copy either approved or honestly pending
- [ ] No public use of internal agent names

## Blocking Stakeholder Decisions

1. Title sponsorship: Open vs Pending confirmation.
2. Whether Season 1 / three-year language is locked for public use.
3. Whether assumed ₹10 lakh / ₹2.5 lakh class figures stay visible or freeze.
4. Whether dump-yard / transformation photographs may be public.
5. FarmTech and AgriTech: approved definition if more than the existing IFS tools pillar is required.
6. Final decision: keep `/` + `/start/` (Option A) or make `/start/` the umbrella entry (Option B).
