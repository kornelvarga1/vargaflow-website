# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build locally
```

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn-ui

**Routing:** React Router with these routes:
- `/` → `src/pages/Index.tsx`
- `/about`, `/contact`, `/pricing`, `/reviews`, `/trades` → corresponding pages
- `/services/:slug` → `src/pages/ServicePage.tsx` (dynamic, data-driven)

**Data flow:** Service content lives in `src/data/services.ts` (8 services with slugs, FAQs, feature cards). Site-wide constants (webhook URL, nav links, service list) live in `src/config/constants.ts`. Pages consume this data directly — no API calls.

**Layout:** All pages are wrapped by `src/components/layout/Layout.tsx`, which includes Navbar, Footer, and `StickyMobileCTA`. Providers (HelmetProvider, QueryClientProvider, TooltipProvider, BrowserRouter) are in `src/App.tsx`.

**UI components:** `src/components/ui/` contains shadcn-ui components — edit these only if customizing behavior, not just styling. Custom site components live in `src/components/`.

**Styling:** Custom Tailwind colors are defined in `tailwind.config.ts` — `navy`, `gold`, and `charcoal` are the brand palette. Use these rather than generic Tailwind colors for brand-consistent work.

**Path alias:** `@/` maps to `src/` throughout the codebase.

**Forms:** `BookACallForm.tsx` posts to `WEBHOOK_URL` from `src/config/constants.ts`. Form state uses React Hook Form + Zod.

**Animations:** `ScrollReveal.tsx` wraps content for reveal-on-scroll. Framer Motion is used for more complex animations.

## VargaFlow App Integration
This website connects to the VargaFlow CRM app via Supabase Edge Functions.

### Edge Function URLs
Base URL: `https://zfmchywjmgykmlhjihls.supabase.co/functions/v1`

- Lead form submission: `POST /flow-lead-form-submitted`
  - Body: `{ name, phone, email, source }`
- Onboarding form submission: `POST /flow-ob-form-submitted`  
  - Body: `{ contact_id }`
- Call booked (Calendly webhook): `POST /flow-call-booked`
  - Handled automatically by Calendly → no code needed

### Form Wiring
- `BookACallForm.tsx` → currently posts to `WEBHOOK_URL` in constants.ts → should trigger `flow-lead-form-submitted`
- Onboarding form (to be built at `/onboarding-form`) → should trigger `flow-ob-form-submitted` with `contact_id` from URL params
- All form submissions should include `Authorization: Bearer <SUPABASE_ANON_KEY>` header

### Supabase Anon Key
Store in `.env` as `VITE_SUPABASE_ANON_KEY` — never hardcode in source files.

### Brand Colors
- Navy, Gold, Charcoal — defined in tailwind.config.ts

## Business Context
VargaFlow is a done-for-you marketing system for home service contractors.
Founder: Kornél Varga (22, solo operator).
Target customer: Roofers, plumbers, HVAC, electricians and other trades.
Positioning: Personal, no contracts, free setup for first clients, honest about timeline.
Tone: Direct, contractor-native, no agency BS.
