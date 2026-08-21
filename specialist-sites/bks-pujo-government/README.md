# Bharatiya Krishak Samaj Pujo - institutional briefing

Standalone static briefing for government stakeholders, MLAs, functionaries, institutions and influencers.

This is not a clone of the main Pujo site. It is not a sponsor landing page. It is a document-style briefing paper on what is being executed, why it matters, and how to request a conversation.

## What this site is

- One page: `index.html`, `styles.css`, `app.js`
- Tone: institutional, non-political, non-promotional
- Primary action: **Request a Briefing**
- Form behaviour: downloads `bks-pujo-briefing-request.json` to the visitor's device
- **0 POST.** Nothing is submitted to a server.

## What this site is not

- A government programme, partnership, endorsement, or scheme
- A claim that 294 assembly seats are partners or endorsees
- A completed farm, a live allocation engine, or a payment page
- A named commercial technology programme beyond the careful-tools layer already in the farming model

## Confirmed facts used here

| Fact | Status |
|---|---|
| Organised by KarmYog for the 21st Century | On file |
| Bharatiya Krishak Samaj = organising partner, not title sponsor | On file |
| Civic window 16-20 October 2026, Kolkata | Confirmed as published civic window |
| Venue | To be announced |
| Demo farm, East Kolkata Wetlands, 500 metres from Sector V | Being built |
| About 5,000 village farms | TARGET, not a government target |
| West Bengal assembly 294 seats | Stakeholder universe size, not endorsements |
| FarmTech + AgriTech | Careful-tools layer in the IFS model (monitoring, drip, pond energy). Fuller definition to be confirmed |

## Local preview

From this folder:

```text
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Language

English is the live briefing. Bangla and Hindi controls are present. Those languages show a pending-native-review note and keep the English text. Do not treat BN/HI as published translations.

## SEO and robots

- Unique title and description for this briefing (not the main `/stakeholders/` page)
- `noindex, nofollow, noarchive` in the document
- `X-Robots-Tag: noindex, nofollow, noarchive` in `vercel.json`

## Deploy

This folder is a standalone Vercel root. Do not point it at the main `site/` directory.

Back link on the page: [https://bks-durga-puja-2026.vercel.app](https://bks-durga-puja-2026.vercel.app) - "Back to Bharatiya Krishak Samaj Pujo".

## Assets

Wordmark is text. If `assets/bks-seal.png` is present, it is shown at 32px as a partner credential only. It is not the hero.

## Contact already on file

- `contact@bkswbengal.org`
- `+91 86552 46764`
- Bharatiya Krishak Samaj, West Bengal, F 127, Downtown Mall, Uniworld City, New Town, Kolkata 700 156
