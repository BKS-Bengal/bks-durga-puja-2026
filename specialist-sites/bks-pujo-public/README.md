# Bharatiya Krishak Samaj Pujo - public Puja

Standalone static page for neighbours, families and festival visitors. This folder is not the sponsor briefing and not a clone of the main holding site. It is a culturally grounded public Puja experience.

## What this site is

- Files: `index.html`, `styles.css`, `app.js`, `vercel.json`, `README.md`
- Primary question: what is this Puja, and why does the farmer belong at its centre?
- Primary action: **Explore the Puja** (in-page worship, craft, food, music, neighbourhood)
- Secondary action: **Visit** (civic window and venue to be announced)
- No payment. No new form.

## What this site is not

- A sponsor landing page or rate card
- An agriculture conference
- A finished 2026 pandal photograph
- A venue, committee list, or ritual timetable
- A venue, committee list, or ritual timetable

## Confirmed facts used here

| Fact | Status |
|---|---|
| Event name: Bharatiya Krishak Samaj Pujo | On file |
| Organised by KarmYog for the 21st Century | On file |
| Bharatiya Krishak Samaj = organising partner, not title sponsor | On file |
| Civic window 16-20 October 2026, Kolkata | Confirmed civic window |
| Exact pandal address | To be announced |
| Committee names | Not yet available |
| Ritual clocks from a named Panjika | To be announced |
| 2025 Mahotsav photographs | Historical / reference, not a 2026 BKS outcome |
| Awards nominations, no entry fee as published | On file on the holding site |
| Integrated Farming shown after the cultural centre | Plain-language livelihood, not a second textbook |
| About 5,000 village farms | TARGET, mentioned quietly and labelled |

## Photography

Hero and supporting stills are Durga Puja Mahotsav 2025, IIT Kharagpur Research Park, organised by KarmYog for the 21st Century Foundation. Captions say so. They are not the 2026 Bharatiya Krishak Samaj pandal.

Place these files in `assets/` (copied from the holding site archive):

- `idol-durga-2025.jpg` (hero)
- `aarti-procession-2025.jpg` (worship / craft still)
- `conch-aarti-2025.jpg` (neighbourhood still)
- `bks-seal-96.png` (small partner credential only)

## Language

English is the live public copy. Bangla and Hindi controls are present. Those languages keep the English text and show "Translation pending native review". Do not treat BN/HI as published translations.

## SEO and robots

- Unique title: The Puja | Bharatiya Krishak Samaj Pujo
- Unique description for this public door (not the holding `/public/` page)
- `noindex, nofollow, noarchive` in the document
- `X-Robots-Tag: noindex, nofollow, noarchive` in `vercel.json`
- No Event structured data while the venue is to be announced

## Local preview

From this folder:

```text
python -m http.server 4174
```

Open `http://127.0.0.1:4174/`.

## Deploy

This folder is a standalone Vercel root. Do not point it at the main `site/` directory.

Back link on the page: [https://bks-durga-puja-2026.vercel.app](https://bks-durga-puja-2026.vercel.app)

## Contact already on file

- `contact@bkswbengal.org`
- `+91 86552 46764`

Those contacts are for enquiry. They are not a pandal pin.
