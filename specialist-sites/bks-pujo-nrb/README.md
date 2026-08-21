# Supporters / NRB

Standalone static page for Non-Resident Bengalis and supporters who want to take part in Bengal's farming story from wherever they are.

This is not a copy of the sponsor page. It is a letter-from-home page: belonging at a distance, not a boardroom booking.

## Design read

Diaspora participation page for Non-Resident Bengalis and supporters outside Bengal, with an intimate letter-from-home language, leaning toward native CSS.

Dials used: variance 6, motion 3, density 3.

Palette: night indigo `#1b2430`, paper `#e8eef2`, one accent river-gold `#c9a227`.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `vercel.json`
- `README.md`
- `assets/aarti-2025.jpg` (historical 2025 aarti reference, not a 2026 farm photograph)

## Local preview

From this folder:

```powershell
python -m http.server 4175
```

Then open `http://127.0.0.1:4175/`.

## Deploy

This folder is a standalone Vercel root. `vercel.json` sends `X-Robots-Tag: noindex, nofollow, noarchive`. Search engines should not index this page.

Back link: [https://bks-durga-puja-2026.vercel.app](https://bks-durga-puja-2026.vercel.app)

## Form

`Express Supporter Interest` downloads `bks-pujo-nrb-interest.json` to the visitor's device. There is no POST, no database, no UPI, and no card field.

Required fields: name, email, phone, native village / para, consent. Where you live now is optional.

## Honesty lock

- About 5,000 patrons and 5,000 farms is a **target**, not an achieved count.
- Rs 1 lakh, or Rs 20,000 every two months, is **proposed** seed-support. It is not collected here.
- 80G / tax paperwork is **to be confirmed** and is not issued on this page.
- Organised by KarmYog for the 21st Century. Bharatiya Krishak Samaj is the organising partner, not the title sponsor.
- English only. Bengali and Hindi are pending.
- The small hero photograph is a 2025 Mahotsav historical reference.

## Out of scope

Payment, live farm matching, title-sponsor packages, invented endorsements, and language switching that is not yet built.
