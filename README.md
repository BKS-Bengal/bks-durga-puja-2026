# BKS Durga Puja 2026

Isolated workstream for the **seasonal** digital experience. Not a second BKS identity. Not production.

**Phase:** offline site — Krishak Samaj / Integrated Farming / 5,000-farmer mobilisation  
**Authority:** Krishak Samaj brief (SOURCE B), with Phase 0/1 reports as status boundary (SOURCE A)  
**CONF-PUJA-001:** **OPEN**. Treated as a seasonal campaign until explicitly approved otherwise.

See `BKS-DURGA-PUJA-2026-NEXT-VERSION.md` for audit, requirements, IA, and architecture.

## Do not mix with

Purulia Voice Agent production, Purulia booth extraction, Newtown / Vatika, Biophilic, OmniSocial production, BKS Brand System production, Supabase, existing Vercel sites, Amul + GOBARdhan.

See `ISOLATION.md`.

## Offline site

The finished local copy is the `site` folder. Double-click `OPEN-OFFLINE.bat`, or open `site/index.html`. No internet is required.

Optional local server, from `site`:

```
python -m http.server 8765
```

Then open **http://127.0.0.1:8765/**

- Bengali: **http://127.0.0.1:8765/?lang=bn**
- Hindi: **http://127.0.0.1:8765/?lang=hi**

No payment is collected. Interest forms download on this device only. Venue, committee and pandal remain to be announced. This folder is not a production deploy.

## Brand

Canonical seal and digital tokens are copied from the BKS Brand System for local use only. Do not redraw the seal. Do not add a vermillion palette.

## Deployment

Do not deploy in this phase. Deployment target is ambiguous until named. Never overwrite chapter production.
