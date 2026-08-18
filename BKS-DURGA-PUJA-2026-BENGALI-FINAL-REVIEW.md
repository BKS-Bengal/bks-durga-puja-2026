# BKS Durga Puja 2026 — Bengali final review

**Status:** DRAFT — NATIVE REVIEW REQUIRED  
**CONF-PUJA-BN-001:** OPEN. Phase 2.5 does not close this.  
**Do not treat this file as approval.** Do not replace strings with machine translation.

Live Bengali is `data-bn` on `prototype/index.html`, plus `data/content/bn/heroes.json`, `data/events/events.json` (bn titles/descriptions), and `data/stories/stories.json` (bn wells).

---

## 1. Newly added Bengali (Phase 2 editorial pass)

Needs native review first. These are bilingual-editor drafts, not a mother-tongue sign-off.

| Location | EN sense | BN draft (review this) |
| --- | --- | --- |
| Skip link | Skip to content | সরাসরি মূল লেখায় যান |
| The Puja legend | Three labels SOURCE FACT / BKS POSITIONING / PENDING INFORMATION | SOURCE FACT (বাংলার পূজা), BKS POSITIONING, PENDING INFORMATION |
| The Puja — clay | Unfired clay; eyes from Mahalaya; returns to water | প্রতিমা অপোড়া মাটির… মহালয়ায় চক্ষুদান… |
| The Puja — dhak | UNESCO drumming; no unnamed dhaki; no autoplay | ঐতিহ্যবাহী বাংলা ঢাক… পাতা নিজে থেকে বাজে না |
| The Puja — house / sarbojanin | Bonedi bari vs barowari / sarbojanin | বনেদি বাড়ি… বারোয়ারি / সর্বজনীন |
| Krishak — `.bn-draft` | DRAFT — NATIVE REVIEW REQUIRED | বাংলা খসড়া — মাতৃভাষার সম্পাদনা বাকি |
| Krishak — IFS list | What IFS is; 96%; rice–fish; raised/sunken beds; FPO; homestay/livelihoods | Full `data-bn` on `#krishak` source-list |
| Krishak — 5,000 × ₹1 lakh | Discussion sketch; no counter/UPI | প্রায় পাঁচ হাজার কৃষক ও জনপ্রতি এক লক্ষ টাকা বীজতহবিল… |
| Footer hierarchy | BKS → Puja → community → Krishak → IFS | বি কে এস → মরশুমি দুর্গা পূজা → … |

IFS, FPO, KVK, ICAR, BCKV, AICRP stay in Latin letters on purpose.

---

## 2. Existing Bengali (Phase 1 shell — still draft)

Nav, chip, Home hero H1/H2/H3, explore cards, Programme civic layer, Community wells, Participate six cards, Accessibility, Sustainability, Contact slots, draft banner.

These were **not** silently rewritten in Phase 2.5. They still need the same native pass.

---

## 3. Terminology requiring native review

| Term | Current BN | Why |
| --- | --- | --- |
| seasonal gathering, not a second **brand** | chip: দ্বিতীয় কোনো **প্রতিষ্ঠান** নয় | EN says brand; BN says organisation. Pick one sense. |
| Participate | যোগদান | Also used for “join / take part”. Check against স্বেচ্ছাসেবা. |
| Programme | কার্যক্রম | Civic holidays, not a cultural show. Does কার্যক্রম over-promise? |
| Community | সমাজ | Same word as Krishak Samaj’s সমাজ tile. |
| Krishak Samaj | কৃষক সমাজ | Organisation name vs page title. |
| seed (₹1 lakh) | বীজতহবিল | Must not read as a live loan or government scheme. |
| Support / not collecting money | সহায়তা / টাকা নেওয়া হচ্ছে না | Must not read as a donate button. |
| Home | প্রথম পাতা | Intentional, not “হোম”. Confirm. |
| Durga Puja spelling | দুর্গা পূজা vs দুর্গাপুজো in archival `site.json` | Live HTML uses দুর্গা পূজা. |

---

## 4. Headings requiring review

পূজা · কার্যক্রম · সমাজ · কৃষক সমাজ · যোগদান · প্রবেশযোগ্যতা · পরিবেশ · যোগাযোগ  
Krishak H2s: মরসুম যেখানে মেশে · ক. SOURCE FACT — পশ্চিমবঙ্গে সমন্বিত চাষ · খ. BKS POSITIONING · গ. FUTURE / PENDING  
Hero titles H1/H2/H3 in `bn/heroes.json`.

---

## 5. CTA wording requiring review

| CTA | BN |
| --- | --- |
| Read The Puja | পূজা পড়ুন |
| Participate | যোগদান |
| See civic calendar | নাগরিক পঞ্জিকা |
| Coming soon | শীঘ্রই আসছে |
| Not collecting money | টাকা নেওয়া হচ্ছে না |
| Coming soon — BKS Krishak Samaj | শীঘ্রই — বি কে এস কৃষক সমাজ |
| Contact slots | যোগাযোগের খালি ঘর |
| Menu | মেনু |
| Share draft text | শেয়ারের খসড়া |

---

## 6. What the reviewer must not “fix” into

- A live donation or UPI line.
- A named venue, committee, or timetable.
- IFS as a BKS achievement.
- UNESCO as a BKS badge.

Until a named native editor signs this file, the draft banner and Krishak `bn-draft` note stay on.
