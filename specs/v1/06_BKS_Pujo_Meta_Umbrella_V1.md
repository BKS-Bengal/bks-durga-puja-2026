# Experience 06 — Meta / Umbrella V1

**Document status:** V1 EXECUTION SPECIFICATION  
**Source status:** Derived from approved project material + current stakeholder review + Ram Sir execution direction.  
**Current route:** `/start/`  
**Primary question:** How would you like to participate?  
**This page is a ROUTER.** It must not become another giant homepage.

**Public UI must not say:** “local review”, “interim router”, “V1 spec”, “Option A/B”.

Master index: `00_BKS_Pujo_V1_Execution_Index.md`

---

# 1. Document Purpose

Specify the umbrella so a first-time visitor who does not yet know which door is theirs can choose a path in one screen: Farmer, Supporter / NRB, Sponsor, Volunteer, Institution / Government / Influencer, The Puja.

Also document the **product decision** that implementation must not take: whether `/start/` remains a side door beside the holding homepage `/`, or becomes the public umbrella entry.

---

# 2. Target Stakeholder

**Who:** First-time visitors; mixed traffic; people sent a generic link; anyone who needs the map.

**Mindset:** “What is this? Which bit is for me? Don’t make me read a long homepage.”

**Already know:** Possibly only “a Puja” or “something about farms.”

**Do not know:** Six audiences; BKS vs KarmYog; that `/` already exists as a full public site.

**Likely to question:** Why two entry URLs (`/` and `/start/`).

---

# 3. Primary Stakeholder Question

**How would you like to participate?**

---

# 4. Secondary Questions

- What is Bharatiya Krishak Samaj Pujo in one paragraph?
- Which door is for me?
- Does any door take money on this website?
- How do I get back to the full public homepage?
- Who organises this?

---

# 5. V1 Objective

The visitor must:

1. Understand this is **one gathering with several doors**.
2. Choose among six clear paths, each in **one sentence**, no internal jargon.
3. Reach the matching experience (or holding `#participate` for volunteer).
4. Know nothing on these pages takes money.
5. Be able to return to `/` (the holding public site).
6. **Not** be dumped into another long scroll of every audience’s story.

---

# 6. Core Positioning

Current local:

**How would you like to participate?**

Bharatiya Krishak Samaj Pujo is one gathering with several doors. Choose the path that matches who you are. Nothing on these pages takes money.

---

# 7. Relationship to Bharatiya Krishak Samaj Pujo

The umbrella does **not** retell Puja → farmer → IFS → seed. It **points**:

```text
Who are you?
  Farmer → /farmers/
  Supporter / NRB → /nrb/
  Sponsor → /sponsors/
  Volunteer → /index.html#participate  (no shifts open)
  Institution / Government / Influencer → /stakeholders/
  The Puja → /public/
Home (full public site) → /
```

The causal story lives on `/` and `/public/` and inside each door. The router only names the doors.

---

# 8. Page Narrative

Keep short:

1. **Credentials** — shared header (event, KarmYog, BKS partner). No title-sponsor “Open” campaign in the header unless Sir locks that separately on sponsor.
2. **One paragraph — what this is.** Not six paragraphs.
3. **Choose a path** — six cards.
4. **Home** — the holding site still exists.
5. **Footer** — contact already on file.

No transformation module, no IFS textbook, no sponsor rate card, no 5,000 metric wall.

---

# 9. Hero Specification

| Element | V1 | Status |
|---|---|---|
| Eyebrow | Participate | Current |
| H1 | How would you like to participate? | Current |
| Supporting paragraph | One gathering, several doors. Nothing takes money. | Current |
| Primary CTA | Choose a path | `#paths` |
| Secondary CTA | Home | `/` or `../index.html` |
| Trust line | Nothing on these pages takes money. | |
| Image | Minimal. No one-audience photograph dominating. | Current: type-led cream — correct for a router |
| Caption | None required if no photo. If a small credential still is used, do not imply a single audience. | **C/D** if decorative paper only |

---

# 10. Section-by-Section Content Architecture

### 10.1 Paths (the page)

Each card: kicker + title + **one sentence**. No internal terminology.

| Kicker | Title (locked) | One sentence | Href |
|---|---|---|---|
| Farming | Farmer | The livelihood, the live farm, and how to express interest. | `/farmers/` |
| Diaspora | **Supporter / NRB** | Express interest in seeding a village farm from wherever you are. | `/nrb/` |
| Organisations | Sponsor | A conversation around the Pujo — not a four-day booking. | `/sponsors/` |
| Community | Volunteer | Leave a name for a future roster. No shifts are open on this page. | `/index.html#participate` |
| Institutions | Institution / Government / Influencer | What is being proposed, and how to request a briefing. No endorsement is claimed. | `/stakeholders/` |
| Visitors | The Puja | Worship, neighbourhood, farmer, visit and awards. Unconfirmed details stay unconfirmed. | `/public/` |

**Conflict to fix in V1:** current card title “Supporter / NRI” → **Supporter / NRB**.

**Season 1** on the sponsor card: if three-year language is not locked, the sponsor one-liner should not depend on “Season 1”. Use “not a four-day booking.”

### 10.2 Holding homepage relationship

See §22 Option A vs B.

---

# 11. Stakeholder Questions / FAQ

Keep the router FAQ short; deep FAQs live on each door.

| Question | Answer |
|---|---|
| What is this? | Bharatiya Krishak Samaj Pujo — a Durga Puja that puts the farmer in the gathering, with doors for different people. |
| Who organises? | KarmYog for the 21st Century. Organising partner: Bharatiya Krishak Samaj. |
| Which door should I pick? | Farmer / supporter / sponsor / volunteer / institution / visitor — as labelled. |
| Is this the whole website? | No. Home opens the full public site. |
| Do I pay here? | No. |
| Why is there also a Home page? | The public homepage remains at `/` unless Sir later makes this the entry. **Do not put that sentence in public copy.** Public: “Home” is enough. |
| What happens after I choose? | You go to that experience. Forms there download a file; they do not submit to a server. |

---

# 12. Objections / Trust Barriers

| Hesitation | Honest answer |
|---|---|
| “Too many links.” | Six doors + Home. No 19-link nav. |
| “I still don’t know what this Pujo is.” | Home and The Puja exist; router must not block them. |
| “Volunteer — I’ll be rostered.” | Card already says no shifts are open. Keep it. |

---

# 13. CTA + Actual Behaviour

| Control | Destination | Technical | Must NOT imply |
|---|---|---|---|
| Choose a path | `#paths` | Scroll | Form submit |
| Home | `/` | GET | This router deleted the homepage |
| Six cards | as table | GET | Payment, enrolment, endorsement |
| Volunteer | `#participate` | GET | Shifts assigned |

No form on `/start/` in V1.

---

# 14. Forms / Data

**None on this page.** Volunteer uses existing holding `interest-form` (JSON download).

---

# 15. Image Governance

No dominant audience photograph. If a faint paper texture is used it is **C**. Do not put the 2025 idol or 2026 prep photo as the only story — that would pick an audience.

---

# 16. Claims Register

| Claim | Status | Forbidden |
|---|---|---|
| One gathering, several doors | POSITIONING | Six separate organisations |
| Nothing takes money | CONFIRMED V1 behaviour | Gateway on a door |
| No shifts open (volunteer) | CONFIRMED current | Live roster |
| No endorsement (institution card) | GOVERNANCE | Government partner |
| Supporter / NRB | LOCK THIS | NRI as public title |

---

# 17. Navigation

Same global header and audience strip. On this page, “How would you like to participate?” is current. Page-local anchors: essentially `#paths` only. Next: any door. Return: Home `/`.

Do not add page-local six-item duplicate nav plus cards (redundant). Cards **are** the nav.

---

# 18. Responsive UX

Desktop: 2×3 or 3×2 cards, equal height, large hit area.  
Tablet: 2 columns.  
Mobile: 1 column; Home and Choose a path stack full width; audience strip wraps; cards not tiny thumbnails.  
No overflow 375–1440.

---

# 19. Accessibility

Cards are links (`<a>`) with `h2` titles, not clickable divs. Focus ring. One `h1`. Language control. Do not title the document “Interim router.”

---

# 20. SEO

| Field | V1 |
|---|---|
| Title | How would you like to participate? \| Bharatiya Krishak Samaj Pujo |
| Meta | Choose how to take part in Bharatiya Krishak Samaj Pujo: farmer, supporter, sponsor, volunteer, institution, or visitor. |
| Canonical | `/start/` until Option B |
| H1 | How would you like to participate? |
| OG | No “local review” |
| Structured data | WebPage; not a fake ItemList of paid offers |

If Option B is ever approved, canonical strategy for `/` vs `/start/` is a **separate SEO decision** — do not 301 `/` in V1 without Sir.

---

# 21. V1 Acceptance Criteria

- [ ] Reads as a router, not a long homepage
- [ ] Six paths + Home
- [ ] Supporter / NRB (not NRI)
- [ ] Volunteer: no shifts open
- [ ] Institution: no endorsement claimed
- [ ] No “interim” / “local review” in UI
- [ ] `/` still reachable
- [ ] No form, no payment
- [ ] Option B not implemented unless approved

---

# 22. Stakeholder Decisions Required

### OPTION A (current; default for V1)

Keep `/` as the holding / public homepage. Keep `/start/` as the audience router. Audience strip and Participate point here. **Do not treat `/start/` as a homepage replacement.**

### OPTION B (not to be implemented without approval)

Make `/start/` (or an umbrella at `/`) the public entry. The current homepage would become a nested public/Puja surface or a retained archive. **REQUIRES STAKEHOLDER DECISION.** SEO, redirects, and nav labels would change. **Do NOT implement Option B without approval.**

Also: sponsor card wording if Season 1 is not locked.

---

# 23. Explicitly Out of Scope

- Turning this into a second full homepage
- Option B redirects
- Public “interim router” language
- NRI label
- Payment or forms on this page
- Retelling every experience’s story
- Inventing a seventh audience

---

## V1 Ready-to-Build Checklist

- [ ] Router length: one viewport plus cards, not a novel
- [ ] NRB terminology fixed
- [ ] Home remains
- [ ] Option A unless Sir writes Option B
- [ ] Six sentences remain one sentence each

## Blocking Stakeholder Decisions

1. **Option A vs Option B** (homepage vs `/start/` as umbrella). Default: **A**.  
2. Sponsor card: whether “Season 1” appears in the one-liner.  
