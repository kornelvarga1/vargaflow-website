import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const INCLUDED = [
  "Functional Website (10–20 pages)",
  "Automated Lead Follow Up",
  "Missed Call Text Back",
  "5-Star Magic Review Funnel",
  "One-Click Marketing Campaigns",
  "Local SEO",
  "All-In-One Inbox",
  "Business Phone",
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
        <title>Pricing — Varga Flow</title>
        <meta
          name="description"
          content="One simple plan. $297/month or save with $247/month annual. Everything your contracting business needs to capture more leads and close more jobs."
        />
      </Helmet>

      <section className="bg-background py-20 lg:py-32">
        <div className="container">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Simple Pricing
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
              Our Pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              No tiers. No hidden fees. One plan that covers everything.
            </p>
          </div>

          {/* Toggle */}
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

          {/* Card */}
          <div className="mx-auto mt-8 max-w-lg">
            <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-foreground shadow-2xl shadow-primary/10">
              {/* Badge */}
              <div className="pt-10 text-center">
                <span className="inline-block border-b-2 border-background/20 pb-1 text-sm font-extrabold uppercase tracking-widest text-background/70">
                  Most Popular
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-background md:text-3xl">
                  Contractor Advanced
                </h2>
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
                      Billed monthly
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-10 mt-6 border-t border-background/10" />

              {/* Features */}
              <ul className="space-y-0 px-6 py-6 md:px-10">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-background/10 py-4 last:border-0"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-semibold text-background md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-6 pb-10 md:px-10">
                <Link
                  to="/contact"
                  className="block w-full rounded-lg bg-primary py-4 text-center text-lg font-extrabold text-primary-foreground transition-all hover:bg-gold-dark hover:shadow-lg"
                >
                  BOOK A CALL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Pricing;
