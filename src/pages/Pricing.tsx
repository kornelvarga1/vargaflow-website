import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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
  return (
    <>
      <Helmet>
        <title>Pricing — Varga Flow</title>
        <meta
          name="description"
          content="One simple plan. $297/month. Everything your contracting business needs to capture more leads and close more jobs."
        />
      </Helmet>

      <section className="bg-navy-deep py-20 lg:py-32">
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

          {/* Card */}
          <div className="mx-auto mt-14 max-w-lg">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary shadow-2xl shadow-primary/20">
              {/* Badge */}
              <div className="pt-10 text-center">
                <span className="inline-block border-b-2 border-primary-foreground/40 pb-1 text-sm font-extrabold uppercase tracking-widest text-primary-foreground/90">
                  Most Popular
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-primary-foreground md:text-3xl">
                  Contractor Advanced
                </h2>
                <p className="mt-4 text-5xl font-extrabold text-primary-foreground md:text-6xl">
                  $297<span className="text-2xl font-bold text-primary-foreground/70">/mo</span>
                </p>
              </div>

              {/* Divider */}
              <div className="mx-10 mt-8 border-t border-primary-foreground/20" />

              {/* Features */}
              <ul className="space-y-0 px-6 py-6 md:px-10">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-primary-foreground/10 py-4 last:border-0"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary-foreground/80" />
                    <span className="text-sm font-semibold text-primary-foreground md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-6 pb-10 md:px-10">
                <Link
                  to="/contact"
                  className="block w-full rounded-lg bg-primary-foreground py-4 text-center text-lg font-extrabold text-primary transition-all hover:opacity-90 hover:shadow-lg"
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
