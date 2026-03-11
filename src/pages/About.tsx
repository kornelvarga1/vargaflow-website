import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Wrench, Heart } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Varga Flow — Marketing Systems Built for Contractors</title>
        <meta name="description" content="Varga Flow was built by Kornél Varga after seeing too many skilled tradespeople lose leads to bad marketing. Our mission: give contractors the same tools big companies use." />
      </Helmet>

      {/* Hero */}
      <section className="bg-navy-deep py-16 lg:py-24">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl">
            We Don't Do Marketing Fluff.
            <br />
            <span className="text-primary">We Build Systems That Work.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Varga Flow helps home service contractors and tradespeople grow their business with simple, done-for-you marketing systems. We build the website, set up the automations, and handle the follow-up — so you can stay on the job site and still win new business.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                The Guy Behind
                <br />
                <span className="text-primary">Varga Flow</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Kornél Varga built Varga Flow after seeing how many skilled tradespeople were losing leads and leaving money on the table — not because of bad work, but because of bad marketing.
                </p>
                <p>
                  The electrician who does flawless work but has 6 Google reviews. The plumber whose website looks like it was built in 2009 (because it was). The roofer who misses three calls a day because he's on a ladder. Sound familiar?
                </p>
                <p>
                  These guys are incredible at their trade. They just never had the tools — or the time — to market themselves properly. And the "marketing agencies" they've tried? Overpriced. Overcomplicated. Underwhelming.
                </p>
                <p className="text-foreground font-semibold">
                  The mission was simple: give contractors the same marketing tools big companies use, at a price that actually makes sense. No fluff. No agency BS. Just systems that work.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex h-72 w-72 items-center justify-center rounded-lg border border-border bg-secondary lg:h-80 lg:w-80">
                <div className="text-center">
                  <span className="text-6xl font-extrabold text-primary">KV</span>
                  <p className="mt-2 text-sm text-muted-foreground">Photo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              What We Actually
              <span className="text-primary"> Stand For</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <Target className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">No Fluff</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every system we build has one job: get you more leads. If it doesn't move the needle, we don't do it.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <Wrench className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Built for Trades</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We don't work with restaurants or dentists. We work with contractors. That's it. We know the business inside and out.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <Heart className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Honest Always</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If we can't help you, we'll tell you. No contracts. No lock-ins. No small print. We earn your business every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            Ready to See What
            <br />
            <span className="text-primary">Proper Marketing Looks Like?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            15 minutes. No pitch. Just a conversation about your business and where you're leaving money on the table.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
          >
            Book A Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default About;
