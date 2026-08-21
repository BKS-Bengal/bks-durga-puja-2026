# Bharatiya Krishak Samaj Pujo — six-experience design specification

**Status:** PROPOSAL — pending review. **Not implemented. Not committed. Not deployed.**  
**Date:** 21 August 2026  
**Supersedes (audience list):** `BKS-DURGA-PUJA-2026-MULTI-AUDIENCE-ARCHITECTURE.md` Palms/Anchors track. Farmer / Integrated Farming is now Experience 02. Palms remain undefined and are **not** a sixth site in this brief.

This is architecture, information hierarchy, and design direction. It is **not** final marketing copy. Headline lines below are *direction*, marked where approval is required.

---

## 1. Ecosystem architecture

**One coherent ecosystem. Six focused communication experiences. One codebase.**

```text
Bharatiya Krishak Samaj Pujo  (event / platform identity)
        |
        |  organizing partner: Bharatiya Krishak Samaj
        |  organised by: KarmYog for the 21st Century   (20 Aug — keep until revised)
        |  title sponsor: Open / to be confirmed
        |
        +-- /sponsors/       Experience 01  P1  Why should my organisation enter?
        +-- /farmers/        Experience 02  P3  What is the IFS opportunity and how do I join?
        +-- /stakeholders/   Experience 03  P2  What is being executed, and what is my role?
        +-- /public/         Experience 04  P6  What is this Puja and why engage?
        +-- /nrb/            Experience 05  P4  How do I take part from wherever I am?
        +-- /                Experience 06  P5  What is the ecosystem, and where do I belong?
```

Until umbrella ships, today’s `site/index.html` remains the holding public URL. New experiences are **additive**.

Same ecosystem ≠ same website. Shared DNA: type, colour, credentials, components. Different: hero, image, CTA, nav, story order.

---

## 2. Shared credentials (every experience)

| Layer | Treatment |
|---|---|
| Event / platform | **Bharatiya Krishak Samaj Pujo** — masthead wordmark, not the BKS seal as the dominant mark |
| Organizing partner | **Bharatiya Krishak Samaj** — acknowledged, secondary. Seal may sit here, small. |
| KarmYog | **Organised by KarmYog for the 21st Century** + approved circular mark (20 August pairing preserved as a credential, not as title sponsorship) |
| Title sponsor | **Open / To be confirmed** — never occupied by BKS |
| Shared facts | Civic dates 16–20 Oct 2026; Kolkata, West Bengal; venue TBA; no payment on these pages; 5,000-farm figures only as already-on-file mobilisation goals; demo: East Kolkata Wetlands, 500 m from Sector V, being built |

**Masthead principle:** Brand credential ≠ hero message ≠ title sponsorship. Do not clone the current green bar (large seal + Pujo name) as the first thing on every site. The Pujo wordmark leads; partner strip is quieter.

---

## 3. Route architecture

Preferred: **one static deploy, path prefixes, shared CSS/JS/assets.**

| Path | Experience | Build phase |
|---|---|---|
| `/sponsors/` | Sponsor | 1 |
| `/stakeholders/` | Government & Influencers | 2 |
| `/farmers/` | Farmer / IFS | 3 |
| `/nrb/` | NRB | 4 |
| `/` | Meta / Umbrella (later). Until then: current site | 5 |
| `/public/` | General public (or evolve current leftovers) | 6 |

Not six Vercel apps. Optional later: map a subdomain onto `/sponsors/` if a CEO-facing URL is required.

Local preview continues to work with `python -m http.server` from `site/`.

---

## 4. Shared design system

**Reuse from current `site/styles` (do not invent a second brand):**

- Colour: BKS green `#163a26`, gold `#c98a1f`, sindoor `#8f2d1e`, cream `#f6f1e4`, pond `#143d4a`
- Type: display `Baloo Da 2`; body `Hind Siliguri` / `Hind` (Bengali/Hindi capable — do not switch to Inter)
- Spacing, wrap, tap 48px, reduced-motion, language selector, buttons, forms, cards, crumbs
- Accessibility: skip link, focus, contrast, `lang`

**Do not automatically share:** hero composition, hero image, H1, primary CTA, nav items, story order.

**Visual DNA (all six):** cream paper, forest green chrome used as *credential* not as a billboard, sindoor for primary action, editorial serif/display contrast, photography treated as document not stock. Avoid: AI slop imagery, glassmorphism, identical left-text/right-image heroes, card spam, 19-link nav.

**Audience-specific design differences**

| Experience | Visual emphasis | Hero composition (not identical) |
|---|---|---|
| Sponsor | Quiet, boardroom-credible, few sections, one CTA | Type-led on dark field; image is *scale of gathering*, not the idol as product shot |
| Farmer / IFS | Land, work, stages, hands | Full-bleed place / progress; type over image bottom-left |
| Government | Execution, sequence, map/scale | Documentary before→after strip; restrained type |
| Public | Culture, clay, people, festival | 2025 credited idol (already on file) as public hero |
| NRB | Belonging at a distance | People / homecoming; **not** the sponsor hero |
| Umbrella | Choice architecture, light | Minimal image; six paths as the hero |

---

## 5. CTA architecture

Final labels need content approval. Directions only:

| Experience | Primary | Secondary | Must not also push |
|---|---|---|---|
| Sponsor | Express sponsor interest | See the three-year platform / transformation | Adopt a farm, nominate, visit |
| Farmer / IFS | Participate as farmer (mechanism TBD — existing interest form is a candidate) | See the live farm / transformation | Title Sponsor packages |
| Government | Connect / request a briefing | Follow the transformation | Donor instalments, sponsor rate card |
| Public | Visit / explore the Puja | Participate (public-safe) | Corporate sales |
| NRB | Register farm adoption | Read how patronage works | Palm Tech sponsor hero |
| Umbrella | Choose your path | What is this Pujo? | Any single conversion as the only action |

Do not put every CTA on every site.

---

## 6. Transformation story (shared module, different framing)

**Not** a page titled “What is an Integrated Farming System?”

Sequence (facts to confirm before publication):

1. Before — location as it appeared (dump-yard-like; exact wording pending confirmation)  
2. Decision — site/access shifted for better access  
3. Build — what is being developed  
4. Progress — visible milestones (empty feed already exists on `#demo`)  
5. Farm — emerging integrated model  
6. Future — 5,000-farm vision where already approved  

Reuse the **module**; change the surrounding sentence:

- Sponsor: proof that this is a platform, not a four-day booking  
- Farmer: this is the model you can walk and join  
- Government: execution you can inspect  
- NRB: the farm you can follow from afar  
- Public: optional later, not the lead  

No fabricated before-photos. Slots until approved stills exist.

---

## 7. Site maps and experience specs

Headline *direction* is not locked copy. Do not publish Palm Tech / 3C / dump-yard wording until those terms are approved.

### Experience 01 — Sponsor  `/sponsors/`  Priority 1

| Field | Specification |
|---|---|
| Audience | Corporate sponsors, decision-makers, Palm Tech sector, 3C sector, strategic partners |
| Objective | Convert interest into sponsor conversations (key partner so first pieces can open) |
| Hero purpose | The sponsorship opportunity — first-time platform for Palm Tech + 3C *(terms PENDING APPROVAL)* |
| Hero image direction | **Not** the 2025 Durga idol as the product shot. Prefer: mass gathering at a pandal (approved festival photography if rights allow) or a type-first dark field with a small craft still. Slot if no approved “scale” still exists. |
| Hero headline direction | Opportunity to enter a first-time Palm Tech / 3C sponsorship platform, not a four-day booking. Exact words need approval. |
| Primary CTA | Express sponsor interest |
| Secondary CTA | How the three-year season works |
| Navigation (max ~7) | Opportunity · Why different · The season · Transformation · Organizing partner · Enquire |
| Section order | Hero → Why this is different (decision-makers ↔ masses) → Not just four days (Season 1 / three-year movement) → Audience → Transformation → The season → Why enter now → Organizing partner (BKS) → Title sponsor open → Enquiry form |
| Key content to port | Existing sponsor enquiry form; indicative packages **only if still approved**; 2025 Mahotsav as craft credibility with KarmYog credit |
| Conversion | Understand opportunity → difference → three years → reach → transformation → enquire |
| Must NOT appear | NRB ₹1 lakh form, farmer recruitment, MLA pitch, generic visit-the-pandal as lead, IFS textbook, multiple competing CTAs |
| Shared credentials | Event name + organizing partner + KarmYog + title open |
| Relation | Linked from umbrella; does not embed other journeys |

### Experience 02 — Farmer / Integrated Farming  `/farmers/`  Priority 3

| Field | Specification |
|---|---|
| Audience | Farmers and people who need to understand and join the IFS |
| Objective | Explain the model through the live place, then enable participation |
| Hero purpose | The farming opportunity — land, system, a role |
| Hero image direction | Place and work: wetland / soil / construction / pond when approved. Until then: existing demo schematic + image slots. **Not** the idol. |
| Hero headline direction | This is the integrated-farming opportunity, shown as a place being transformed — not “What is IFS?” |
| Primary CTA | Farmer participation *(do not invent mechanism; existing Participate → Farmer interest form is the candidate)* |
| Secondary CTA | See the live farm / transformation stages |
| Navigation | Opportunity · Why IFS · The farmer · The model · Live farm · Transformation · Scale · Join |
| Section order | Hero → Why IFS (plain language; existing contrast copy is a candidate) → Annadata → Model (pillars A–E already on file, used as *how the farm works*, not as the hero) → Demo (EKW, 500 m from Sector V, being built) → Transformation stages → 5,000-farm scale where approved → Participate |
| Must NOT appear | Title Sponsor packages, NRB nostalgia hero, government pitch as lead |
| Relation | Deep IFS knowledge on current `#ifs` can remain as optional depth, not this experience’s hero |

### Experience 03 — Government & Influencers  `/stakeholders/`  Priority 2

| Field | Specification |
|---|---|
| Audience | MLAs (~294 as *target universe*, not claimed partners), politicians, functionaries, institutions, influencers |
| Objective | Execution + relevance + scale + how to engage |
| Hero purpose | What is being built |
| Hero image direction | Documentary transformation / site progress. No festival glamour as the lead. |
| Hero headline direction | What is being executed, and why it matters for Bengal’s farming future — no invented schemes |
| Primary CTA | Connect / request a briefing |
| Secondary CTA | Follow the transformation |
| Navigation | What’s being built · Opportunity · Execution · Farm vision · Transformation · Scale · Role · Connect |
| Section order | As in the brief §9 |
| Must NOT appear | Sponsor rate card, donor instalments, “come for darshan” as the job of the page |
| Relation | Shares transformation module with Sponsor and Farmer; different sentence |

### Experience 04 — General Public  `/public/`  Priority 6 (later)

| Field | Specification |
|---|---|
| Audience | Janta / festival visitor |
| Objective | What the Puja is, why it is distinctive, how to visit or take part |
| Hero purpose | The Puja and its central idea |
| Hero image direction | **Use the existing credited 2025 Mahotsav idol.** This is the one experience that should feel like a Puja. |
| Hero headline direction | A Durga Puja that names the farmer — public, cultural, visitable. **Not** the NRB resurgence H1, **not** Palm Tech. |
| Primary CTA | Explore the Puja / Visit |
| Secondary CTA | Participate (public-safe: nominate, programme) |
| Navigation | The Puja · Story · Programme · Theme · Stories · Awards · Visit |
| Section order | As in the brief §10. Transformation optional, not the lead. |
| Must NOT appear | Sponsor sales with a public CTA glued on |
| Relation | Current Puja / visit / awards / record / 2025 pages are the seed. Lowest urgency. |

### Experience 05 — NRB  `/nrb/`  Priority 4

| Field | Specification |
|---|---|
| Audience | Non-Resident Bengalis (existing “beyond geography” definition is a candidate) |
| Objective | Mobilize the 5,000 NRB donor/community opportunity |
| Hero purpose | Participate in Bengal’s larger story from wherever you are |
| Hero image direction | Belonging: people, homecoming, soil you come from. **Do not reuse the sponsor hero.** Do not default to the idol. |
| Hero headline direction | How can I take part in Bengal’s larger resurgence from wherever I am? (20 Aug PDF + this brief). Sambhavana body still pending promised corrections. |
| Primary CTA | Register farm adoption (existing `#fund` form) |
| Secondary CTA | How patronage works |
| Navigation | Participate · Why NRBs · The Puja · Annadata · Transformation · 5,000 · How it works · Contribute |
| Section order | As in the brief §11 |
| Must NOT appear | Palm Tech / 3C sponsor proposition, Title Sponsor packages as the lead |
| Relation | Current English homepage H1, `#nrb`, `#fund`, `#mission` are the seed |

### Experience 06 — Meta / Umbrella  `/`  Priority 5

| Field | Specification |
|---|---|
| Audience | Anyone who needs the whole map |
| Objective | Orientation + routing. **Not** another giant homepage |
| Hero purpose | How would you like to participate? |
| Hero image direction | Minimal. Credential strip + choice. No one-audience photograph dominating. |
| Hero headline direction | What is Bharatiya Krishak Samaj Pujo? Then choose a path. |
| Primary CTA | Choose your path (five destinations + explore) |
| Secondary CTA | Short “what this is” |
| Navigation | Almost none beyond the six paths + credentials |
| Section order | One-paragraph ecosystem → path chooser (Sponsor, Farmer/IFS, Government, Public, NRB, Explore) → organizing partner / title open |
| Must NOT appear | Full current homepage transplanted |
| Relation | Ships after at least two audience tracks exist so links are real |

---

## 8. Conversion journeys (summary)

```text
Sponsor:     opportunity → difference → 3-year season → reach → transformation → enquire
Farmer:      opportunity → why IFS → farmer → model → live place → stages → join
Government:  what is built → why → how → vision → transformation → scale → connect
Public:      Puja → story → programme → awards → visit
NRB:         belong → Puja as door → farmer → farm you can follow → 5,000 → adopt
Umbrella:    what is this → pick a path
```

---

## 9. Migration plan (additive)

1. **Do not delete** current hashes, forms, 20 August naming, header pairing on the live holding site, language infrastructure.  
2. **Phase 1 Sponsor:** `site/sponsors/` sharing CSS/JS; new content pack; existing enquiry form; masthead = Pujo wordmark + partner strip + title open; transformation slots; one discreet link from current home. Do not replace today’s NRB-led homepage yet.  
3. **Phase 2 Government.**  
4. **Phase 3 Farmer/IFS** — new experience; keep `#ifs` as optional encyclopedia until replaced.  
5. **Phase 4 NRB lift** from current home sections.  
6. **Phase 5 Umbrella** at `/` when routing is real.  
7. **Phase 6 Public** from remaining Puja surface.

BN/HI: do not silently translate new experience copy.

---

## 10. First-phase Sponsor design (for review, not coded)

**Page feel:** editorial, few sections, one job. Premium and credible, not a festival poster and not a SaaS landing.

**Chrome**

- Top: event wordmark **Bharatiya Krishak Samaj Pujo** (text, not a giant seal)  
- Quiet partner row: small BKS seal · Organizing partner · Bharatiya Krishak Samaj  |  KarmYog mark · Organised by KarmYog for the 21st Century  |  Title sponsor · Open  
- Language control (existing accessible select)  
- Nav: six items listed in §7 Experience 01 — no 19 links  

**Hero**

- Composition: **type-first on a dark field** (not the default left-copy / right-idol split used on today’s public home)  
- Image: approved gathering/scale still if available; otherwise no fake photo — colour field + one small 2025 craft credit  
- Headline: sponsorship platform / Palm Tech + 3C — **placeholder until terms approved**  
- Sub: not a four-day booking; Season 1 of a three-year movement (only this claim)  
- One primary button: Express interest → form  
- One ghost: The season  

**Body**

- Short “why different” (decision-makers ↔ masses) — no invented footfall numbers  
- Season 1 / three-year — seasonal storytelling, not “a TV reality show”  
- Transformation module: six stage slots, empty until photos confirmed  
- Organizing partner block (BKS)  
- Title sponsor: available  
- Existing enquiry form (no new pricing)

**Out of the first viewport:** NRB, nominate, IFS A–E textbook, visit programme.

---

## 11. Open questions

1. Approved language for **Palm Tech** and **3C**.  
2. Dump-yard / site-shift: confirm this is the EKW demo already on file; before-photos permission.  
3. Keep KarmYog “organised by” beside BKS “organizing partner”?  
4. Freeze or carry current Title / Category / Supporting packages?  
5. Farmer primary action: existing interest download vs a later intake?  
6. Umbrella at `/` vs keep current home at `/` until Phase 5?  
7. Previous Palms/Anchors brief: retired as a site, or still a programme inside Farmer/IFS?

---

## 12. Non-negotiables (this pass)

No generic one-site-for-all. No shared heroes or primary CTAs. BKS is organizing partner, not title sponsor. Title remains open. No invented facts, prices, schemes, farmer programme details, NRB benefits, or fake transformation photos. Do not destroy the current site. Do not create six production apps. Do not commit or deploy this architecture without review.

**Stopped. Awaiting approval of this spec before Phase 1 Sponsor implementation.**
