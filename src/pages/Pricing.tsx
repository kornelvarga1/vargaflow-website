import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 297;
  const annualPricePerMonth = 247;
  const annualTotal = annualPricePerMonth * 12;

  const currentPrice = isAnnual ? annualPricePerMonth : monthlyPrice;
  const savings = isAnnual ? (monthlyPrice - annualPricePerMonth) * 12 : 0;

  return (
    <>
      <Helmet>
        <title>Pricing — VargaFlow</title>
        <meta
          name="description"
          content="One simple plan. $297/month or save with $247/month annual. Everything your contracting business needs to capture more leads and close more jobs."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Simple Pricing
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                One Plan.
                <br />
                Everything Included.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                No tiers. No hidden fees. No à la carte upsells. Just everything you need to stop losing leads — in one flat monthly rate.
              </p>
            </div>
          </ScrollReveal>

          {/* Toggle */}
          <ScrollReveal delay={0.1}>
            <div className="mx-auto mt-10 flex items-center justify-center gap-4">
              <span
                className={`text-sm font-semibold transition-colors ${
                  !isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-foreground"
              />
              <span
                className={`text-sm font-semibold transition-colors ${
                  isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Annual
              </span>
            </div>
          </ScrollReveal>

          {/* Card */}
          <ScrollReveal delay={0.15}>
            <div className="mx-auto mt-8 max-w-lg">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]">

                {/* Free setup banner */}
                <div className="bg-foreground py-3 text-center">
                  <p className="text-sm font-bold text-background">
                    Free setup. You only pay once it's working.
                  </p>
                </div>

                <div className="pt-8 text-center">
                  <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
                    The Full System
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">Everything. One price. No surprises.</p>
                  <div className="mt-4">
                    <p className="text-5xl font-extrabold text-foreground md:text-6xl">
                      ${currentPrice}
                      <span className="text-2xl font-bold text-muted-foreground">/mo</span>
                    </p>
                    {isAnnual ? (
                      <>
                        <p className="mt-2 text-sm font-medium text-muted-foreground">
                          Billed annually (${annualTotal}/year)
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground">
                          <Sparkles className="h-3 w-3" />
                          Save ${savings}/year
                        </span>
                      </>
                    ) : (
                      <p className="mt-2 text-sm font-medium text-muted-foreground">
                        Billed monthly · Cancel anytime
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-10 mt-6 border-t border-border" />

                {/* Features */}
                <ul className="space-y-0 px-6 py-6 md:px-10">
                  {INCLUDED.map((entry) => (
                    <li
                      key={entry.item}
                      className="flex items-start gap-3 border-b border-border py-4 last:border-0"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-semibold text-foreground md:text-base">{entry.item}</span>
                        <p className="text-xs text-muted-foreground">{entry.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-6 pb-10 md:px-10">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg bg-foreground py-4 text-center text-lg font-extrabold text-background transition-all hover:bg-foreground/90"
                  >
                    Get Started — Free Walkthrough
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    No credit card required to book your call.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Receptionist add-on */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Also Available
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-foreground md:text-4xl">
                Want an AI Receptionist Too?
              </h2>
              <p className="mt-4 text-muted-foreground">
                A separate product, priced on its own — not part of the plan above. Answers every call, books the job straight onto your calendar, never guesses when it doesn't know something.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                <PhoneCall className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-bold text-foreground">AI Receptionist Alone</h3>
                <p className="mt-3 text-4xl font-extrabold text-foreground">
                  $297<span className="text-xl font-bold text-muted-foreground">/mo</span>
                </p>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">
                  Just the AI receptionist, on its own — no website or CRM required.
                </p>
                <a href="tel:+12132385364" className="mt-6 text-sm font-semibold text-foreground hover:text-foreground/70">
                  Call the live demo: (213) 238-5364 →
                </a>
                <Link
                  to="/services/ai-receptionist"
                  className="mt-4 block w-full rounded-lg border border-border py-3 text-center text-sm font-bold text-foreground transition-colors hover:border-foreground/40"
                >
                  See How It Works
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative flex h-full flex-col rounded-2xl border-2 border-foreground bg-card p-8">
                <span className="absolute -top-3 left-8 rounded-full bg-foreground px-3 py-1 text-xs font-bold text-background">
                  Save $94/mo
                </span>
                <Sparkles className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-bold text-foreground">Full System + AI Receptionist</h3>
                <p className="mt-3 text-4xl font-extrabold text-foreground">
                  $500<span className="text-xl font-bold text-muted-foreground">/mo</span>
                </p>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">
                  Everything in the plan above, plus the AI receptionist — both for less than buying them separately.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 block w-full rounded-lg bg-foreground py-3 text-center text-sm font-bold text-background transition-all hover:bg-foreground/90"
                >
                  Book A Call
                </Link>
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
