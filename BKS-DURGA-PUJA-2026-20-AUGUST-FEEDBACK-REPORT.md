# Bharatiya Krishak Samaj Pujo — final verification report
**20 August Mahacharya feedback · verification pass 21 August 2026**

**Status:** Locally verified and corrected. **Not committed. Not deployed.**  
**Preview:** http://127.0.0.1:8780/

Treat this as evidence against the running site, not a restatement of the earlier work report.

---

## 1. Fixed in This Pass

- **Mobile header pairing.** Replaced wrapping flex with a CSS grid. Each brand is `flex-direction: row; flex-wrap: nowrap`. Logo cannot sit above its label. Text may wrap beside the logo.
- **Divider on mobile.** Previously hidden below 1100px. Now visible between the two brand pairs at 375 / 390 / 412 / 430 / 768 / 1440.
- **Header height.** Language + menu move to a second row on small screens so the two logo+text pairs keep width. Header ~121px on mobile, not a three-tier logo stack.
- **Story steps rewritten** so a first-time reader can follow Puja → farmer → award → Integrated Farming → live farm → seed / 5,000 without insider fragments (“opens the door”, etc.).
- **Hero lede.** Removed the remaining cryptic closer. Now ends: money is not taken on this page yet.
- **Awards naming leftovers.** English/Bangla/Hindi campaign strings that still said “Krishak Samaj Awards” now say **Bharatiya Krishak Samaj Awards**.
- **SEO files** (`data/seo/seo.json`, `data/seo/meta.json`) aligned with Pujo naming (runtime already used `ui.metaTags`).
- **Language option CSS** forced dark text / cream background with `!important` so Windows native lists cannot inherit light-on-green.

---

## 2. Previously Fixed and Verified

Checked on the running app (Edge / Playwright) and in source:

- Event name **Bharatiya Krishak Samaj Pujo** in header, title, OG, footer, English campaign chrome
- Organisation name **Bharatiya Krishak Samaj**
- Header lockup: BKS seal + Pujo name | KarmYog mark + Organised by…
- KarmYog circular crop in `site/assets/karmyog/` (not redrawn)
- Hero H1: *A Durga Puja you can join — for the farmer who feeds Bengal.*
- Primary CTA **Participate**, secondary **Read the story**
- 5,000-farm card is **below** the story bridge and six-step sequence (DOM order: `#story-bridge` → `#story-arc` → `#initiative`)
- Desktop nav: Home · The Puja · Integrated Farming · Participate · Bharatiya Krishak Samaj
- Mobile drawer grouped, with **PAGE** vs **ON THIS PAGE**
- Breadcrumb on IFS: **Home / The Initiative / Integrated Farming**
- Demo no longer reuses the hero Durga photograph; IFS tease no longer reuses the Fund a Farm aarti
- 2026 prep photos used once, in `#prep`
- Forms still download JSON locally; gateway not connected
- Sambhavana body not rewritten
- No console errors on load

---

## 3. Issues Found and Corrected

| Claim from previous report | What was actually wrong | Correction |
|---|---|---|
| Mobile header pairing done | Pairs were horizontal in isolation, but the outer flex wrap hid the divider and stacked brands + tools into a tall column. At narrow widths this read as logo/text falling apart. | Grid: two pairs + divider on row 1; lang/menu on row 2. `nowrap` on each lockup. |
| Story no longer cryptic | Steps were clearer than the old fragments but still used “the door” / short labels a new visitor had to decode. | Six full sentences: join the gathering → see the farmer → Ashtami awards → why IFS → live wetland farm → seed / 5,000. |
| Naming complete | `prog2` / `press4` still said “Krishak Samaj Awards”. SEO JSON still said “present as Krishak Samaj”. | Updated. |
| Language dropdown complete | Closed control was fine; option colour could inherit light text on Windows. | Option colour/background `!important`. Opened list previously photographed with dark native names on cream. |

**Intentional leftover (not a miss):** Ram Sir’s recorded **theme** name “Krishak Samaj” (agricultural community) remains on The Puja page as a meeting record. That is not the organisation short-name and is not the event title.

---

## 4. Still Pending

- **Sambhavana content corrections** — not supplied; section left unchanged and still renders.
- **Bangla / Hindi hero and story body** — chrome (brand, organiser, CTAs, awards labels) updated. Native H1/lede/story steps remain the older draft. **Pending content approval**, not final copy.
- **Bangla/Hindi The Puja theme sentence** still uses কৃষক সমাজ / कृषक समाज as the theme name (same exception as English).
- **Commit / Vercel** — not done (as instructed).

---

## 5. Responsive QA

Playwright + Edge against http://127.0.0.1:8780/. Overflow = none at all widths. Console errors = none.

| Width | BKS logo beside BKS text | KarmYog logo beside organiser text | Divider | Overflow | Header height |
|---|---|---|---|---|---|
| 1440 desktop | Yes | Yes | Visible | No | 143px |
| 768 tablet | Yes | Yes | Visible | No | 121px |
| 430 | Yes (text wraps 2 lines) | Yes (text wraps 2 lines) | Visible | No | 121px |
| 412 | Yes | Yes | Visible | No | 121px |
| 390 | Yes | Yes | Visible | No | 121px |
| 375 | Yes | Yes | Visible | No | 121px |

Bangla header at 390px: BKS pair still side-by-side (`bn_pair=True`).

Language control and menu remain tappable. Native open list: cream panel, dark English / বাংলা / हिन्दी (photographed in the earlier pass; CSS strengthened this pass).

Screenshots: `_qa/feedback-2026-08-20/verify-header-{375,390,412,430,768,1440}.png`.

---

## 6. Mahacharya Feedback Coverage

| Item | Status |
|---|---|
| Naming | **VERIFIED** (theme-name exception documented) |
| Branding | **VERIFIED** |
| Header | **DONE** this pass + **VERIFIED** at six widths |
| KarmYog positioning | **VERIFIED** |
| Repetition | **VERIFIED** (org name not stacked in the first viewport; When/Where only) |
| Language dropdown | **VERIFIED** |
| Hero | **VERIFIED** (English). BN/HI hero body **PENDING** approval |
| Initiative context | **VERIFIED** (bridge before metrics) |
| One Story in Order | **DONE** this pass + **VERIFIED** in English |
| Farmer recognition | **VERIFIED** (step 3: unnamed farmer, Ashtami, nominations) |
| Integrated farming connection | **VERIFIED** (bridge + step 4) |
| 5,000-farm vision | **VERIFIED** (step 6 then `#initiative` card) |
| Duplicate image | **VERIFIED** |
| Navigation | **VERIFIED** (5 desktop items; grouped drawer) |
| Homepage vs standalone pages | **VERIFIED** (labels PAGE / ON THIS PAGE) |
| Breadcrumbs | **VERIFIED** |
| Mobile navigation | **VERIFIED** |
| Responsive QA | **VERIFIED** |

**Architecture (current, not moved around for show):**

Homepage sections include: story-bridge, story-arc, initiative, prep, about, sambhavana, nrb, ifs-tease, demo, model, fund, sponsor, village, faq, theme, awards, record, nominate, visit.

Standalone pages: The Puja, Integrated Farming, Participate, Bharatiya Krishak Samaj, The Mission, Programme, Stories, Contact, plus utility (Accessibility, Sustainability, Sources).

Primary actions: Participate (hero), Fund a farm, Nominate, Bulk sponsor (in-page, not top-level desktop nav).

---

Stopped here. No commit, push, or Vercel deploy.
