# BKS Durga Puja 2026 — production integration report

**Date:** 17 August 2026  
**Class:** Production integration of the approved static seasonal microsite onto the existing BKS West Bengal website

## DURGA PUJA 2026 DEPLOYED AS A SEPARATE BKS INITIATIVE.

## AMUL + GOBARDHAN WAS NOT MERGED INTO THE DURGA PUJA EXPERIENCE.

---

## A. Previous approved phases

| Phase | What it is |
| --- | --- |
| 0 | Research / product direction |
| 1 | Static Durga Puja prototype |
| 2 | Editorial + UX + Krishak Samaj / IFS implementation |
| 2.5 | Content / asset lock preparation + human review pack |
| Review deploy | Isolated path on live BKS: https://www.bkswbengal.org/durga-puja-2026 (CLI promote from `ed5a209`) |

This turn did **not** restart, redesign, or rewrite the prototype as Next.js. Source remains the approved static files.

---

## B. Production integration architecture

BKS West Bengal is a Next.js App Router site. Durga Puja is a **static microsite** copied into `public/durga-puja-2026/` so it does **not** inherit `SiteHeader` / `SiteFooter`.

```
BKS WEST BENGAL (www.bkswbengal.org)
├── Existing BKS site (unchanged chrome)
├── /durga-puja-2026          ← isolated static seasonal initiative
│   Home · The Puja · Programme · Community · Krishak Samaj
│   Participate · Accessibility · Sustainability · Contact
└── /initiatives/amul-gobardhan   ← separate initiative (untouched files)
    /amul · /gobardhan · /assistant
```

`next.config.ts` only adds `X-Robots-Tag: noindex, nofollow, noarchive` for `/durga-puja-2026/:path*`.

Git base for this integration: `origin/main` `8d50a43` (PR #4, Amul two-initiatives), **not** `ed5a209`.

---

## C. Exact Durga Puja route

**Canonical:** https://www.bkswbengal.org/durga-puja-2026  
Bengali: https://www.bkswbengal.org/durga-puja-2026?lang=bn

No `/puja`, `/durga`, or `/initiatives/amul-gobardhan/durga-puja`. Trailing slash redirects to the no-slash path.

The path is **not** in the BKS global header. That is intentional: a nav item would have required a shell change; Amul’s existing nav item was left intact. Ram Sir can request a single link later.

---

## D. How Durga Puja is isolated from Amul/GOBARdhan

| Rule | Evidence |
| --- | --- |
| Different URL trees | `/durga-puja-2026` vs `/initiatives/amul-gobardhan/*` |
| This PR does not touch Amul files | `git diff origin/main -- app/initiatives/amul-gobardhan components/site lib/amul-gobardhan` empty |
| No Amul knowledge / assistant in Puja files | Grep of `public/durga-puja-2026`: `amul` false, `gobardhan` false |
| No Puja href on Amul or homepage | Post-deploy `puja_href=False` on those routes |
| No Amul content on Puja page | Post-deploy Puja `amul=False` |

---

## E. Existing BKS shell status

`SiteHeader`, `SiteFooter`, language toggle, homepage tiles, and sitemap were **not** edited.

Amul remains one item in the existing Learn group. Durga Puja was not added beside it (avoids treating them as one initiative and avoids a global-nav redesign).

---

## F. Files changed

Commit `275dcc3` vs `origin/main` `8d50a43`:

```
next.config.ts
public/durga-puja-2026/index.html
public/durga-puja-2026/styles/tokens.css
public/durga-puja-2026/styles/app.css
public/durga-puja-2026/scripts/app.js
public/durga-puja-2026/assets/bks-seal-96.png
public/durga-puja-2026/data/content/en/heroes.json
public/durga-puja-2026/data/content/bn/heroes.json
public/durga-puja-2026/data/events/events.json
public/durga-puja-2026/data/stories/stories.json
```

10 files, +1556 insertions. No `.env`, secrets, Amul, Purulia, or QA files.

---

## G. Commit

| Item | Value |
| --- | --- |
| Feature commit | `275dcc3e4643855a68f25d0a400e855a114fc8e9` |
| Message | `feat: integrate BKS Durga Puja 2026` |
| Branch | `feat/durga-puja-2026` |
| Merge commit on `main` | `5b049b233aa701d0fb4a47bb143f9e254c0ced77` |
| Worktree | `C:\Users\asits\Projects\_wt-bks-durga-prod` |

---

## H. PR

https://github.com/Omnidel-ai/bks-west-bengal-website/pull/5  

**MERGED** (merge commit, 2026-08-17T09:04:54Z) into `Omnidel-ai/bks-west-bengal-website` `main`.

---

## I. Deployment ID

| Role | ID |
| --- | --- |
| Verified preview | `dpl_WeHsQtERB7EtpWoYxYEp3FRmov2P` |
| **Production** | **`dpl_A5GqHPuiVq6R8Y54j8vqeBu8TYwe`** |
| Inspect | https://vercel.com/ram-badrinathans-projects/bks-west-bengal/A5GqHPuiVq6R8Y54j8vqeBu8TYwe |
| Project | `bks-west-bengal` (`prj_ZMkyMrP4MNo6Zay2Ar9aOp6tMNoF`) |
| Method | `vercel promote` of the verified preview after PR merge |
| New Vercel project / DNS change | **No** |

Previous live artifact (review CLI): `dpl_CKHU5AiHUBmxuLantoXYv2kS61wh` (based on `ed5a209`, which lacked PR #4 Amul sub-routes).

---

## J. Production URL

- Durga Puja: https://www.bkswbengal.org/durga-puja-2026
- BKS home: https://www.bkswbengal.org/
- Amul hub: https://www.bkswbengal.org/initiatives/amul-gobardhan

---

## K. Pre-deploy QA

Checkpoint: `_checkpoints/durga-puja-2026-production-pre/` (does not overwrite Phase 2 / 2.5 / review-deploy-pre).

Local prototype `http://127.0.0.1:8765/prototype/`, Edge / Playwright. Artefacts: `_qa/production/runtime-qa.json`.

| Check | Result |
| --- | --- |
| Content / IA / no-payment | `phase25-content-ok` |
| html-validate 9.7.1 (prototype + production copy) | exit 0, 0 messages |
| axe-core 4.10.3 | **0** violations (Home, Puja, Krishak, Participate; EN + BN) |
| Overflow 375–1440 EN+BN | **0 px** |
| Isolation grep of deploy copy | no amul / gobardhan / donate now / razorpay |
| Labels | PENDING APPROVAL, SOURCE FACT present |

Preview smoke (`dpl_WeHsQtERB7EtpWoYxYEp3FRmov2P`, `vercel curl`): Puja seasonal; Amul hub + `/amul` + `/gobardhan` + `/assistant` present with correct titles; homepage had no Puja href.

---

## L. Post-deploy QA

Live `www.bkswbengal.org` immediately after promote. Evidence: `_qa/production/post-deploy-smoke.json`.

| Path | HTTP | Note |
| --- | --- | --- |
| `/` `/about` `/presence` `/ai` `/apply` | 200 | No Puja href. Amul nav link still present. |
| `/durga-puja-2026` | 200 | Seasonal gathering. `X-Robots-Tag: noindex, nofollow, noarchive`. No Amul. No donate. |
| `/durga-puja-2026?lang=bn` | 200 | Same HTML; BN is client-side. |
| `/initiatives/amul-gobardhan` | 200 | Title: Amul Opportunity & GOBARdhan Initiative |
| `/initiatives/amul-gobardhan/amul` | 200 | Was **404** on the previous CLI artifact |
| `/initiatives/amul-gobardhan/gobardhan` | 200 | Was **404** on the previous CLI artifact |
| `/initiatives/amul-gobardhan/assistant` | 200 | |

**Not re-run on production after promote:** live browser console, axe, Lighthouse. Those were run on the identical static prototype. Post-promote check is HTTP + HTML smoke.

---

## M. Existing BKS regression

Homepage, About, Presence, AI, Apply: **200**, titles intact, **no** Durga Puja global-nav href.

Shell components were not modified. Next.js rebuild IDs / `?dpl=` strings differ from the production-pre snapshots (expected).

---

## N. Amul/GOBARdhan regression

**This PR did not edit Amul/GOBARdhan source.**

Live Amul **did** change versus the 14:06 IST production-pre snapshot, for a documented reason: the review CLI promote had shipped `ed5a209` + Puja and therefore **404’d** `/amul` and `/gobardhan`. Final integration is `origin/main` (`8d50a43`, PR #4) + Puja only, which restores the approved two-initiatives Amul routes.

| Route | Before this production promote | After |
| --- | --- | --- |
| `/initiatives/amul-gobardhan` | 200 (older hub title) | 200 (PR #4 hub title) |
| `/amul` | **404** | **200** |
| `/gobardhan` | **404** | **200** |
| `/assistant` | 200 | 200 |

No Durga Puja content inside those routes.

---

## O. Bengali status

**DRAFT — NATIVE REVIEW REQUIRED.**  
Not marked final. `BKS-DURGA-PUJA-2026-BENGALI-FINAL-REVIEW.md`.

---

## P. Pending content

Unchanged: CONF-PUJA-001, venue, committee, named programme, Panjika clocks, photography, volunteer/donate/sponsors, gathering contact, hero line choice.  
5,000 × ₹1 lakh remains **PENDING APPROVAL / CAMPAIGN VISION** (not a payment system).

---

## Q. Known limitations

- Puja remains `noindex` until a later content lock.
- Not linked from the BKS global header (discoverability is the dedicated URL).
- Hash-routed static IA; language switch is client-side.
- Photograph slots stay empty; seal 96px only.
- Production browser console was not re-run after promote.

---

## R. Ram Sir alignment

Hierarchy on the Puja path: **BKS → seasonal Durga Puja → community/culture → Krishak Samaj → integrated farming**. Krishak Samaj / IFS is a thematic layer inside this initiative, not a second site and not an Amul extension. No invented venue, committee, programme, Panjika, photography, UPI, or guaranteed farmer benefit.

---

## S. Production status

**COMPLETE.** Existing BKS West Bengal production project. Git `main` and live aliases match the isolated Puja path plus the approved Amul two-initiatives tree.

Stopped. No redesign, no Amul edits, no speculative copy changes. Further work only after explicit Ram Sir / human review feedback.
