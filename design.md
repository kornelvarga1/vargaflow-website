# vargaflow-website — Design Notes

> Originally captured 2026-04-22 as a "premium redesign brief." Updated same day after auditing the actual site. **Verdict shifted: don't redesign — do three small tactical fixes.** Full redesign brief preserved at the bottom for if/when you change your mind.

---

## ⚡ Status — read this first

The Claude.ai-style premium redesign **isn't needed**. The site already lives in that zone. Audit findings:

- Restrained palette (white + warm gold, no gradients/bling)
- Generous whitespace, subtle motion (Framer Motion scroll reveal + parallax)
- Plain-English founder-led copy ("Zero Agency BS", "elbow-deep in a crawlspace")
- 16 named trades with custom icons, custom mockups (not screenshots)
- Long FAQ answers handling real objections
- Lighthouse SEO already 100, mobile-first responsive
- Tonal lean (per audit): **"Premium-calm, leaning Claude.ai/Linear/Stripe aesthetic"** — already

The current site does the job. A full design system migration would be polish-on-polish with one real risk (see "Why not a full redesign" below).

---

## 🎯 The two tactical wins

These are the actual conversion gaps. Prioritized.

> ~~**1. Wire up the StickyMobileCTA**~~ — Scratched. `Navbar.tsx:57–63` already renders a mobile-only "Free Call" button on a sticky header, linking to `/contact`. The standalone `StickyMobileCTA.tsx` would have been a redundant second CTA at the bottom pointing to the same place. File has been deleted as cleanup.

### 1. Surface pricing on the home page ✅ Done (2026-04-30)
Now lives as a one-liner above the Final CTA: **"$297 a month. Free until you keep it. No contracts."** Definite price (not "from"), since there's effectively one plan with two billing cadences. Annual savings stay a `/pricing` reveal.

### 2. ~~Build a comparison table~~ — Deferred (2026-04-30)
Was the highest-leverage net-new module when this doc was written, but several improvements landed since that closed the same gap a different way:

- **`/how-it-works`** is now a whole page dedicated to differentiation (free-until-you-keep-it, philosophy section, objection-handling FAQ).
- **Configurator embedded on the homepage** does the visceral "here's what you get" job that a static comparison row tries to teach.
- **Homepage FAQ #2** ("How is this different from the agency I already tried?") already lays out the four-point agency contrast in plain copy.

The original DIY/Agency/VargaFlow framing is preserved below in case a specific objection surfaces with a real prospect — at which point a focused comparison module addressing that real objection would be more useful than a preemptive generic one.

| | DIY / Nephew's site | Marketing agency | VargaFlow |
|---|---|---|---|
| Setup cost | Free (your weekend) | $3k–5k upfront | Free |
| Monthly | $0 | $1k–3k | $297 |
| Lock-in | None | 6–12 months | None |
| Knows trades? | You do | Maybe | Built for it |
| Who you talk to | You | Account manager | Kornél |
| Time to live | Months | 4–8 weeks | 7–10 days |

> Optional 4th column: vs Angi/Thumbtack ("paying for leads, building nothing"). Already mentioned in copy.

---

## 🚧 Why not a full redesign

The audit's strongest finding:

> "If a contractor closes the tab after 30 seconds, what will they remember? **'This guy personally builds your whole site and marketing system, you don't pay a cent until it works.' The most distinctive element is founder presence and personal accountability.**"

That's the differentiator. A more polished Linear/Stripe-ification would risk washing it out. Premium-restrained is good; premium-restrained at the cost of "Kornél personally is the business" is a bad trade. The current site is warm-personal-confident. Going more polished could make it feel corporate-impersonal-confident, which is what every other agency site already is.

Don't fix what's already the moat.

---

## ✅ What's already working (don't touch)

Snapshot from the audit so you don't accidentally regress these in future polish passes:

- **Hero** — `"More Leads. More Jobs. Zero Agency BS."` + subhead about phone ringing while you're on the job site
- **Founder voice** — Kornél's name, face, story present across all pages. Direct phone line. Personal money-back framing.
- **Problem section** — Specific contractor pain (nephew's 2017 site, Angi tax, two-day follow-up lag)
- **FAQ** — 6 questions, long honest answers including economics breakdown ("solo operator, no VPs, white-label markup that doesn't exist in my pricing")
- **No vibe-coded patterns** — zero countdown timers, fake "AS SEEN ON" logos, animated number counters, or exit popups
- **Custom mockups in features** — actual rendered React components, not screenshots
- **Trade specificity** — 16 trades, custom icons, signals real specialization
- **Pricing transparency** — single tier ($297/mo or $247 annual), no hidden fees, no à la carte upsells (on the pricing page itself)

---

## 📚 Reference material — for if/when you DO expand

Everything below is preserved from the original redesign brief. None of it is needed today, but if a specific module gets built (comparison table, new feature block, full pricing module) the patterns and references are worth pulling from.

### Reference sites (study before any module work)

| Site | What to steal |
|---|---|
| **linear.app** | Hero typography scale, alternating dark/light section bands, comparison-table conventions, video product demos in feature blocks |
| **stripe.com** | Generous serif headlines, illustrated diagrams over photos, "Trusted by" logo band pattern |
| **vercel.com** | Asymmetric grid layouts, terminal/code blocks as visual elements, monochrome photography |
| **anthropic.com** | Closest tonal match to the product redesign — same warm palette, same calm. Pricing page especially |
| **plain.com** | Best-in-class B2B SaaS landing for a small team — calm, confident, every section earns its space |
| **stonesystems.io** | Direct competitor Kornél already references for copy patterns |

### Module patterns (kit)

Modules NOT currently on the site that may eventually be worth adding:

- **Comparison table** (the priority — see tactical win #3)
- **Trust band / logo strip** — once enough customers exist, replace the current trust strip with logo marks. Until then, the founder-voice strip is fine.
- **Testimonials with photos / video** — currently `/reviews` is noindex with "Results Are Being Written Right Now." Once 3+ real testimonials with permission exist, build a proper testimonials section + un-noindex the page.
- **Per-trade landing pages** — current `/services/:slug` covers services. A `/trades/:slug` set ("Marketing for Roofers", "Marketing for Plumbers") could be a long-tail SEO play if you're chasing organic traffic. Not urgent.
- **Case studies** — single-page deep dives ("How [Roofer] booked 12 extra jobs in 60 days") are the highest-trust content type. Only possible once results exist.

### Design system migration (defer until needed)

If a future redesign DOES happen, the foundation work would be:

1. Copy `vargaflow-client/src/index.css` token values (warm light + dark mode tokens — though current site is light-only and that's fine for marketing)
2. Add `font-serif: ["'Source Serif 4'", ...]` to `tailwind.config.ts` and load via Google Fonts in `index.html` (current site uses Inter throughout — sans-only is also valid for marketing, see Vercel)
3. Apply `font-serif` to hero + section headlines if you want the Anthropic look

This is a half-day token swap, then maybe a day re-touching individual components. NOT recommended right now.

### What NOT to do (still applies)

- Don't copy product chrome wholesale (no slim left rail, no floating tab bar — marketing is top-nav + scroll)
- Don't go cold-minimal — the warmth is part of the brand
- Don't add direct-response patterns: countdown timers, "Limited spots", exit-intent popups, fake urgency, chat widget pretending to be human, "AS SEEN ON" badges
- Don't put orange anywhere outside primary CTAs

---

## Open questions (still relevant if anything DOES change)

1. **Light or dark default?** Current site is light. Linear is dark, Stripe is light, both work. Toggle is overkill for marketing.
2. **Real product screenshots in feature sections?** Now that the product apps just got the premium redesign, capturing them in mock browser chrome would be cheap free polish if you ever want to swap the current custom mockups.
3. **Should `/reviews` un-noindex?** Gated on having real customer testimonials. Until then, current "Results Are Being Written Right Now" is honest but signals low trust at first touch.

---

## Quick start for next session

Both original tactical wins are now resolved (price surfaced, comparison table deferred for the reasons above). If you're picking this up:

1. Re-read the status block at the top of this doc
2. The reference material section is for if/when you build a specific module from the kit (testimonials, per-trade landing pages, case studies — all gated on having real client results)
3. New work should be reactive: a real prospect objection or a specific module need, not preemptive completeness

---

## Status

- [x] Original brief captured
- [x] Site audited
- [x] Verdict revised: tactical fixes only, no full redesign
- [x] StickyMobileCTA cleared — Navbar already covers it; dead file removed
- [x] Pricing surfaced on home — `$297 a month. Free until you keep it. No contracts.` above Final CTA
- [x] Comparison table — deferred, gap closed via `/how-it-works`, homepage configurator embed, and existing FAQ
- [ ] (Deferred) full design system migration — only if specific objection surfaces later
