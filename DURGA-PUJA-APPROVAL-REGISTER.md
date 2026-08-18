# Durga Puja 2026 — approval register

**Date:** 17 August 2026 (Phase 2 note; rows unchanged from 14 August)  
**Rule:** Do not convert PROPOSED into public fact until Ram Sir marks the row.  
**Phase 1 and Phase 2 do not close any Ram Sir decision.** CONF-PUJA-001 remains **OPEN**.

Phase 2 added labelled SOURCE FACT / BKS POSITIONING / PENDING INFORMATION on The Puja and Krishak Samaj, and West Bengal IFS source facts on Krishak Samaj only. That does **not** close CONF-PUJA-KS-001, CONF-CAMPAIGN-001, CONF-PUJA-BN-001, venue, programme, photography, or donate rows.

Status vocabulary used below:

- **OPEN** — Ram Sir must decide; implementation is a working hypothesis only  
- **PROPOSED** — shown in the prototype, labelled, awaiting a yes/no  
- **PENDING INFORMATION** — cannot be designed further without a real-world fact  
- **READY FOR APPROVAL** — prototype is in a state Ram Sir can accept or reject without more invention  

Isolation: this register is for the **Durga Puja 2026 digital experience** only. Brand System conflicts stay in that repo.

| ID | Decision | Current implementation | Status | Required decision | Impact after approval |
| --- | --- | --- | --- | --- | --- |
| CONF-PUJA-001 | Seasonal campaign vs permanent BKS identity | Treated as **isolated seasonal campaign microsite**. No second logo. Chip: “seasonal gathering, not a second brand”. Footer: BKS → seasonal campaign → community/culture → Krishak Samaj path. | **OPEN** — Ram Sir. Prototype is **READY FOR APPROVAL of option A (seasonal)**. Option B (permanent identity) is not implemented. | A: keep seasonal. B: permanent identity (stop — new brief). | If dropped: archive this prototype. If B: out of scope. |
| CONF-PUJA-DATES-001 | 2026 public dates | Civic table from WB **4188-F(P2)** + Drik Kolkata, labelled CIVIC / `pending_panjika`. Ritual clocks not printed. | **PENDING INFORMATION** (named Panjika). Civic-as-civic layer is **READY FOR APPROVAL**. | Confirm civic table for UI; name the Panjika for ritual clocks. | Change `data/events` only after this row is signed. |
| CONF-PUJA-VENUE-001 | Venue | EMPTY slot. Hero WHERE: “West Bengal. Exact place not named.” No map. | **PENDING INFORMATION** | Name place, or confirm digital-only. | Unlocks maps, Event JSON-LD, visit journey. |
| CONF-PUJA-COMMITTEE-001 | Committee / physical Puja | Not claimed. Contact committee = PLACEHOLDER. | **PENDING INFORMATION** | Hosting, co-hosting, or publishing a seasonal layer only? | Changes WHO on the hero. |
| CONF-PUJA-PROGRAMME-001 | Cultural / ritual programme | Civic holidays only. Named BKS programme = EMPTY well. No fake confirmed events. | **PENDING INFORMATION** | List real events or keep EMPTY. | Programme becomes a schedule or stays honest-empty. |
| CONF-PUJA-PHOTO-001 | Photography | Replaceable slots + metadata registry. Green field, not a fake pandal photo. Canonical seal copied with provenance. | **PENDING INFORMATION** | Supply rights-cleared images or keep slots. | Hero `.has-photo`. |
| CONF-PUJA-KS-001 | Farmer / Krishak Samaj connection | Bounded page. Home CTAs are The Puja + Participate, not KS. Three hero variants **PROPOSED** (H1 default). | **OPEN**. Heroes **PROPOSED** and **READY FOR APPROVAL** (pick H1 / H2 / H3 or rewrite). | How strongly the theme leads (H1 vs H3). | May swap hero direction. |
| CONF-CAMPAIGN-001 | 5,000 farmers / ₹1 lakh | Sketch only, on Krishak Samaj page, labelled PENDING APPROVAL. No donate. | **OPEN** (also Brand System) | Public sketch, change numbers, or remove. | Support CTA. Never a payment system in this phase. |
| CONF-PUJA-DONATE-001 | Donation / crowdfunding on this site | Not built. Participate: “Not collecting money”. | **OPEN** | Keep off this site; or later approved vehicle. | Forms, 80G, UPI forbidden until this row and a security design exist. |
| CONF-PUJA-VOLUNTEER-001 | Volunteer system | Journey copy + Coming soon. No form. | **OPEN** | Open intake or remain closed. | Backend is a later phase. |
| CONF-PUJA-SPONSOR-001 | Sponsorship grid | Not present. | **PENDING INFORMATION** | Named partners or none. | Do not invent logos. |
| CONF-PUJA-CULTURAL-001 | Cultural claims (UNESCO, economy, history) | Kolkata inscription **VERIFIED** (2021). BKS is not the inscribed element. Economy figures not on the prototype UI (discrepancy remains in research). | UNESCO sentence **READY FOR APPROVAL**. Economy figures **PENDING INFORMATION** for any public use. | Which figures may appear publicly. | Copy changes. |
| CONF-NAME-001 | Bharatiya vs Bharat Krishak Samaj | This site uses **Bharatiya Krishak Samaj** to match Brand System. | **OPEN** (Brand System) | Confirm wordmark. | Global string replace. |
| CONF-SPELL-001 | Chaudhary vs Choudhary | Not printed on this seasonal site. | **OPEN** | — | Leadership page only. |
| CONF-TITLE-001 | Leadership titles | No titles invented. | **OPEN** | Who appears, with which office. | Contact / about. |
| CONF-COLOR-001 | Palette | BKS digital tokens. One documented tint: `--color-brand-secondary-tint` for the draft banner. No vermillion system. | **PROPOSED** keep split — **READY FOR APPROVAL**. | Keep, or approve a documented seasonal accent. | Tokens. |
| CONF-PUJA-LOGO-001 | Logo usage | Canonical seal in header (96px derivative). No festival lockup. | **PROPOSED** — **READY FOR APPROVAL** of seal-on-chrome. | Confirm seal on seasonal chrome. | Header. |
| CONF-PUJA-HASHTAG-001 | Hashtags | None invented. Share copies draft civic text, no public URL. | **PENDING INFORMATION** | If any. | Social cards. |
| CONF-HONORIFIC-001 | Mahacharya spelling | Not used on this site yet. | **OPEN** (Brand System) | — | Only if leadership appears. |
| CONF-PUJA-BN-001 | Native Bengali editorial | `data/content/bn/` exists. Banner: **DRAFT — NATIVE EDIT REQUIRED**. | **PENDING INFORMATION** (native editor) | Approve or rewrite bn strings. | All bn views. |
| CONF-PUJA-A11Y-001 | Physical accessibility | Digital a11y implemented. Venue access **not** claimed. | **PENDING INFORMATION** for physical. Digital pattern **READY FOR APPROVAL**. | Venue SOP when a place is named. | Accessibility page. |

Related production-blocker table for Ram Sir: `BKS-DURGA-PUJA-2026-CONTENT-APPROVAL-REGISTER.md`. Phase 2.5 does not close any row.
