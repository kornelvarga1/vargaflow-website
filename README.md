# VargaFlow Website

The marketing and lead-generation site for VargaFlow. Not a brochure: the forms on it are the front door of a live automation pipeline, and the site is prerendered for search rather than shipped as a bare SPA.

## What it does

- **Lead form** — submits to a Supabase edge function that creates the contact and starts the sales sequence within seconds
- **Onboarding form** — the conversion gate for closed clients, feeding the onboarding automations
- **Service pages** — one per trade, generated from a shared template and a services config
- **Booking widget** — self-built scheduling against Google Calendar, replacing Calendly
- **Prerendering** — routes rendered to static HTML at build time so the content is indexable

## Architecture

```
visitor ──► lead form ──► edge function ──► contacts + sequence queued
                                              │
                                              ▼
                                        cron-message-sender
                                         (Twilio / Resend)
```

The site owns no automation logic of its own. It posts to edge functions living in `vargaflow-admin`, which keeps the sequencing in one place.

**Stack** — React 18, TypeScript, Vite, Tailwind, shadcn/ui, Vitest, deployed on Vercel with a prerender step.

## Adding a service page

Four files have to change together, and missing one breaks the build in production rather than locally:

1. `src/data/services.ts` — the service definition
2. `src/lib/constants.ts` — routing and metadata
3. `src/components/Navbar.tsx` — the `SERVICE_ICONS` map
4. `prerender.js` — the route list

This is documented because it has bitten before.

## Design constraints

The brand colour is reserved for calls to action and functional UI only. No accent-coloured eyebrows or emphasis spans, no atmospheric glow, no coloured shadows on buttons. New sections default to neutral tokens. Motion is short and restrained: 0.4s scroll reveals, 0.2s modals, expo-out easing, small travel. The differentiator for the contractor templates is that they feel fast and clean, not that they feel designed.

## Running it

```bash
npm install
cp .env.example .env
npm run dev             # port 8080
npm run test
npm run build           # includes the prerender pass
```
