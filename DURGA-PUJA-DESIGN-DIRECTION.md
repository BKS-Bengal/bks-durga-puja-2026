# Durga Puja 2026 — design direction

**Status:** PRINCIPLES — not a moodboard to copy, not a second brand  
**Date:** 14 August 2026  
**Brand authority:** BKS Brand System v1.2.0 [SRC-BKS-BRAND-001]  
**CONF-PUJA-001:** seasonal expression. No competing identity.

This is not a visual coding spec. It is the design constitution for a later prototype.

---

## 1. Institutions studied (principles extracted, not copied)

| Institution | What to take | What not to take |
| --- | --- | --- |
| UNESCO ICH element pages [SRC-UNESCO-001] | Short sourced prose; no tourism adjectives | Dry encyclopaedia with no human warmth |
| Smithsonian Folklife Festival [SRC-SFF-001] | Tradition-bearers first; research tone; people over spectacle | US-national framing, ticket widgets |
| Edinburgh International Festival [SRC-EIF-001] | Programme as the product; mobile photography; fast home | Booking-engine density |
| Ministry of Culture / SNA ICH framing [SRC-PIB-002] | Craft, ritual, food, music as one heritage | Ministerial press-release layout |
| Google Arts craft stories [SRC-GAC-001] | Image provenance, named makers | Scraping their images |
| BKS Brand System campaign | Field green / paddy gold / cream; seal; farmer-plain voice | IFS modules pasted into ritual pages |

Kolkata “theme Puja” websites and generic red-gold festival templates are **anti-references**.

---

## 2. Design principles

1. **Institutional, not decorative.** Whitespace does the prestige. Ornament does not.
2. **Human, not illustrated goddesses.** Prefer hands, clay, bamboo, kitchens, streets, rest areas — when photography exists. Until then, **slots**.
3. **Parental brand is BKS.** The seal is unchanged. Wordmark is Bharatiya Krishak Samaj (CONF-NAME-001 still open in Brand System).
4. **Seasonal chip, not a festival logo.** Example: `Durga Puja 2026 · seasonal gathering`. Never a second mark.
5. **Editorial, not landing-page.** One idea per block. Captions carry sources.
6. **Bilingual from the start.** Bengali is a first language, not a Google Translate toggle.
7. **Quiet motion.** Opacity/translate 200–300ms. No parallax, particles, autoplay audio, flashing.
8. **Night-crowd mobile.** Assume a phone at a pandal: large type, high contrast, one-hand nav.
9. **Honesty as a visual device.** PENDING and EMPTY states are designed, not hidden.
10. **No cliché layer.** No random red/gold gradients, stock Durga, lotus wallpaper, glowing particles, AI pandals.

---

## 3. Colour — BKS digital tokens only

Copied from Brand System digital UI. Logo pigments remain **logo-only**.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-brand-primary` | `#163a26` | Field green — surfaces, header |
| `--color-brand-secondary` | `#c98a1f` | Paddy gold — primary action |
| `--color-brand-accent` | `#a6461f` | Terracotta — accent, not a Puja vermillion system |
| `--color-surface-default` | `#f6f1e4` | Page |
| `--color-text-primary` | `#201a10` | Ink |

**Proposed seasonal palette:** none in this phase.  
If a sindoor or alta note is later required, add it here as **PROPOSED** (e.g. a single `seasonal-accent` for the chip border) and wait for Ram Sir. Do not silently introduce it.

CONF-COLOR-001 remains open in the Brand System: do not recolour the seal; do not replace gold with logo blue.

---

## 4. Typography

Unchanged roles from Brand System:

- Display: `"Baloo Da 2", "Nirmala UI", "Noto Sans Bengali", system-ui`
- Text: `"Hind Siliguri", "Hind", "Nirmala UI", "Noto Sans", "Segoe UI", system-ui`
- No third family.
- Body ≥ 1.05rem. H1 clamp `(2rem, 5vw, 3.2rem)`.
- Bengali needs slightly more line-height (1.6–1.7) than English.

Optional web fonts only when online; system stack must work offline.

---

## 5. Photography governance

Every image object:

```
id, src, source, rightsStatus, location, date, photographer,
subject, usagePermission, alt, verification, slot
```

`rightsStatus`: `bks-owned` | `licensed` | `committee-release` | `empty-slot`  
Never: random internet, AI faces, AI pandals, Odisha leadership photos as West Bengal Puja ground.

Until BKS photography exists, the prototype uses **replaceable slots** with a field-green ground and a caption: “Photograph to come — rights-cleared, this gathering.”

Preferred subjects when real pictures arrive: clay and hands, bamboo joints, lighting rigs (not glare), kitchen work, dhakis who have consented, volunteers, resting visitors, landscape of the actual place.

---

## 6. Layout and navigation

- Header: seal (small, canonical) · BKS wordmark · seasonal chip · EN/বাং · 6-item nav that collapses to a button with visible focus.
- Home: hero (H1 direction) → purpose in 80 words → civic dates (badged) → three paths (Visit / Understand the Puja / Krishak Samaj) → empty venue well.
- Max measure ~65ch for English, slightly shorter for Bengali.
- Cards are for events and paths, not for decoration.
- Footer: hierarchy reminder, governance key, no fake social counts.

---

## 7. Motion

| Allowed | Forbidden |
| --- | --- |
| Focus ring | Infinite loops |
| 200ms fade on language switch | Parallax hero |
| Accordion for programme days | Particle/shimmer backgrounds |
| `prefers-reduced-motion: reduce` kills all | Autoplay audio/video, flash, scroll-jacking |

---

## 8. Accessibility (digital)

- Contrast: ink on cream, cream on green — check terracotta on green; do not use gold text on cream.
- `:focus-visible` 2px offset ring.
- Tap ≥ 48px.
- Headings in order. One `h1`.
- `html lang` switches with content.
- Alt text from the image object, never “image”.
- Do not show a wheelchair icon as proof of a ramp.

---

## 9. What “premium” means here

Premium is **restraint, provenance, and type**. It is not more gold, more red, or more animation. It should feel as if a cultural-experience studio and a web architecture team built it — and as if Ram Sir can still say the product is only a season.
