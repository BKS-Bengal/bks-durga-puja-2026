# BKS Durga Puja 2026

Isolated static microsite for the **seasonal** Krishak Samaj Puja 2026 experience. Not a second BKS identity. Not production.

**Canonical implementation:** `site/` (HTML / CSS / JS, hash routes, offline JSON).  
Do not mix with Purulia Voice Agent, OmniSocial, Amul + GOBARdhan, or other chapter production. See `ISOLATION.md`.

## Local preview

From `site`:

```
python -m http.server 8780
```

Then open **http://127.0.0.1:8780/**

- Bengali: **http://127.0.0.1:8780/?lang=bn**
- Hindi: **http://127.0.0.1:8780/?lang=hi**

Or double-click `OPEN-OFFLINE.bat`. No payment is collected. Forms download JSON on this device only. Venue, committee and pandal remain to be announced.

Bengali and Hindi copy is **DRAFT — NATIVE REVIEW REQUIRED**. English Integrated Farming copy is the restored source text.

## Brand

Keep `site/assets/bks-seal-96.png` as the header seal. Keep `site/assets/puja-2025/idol-durga-2025.jpg` as the hero photograph. Do not redraw the seal. Do not replace the hero image.

## Deployment

Do not deploy until explicitly asked. Never overwrite chapter production (`bkswbengal.org` or other live properties).
