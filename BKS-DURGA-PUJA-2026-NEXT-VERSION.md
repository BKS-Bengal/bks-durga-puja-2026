# BKS Durga Puja 2026 — Next Version (A–G)

**Date:** 18 August 2026  
**Repository:** `C:\Users\asits\Projects\bks-durga-puja-2026`  
**Class:** Next-version local prototype. Not production. Not a deploy.  
**Checkpoint:** `_checkpoints/durga-puja-2026-next-pre/` (do not overwrite).

Source roles are locked:

- **SOURCE A** — Phase 0/1 reports: previous-phase status boundary.
- **SOURCE B** — Krishak Samaj brief / transcript: product direction.
- **SOURCE C** — live `/puja` and the isolated prototype: implementation reference to audit, not copy.

Awards, nominations, sponsorship, and 2025 KarmYog statistics from live `/puja` stay in the audit. They are not homepage story or primary CTAs in this version.

---

## A. Existing project audit

Two live implementations exist.

### Isolated cultural microsite

Path: this repository; production copy also at `https://www.bkswbengal.org/durga-puja-2026`.

Stack: static HTML, BKS tokens, deferred JS, hash views, English/Bengali strings, JSON in `data/`.

Kept: BKS seal and tokens; venue/programme honesty; no UPI/80G; SOURCE FACT / BKS POSITIONING / PENDING labels; civic dates as civic holidays; accessibility foundations; isolation from Amul, Purulia, and Supabase.

Gaps versus SOURCE B: hero does not establish Krishak Samaj + annadata + Integrated Farming + mission in seconds; no ecosystem visualisation; no mobilisation architecture; no Hindi; voice agent marked out of scope; Participate is disabled cards rather than campaign UX.

### Live `/puja` (`https://bks-bangla.vercel.app/puja`)

Useful UX: farmer-first H1, Nabapatrika framing, provisional venue honesty, primary + secondary CTAs, download-not-store forms.

Not carried as fact: first-of-kind superlative; awards as a confirmed 2026 programme; 2025 visitor/reach figures as this Puja; KarmYog 2025 photography as 2026 BKS photography; nomination backends; booth-level organising claims.

### Keep / redesign / replace / missing

- **Keep:** brand, isolation, empty venue/programme, no fake payment, governance classes, civic calendar, seal, tokens, a11y/perf bar.
- **Redesign:** homepage narrative, nav, Krishak Samaj, Participate, hero CTAs, IFS from list to relationships.
- **Replace:** sole hero “The Samaj sits with the Puja”; IFS hidden until later; voice agent OUT OF SCOPE (now a UI/API stub only).
- **Missing:** mobilisation story, labelled ₹50 crore calculated target, Hindi, IFS diagram, locality-first agent entry, non-persisting interest forms.

---

## B. Requirements matrix

Must:

- Narrative: Puja → Krishak Samaj → Annadata → IFS → opportunity → 5,000-farmer mission → participation.
- IFS as an interconnected livelihood system, not “agriculture + farming”, and not invented BKS farms.
- Mission numbers only as target / ambition / calculated. No fake raised or enrolled counts.
- Campaign CTAs without a payment flow.
- English, Bengali, Hindi as first-class JSON. Bengali and Hindi marked DRAFT — NATIVE REVIEW REQUIRED.
- Voice-agent entry point only. No invented booth data. No Purulia production change.
- Forms: labels, errors, success, privacy, explicit non-production / download-only.
- Accessibility, 375–1440, performance treated as a regression bar.

Must not:

- Fake payment, UPI, bank, 80G, receipts, or “farmer funded”.
- Overwrite BKS production, Amul/GOBARdhan, Supabase, OmniSocial, or voice-agent infrastructure.
- Present TARGET as ACHIEVED.
- Duplicate the full BKS IFS knowledge library on every section.
- Deploy or push in this phase.

---

## C. Information architecture

Primary: Home · The Puja · Krishak Samaj · Integrated Farming · The Mission · Participate  
Utility: Programme · Stories · Contact · Accessibility · Sustainability · EN / বাং / हिं

Homepage first screen: H1 names Puja + farmer; supporting line for Krishak Samaj and IFS; primary CTA Know the Initiative; secondary CTA The Puja.

IFS knowledge on the BKS main website remains a related layer. This microsite holds a campaign-sized explainer and a Sources list. No main-site URL is invented.

Programme, venue, and stories stay empty templates.

---

## D. Technical architecture

Stay on the existing static stack in this isolated repository.

Content lives in `data/content/{en,bn,hi}/`. The prototype hydrates from JSON. IFS visualisation is CSS/SVG plus a text equivalent. Locator is a modular stub with a documented, unimplemented `POST /api/locality-lookup` contract.

Do not modify `bks-west-bengal-website`, Amul routes, or `bks-bangla` production.

---

## E. UI/UX direction

Editorial, cultural, modern, human. Canonical BKS brand. No second logo. No festival-template palette. No AI goddess. Photograph slots remain labelled until approved images exist.

Farmer-first language: “farmers we want to support”, “our goal is”, “details will be announced”.

---

## F. Content model and research rules

Governance classes: SOURCE FACT / BKS POSITIONING / PENDING / CALCULATED TARGET / DRAFT.

Mission:

- 5,000 farmers = mobilisation goal (SOURCE B).
- ~295 constituencies × ~15 people = brief arithmetic, not an ECI fact. Existing research notes 294 West Bengal assembly constituencies.
- ₹50 crore = labelled calculated target (5,000 × ₹1,00,000).

IFS SOURCE FACTS (institutional, not BKS results):

- Complementary enterprises and waste-as-resource: BCKV AICRP on IFS.
- Six West Bengal agro-climatic zones: ICAR-ATARI Kolkata.
- About 96% small/marginal farmers in West Bengal: BCKV AICRP.
- WBSRLM Integrated Farming Clusters (crop, dairy, small ruminants, poultry, duckery, fishery, bee keeping, mushroom, compost, producer groups) are government livelihoods architecture, not a BKS programme.

Gayeshpur and named research farms stay institutional examples.

---

## G. Implementation sequence

1. Checkpoint (this file’s companion folder).
2. Content JSON for three languages.
3. Prototype IA rebuild.
4. Localhost test and report.
5. Stop before git push and Vercel.

Deployment target remains ambiguous (`bks-bangla` `/puja` vs `bkswbengal.org/durga-puja-2026`). Do not choose.
