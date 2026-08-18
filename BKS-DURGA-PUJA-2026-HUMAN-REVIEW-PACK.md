# BKS Durga Puja 2026 — human review pack

**For:** Ram Sir  
**Date:** 17 August 2026  
**Class:** Isolated review prototype. Not LIVE. Not official. Not production.

**Preview:** https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/  
**Bengali:** https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/?lang=bn

---

## A. What changed in Phase 2

Editorial pass on the **existing static site**. Not a new framework.

- The Puja and Krishak Samaj now label **SOURCE FACT**, **BKS POSITIONING**, **PENDING INFORMATION**.
- West Bengal integrated-farming research is on **Krishak Samaj only**, as public knowledge, not a BKS result.
- Home secondary button remains **Participate**, not Krishak Samaj.
- 5,000 × ₹1 lakh remains a labelled sketch. No payment.
- Bengali additions remain **DRAFT**.
- Phase 2.5 only synced JSON mirrors to live HTML, added a Bengali skip-link, and prepared this review pack. Copy was not rewritten for style.

---

## B. Current IA

**Primary:** Home · The Puja · Programme · Community · Krishak Samaj · Participate  
**Utility:** Accessibility · Sustainability · Contact · EN / বাং

Hierarchy on every footer: **BKS → seasonal Durga Puja → community / culture → Krishak Samaj → integrated farming**.

---

## C. Krishak Samaj / IFS treatment

The site is a **BKS Durga Puja** experience. Krishak Samaj is the thematic path beside it.

- Home and The Puja do **not** lead with IFS.
- Krishak Samaj page: cultural tiles, then **A. source fact**, **B. BKS positioning**, **C. pending**.
- Gayeshpur / Nadia / CIFRI examples are **not** shown as BKS farms.

---

## D. What remains pending

Venue · committee · named BKS programme · Panjika clocks · photography · native Bengali sign-off · hero choice · volunteer intake · donate · sponsors · physical access · contact details · CONF-PUJA-001 (seasonal vs permanent).

---

## E. Required assets (only if production is more than slots)

Rights-cleared **hero** and **this-gathering** photographs; venue photos after a place is named; committee identity if people are named; **no** stock goddess / AI pandal. Seal is already available. IFS can stay text. Full split: `BKS-DURGA-PUJA-ASSET-REGISTER.md`.

---

## F. Required approvals

See `BKS-DURGA-PUJA-2026-CONTENT-APPROVAL-REGISTER.md`. Nothing is guessed.

---

## G. Bengali

**DRAFT — NATIVE REVIEW REQUIRED.** List: `BKS-DURGA-PUJA-2026-BENGALI-FINAL-REVIEW.md`.

---

## H. Financial / campaign language

| Must remain | Must not become |
| --- | --- |
| PENDING APPROVAL / CAMPAIGN VISION | Donation CTA, UPI, ₹5 crore counter, form, guaranteed farmer benefit, government scheme, active campaign |

Live occurrences: Krishak Samaj pending block only (plus Participate “Not collecting money”). Flagged, not changed: disabled “Coming soon — BKS Krishak Samaj”.

---

## I. QA (Phase 2.5 re-run, 17 Aug 2026)

Local static server `http://127.0.0.1:8765/prototype/`. Edge. No Next.js.

| Check | Result |
| --- | --- |
| Content / IA / no-payment | `phase25-content-ok` |
| html-validate 9.7.1 | **0** messages |
| axe-core 4.10.3 | **0** violations (Home, Puja, Krishak, Participate; EN + BN) |
| Overflow 375–1440 EN+BN | **0 px** |
| Lighthouse desktop | Performance **92** · Accessibility **100** · Best practices **100** · SEO **66** |
| Lighthouse mobile | Performance **88** · Accessibility **100** · Best practices **100** · SEO **66** |

SEO 66 is intentional `noindex`. Lab performance moved slightly vs Phase 2 (96/90) because of fonts and localhost; content was not stripped to chase 100.

Artefacts: `_qa/phase25/`.

---

## J. Preview URL

https://omnidel-ai.github.io/bks-durga-puja-2026-preview/prototype/

Do **not** use `bks-durga-puja-2026-preview.vercel.app` or `bkswbengal.org`.

---

## K. Exact decisions required from Ram Sir

1. **CONF-PUJA-001** — Keep this as a seasonal gathering (not a second brand)?  
2. **Hero** — H1, H2, H3, or new lines?  
3. **Venue** — Name a place, or digital-only?  
4. **Committee** — Who is named, if anyone?  
5. **Programme** — Any real BKS events, or keep EMPTY?  
6. **Panjika** — Which almanac for ritual clocks?  
7. **Photographs** — Supply rights-cleared images, or keep slots?  
8. **Bengali** — Who signs native copy?  
9. **5,000 × ₹1 lakh** — Public sketch, change, or remove? (Not a payment system.)  
10. **Volunteer / donate / sponsors** — Open, later, or never on this site?  
11. **Krishak / IFS** — Confirm it stays a bounded theme, not the homepage story.

**Next stage after this pack:** human review → content approval → asset lock → final QA → production deployment.  
**This stage does not deploy.**
