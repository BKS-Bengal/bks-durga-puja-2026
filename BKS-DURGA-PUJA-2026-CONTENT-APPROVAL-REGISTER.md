# BKS Durga Puja 2026 — content approval register

**Date:** 17 August 2026  
**Stage:** Phase 2.5 — content lock / human review  
**Rule:** Missing facts stay empty. Nothing in this table is closed by Phase 2.5.

Live copy is `prototype/index.html` (`data-en` / `data-bn`) plus fetched `heroes.json`, `events.json`, `stories.json`. Page JSON files are mirrors. `site.json` is an archival dump and is **not** fetched.

Related: `DURGA-PUJA-APPROVAL-REGISTER.md` (full CONF table). This file is the production-blocker view for Ram Sir.

| Item | Current state | Required input | Source | Approval status | Production blocker |
| --- | --- | --- | --- | --- | --- |
| CONF-PUJA-001 — seasonal vs permanent identity | Prototype is an isolated **seasonal** microsite. Chip: “seasonal gathering, not a second brand”. No festival lockup. | Ram Sir: keep seasonal (A) or stop for a permanent-identity brief (B). | SRC-BKS-001 (meeting direction) | **OPEN**. Option A is READY FOR APPROVAL. | **Yes** — production cannot claim a second BKS brand or a confirmed chapter festival identity. |
| Hero H1 / H2 / H3 | Three **PROPOSED** variants. Default **H1**: “This autumn, the Samaj sits with the Puja — it does not replace it.” Switcher on Home only. | Pick H1, H2, H3, or supply replacement copy. | `data/content/en\|bn/heroes.json` | **OPEN** / PROPOSED | **Yes** for a public homepage headline. |
| Venue | Hero WHERE: “West Bengal. Exact place to be announced.” No map, pin, or address. | Name a place, or confirm digital-only (no venue). | None on file | **PENDING INFORMATION** | **Yes** if visit/hours/maps are required. Digital-only can ship without a pin. |
| Committee / organiser | Contact slots EMPTY. No hosting claim. | Who hosts / co-hosts / publishes this layer. | None on file | **PENDING INFORMATION** | **Yes** for a public organiser byline. |
| Programme | Civic holidays only (WB 4188-F(P2) + Drik Kolkata). Named BKS programme = empty template. | Real event list, or keep EMPTY. | SRC-WBGOT-001 (civic layer only) | **PENDING INFORMATION** | **Yes** if a public BKS timetable is required. Civic-as-civic can remain. |
| Panjika / ritual timings | No muhurat. Civic dates labelled `pending_panjika`. | Name the Panjika; then clocks may be printed. | Civic dates RESEARCH-DERIVED; ritual clocks absent | **PENDING INFORMATION** | **Yes** for ritual clocks. Not a blocker for civic-holiday display. |
| Photography | CSS field slot. Not a pandal photo. Registry EMPTY. | Rights-cleared images of **this** gathering (or keep slots). | `data/images/registry.json` | **PENDING INFORMATION** | **Yes** for a photographic hero. Site can remain slot-based. |
| Bengali native-speaker review | Full bilingual shell. Banner + Krishak note: **DRAFT — NATIVE REVIEW REQUIRED**. | Named native editor sign-off or rewrite. | `BKS-DURGA-PUJA-2026-BENGALI-FINAL-REVIEW.md` | **PENDING INFORMATION** (CONF-PUJA-BN-001) | **Yes** for a public বাংলা site. EN-only would still need a decision. |
| 5,000 × ₹1 lakh concept | Krishak Samaj only. Labels: **PENDING APPROVAL** + **CAMPAIGN VISION**. Wording: discussion sketch; no counter, UPI, 80G, application, or guaranteed benefit. | Public sketch / change numbers / remove. | SRC-BKS-001 (sketch) | **OPEN** (CONF-CAMPAIGN-001) | **Yes** if treated as a live campaign. Current labelled sketch is not a payment feature. |
| Volunteer model | Participate card: Coming soon. Disabled. No form. | Open intake or remain closed. | None | **OPEN** | **Yes** for a live roster. |
| Donate model | “Not collecting money.” Disabled. No UPI. | Keep off this site, or later approved vehicle + security design. | None | **OPEN** (CONF-PUJA-DONATE-001) | **Yes** — payment is forbidden until this row and a security design exist. |
| Sponsor model | No grid, no logos. | Named partners or none. | None | **PENDING INFORMATION** | **Yes** if a sponsor wall is required. Absence is not a blocker. |
| Accessibility / physical-access claims | Digital pattern implemented. Physical: UNESCO 2025 SOPs cited as **reference only**. No ramp/toilet/quiet-room claim. | Venue SOP only after a place is named. | UNESCO / UN India 2025 SOP (reference) | Digital READY FOR APPROVAL. Physical **PENDING INFORMATION**. | **Yes** if production copy claims a step-free venue. Current copy does not. |
| Contact details | Committee / Place / Email / Phone = TO BE ANNOUNCED. | Verified name, phone, email, address — or keep empty. | None | **PENDING INFORMATION** | **Yes** for a public contact. Empty slots can remain. |
| Krishak Samaj prominence | Bounded page. Home CTAs: The Puja + Participate. IFS only on Krishak Samaj, labelled SOURCE FACT. | Confirm hierarchy and how strongly the theme leads. | SRC-BKS-001 | **OPEN** (CONF-PUJA-KS-001) | **Yes** if IFS is asked to lead Home / The Puja (that would be a new brief). |
| Wordmark Bharatiya vs Bharat | Site uses **Bharatiya Krishak Samaj**. | Confirm wordmark. | Brand System | **OPEN** (CONF-NAME-001) | **Yes** for a global string replace. |
| Seal on seasonal chrome | Canonical seal in header (96px). | Confirm seal-on-chrome; no festival lockup. | Brand System seal | **PROPOSED** — READY FOR APPROVAL (CONF-PUJA-LOGO-001) | **Yes** if a different mark is required. |
| Flagged wording (not changed) | Disabled control: “Coming soon — BKS Krishak Samaj.” Could be misread as a product launch. | Keep, reword, or remove. | On-page, Krishak positioning | **OPEN** — flagged, not rewritten | No, if it stays disabled and labelled positioning. |

No row above was filled with a guessed venue, committee, programme, photograph, or rupee total.
