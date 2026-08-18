# Phase 1 — responsive QA

**Date:** 14 August 2026  
**Method (15 Aug presentation pass):** Python ` _qa/phase1/qa.py --key` launches Edge headless. Full set from the earlier pass remains in `_qa/phase1/vp-*.png`. Preview server is `python -m http.server 8765`.

Chrome was not installed. Edge was used.

---

## Viewports captured

| Width | Home | Programme | Other pages |
| --- | --- | --- | --- |
| 375 | EN + বাংলা | EN + বাংলা | Puja, Community, Krishak Samaj, Participate, Contact |
| 390 | EN | EN | — |
| 414 | EN | EN | — |
| 768 | EN | EN | Puja, Community (+ বাংলা), Krishak Samaj, Participate, Contact |
| 1024 | EN | EN | — |
| 1280 | EN | EN | — |
| 1440 | EN + বাংলা | EN | Puja, Community, Krishak Samaj, Participate, Contact |

Full-page scroll was not dumped; each file is the first viewport. Footer was inspected on Contact (it sits in the first screen there).

---

## Findings

### Hero

| Width | Result |
| --- | --- |
| 375 (first capture) | **FAIL** — header chip, draft banner and H1 cropped on the right. Document width exceeded the viewport (flex `min-width: auto` on the brand row + three 48px tools). |
| 375 (after CSS) | Header identity `min-width: 0`; chip wraps; language/menu tools wrap to their own row below 480px; `overflow-wrap` / `word-break` on H1; `overflow-x: clip` on `html`/`body`. Participate at 375 then showed the full seasonal chip, EN, and Menu. Residual risk: the long H1 still needs a human glance at 375 in review. |
| 390 / 414 | Same stack as 375. Usable. |
| 768+ | H1, WHO/WHAT/WHEN/WHERE/WHY/NEXT, CTAs and image slot all inside the measure. **PASS**. |

Hero copy remains labelled **PROPOSED**. Image slot remains a green field, not a photograph.

### Navigation

- **375–414:** Menu toggle present (after wrap fix). Primary nav hidden until toggle. Hash routing and `aria-current` work when JS loads.  
- **768+:** Six primary links in one row: Home, The Puja, Programme, Community, Krishak Samaj, Participate. **PASS**.  
- Utility (Accessibility, Sustainability, Contact) in the footer. Discoverable; on mobile they are below the fold on long pages.

### Bengali

- `?lang=bn` and the বাং control share the same content model.  
- 375 and 1440 home-bn, 375 programme-bn, 768 community-bn captured.  
- Draft banner in Bengali: native-edit required.  
- Home nav is **প্রথম পাতা**, not নিবাস.  
- Line-height 1.75 when `html[lang=bn]`.  
- **Status:** DRAFT — NATIVE EDIT REQUIRED. Not a translation-approval.

### Event cards

- Civic rows render from `data/events/events.json`.  
- Each card shows **CIVIC**, **pending_panjika**, **RESEARCH-DERIVED**, date, “Time: pending panjika”, “Place: not named”.  
- Named BKS programme remains an **EMPTY** well. Placeholders do not look like confirmed invitations.  
- 375: one card fills the first screen (Mahalaya); list is a vertical stack. **PASS** for honesty; dense badges wrap.

### Community cards

- Eight wells (People, Craft, Music, Food, Volunteers, Neighbourhood, Tradition, Participation).  
- Each **EMPTY** / “Story coming soon”. No invented people.  
- 375: single column. 768+: still a stack (no false masonry). **PASS**.

### CTAs

- Home: **Read The Puja** (primary) + **Participate** (secondary). Krishak Samaj is not the home secondary. **PASS**.  
- Participate: Visit → civic calendar; Volunteer → Coming soon (disabled); Support → Not collecting money (disabled) + PENDING APPROVAL. **PASS**.  
- Gold primary is used for “Read The Puja”, not for a fake donate.

### Footer

- Hierarchy line: BKS → seasonal Durga Puja campaign → community / culture → Krishak Samaj as a bounded pathway.  
- Utility links gold on deep green.  
- “Do not deploy over production.”  
- 375 Contact: footer in the first screen, no horizontal overflow after the wrap fix.

### Accessibility (layout)

- Skip link in HTML (not in screenshots).  
- 48px targets on lang, menu, nav, buttons.  
- Sticky header does not cover the H1 after hash change (JS focuses H1).  
- Physical accessibility is **not** claimed on the Accessibility page.

### Overflow

| Width | After Phase-1 CSS |
| --- | --- |
| 375 | First capture failed. CSS then: identity flex shrink, chip wrap, tools on second row &lt;480px, wrap padding, H1 `overflow-wrap`. Recapture on Participate shows a complete chip. Home H1 remains the longest string — watch in review. |
| 390–414 | Same pattern as 375. |
| 768–1440 | **PASS**. |

### Image behaviour

- Header seal is `bks-seal-96.png` (canonical mark, not redrawn).  
- Hero slot is CSS, not an `<img>` pretending to be a pandal. Caption: rights EMPTY. **PASS**.

---

## Pass / watch

**Pass:** 768, 1024, 1280, 1440 — hero, nav, event cards, community cards, CTAs, footer.  
**Pass with notes:** 390, 414.  
**Watch:** 375 home H1 length; mobile menu must be tapped to see primary nav (correct pattern, but reviewers should open it).  
**Not claimed:** physical venue access, confirmed programme, photography.

Screenshots are evidence, not a substitute for Ram Sir’s visual approval.
