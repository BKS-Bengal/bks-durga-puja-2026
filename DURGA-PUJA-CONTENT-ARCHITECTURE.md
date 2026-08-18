# Durga Puja 2026 — content architecture

**Status:** MODEL — bilingual, governance-first  
**Date:** 14 August 2026

---

## 1. Languages

| Code | Role |
| --- | --- |
| `en` | Institutional English, farmer-plain, no tourism poetry |
| `bn` | Human Bengali, spoken rhythm, not a calque of the English |

Religious/cultural terms that Bengal already uses may stay in Bengali in the English file when needed (`bodhon`, `sandhi puja`, `visarjan`, `bhog`) and in Bengali script in `bn`. Do not machine-translate mantras.

Same keys in `/data/content/en/` and `/data/content/bn/`.

---

## 2. Content types

| Type | File | Notes |
| --- | --- | --- |
| Site chrome | `site.json` | nav, footer, hierarchy, language switch |
| Home | `home.json` | hero H1, purpose, paths |
| The Puja | `puja.json` | culture, UNESCO scope, bhog context |
| Programme | `programme.json` | intro; events live in `data/events` |
| Community | `community.json` | empty-well copy; story schema elsewhere |
| Krishak Samaj | `krishak-samaj.json` | cultural context vs programme claim |
| Participate | `participate.json` | six intents |
| Accessibility | `accessibility.json` | digital commitments; physical PENDING |
| Sustainability | `sustainability.json` | “could explore” |
| Contact | `contact.json` | empty fields |
| SEO | `data/seo/meta.json` | titles, descriptions, OG — no invented URL |

Every block that can be true or false has:

```
"governance": "VERIFIED" | "RESEARCH-DERIVED" | "PROPOSED" | "PENDING" | "EMPTY"
"sourceId": "SRC-…" | null
```

---

## 3. Story object

`data/stories/stories.json` — array. No invented people.

```json
{
  "id": "",
  "person": "",
  "role": "",
  "location": "",
  "story": { "en": "", "bn": "" },
  "contribution": { "en": "", "bn": "" },
  "source": "",
  "verification": "EMPTY",
  "imageId": null
}
```

---

## 4. Image object

`data/images/registry.json`

```json
{
  "id": "hero-home",
  "slot": true,
  "src": null,
  "source": null,
  "rightsStatus": "empty-slot",
  "location": null,
  "date": null,
  "photographer": null,
  "subject": "Replaceable: this gathering, West Bengal",
  "usagePermission": "none",
  "alt": { "en": "Photograph to come — this gathering", "bn": "ছবি আসবে — এই আয়োজন" },
  "verification": "EMPTY"
}
```

---

## 5. Event object

See `data/events/schema.json`. Public labels for 2026 civic days may load from `events.json` with `verification: pending-ritual-panjika`. No clock muhurats.

Categories: `ritual` | `cultural` | `community` | `knowledge` | `food` | `volunteer` | `immersion`

---

## 6. SEO and sharing (no invented domain)

`data/seo/meta.json` holds:

- `title`, `description` per route and language
- `ogTitle`, `ogDescription`, `ogImage` (slot)
- `inLanguage`, `alternateLanguages`
- `canonicalPath` only (`/`, `/puja`, …) — **not** a host
- JSON-LD emitted only when `verification === "VERIFIED"` and location is not empty

Do not keyword-stuff. Do not invent `https://bks-durga-puja.example`.

Share architecture: each event has `sharePath`. WhatsApp/Facebook/X/LinkedIn/Instagram use Open Graph when a host exists. **No SDKs.**

---

## 7. OmniSocial readiness (disconnected)

`data/omni-social/contract.json` defines fields:

`type, campaign, seasonalTag, eventId, imageId, caption, language, cta, publishDate, source, verification`

Fail rules (from Brand System, reused):

- V11 invented seed-funding as approved
- V12 statistic without source
- V13 Puja creative that replaces the seal

No API calls.

---

## 8. Bengali writing notes

- Address the reader as আপনি in institutional tone; পাড়া/সমাজ where community is meant.
- Keep ইউনেস্কো, প্যান্ডেল, ভোগ as used in Bengal.
- Do not translate Krishak Samaj away: **কৃষক সমাজ**.
- Do not invent Sanskritised marketing (“দিব্য উৎসব অভিজ্ঞতা”).
- Native editor review is **PENDING** before any public launch.

---

## 9. What must never mix in one sentence

Bad: “UNESCO-inscribed BKS Durga Puja will fund 5,000 farmers.”  
Good: three labelled sentences — inscription is Kolkata’s; BKS gathering is PENDING; 5,000 is a proposed sketch.
