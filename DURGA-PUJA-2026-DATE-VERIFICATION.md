# Durga Puja 2026 — date verification

**Status:** NOT CLEARED FOR UI  
**Date of this pass:** 14 August 2026  
**Rule:** Do not hardcode 2026 ritual dates from a single website. If sources disagree, document the discrepancy. Do not silently choose.

Ritual dates enter `data/events/` and the prototype **only** as `status: pending-verification`. They must not be presented as BKS-confirmed programme facts.

---

## 1. What must be verified

| Observance | Bengali name | Why it matters on a public site |
| --- | --- | --- |
| Mahalaya | মহালয়া | Emotional and cultural start; *chakshu-daan* in UNESCO description |
| Shashthi | ষষ্ঠী / বোধন | Public awakening (Bodhon, Amantran, Adhivas) |
| Saptami | সপ্তমী | Nabapatrika / Kolabou; full public days begin |
| Ashtami | অষ্টমী | Pushpanjali, Kumari Puja; Sandhi Puja |
| Navami | নবমী | Culminating worship |
| Dashami / Vijayadashami | দশমী / বিজয়া দশমী | Sindoor Khela, Bijoya |
| Immersion | বিসর্জন | Often scheduled by police/district, not only by tithi |

Muhurat (Sandhi Puja window, visarjan time) is **local** and must come from the committee’s purohit / panjika closer to the date.

---

## 2. Method

Priority order used:

1. Government gazette / official holiday list (partial: India-level listings found; **no 2026 West Bengal gazette located in this pass**)
2. Recognised panchang with **Kolkata** geolocation: Drik Panchang (SRC-DP-KOL-001)
3. Independent civic calendar: timeanddate.com India holidays (SRC-TAD-001, SRC-TAD-002)
4. Secondary panchang listings for Mahalaya (SRC-SAMVAT-001)
5. Commercial festival blogs — **logged as conflict evidence only**, never as the chosen calendar

---

## 3. Points of agreement

| Item | Finding | Sources | Confidence |
| --- | --- | --- | --- |
| Mahalaya Amavasya 2026 | **Saturday 10 October 2026** | SRC-SAMVAT-001; multiple panchang listings; ABP Live citing Drik for Pitru Paksha end | **High for the Amavasya date.** Still confirm Kolkata sunrise rule with a Bengali panjika. |
| Season | Mid-October 2026 | All sources | High |
| India gazetted Dussehra | **Tuesday 20 October 2026** | SRC-TAD-001 | High as **national holiday listing**, not as Bengal visarjan day |

---

## 4. Drik Panchang — Kolkata (primary panchang read)

Source: SRC-DP-KOL-001  
URL: `https://www.drikpanchang.com/navratri/durga-puja/durga-puja-calendar.html?geoname-id=1275004`  
Fetched 14 August 2026.

| Drik label (Kolkata) | Gregorian | Weekday | Notes on the same page |
| --- | --- | --- | --- |
| Day 1 — Shashthi | 16 Oct 2026 | Friday | Bilva Nimantran |
| Day 2 — Shashthi | 17 Oct 2026 | Saturday | Kalparambha, Akal Bodhon, Amantran, Adhivas |
| Day 3 — Saptami | 18 Oct 2026 | Sunday | Durga Saptami, Kolabou Puja |
| Day 4 — Ashtami | 19 Oct 2026 | Monday | Durga Ashtami, Kumari Puja, **Sandhi Puja, Maha Navami** (two tithis named on one civil day) |
| Day 5 — Nabami | 20 Oct 2026 | Tuesday | Navami |
| Day 6 — Dashami | 21 Oct 2026 | Wednesday | Vijayadashami, **Bengal Durga Visarjan**, Sindoor Utsav |

Reading: in 2026 the tithis **do not map 1:1** to the popular “five named days on five civil dates” marketing table. Shashthi spans two civil days; Ashtami and Navami overlap on 19 Oct in Drik’s Kolkata labels; Bengal visarjan is listed **21 Oct**, while national Dussehra is **20 Oct**.

This is expected lunisolar behaviour. It is exactly why a website must not publish a pretty five-row table from a blog.

---

## 5. timeanddate — India holidays

| Listing | Date | Type |
| --- | --- | --- |
| Maha Saptami | Sunday 18 Oct 2026 | Restricted holiday |
| Maha Ashtami | Monday 19 Oct 2026 | Restricted holiday |
| Dussehra | Tuesday 20 Oct 2026 | Gazetted holiday |

**Conflict with Drik Kolkata labels:** timeanddate does not publish Maha Navami as a separate India holiday row in the snippet obtained; Dussehra is 20 Oct, while Drik lists Bengal Visarjan on 21 Oct.

These can both be “true” in their own systems: national holiday ≠ Bengali committee visarjan day.

---

## 6. Discrepancy register (do not resolve silently)

| ID | Conflict | Parties | Resolution for this phase |
| --- | --- | --- | --- |
| DATE-001 | Public blogs split between Shashthi **16 Oct** vs **17 Oct** | Drik Kolkata lists both 16 (Bilva) and 17 (Bodhon). Blogs collapse this into one row, choosing either 16 or 17. | Show Shashthi as a **span** if published at all. Do not pick a single blog row. |
| DATE-002 | Saptami **17 Oct** vs **18 Oct** vs “17–18” | timeanddate restricted holiday 18 Oct; Drik Kolkata Saptami 18 Oct; some blogs 17 Oct | Prefer Kolkata panchang + local purohit. Not in UI as fact. |
| DATE-003 | Ashtami **18 vs 19 Oct**; some sources put Ashtami and Navami on the **same** Monday 19 Oct | Drik Kolkata Day 4 names Ashtami + Sandhi + Maha Navami on 19 Oct; blogs disagree | Publish Sandhi as a **tithi window**, not a civil-date slogan, once a purohit confirms. |
| DATE-004 | Dashami / visarjan **20 Oct vs 21 Oct** | India gazetted Dussehra 20 Oct (SRC-TAD-001). Drik Kolkata Bengal Visarjan 21 Oct. Some blogs 20, some 21. Dashami tithi is reported elsewhere as beginning afternoon 20 Oct and continuing into 21 Oct. | **Highest public risk.** A wrong visarjan date misleads a crowd. Keep PENDING. |
| DATE-005 | ABP Live and similar mix **2025 tables labelled as 2026** | SRC-DISCREPANT-BLOGS-001 | Discard those tables. |
| DATE-006 | No GoWB 2026 gazette found in this pass | — | Cannot treat any table as official state calendar yet. |

---

## 7. What the prototype may show

Allowed:

- “October 2026 — dates being verified against Kolkata panchang and the committee’s panjika”
- Optional **research table** clearly labelled RESEARCH-DERIVED, not BKS programme
- Event JSON with `"status": "pending-verification"` and `"doNotPublishAsFact": true`

Forbidden:

- Hero line “Join us on 18 October”
- Schema.org Event with a guessed startDate presented as official
- Social cards with a single wrong Dashami

---

## 8. Clearance path (Ram Sir + committee)

1. Name the panjika the committee will follow (Bengali panjika, not a North Indian default).
2. Confirm Kolkata vs actual venue longitude (tithi can shift by city).
3. Confirm whether public Bodhon is the 16 Oct or 17 Oct civil day.
4. Confirm visarjan **civil date and police slot** separately from tithi.
5. Only then copy dates into `data/events/events.json` with `status: verified` and a sourceId.

**Until then: no date is a product fact.**
