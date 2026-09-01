# Protyaborton 2026 — Agri-Creators & Media Conclave



Standalone static event website with secure registration API. Independent from BKS Durga Puja specialist sites.



## Local preview (static only)



From this folder:



```text

python -m http.server 4180

```



Open `http://127.0.0.1:4180/`.



- Landing: `http://127.0.0.1:4180/`

- Registration UI: `http://127.0.0.1:4180/register/`

- Bengali (default): `?lang=bn`

- English: `?lang=en`



Static preview serves the registration form; API submission requires `vercel dev` (see below).



## Registration



- **Route:** `/register` (same domain as landing page when deployed)

- **API:** `POST /api/register` (Vercel serverless — server-side Supabase insert)

- **Table:** `protyaborton_registrations` (isolated migration in `supabase/migrations/`)



Copy `.env.example` to `.env.local` and set approved Supabase credentials. Never commit secrets.



```text

npx vercel dev

```



## Environment variables



| Variable | Required | Notes |

|---|---|---|

| `SUPABASE_URL` | Yes | Shared BKS / Jai Kisan project (`lhnorkjfldywnrqqunqn`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Alt | Same URL — accepted if `SUPABASE_URL` unset |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side API only (not in browser) |
| `REGISTRATION_IP_SALT` | Optional | IP hash salt for rate limiting |

**Isolation:** Jai Kisan → `jai_kisan_registrations`. Protyaborton → `protyaborton_registrations` only.



## Assets



| File | Use |

|---|---|

| `assets/protyaborton-wordmark-official.jpg` | Official Protyaborton calligraphy — header & hero |

| `assets/hosts-karmyog-bks-lockup.jpg` | Official KarmYog × BKS host lockup — header |

| `assets/maa-durga.jpg` | Maa Durga idol — hero (2025 Mahotsav reference) |

| `assets/jai-kisan-bengal-ratna-logo.jpg` | JKR logo (Option 1 crop — replace if final standalone asset supplied) |

| `assets/ifs-reference.jpg` | Integrated farming context |

| `assets/prep-2026.jpg` | Agriculture / prep context |

| `assets/jai-kisan-bengal-ratna-options.jpg` | Font options reference only — not used directly on UI |



Deprecated for public UI (kept in folder): `bks-seal-96.png`, `bks-logo-official.jpg`, `karmyog-21st-century-*.png`, `protyaborton-wordmark.jpg`



## Deploy



This folder is a standalone Vercel root. Do not deploy until explicitly approved.



Before production:



1. Apply migration to approved Supabase project

2. Configure Vercel environment variables

3. Verify `/register` and API end-to-end


