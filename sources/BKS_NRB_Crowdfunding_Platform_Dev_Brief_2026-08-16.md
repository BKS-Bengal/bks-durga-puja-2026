# Dev Brief — BKS NRB Crowdfunding Platform for 5,000 Integrated Farms

**Date:** 2026-08-16
**Source:** Voicenote — "BKS NRB crowdfunding for 5,000 integrated farms via Durga Puja demo" (2026-08-16, 06:32)
**Stack:** Vercel (Next.js) + Supabase (Postgres + Auth) + Vercel Blob (media — never Supabase Storage)
**Audience:** AI/full-stack developer building this as a deployable artifact

## Product Objective
Build a crowdfunding platform where Non-Resident Bengalis (NRBs — anyone emotionally tied to a native Bengal village, whether abroad or in Kolkata) can fund and track "integrated farms" set up by Bharatiya Krishak Samaj (BKS) across West Bengal, launching around a Durga Puja demo installation.

## Core Entities (Supabase schema starting point)

- **farms**
  - id, village_name, district, assembly_constituency, polling_booth (link to existing booth-mapping data if available), lat/lng, status (planned / funded / in_progress / operational), local_operator_name, local_operator_contact, target_amount (default ₹1,00,000), amount_raised, created_at
- **donors** (NRB donors)
  - id, name, email, phone, native_village, current_location, donor_type (individual / bulk_sponsor), created_at
- **donations**
  - id, donor_id, farm_id (nullable if unallocated/bulk), amount, installment_number, payment_status, payment_ref, created_at
  - Installment model: ₹1L total, e.g. ₹20K every 2 months — track installment schedule per donor-farm pairing
- **bulk_sponsorships**
  - id, donor_id, farm_count (5/10/etc.), total_amount, puja_component (idol / bhog / lighting / other), farms_allocated (array/join table)
- **farm_updates** (progress feed — "near-daily" updates donors can track)
  - id, farm_id, update_type (photo / video / text / milestone), media_url (Vercel Blob URL — NOT Supabase Storage), caption, posted_by, created_at
- **investment_interest** (optional post-donation business-partner path)
  - id, donor_id, farm_id, interest_level, notes, status

## Key User Flows

1. **NRB donor onboarding & donation**
   - Browse/select a farm (or get auto-matched to a village if they specify their native village) → donate/pledge ₹1L in installments → payment gateway integration (Razorpay/similar — confirm with Ram Sir which gateway) → receipt + installment reminder schedule.
2. **Bulk/Puja sponsor flow**
   - Select bulk tier (5 farms = ₹5L, 10 farms = ₹10L, etc.) → optionally tag a Puja component (idol/bhog/lighting) → allocated farms shown on their dashboard.
3. **Farm progress feed**
   - Public-facing + donor-specific view of near-daily photo/video updates per farm, so a donor anywhere in the world can track "their" farm's build-out.
4. **Local operator intake**
   - Simple form/portal for the 5,000 local individuals/teams to register a farm site, upload progress media, mark milestones.
5. **Durga Puja demo farm microsite**
   - Standalone landing page for the East Kolkata Wetlands (Sector 5) demo farm — since this is the flagship/launch showcase, treat as its own hero page linked from the main platform.

## Non-Functional Requirements
- **Media storage:** All photos/videos via **Vercel Blob** (`@vercel/blob`, public store, `addRandomSuffix: true`). Never Supabase Storage — image transform quota is off-limits per standing policy.
- **Scale assumption:** Design for 5,000 farms × 5,000+ donor records × frequent (near-daily) media uploads per farm — plan Blob storage growth and CDN delivery accordingly.
- **Auth:** Supabase Auth for donor login/dashboard; simpler PIN or magic-link for local operators given lower digital literacy assumption.
- **Payments:** Installment tracking + reminders (email/WhatsApp) — confirm gateway and whether recurring/subscription billing or manual installment logging is acceptable for v1.
- **Release management:** Follow standing versioned-deploy protocol — preview URL first, explicit "approved"/"go live" before `--prod`.
- **QA:** Automated headless-browser QA on donation flow + payment flow before declaring any milestone done (per standing QA policy — manually verify what can't be automated, e.g. actual payment gateway settlement).

## Open Questions for Ram Sir / BKS team
1. Payment gateway of choice (Razorpay, Instamojo, other) and whether international NRB donors need forex/international card support.
2. Is there an existing booth/constituency mapping dataset (from the AC115/booth-agent work) that farm locations should link into, or is this a fresh village list?
3. Should the "investment partner" pathway (FPO equity/business participation) be v1 scope or a phase-2 feature?
4. Confirm domain/subdomain for this platform — new BKS property or a subpath of an existing `bks-*` site (there are already `bks-bangla`, `bks-karnataka` repos in `E:\BKS`)?
5. Who owns farm-update content moderation before it goes live to donors publicly?

## Suggested v1 Scope (MVP for Durga Puja launch)
- Demo farm microsite (public, no auth) with photo/video progress feed.
- Donor signup + single-farm donation (manual installment tracking, one payment gateway).
- Bulk sponsor form (manual allocation by BKS team, not automated matching, for v1).
- Local operator upload portal for the one demo farm only — defer 5,000-farm operator onboarding to phase 2.

## Reference
- Related booth-mapping voice agent work: see Aug 14 voicenote "Durga Puja Krishak Samaj theme: AI voice agent for BKS integrated farming crowdfunding."
- Existing BKS repos for pattern/convention reuse: `E:\BKS\bks-bangla`, `E:\BKS\bks-karnataka` (check `REPO_MAP.md` at `E:\BKS\REPO_MAP.md` before scaffolding a new repo).
