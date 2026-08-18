# Durga Puja 2026 — product architecture

**Status:** PROPOSAL — pending Ram Sir  
**Date:** 14 August 2026  
**Decision required:** CONF-PUJA-001 (seasonal campaign vs permanent identity)  
**Until option B is approved:** treat this product as a **seasonal campaign experience**, not a second BKS.

---

## 1. The product question

Six models were evaluated. One is recommended.

| ID | Model | One-line |
| --- | --- | --- |
| A | Dedicated campaign microsite | Own URL/folder, own IA, child of BKS brand |
| B | Section inside the BKS Brand System | A page or chip on the Krishak Samaj campaign |
| C | Seasonal campaign landing page | Single long scroll |
| D | Puja event information portal | Dates, venue, programme as the product |
| E | Community participation platform | Volunteer, donate, enrol, accounts |
| F | Hybrid | Combine two or more of the above |

---

## 2. Evaluation

Scoring: 3 = fits the brief and the constraints; 2 = workable with care; 1 = fights the brief; 0 = forbidden in this phase.

| Criterion | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| Maintainability (does not overwrite BKS production) | 3 | 1 | 2 | 3 | 1 | 3 if isolated |
| Brand architecture (CONF-PUJA-001: seasonal, no second logo) | 3 | 2 | 2 | 2 | 1 | 3 if hierarchy is explicit |
| Content lifecycle (appears for a season, can archive) | 3 | 1 | 3 | 3 | 1 | 3 |
| Mobile UX | 3 | 2 | 2 | 3 | 2 | 3 |
| SEO (without inventing a domain) | 2 | 2 | 1 | 3 | 2 | 3 |
| Accessibility | 3 | 2 | 2 | 3 | 2 | 3 |
| Future OmniSocial consumption (structure only) | 3 | 2 | 1 | 3 | 3 | 3 |
| Event updates | 2 | 1 | 1 | 3 | 2 | 3 |
| Future years (2027+ as a new season, not a new brand) | 3 | 1 | 2 | 3 | 1 | 3 |
| Technical complexity this phase | 3 | 2 | 3 | 3 | 0 | 2 |
| Cultural authenticity (Puja not swallowed by IFS) | 3 | 1 | 1 | 2 | 1 | 3 |
| Does not force agriculture into every section | 3 | 1 | 1 | 2 | 1 | 3 |
| No backend / no payments / no OmniSocial wiring | 3 | 3 | 3 | 3 | 0 | 3 if E is architecture-only |

**B fails cultural authenticity:** the Brand System’s public document is an IFS knowledge campaign with a Puja *chip*. Putting the whole Puja inside it would make the festival feel like agricultural marketing — which the brief forbids.

**C is too thin:** a single landing page cannot hold programme, accessibility honesty, bilingual content, and story architecture without becoming a giant festival poster.

**D alone is premature:** venue, committee and programme are PENDING. An “information portal” with empty rooms looks like a failed event site.

**E is out of scope:** no approved backend, no donations, no enrolment. Designing journeys is allowed; building a platform is not.

**A alone can become a generic Puja website** — which Ram Sir did not ask for. The Krishak Samaj theme would then look bolted on.

---

## 3. Recommendation — one architecture

**Recommended: F, specified as A + D-lite + E-as-architecture.**

Call it:

> **BKS Durga Puja 2026 — seasonal campaign microsite**  
> A child of Bharatiya Krishak Samaj, not a sibling brand.  
> Culturally authentic Puja information first.  
> Krishak Samaj as a bounded gathering path.  
> Event data ready. Participation designed, not engineered.

### What it is

- An **isolated local (and later, if approved, isolated preview) site** in this repository.
- Brand hierarchy on every template: **BKS → Krishak Samaj → Durga Puja 2026 (season) → substance**.
- A short IA (see below): Home, The Puja, Programme, Community, Krishak Samaj, Participate, Accessibility, Contact.
- English + Bengali from one content model.
- Civic dates with PENDING ritual confirmation.
- Replaceable image slots until rights-cleared photography exists.
- Event JSON + OmniSocial-shaped fields **without any API**.

### What it is not

- Not a permanent BKS identity.
- Not a second logo or vermillion festival palette (unless Ram Sir later approves a *seasonal accent* documented as proposed).
- Not a donation or crowdfunding product.
- Not the voice agent.
- Not a modification of `bks-brand-system`, chapter Vercel sites, or OmniSocial.
- Not a claim that BKS is a UNESCO-inscribed Puja.

### Relationship to the Brand System

| Layer | Lives in | Role |
| --- | --- | --- |
| Seal, tokens, leadership terms | BKS Brand System (source of truth) | **Referenced, not forked as a new brand** |
| IFS knowledge modules | Brand System campaign | Link out; do not duplicate research |
| Seasonal Puja chip on WB campaign | Brand System | May *point to* this microsite later — **PENDING** |
| This microsite | `bks-durga-puja-2026` | Seasonal experience |

After the season, this site can archive. BKS and Krishak Samaj remain.

---

## 4. Information architecture (necessary, not maximal)

Rejected as default pages (feature bloat until there is real content): Gallery (no rights-cleared images), News, Sponsor wall, Farmers-as-every-section, Maps with a fake pin, Donation.

### Primary nav (6)

1. **Home**
2. **The Puja** — cultural context, UNESCO as *Kolkata inscription*, what this gathering is / is not
3. **Programme** — civic date table + empty event well
4. **Community** — story architecture; empty until verified people
5. **Krishak Samaj** — bounded; cultural context vs programme claim
6. **Participate** — six intents as cards, no live forms

### Utility (footer / secondary)

- Accessibility (digital + “physical features not claimed”)
- Sustainability (research + “could explore”)
- Contact (empty fields, not invented addresses)
- English / বাংলা
- Content governance key (VERIFIED / RESEARCH-DERIVED / PROPOSED / PENDING)

**Bhog** is a subsection of The Puja or Programme when a menu exists — not a top-level item with no food.

**Pandal / venue** is a block on Home and The Puja. When EMPTY, it says so.

### User should understand within seconds

WHO: Bharatiya Krishak Samaj  
WHAT: a seasonal Durga Puja gathering experience (not a second organisation)  
WHERE: West Bengal — exact place PENDING  
WHEN: autumn 2026 civic window, ritual confirmation PENDING  
WHY: community, culture, and a bounded Krishak Samaj conversation  
WHAT NEXT: read the Puja, see programme status, choose a participation path

---

## 5. Hero — three conceptual directions

None use “Experience the magic”, “Celebrate the divine”, or “Where tradition meets technology”.

Each answers WHO / WHAT / WHERE / WHEN / WHY / WHAT NEXT.

### Direction H1 — Institutional gathering (recommended default)

- **WHO:** Bharatiya Krishak Samaj, West Bengal
- **WHAT:** A seasonal Durga Puja gathering — culture first, Samaj as a path beside it
- **WHERE:** West Bengal (place to be named)
- **WHEN:** Sharadiya 2026; civic dates published as civic
- **WHY:** Neighbourhoods already gather; BKS will not invent a second religion, nor hide that it is a farmers’ samaj
- **NEXT:** Read what is verified. Do not enrol.
- **H1 (EN, proposed):** “This autumn, the Samaj sits with the Puja — it does not replace it.”
- **H1 (BN, proposed):** “এই শরতে সমাজ পূজার পাশে দাঁড়ায় — পূজাকে বদলে দেয় না।”
- **Risk:** still needs CONF-PUJA-001 so Puja does not become the identity.

### Direction H2 — Living heritage, then BKS

- **WHAT:** Kolkata’s Puja is UNESCO-inscribed living heritage; this site is BKS’s seasonal presence, not that inscription.
- **H1 (EN):** “Clay, dhak, and a neighbourhood — then, if you wish, the farm.”
- **H1 (BN):** “মাটি, ঢাক আর পাড়া — তারপর, যদি চান, চাষের কথা।”
- **Risk:** can sound like a tourism film if photography is stock.

### Direction H3 — Knowledge at gathering season (do not lead with rupees)

- **H1 (EN):** “The days of gathering are also days to understand the farm as a system.”
- **H1 (BN):** “মেলার দিনগুলোতেই খামারকে একটি ব্যবস্থা হিসেবে বোঝার সময়।”
- **Risk:** forbidden if it swallows ritual pages. Use only on the Krishak Samaj route, not as the site H1, until Ram Sir says otherwise.

**Prototype uses H1.** H2 and H3 remain documented alternatives. Brand System previously rejected a Puja-as-identity H1 (P2-C) until CONF-PUJA-001. This H1 keeps Puja seasonal and BKS parental.

---

## 6. Participation journeys (architecture only)

```
visit        → programme + venue slot (EMPTY ok)
volunteer    → intent copy + “not open” until approved
participate  → cultural / knowledge paths, not a form
support      → coming soon; no UPI; no 80G
programme    → event JSON
contact      → named committee when it exists
```

No CSRF, rate limits, or spam tools until a form is approved. Those belong in a later security note.

---

## 7. Technical architecture (local, this phase)

```
bks-durga-puja-2026/
  data/content/en|bn/     structured copy
  data/events/            machine-readable events
  data/images/            provenance slots
  data/omni-social/       contract only
  prototype/              static HTML/CSS/JS, no framework
```

- No bundler required. Progressive enhancement.
- No production deploy. No Vercel overwrite.
- Tokens copied as **documented BKS digital tokens**, not a new palette.
- Canonical seal: reference path to Brand System; do not redraw; do not ship a festival lockup.

Future OmniSocial consumes JSON (`event`, `campaign`, `image`, `caption`, `language`, `cta`, `publishDate`, `source`, `verification`). **No fetch, no keys, no jobs.**

---

## 8. Why this is the safest professional choice

It honours Ram Sir’s Krishak Samaj theme **without** turning Durga Puja into an IFS advert.  
It honours CONF-PUJA-001 by remaining seasonal.  
It honours “never invent” by allowing empty venue and empty stories.  
It keeps production systems untouched.  
It is ready for Phase 1 implementation once dates, venue, and photography decisions are made — and ready to stay quiet if Ram Sir drops the public Puja layer.
