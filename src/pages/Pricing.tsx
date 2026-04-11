import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
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
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                Simple Pricing
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                One Plan.
                <br />
                <span className="text-primary">Everything Included.</span>
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
                className="data-[state=checked]:bg-primary"
              />
              <span
                className={`text-sm font-semibold transition-colors ${
                  isAnnual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs font-bold text-primary">
                  <Sparkles className="h-3 w-3" />
                  Save ${savings}/year
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Card */}
          <ScrollReveal delay={0.15}>
            <div className="mx-auto mt-8 max-w-lg">
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-foreground shadow-2xl shadow-primary/10">

                {/* Free setup banner */}
                <div className="bg-primary py-3 text-center">
                  <p className="text-sm font-bold text-primary-foreground">
                    Free setup. You only pay once it's working.
                  </p>
                </div>

                <div className="pt-8 text-center">
                  <h2 className="text-2xl font-extrabold text-background md:text-3xl">
                    The Full System
                  </h2>
                  <p className="mt-1 text-sm text-background/50">Everything. One price. No surprises.</p>
                  <div className="mt-4">
                    <p className="text-5xl font-extrabold text-primary md:text-6xl">
                      ${currentPrice}
                      <span className="text-2xl font-bold text-background/50">/mo</span>
                    </p>
                    {isAnnual ? (
                      <p className="mt-2 text-sm font-medium text-background/50">
                        Billed annually (${annualTotal}/year)
                      </p>
                    ) : (
                      <p className="mt-2 text-sm font-medium text-background/50">
                        Billed monthly · Cancel anytime
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-10 mt-6 border-t border-background/10" />

                {/* Features */}
                <ul className="space-y-0 px-6 py-6 md:px-10">
                  {INCLUDED.map((entry) => (
                    <li
                      key={entry.item}
                      className="flex items-start gap-3 border-b border-background/10 py-4 last:border-0"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <span className="text-sm font-semibold text-background md:text-base">{entry.item}</span>
                        <p className="text-xs text-background/40">{entry.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-6 pb-10 md:px-10">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg bg-primary py-4 text-center text-lg font-extrabold text-primary-foreground transition-all hover:bg-gold-dark hover:shadow-lg"
                  >
                    Get Started — Free Strategy Call
                  </Link>
                  <p className="mt-3 text-center text-xs text-background/40">
                    No credit card required to book your call.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 90-DAY TIMELINE */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">What to Expect</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Honest Timeline.
                <span className="text-primary"> No Surprises.</span>
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
                color: "bg-primary",
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
                color: "bg-primary/70",
                title: "Reviews & rankings start building",
                items: [
                  "Google reviews adding up from completed jobs",
                  "Google Business Profile gaining traction in local searches",
                  "Past customers being re-engaged through one-click campaigns",
                ],
              },
              {
                period: "Month 3+",
                color: "bg-primary/40",
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
                <div className="flex gap-4 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`flex h-12 w-20 shrink-0 items-center justify-center rounded-lg ${phase.color} text-xs font-extrabold text-primary-foreground`}>
                      {phase.period}
                    </div>
                    {i < 2 && <div className="w-0.5 flex-1 bg-border" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <h3 className="text-base font-bold text-foreground">{phase.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
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
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
              Still Not Sure?
              <br />
              <span className="text-primary">Talk to Kornél for 20 Minutes.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-background/60">
              No pitch. No pressure. Just an honest look at your business and what's holding you back from more leads.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
            >
              Book Your Free Call <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default Pricing;
