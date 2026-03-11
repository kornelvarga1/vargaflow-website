Varga Flow B2B marketing site for contractors. Light theme with gold accents and dark contrast sections.

## Design tokens
- Background: white (0 0% 100%), Foreground: near-black (0 0% 8%)
- Primary (gold): 36 78% 52%, gold-light, gold-dark variants
- Secondary: light gray (0 0% 96%) for alternating sections
- Muted: 0 0% 94%, muted-foreground: 0 0% 40%
- Dark sections use bg-foreground with text-background for contrast (hero, CTA, footer)
- All light theme, no dark mode toggle
- Logo: text placeholder "VARGA FLOW" until user provides file

## Config
- WEBHOOK_URL in src/config/constants.ts (placeholder)
- SERVICES array with 8 services, slugs, titles
- Form fields: Name, Company Name, Phone, Email

## Architecture
- Layout component wraps all routes (Navbar + Footer + StickyMobileCTA)
- Scroll restoration in Layout
- react-helmet-async for SEO meta
- BookACallForm reusable component with zod validation, supports darkMode prop
- Dark contrast sections: hero, final CTA, footer use bg-foreground + text-background
- Light sections alternate between bg-background (white) and bg-secondary (light gray)

## Pages built
- Homepage, Contact, About, Reviews, Pricing, 8 service pages (ServicePageTemplate)
