import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Sparkles, ArrowRight, PhoneCall, Blocks } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const INCLUDED = [
  { item: "Functional Website (10–20 pages)", note: "Built and hosted for you" },
  { item: "Missed Call Text Back", note: "Automatic reply in seconds" },
  { item: "Automated Lead Follow Up", note: "Texts leads before they go cold" },
  { item: "5-Star Review Funnel", note: "Grows your Google reviews on autopilot" },
  { item: "Business Phone Line", note: "Separate from your personal number" },
  { item: "Local SEO Setup", note: "So Google can actually find you" },
  { item: "One-Click Campaigns", note: "Re-engage past customers instantly" },
];

const AI_RECEPTIONIST_INCLUDED = [
  { item: "Answers Every Call", note: "24/7, never misses one" },
  { item: "Books Straight to Your Calendar", note: "Real appointments, not just messages" },
  { item: "Never Guesses", note: "Flags anything it's not sure about" },
  { item: "Works Completely On Its Own", note: "No website or CRM required" },
];

const BUNDLE_INCLUDED = [
  { item: "Everything in Foundation", note: "The full website + CRM system" },
  { item: "Plus the AI Receptionist", note: "Answers every call, books the job" },
  { item: "One Bill, Not Two", note: "$100/mo cheaper than buying separately" },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing — VargaFlow</title>
        <meta
          name="description"
          content="Foundation ($300/mo), AI Receptionist ($300/mo), or the bundle ($500/mo). Flat monthly rates, no contracts, no hidden fees."
        />
      </Helmet>

      {/* Hero + Pricing */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Simple Pricing
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                Simple Pricing.
                <br />
                Pick What Fits.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                No hidden fees. No à la carte upsells. Three options, all flat monthly rates, no contracts.
              </p>
            </div>
          </ScrollReveal>

          {/* Three cards, side by side */}
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
            {/* Foundation */}
            <ScrollReveal delay={0.05}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]">
                <div className="pt-8 text-center">
                  <Blocks className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                  <h2 className="mt-4 text-2xl font-extrabold text-foreground">Foundation</h2>
                  <p className="mt-1 text-sm text-muted-foreground">The full website + CRM system</p>
                  <div className="mt-4">
                    <p className="text-4xl font-extrabold text-foreground md:text-5xl">
                      $300
                      <span className="text-xl font-bold text-muted-foreground">/mo</span>
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      Billed monthly · Cancel anytime
                    </p>
                  </div>
                </div>

                <div className="mx-8 mt-6 border-t border-border" />

                <ul className="flex-1 space-y-0 px-6 py-6">
                  {INCLUDED.map((entry) => (
                    <li
                      key={entry.item}
                      className="flex items-start gap-3 border-b border-border py-3 last:border-0"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{entry.item}</span>
                        <p className="text-xs text-muted-foreground">{entry.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="px-6 pb-8">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg bg-foreground py-4 text-center text-base font-extrabold text-background transition-all hover:bg-foreground/90"
                  >
                    Get Started — Free Walkthrough
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    No credit card required to book your call.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* AI Receptionist */}
            <ScrollReveal delay={0.1}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]">
                <div className="pt-8 text-center">
                  <PhoneCall className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                  <h2 className="mt-4 text-2xl font-extrabold text-foreground">AI Receptionist</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Answers every call, books the job</p>
                  <div className="mt-4">
                    <p className="text-4xl font-extrabold text-foreground md:text-5xl">
                      $300
                      <span className="text-xl font-bold text-muted-foreground">/mo</span>
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      Billed monthly · Cancel anytime
                    </p>
                  </div>
                </div>

                <div className="mx-8 mt-6 border-t border-border" />

                <ul className="flex-1 space-y-0 px-6 py-6">
                  {AI_RECEPTIONIST_INCLUDED.map((entry) => (
                    <li
                      key={entry.item}
                      className="flex items-start gap-3 border-b border-border py-3 last:border-0"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{entry.item}</span>
                        <p className="text-xs text-muted-foreground">{entry.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="px-6 pb-8">
                  <a
                    href="tel:+12132385364"
                    className="block text-center text-sm font-semibold text-foreground hover:text-foreground/70"
                  >
                    Call the live demo: (213) 238-5364 →
                  </a>
                  <Link
                    to="/services/ai-receptionist"
                    className="mt-4 block w-full rounded-lg border border-border py-3 text-center text-sm font-bold text-foreground transition-colors hover:border-foreground/40"
                  >
                    See How It Works
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Bundle */}
            <ScrollReveal delay={0.15}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-xl shadow-foreground/[0.04]">
                <span className="absolute left-8 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">
                  Save $100/mo
                </span>
                <div className="pt-8 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                  <h2 className="mt-4 text-2xl font-extrabold text-foreground">Bundle</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Foundation + AI Receptionist</p>
                  <div className="mt-4">
                    <p className="text-4xl font-extrabold text-foreground md:text-5xl">
                      $500
                      <span className="text-xl font-bold text-muted-foreground">/mo</span>
                    </p>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      Billed monthly · Cancel anytime
                    </p>
                  </div>
                </div>

                <div className="mx-8 mt-6 border-t border-border" />

                <ul className="flex-1 space-y-0 px-6 py-6">
                  {BUNDLE_INCLUDED.map((entry) => (
                    <li
                      key={entry.item}
                      className="flex items-start gap-3 border-b border-border py-3 last:border-0"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{entry.item}</span>
                        <p className="text-xs text-muted-foreground">{entry.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="px-6 pb-8">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg bg-foreground py-4 text-center text-base font-extrabold text-background transition-all hover:bg-foreground/90"
                  >
                    Book A Call
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 90-DAY TIMELINE */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">What to Expect</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Honest Timeline. No Surprises.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Some of it works the day I flip the switch. The rest compounds over time. Here's exactly what to expect.
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {[
              {
                period: "Day 1",
                color: "bg-foreground",
                title: "Everything goes live — after 7–10 days of setup",
                items: [
                  "Website live with click-to-call and a chat widget that turns into a real SMS conversation",
                  "Missed call text-back active — every missed call gets an instant reply",
                  "Lead follow-up running — new leads get texted within 60 seconds",
                  "Review requests going out automatically after each job",
                  "Business phone line active — personal number stays private",
                ],
              },
              {
                period: "Month 1–3",
                color: "bg-foreground/70",
                title: "Reviews & rankings start building",
                items: [
                  "Google reviews adding up from completed jobs",
                  "Google Business Profile gaining traction in local searches",
                  "Past customers being re-engaged through one-click campaigns",
                ],
              },
              {
                period: "Month 3+",
                color: "bg-foreground/40",
                title: "The system compounds — working for you every day",
                items: [
                  "Improved Google Maps visibility as reviews and signals build",
                  "Organic leads from your own Google presence — not pay-per-lead marketplaces",
                  "Reviews and SEO stacking month over month",
                  "Less dependence on paid lead platforms like Angi or Thumbtack",
                ],
              },
            ].map((phase, i) => (
              <ScrollReveal key={phase.period} delay={i * 0.08}>
                <div className="flex gap-4 rounded-xl border border-border bg-background p-6 transition-all hover:border-foreground/30 hover:shadow-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`flex h-12 w-20 shrink-0 items-center justify-center rounded-lg ${phase.color} text-xs font-extrabold text-background`}>
                      {phase.period}
                    </div>
                    {i < 2 && <div className="w-0.5 flex-1 bg-border" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="text-base font-bold text-foreground">{phase.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-foreground py-20 lg:py-28">
        <div className="container relative text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
              Still Not Sure?
              <br />
              Talk to Kornél for 20 Minutes.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-background/60">
              Straight talk, no pressure. Just an honest look at your business and what's holding you back from more leads.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-8 py-4 text-lg font-bold text-foreground transition-all hover:bg-background/90"
            >
              Book Your Free Walkthrough <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default Pricing;
