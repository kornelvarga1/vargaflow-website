import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Wrench, Heart, Users, TrendingUp, Zap } from "lucide-react";
import aboutBg from "@/assets/about-bg.jpg";
import aboutFounder from "@/assets/about-founder.jpg";

const STATS = [
  { icon: Users, value: "100+", label: "Contractors Served" },
  { icon: TrendingUp, value: "3x", label: "Avg. Lead Increase" },
  { icon: Zap, value: "< 7 Days", label: "Setup Time" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Varga Flow — Marketing Systems Built for Contractors</title>
        <meta name="description" content="Varga Flow was built by Kornél Varga after seeing too many skilled tradespeople lose leads to bad marketing. Our mission: give contractors the same tools big companies use." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-12 lg:py-28">
        {/* Mobile hero image */}
        <div className="absolute inset-0 lg:hidden">
          <img src={aboutBg} alt="" className="h-full w-full object-cover opacity-10" />
        </div>
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">About Us</span>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
            We Don't Do
            <br />
            Marketing Fluff.
            <br />
            <span className="text-primary">We Build Systems That Work.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Varga Flow helps home service contractors and tradespeople grow their business with simple, done-for-you marketing systems. We build the website, set up the automations, and handle the follow-up — so you can stay on the job site and still win new business.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-t border-border bg-secondary">
        <div className="container">
          <div className="grid grid-cols-3 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 py-8 lg:flex-row lg:justify-center lg:gap-4 lg:py-10">
                <stat.icon className="h-6 w-6 text-primary lg:h-7 lg:w-7" />
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-extrabold text-foreground lg:text-3xl">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground lg:text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Founder</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                The Guy Behind
                <br />
                <span className="text-primary">Varga Flow</span>
              </h2>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
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
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={aboutFounder}
                    alt="Kornél Varga - Founder of Varga Flow"
                    className="h-72 w-72 object-cover object-[center_65%] lg:h-96 lg:w-96"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 via-transparent to-transparent p-6">
                    <div>
                      <p className="text-lg font-extrabold text-background">Kornél Varga</p>
                      <p className="text-sm text-primary">Founder, Varga Flow</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Our Values</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              What We Actually
              <span className="text-primary"> Stand For</span>
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { icon: Target, title: "No Fluff", desc: "Every system we build has one job: get you more leads. If it doesn't move the needle, we don't do it." },
              { icon: Wrench, title: "Built for Trades", desc: "We don't work with restaurants or dentists. We work with contractors. That's it. We know the business inside and out." },
              { icon: Heart, title: "Honest Always", desc: "If we can't help you, we'll tell you. No contracts. No lock-ins. No small print. We earn your business every month." },
            ].map((value) => (
              <div key={value.title} className="group relative overflow-hidden rounded-lg border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
                <div className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Let's Talk</span>
          <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
            Ready to See What
            <br />
            <span className="text-primary">Proper Marketing Looks Like?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-background/60">
            20 minutes. No pitch. Just a conversation about your business and where you're leaving money on the table.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
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
