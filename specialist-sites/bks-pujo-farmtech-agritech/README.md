# Walk the Integrated Farming loop

Standalone static site for the farmer / Integrated Farming / FarmTech + AgriTech door of Bharatiya Krishak Samaj Pujo.

This folder is self-contained. It is not a clone of `site/farmers/` and does not load the main site CSS or JS.

## Design read

Agricultural livelihood page for farmers and FarmTech / AgriTech readers, with a forest / pond grounded language, leaning toward editorial native CSS.

Dials used: variance 6, motion 4 (CSS hover / opacity only), density 4.

Palette: forest `#163a26`, pond `#143d4a`, bone `#eef2ea`, one amber accent `#c98a1f`.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `vercel.json`
- `README.md`
- `assets/prep-2026.jpg` (19 August 2026 preparation photograph)
- `assets/karmyog-21st-century-128.png` (organiser mark)

## Preview

From this folder:

```powershell
python -m http.server 8765
```

Open `http://127.0.0.1:8765/`.

## Deploy

Point a Vercel project at this directory. `vercel.json` sets clean URLs and `X-Robots-Tag: noindex, nofollow, noarchive`. The HTML also has `noindex`.

Back link: https://bks-durga-puja-2026.vercel.app

## Form

`Express Farmer Interest` downloads `bks-pujo-farmer-interest.json` to the visitor’s device.

- Not enrolment
- Not sent to a server
- Rs 1 lakh is not guaranteed and is not paid here
- Required: name, locality, consent
- Hidden: `role=farmer`

## Image provenance

`assets/prep-2026.jpg` is a byte copy of `site/assets/puja-2026/photo_2026-08-19_11-15-15.jpg`.

- Date on file: 19 August 2026
- Role: current preparation / countdown still
- Must not be read as a finished 2026 farm
- Original JPEG bytes preserved. Not recropped, retouched, or AI-edited
- SHA-256: `8345964F9FD6DCEAFCC7AEA6F453812E40EFA7192F964341BA42706BCA67E20A`

## Claims kept honest

- Live farm: East Kolkata Wetlands, 500 m from Sector V, being built
- 5,000 village farms: TARGET
- 1-2.5 acre, 365-day, 3x-5x, 50-70%, Rs 2-3.5 lakh: ILLUSTRATIVE MODEL / indicative potential
- FarmTech + AgriTech: careful tools in the IFS model. Fuller public definition to be confirmed
- Transformation frames: empty pending approval
- Bangla and Hindi: pending native review
- Organised by KarmYog for the 21st Century. BKS is organising partner, not the dominant masthead

## Out of scope

Live enrolment, payment, guaranteed income, guaranteed zero-waste, invented vendors or apps.
