# BKS Durga Puja 2026 — review deployment report

**Date:** 17 August 2026  
**Class:** REVIEW DEPLOYMENT on existing BKS West Bengal production  
**Not:** final content lock, Bengali sign-off, or a new website

## DEPLOYED FOR HUMAN REVIEW — NOT FINAL CONTENT LOCK

Ram Sir should open the dedicated path (it is **not** in the BKS global nav):

- English: https://www.bkswbengal.org/durga-puja-2026
- Bengali: https://www.bkswbengal.org/durga-puja-2026?lang=bn
- Trailing slash (`/durga-puja-2026/`) redirects to the same page.

The isolated GitHub Pages preview remains available if needed:  
https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/

---

## A. Deployment commit

| Item | Value |
| --- | --- |
| Worktree | `C:\Users\asits\Projects\_wt-bks-durga-review` |
| Branch | `review/durga-puja-2026-isolated` (CLI deploy; not pushed to GitHub) |
| Commit | `628f35006a6f92262c6762d76b15c89dd8c207c6` |
| Message | Add isolated Durga Puja 2026 review path without changing BKS chrome. |
| Base | `ed5a2098811207d1ce1e32b741008a77339783bd` (`feat: integrate BKS Amul and GOBARdhan initiative`) |
| Isolated Durga Puja repo | `C:\Users\asits\Projects\bks-durga-puja-2026` — still uncommitted working tree; not the Vercel project |

Pre-deploy checkpoint (not overwritten): `_checkpoints/durga-puja-2026-review-deploy-pre/`  
Also preserved: `_checkpoints/durga-puja-2026-phase2-pre/`, `_checkpoints/durga-puja-2026-phase2.5-pre/`

---

## B. Production deployment ID

| Item | Value |
| --- | --- |
| Vercel team | `ram-badrinathans-projects` (`team_nphGT5VX7AtzWPZUWhwtPutx`) |
| Project | `bks-west-bengal` (`prj_ZMkyMrP4MNo6Zay2Ar9aOp6tMNoF`) |
| Previous production | `dpl_DAFG62MGhPpsA8uwEQTgk69UfB4X` (gitDirty CLI deploy of `ed5a209`) |
| Verified preview | `dpl_HusHuGyCSWATQQa1zqzFVknAAXfo` |
| **Current production** | **`dpl_CKHU5AiHUBmxuLantoXYv2kS61wh`** |
| Target | production · Ready |
| Inspect | https://vercel.com/ram-badrinathans-projects/bks-west-bengal/CKHU5AiHUBmxuLantoXYv2kS61wh |
| Method | `vercel promote` of the verified preview (no DNS change, no new Vercel project) |

---

## C. Production URL

**Durga Puja review path:** https://www.bkswbengal.org/durga-puja-2026

Also aliased on: `bkswbengal.org`, `bharatiyakrishaksamajbengal.org`, `www.bharatiyakrishaksamajbengal.org`.

Existing BKS homepage remains https://www.bkswbengal.org/ (unchanged chrome; Puja is not linked from global nav).

---

## D. Files included

Relative to the BKS West Bengal worktree (diff `ed5a209..628f350`):

```
next.config.ts                                     (+ X-Robots-Tag for /durga-puja-2026/:path* only)
public/durga-puja-2026/index.html
public/durga-puja-2026/styles/tokens.css
public/durga-puja-2026/styles/app.css
public/durga-puja-2026/scripts/app.js               (fetch paths: data/… for this copy only)
public/durga-puja-2026/assets/bks-seal-96.png
public/durga-puja-2026/data/content/en/heroes.json
public/durga-puja-2026/data/content/bn/heroes.json
public/durga-puja-2026/data/events/events.json
public/durga-puja-2026/data/stories/stories.json
```

10 files, +1556 insertions. No BKS `app/` route, header, or footer files were edited. Original `next.config.ts` only had `images.remotePatterns`; the Puja `headers()` block was added, nothing else removed.

---

## E. Files intentionally excluded

- BKS homepage, `SiteHeader` / `SiteFooter`, global nav
- Amul / GOBARdhan, Purulia, Arjun, Vatika, Biophilic, OmniSocial
- Supabase, payments, UPI, donate-now
- DNS / domains / a new Vercel project
- `prototype/styles/puja.css` (unused)
- Canonical `bks-seal.png` / `bks-logo.png` (header uses 96px crop only)
- Isolated-repo research markdown, approval registers, GitHub Pages staging
- Dirty uncommitted files from other local BKS checkouts (deploy used clean `ed5a209` + the files in D)

---

## F. Pre-deploy QA

Local static prototype (`http://127.0.0.1:8765/prototype/`), Edge, recorded in `_qa/phase25/` and `BKS-DURGA-PUJA-2026-HUMAN-REVIEW-PACK.md`. Re-used immediately before this deploy; architecture was not redesigned.

| Check | Result |
| --- | --- |
| Content / IA / no-payment | `phase25-content-ok` |
| html-validate 9.7.1 | **0** messages |
| axe-core 4.10.3 | **0** violations (Home, Puja, Krishak, Participate; EN + BN) |
| Overflow 375–1440 EN+BN | **0 px** |
| Lighthouse desktop | Performance **92** · Accessibility **100** · Best practices **100** · SEO **66** |
| Lighthouse mobile | Performance **88** · Accessibility **100** · Best practices **100** · SEO **66** |

SEO 66 is intentional `noindex`. Artefacts: `_qa/phase25/runtime-qa.json`, lighthouse JSON reports.

Preview gate on `dpl_HusHuGyCSWATQQa1zqzFVknAAXfo` (SSO-protected `*.vercel.app`): homepage visible chrome matched live BKS (no Puja nav link; Amul still present); `/durga-puja-2026` returned the seasonal prototype with PENDING APPROVAL / SOURCE FACT and no Donate now / Razorpay.

---

## G. Post-deploy smoke test

**When:** 17 August 2026, immediately after promote  
**Evidence:** `_qa/review-deploy/post-deploy-smoke.json`

| URL | HTTP | Notes |
| --- | --- | --- |
| `/` | 200 | Title unchanged. No `durga-puja` href. Amul link still present. |
| `/about` | 200 | Title unchanged. No Puja href. |
| `/initiatives/amul-gobardhan` | 200 | Title unchanged. No Puja href. |
| `/presence` | 200 | Title unchanged. No Puja href. |
| `/apply` | 200 | Title unchanged. No Puja href. |
| `/durga-puja-2026` | 200 | Seasonal gathering title. Isolated chrome (not BKS `site-header-inner`). |
| `/durga-puja-2026/` | 200 after redirect to no-slash | Same body. |
| `/durga-puja-2026?lang=bn` | 200 | Same HTML; BN switch is client-side (`data-lang` / `data-bn` present). |

Puja page markup includes hash views Home, The Puja, Programme, Community, Krishak Samaj, Participate, Accessibility, Sustainability, Contact; EN/বাং buttons; mobile `nav-toggle`. Meta + header `X-Robots-Tag: noindex, nofollow, noarchive`. No Donate now / Razorpay / `upi://`. PENDING APPROVAL and SOURCE FACT present.

Assets **200:** `styles/app.css`, `styles/tokens.css`, `scripts/app.js`, `assets/bks-seal-96.png` (20523 bytes), EN/BN `heroes.json`, `events.json`, `stories.json`.

**Not re-run on production after promote:** live browser console, axe, overflow, Lighthouse. Those were run on the identical static prototype before deploy. Post-promote check was HTTP + HTML/asset smoke.

---

## H. Existing BKS regression status

**PASS — visible chrome identical to pre-deploy live snapshots.**

Compared `<header class="site-header">` … `</footer>` against `_checkpoints/durga-puja-2026-review-deploy-pre/live-snapshot/`:

| Page | Title | Visible chrome vs snapshot | Puja in page |
| --- | --- | --- | --- |
| Home | equal | equal (6373 chars) | absent |
| About | equal | equal (4873 chars) | absent |
| Amul + GOBARdhan | equal | equal (14117 chars) | absent |
| Presence | equal | equal (11866 chars) | absent |
| Apply | equal | equal (7514 chars) | absent |

Raw HTML SHA256 differs from the snapshots because Next.js rebuild IDs / `?dpl=` query strings changed. That is expected. Visible BKS chrome did not change.

Previous production was a **gitDirty** CLI deploy of `ed5a209`. This promote used **clean** `ed5a209` plus the isolated Puja files. The five routes above still match the live snapshots, so no unrelated chrome regression was observed. If a dirty-only file existed off these routes, it is **not** in this production artifact.

DNS was not changed. No new Vercel project.

---

## I. Known pending content

Still open (nothing invented for this deploy):

- CONF-PUJA-001 (seasonal vs permanent identity)
- Venue, committee, named BKS programme
- Panjika / ritual clocks
- Hero line choice (H1 / H2 / H3)
- Volunteer intake, donate, sponsors
- Contact details for this gathering
- Photography / this-gathering images

Register: `BKS-DURGA-PUJA-2026-CONTENT-APPROVAL-REGISTER.md`

---

## J. Known pending assets

Available on the live path: BKS seal 96px crop, CSS photograph slots.

Still required if Ram Sir wants a photographic production page: rights-cleared hero / gathering photographs; venue photos after a place is named; committee identity if people are named. No stock goddess / AI pandal. Full split: `BKS-DURGA-PUJA-ASSET-REGISTER.md`.

---

## K. Bengali review status

**DRAFT — NATIVE REVIEW REQUIRED.**  
Not marked final. List: `BKS-DURGA-PUJA-2026-BENGALI-FINAL-REVIEW.md`.

---

## L. 5,000 × ₹1 lakh status

**PENDING APPROVAL / CAMPAIGN VISION.**  
Not a donation CTA, UPI, Razorpay flow, ₹5 crore counter, or fundraising mechanism.

---

## M. Statement

**DEPLOYED FOR HUMAN REVIEW — NOT FINAL CONTENT LOCK**

Next workflow (do not start until Ram Sir reviews):

LIVE REVIEW → RAM SIR FEEDBACK → APPROVED CORRECTIONS → CONTENT/ASSET LOCK → FINAL QA → FINAL PRODUCTION RELEASE

No redesign, speculative copy edits, pending-label removal, or further deploys in this turn.
