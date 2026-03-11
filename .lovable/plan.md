

# Varga Flow — Implementation Plan

## Branding & Design System
- **Colors**: Dark navy base (#1B2A4A), gold/amber accent (#E8A743), charcoal (#1A1A2E) for alternating sections, white text on dark
- **Typography**: Bold 700–800 weight sans-serif headlines (Inter or similar), clean 400-weight body text
- **Style**: Premium, no-nonsense. Dark backgrounds, gold CTAs, high contrast. Inspired by stonesystems.io but original
- **Logo**: Text placeholder "VARGA FLOW" until logo file is provided

## Navigation (Global)
- Sticky solid dark navy bar on all pages
- Left: Logo | Center-left: Home, Services (dropdown with all 8), About, Reviews, Contact | Right: "Book A Call" gold button
- Mobile (< 1024px): Hamburger menu with full-screen overlay, gold CTA always visible
- No phone number anywhere in nav

## Pages to Build

### 1. Homepage (conversion-first landing page)
- **Hero**: Full-width dark navy background, bold H1 ("Marketing Systems That Actually Work — Built for Contractors"), punchy subhead in the straight-shooter tone, gold "Book A Call" CTA, placeholder for trust badges (Google/Facebook stars)
- **Problem Section**: "You're great at your trade. But leads keep slipping through the cracks." — pain-point driven
- **Services Grid**: 8 service cards with icons, short benefit headline, link to each service page
- **How It Works**: 3-step process (Book A Call → We Build It → You Get Leads)
- **Social Proof**: Placeholder testimonial cards
- **Final CTA**: Strong closing section with Book A Call form embedded

### 2. About Page
- Kornél Varga's story and Varga Flow mission
- Benefit-focused copy in Blue-Collar Straight Shooter tone
- No invented credentials or stats

### 3. Contact Page
- Book A Call form: Name, Company Name, Phone, Email
- Form POSTs JSON to configurable webhook URL (placeholder constant)
- Clean, minimal layout with trust copy

### 4. Reviews Page
- Grid of placeholder testimonial cards (name, business type, quote, star rating)
- Designed for easy replacement with real reviews later

### 5–12. Eight Service Pages
Each follows the same self-contained funnel template:
- **Text-first hero**: Bold H1 with service benefit, subhead, gold CTA
- **Problem/Agitation**: Why contractors lose without this
- **Solution**: What Varga Flow does for them
- **Features/Benefits**: 3–4 key points with icons
- **FAQ section** with accordion (FAQ schema markup)
- **Bottom CTA**: Book A Call form or button
- Services: Functional Website, Missed Call Text Back, All-In-One Inbox, Business Phone, Local SEO, 5-Star Magic Review Funnel, One-Click Marketing Campaigns, Automated Lead Follow Up

## Conversion Elements (Every Page)
- Primary CTA: "Book A Call" gold button
- Sticky mobile CTA bar (Book A Call only, no phone)
- One clear next step per page

## Technical
- React + React Router (SPA, no full reloads)
- Scroll restoration on every route change
- Webhook URL stored as single config constant
- SEO: unique title + meta per page, Organization JSON-LD on homepage, Service + FAQ schema on service pages
- Mobile-first responsive: hero images replaced with CSS gradients under 1200px
- Target 95+ Lighthouse mobile score

## Build Order
1. Design system (colors, typography, CSS variables) + global nav + footer
2. Homepage (all sections)
3. Contact page with form
4. About page
5. Reviews page
6. Service page template + all 8 service pages
7. Sticky mobile CTA bar
8. SEO meta tags + schema markup

