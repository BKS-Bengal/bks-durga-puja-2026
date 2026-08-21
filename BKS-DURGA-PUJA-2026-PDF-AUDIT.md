# Mahacharya PDF audit — 21 August 2026

**Primary source:** `ef0a0332-c128-4955-910c-598713dfe119.pdf` (spoken review, 20 August).  
**Status after this pass:** Local corrections only. **Not committed. Not deployed.**  
**Preview:** http://127.0.0.1:8780/

This document compares the PDF’s **intent** with the local site. It does not treat earlier implementation notes as the source of truth.

---

## A. Correctly implemented according to the PDF

- **Event name in the header.** “Bharatiya Krishak Samaj Pujo”, not “Krishak Samaj Pujo”.
- **Organisation name in chrome.** Public labels use “Bharatiya Krishak Samaj”, not the shortened org title.
- **KarmYog role.** Header line is “Organised by KarmYog for the 21st Century”, with the circular KarmYog mark beside that line — the role the PDF asks for.
- **First-frame repetition.** “Bharatiya Krishak Samaj, West Bengal” is no longer stacked in the landing frame. Hero meta is When / Where only. KarmYog appears in the header of that same first screen.
- **Language dropdown contrast.** English / Bangla / Hindi options are dark text on a cream panel.
- **Initiative metrics after story.** The 5,000 / 5,000 / ₹1 lakh card sits after `#story-bridge` and `#story-arc`, not beside an unexplained hero.
- **Story sequence exists.** Six numbered steps follow Puja → farmer → recognition → Integrated Farming → live farm → seed / 5,000-farm vision.
- **Duplicate festival imagery.** Hero Durga photograph is not reused on Demo; Fund aarti is not reused on the IFS tease.
- **Navigation rationalised.** Desktop has five items (Home, The Puja, Integrated Farming, Participate, Bharatiya Krishak Samaj). Drawer groups the former 19 links and marks PAGE vs ON THIS PAGE.
- **Breadcrumbs on standalone views.** Example: Home / The Initiative / Integrated Farming.
- **Sambhavana left alone.** PDF says corrections will be sent later. Body not rewritten.

## B. Partially implemented

- **White-box logo.** CSS no longer paints a white square. The seal PNG itself still has opaque white corners on a square canvas. This pass clips the mark to a circle so the white box does not show; the pixels of the emblem are unchanged.
- **Hero as NRB participation.** PDF: the main hero message should let prospective sponsors, donors and crowdfunders see themselves — “an opportunity for non-resident Bengalis all over the world to participate in the resurgence of Bengal.” Previous H1 led with the farmer. English H1/lede now use that positioning. Bangla and Hindi hero body are still the older native drafts.
- **“One story in order” meaning.** Steps were already clearer than the cryptic fragments. This pass tightens step 3 (award ceremony for the unknown farmer) and step 6 (this Puja is the seed for about 5,000 farms) to the PDF’s own explanations. Step 4 still has to *establish* the Puja→livelihood connect; English does that; BN/HI story bodies do not.
- **Naming everywhere.** Chrome and awards strings use the full name. A few source/governance files still say “Krishak Samaj” as an internal theme tag. Visible Puja-page line was updated this pass.
- **Site-wide copy attractiveness.** PDF asks to rewrite most copy so it is easy and attractive. Only the hero, story steps, and naming that the PDF called out were changed. The rest of the long homepage was not redesigned.

## C. Still missing (not invented here)

- **Sambhavana corrections** — reviewer will send; not on file.
- **Native Bangla / Hindi hero and story rewrite** — PDF intent is English-led in this transcript; BN/HI need approved native copy, not a silent translation of the new English H1.
- **Payment / gateway** — “nothing takes money yet” remains true; not a PDF miss, still true.
- **Live Demo Farm feed** — still empty / being built.
- **A “better visual” for the six-step story** — PDF floated this; no approved visual system was supplied, so the numbered text sequence was kept.

## D. Potentially misinterpreted (flagged, not silently forced)

- **“Krishak Samaj” as Ram Sir’s theme name vs organisation name.** The PDF says: wherever the term Krishak Samaj is used, use Bharatiya Krishak Samaj. A meeting record also names the *theme* Krishak Samaj (agricultural community). This pass follows the PDF for **visible visitor copy**. It does not claim Ram Sir’s recorded theme string was never “Krishak Samaj”.
- **“Resurgence of Bengal” in the hero.** The PDF asks for that positioning. The existing Sambhavana block already uses “Bengal’s agricultural resurgence.” The English H1 now uses that phrase so NRB visitors can see themselves. It is **not** a new statistic or a claimed result.
- **Header alternative: “all of it white, green text.”** The PDF offers two treatments. We kept the green header and removed the white box around the seal, rather than inverting the whole bar to white. That matches “logo can be what it is” more closely than a full header restyle.
- **Homepage still long.** The PDF objects to 19 undifferentiated links and to mixing in-page vs other-page destinations. It does not require deleting homepage sections. Grouping + labels address the stated confusion; the long page remains.

## E. Cannot finalise — approved source content missing

- Sambhavana rewrite (explicitly forthcoming in the PDF).
- Bangla and Hindi hero H1/lede and six story-step bodies.
- Exact venue, programme clocks, sponsorship amounts (already marked provisional).
- Any new six-step illustration or photography beyond the 19 August 2026 prep stills already on file.

---

## Fixes made in this pass (PDF gaps only)

1. Clip the BKS seal to a circle so the PNG’s white square corners do not sit in the green header.
2. English hero H1/lede: NRB / patron / sponsor / donor participation in Bengal’s agricultural resurgence (PDF wording + existing Sambhavana phrase).
3. Keep a single 2026 prep photograph — the raised-hands still (`photo_2026-08-19_11-15-12.jpg`). The near-duplicate wide group is no longer shown.
4. Story step 3 and step 6 aligned to the PDF’s stated meaning (award for the unknown farmer; this Puja is the seed for ~5,000 farms).
5. Visible “theme is Krishak Samaj” line on The Puja page → Bharatiya Krishak Samaj Pujo.

**Not done:** broad redesign, Sambhavana rewrite, BN/HI invention, commit, deploy.
