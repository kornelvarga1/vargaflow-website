import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Wrench, Heart, CheckCircle, Zap } from "lucide-react";
import aboutFounder from "@/assets/about-founder.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About VargaFlow — Meet Kornél</title>
        <meta name="description" content="VargaFlow is run by Kornél Varga — systems-obsessed, and personally handles every client setup. Free setup, pay only if you're satisfied." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-12 lg:py-28">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
              No Big Agency.
              <br />
              No Account Managers.
              <br />
              <span className="text-primary">Just Kornél. And He's Good.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              VargaFlow is a one-person operation — and that's the point. You deal directly with the person who builds your systems, knows your setup inside out, and actually picks up the phone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Flow — category positioning */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative max-w-4xl text-center">
          <ScrollReveal>
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">How I See It</span>
            <h2 className="text-3xl font-extrabold leading-[1.1] text-background md:text-4xl lg:text-5xl">
              Every Contracting Business
              <br />
              <span className="text-primary">Runs on Flow.</span>
            </h2>
            <div className="mx-auto mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-background/70 md:text-lg">
              <p>
                Leads come in, get answered, turn into jobs, turn into reviews, turn into more leads. When one part jams — a missed call, a lead that sits for two days, a review that never gets asked for — the whole thing backs up. Fewer jobs. Fewer reviews. Phone stops ringing.
              </p>
              <p>
                Not because your work got worse. Because the flow broke.
              </p>
              <p className="text-lg font-semibold text-background md:text-xl">
                VargaFlow is what keeps it moving. Not an agency. Not a consultant. The system your business runs on — so you can keep doing what you're actually good at: the work.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Founder</span>
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                  Systems-Obsessed.
                  <br />
                  <span className="text-primary">Built for Trades.</span>
                </h2>
                <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    My name's Kornél. I started VargaFlow because I became genuinely obsessed with one thing: building systems that do the manual work for you. Automated follow-ups, websites that convert, review funnels that run themselves — the kind of leverage that lets a small business compete like a big one.
                  </p>
                  <p>
                    Contractors kept coming up as the most underserved market for exactly these tools. Hardworking people, great at their craft, getting completely ignored by overpriced agencies that lock them into 12-month contracts and disappear after the sale.
                  </p>
                  <p>
                    So I built the alternative. Lean. Personal. No fluff. I set everything up myself, I'm available directly, and I don't charge you a cent until you've seen it work and you're happy with it.
                  </p>
                  <p className="font-semibold text-foreground">
                    What I build compounds. More reviews, better rankings, more organic leads — until you're not paying Angi or Thumbtack a cent. Set it up once. Let it run. That's the deal.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={aboutFounder}
                      alt="Kornél Varga - Founder of VargaFlow"
                      className="h-72 w-72 object-cover object-[center_65%] lg:h-96 lg:w-96"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 via-transparent to-transparent p-6">
                      <div>
                        <p className="text-lg font-extrabold text-background">Kornél Varga</p>
                        <p className="text-sm text-primary">Founder, VargaFlow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Risk-Free Offer — the real trust builder */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl rounded-2xl border-2 border-primary/30 bg-background p-10 text-center shadow-xl shadow-primary/5">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                The Risk-Free Guarantee
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                I want to earn clients, not just sell them.
              </p>
              <div className="mx-auto mt-8 max-w-lg space-y-4 text-left">
                {[
                  "I build your full website and set up all the automations",
                  "You run it, test it, see the leads come in",
                  "If you're not genuinely satisfied — you pay nothing",
                  "If you love it, you move forward at the standard monthly rate",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-base text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Free setup is on me. I only make money when you do.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Claim Your Free Setup <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">How I Work</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Three Things I'll
                <span className="text-primary"> Never Compromise On</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Results or Nothing",
                desc: "I don't get paid to look busy. Every system I build has one job: get you more leads. If it doesn't, I fix it until it does.",
              },
              {
                icon: Wrench,
                title: "Contractors Only",
                desc: "I don't work with dentists, gyms, or restaurants. Only trades. That focus means I know exactly what works for your business.",
              },
              {
                icon: Heart,
                title: "Radical Honesty",
                desc: "If I can't help you, I'll tell you upfront. No contracts, no lock-ins, no small print. You stay because the results keep coming.",
              },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-lg border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl h-full">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-foreground">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
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
              Talk to Me Directly.
              <br />
              <span className="text-primary">No Gatekeepers. No Pitch.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-background/60">
              20 minutes. I'll look at your current setup and tell you honestly what's costing you leads — and whether I can fix it.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
            >
              Book a Call With Kornél <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default About;
