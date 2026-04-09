import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap,
  ArrowRight, CheckCircle, ShieldCheck, Clock, Timer, Wrench, Users
} from "lucide-react";
import { SERVICES } from "@/config/constants";
import { Helmet } from "react-helmet-async";
import heroBg from "@/assets/hero-bg.jpg";
import TradesWeServe from "@/components/TradesWeServe";
import ScrollReveal from "@/components/ScrollReveal";

const SERVICE_ICONS = [Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap];

// Lead with the pain each service solves, not just what it does
const SERVICE_DESCRIPTIONS = [
  "Stop losing jobs to contractors with a better-looking site. A fast, professional website that turns visitors into calls.",
  "Every missed call is a job you're giving to a competitor. We text leads back in seconds — automatically.",
  "Stop juggling texts, emails, DMs, and voicemails across five apps. One inbox. Everything in one place.",
  "Keep your personal number private. One business line that rings on every device you already own.",
  "Your best customers are searching Google right now. We make sure they find you — not the guy down the street.",
  "8 reviews is invisible. We automate the ask so reviews pile up without you lifting a finger.",
  "Your past customers are your easiest sales. One click sends a campaign to your whole list.",
  "Most leads go cold in under an hour. Our follow-up system reaches out automatically so you never lose one.",
];

const WHY_US = [
  {
    icon: Timer,
    title: "Live in Days, Not Months",
    desc: "Most agencies take 6–12 weeks to deliver anything. We have your systems running in days. Because leads don't wait.",
  },
  {
    icon: Wrench,
    title: "Contractors Only",
    desc: "We don't work with dentists, restaurants, or anyone else. Only trades. That focus is what makes our systems actually work.",
  },
  {
    icon: Users,
    title: "No Contracts. Ever.",
    desc: "Month-to-month, always. No 12-month lock-ins, no cancellation fees. We earn your business every single month or you walk.",
  },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Varga Flow — More Leads for Contractors. Done For You.</title>
        <meta name="description" content="Done-for-you marketing systems for home service contractors. Websites, automations, lead generation, and review funnels — built so you can stay on the job site." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Varga Flow",
            "url": "https://vargaflow.com",
            "email": "kornel@vargaflow.com",
            "description": "Done-for-you marketing systems for home service contractors and tradespeople.",
          })}
        </script>
      </Helmet>

      {/* HERO — dark section for impact */}
      <section className="relative -mt-16 min-h-[500px] overflow-hidden bg-foreground lg:-mt-20 lg:min-h-[700px]">
        <div
          className="absolute inset-x-0 -top-[30%] h-[160%] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})`, transform: `translateY(${scrollY * 0.3}px)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80 lg:from-foreground lg:via-foreground/90 lg:to-foreground/60" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative z-10 flex flex-col justify-center pt-32 pb-16 lg:pt-56 lg:pb-36">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Zap className="h-3.5 w-3.5" /> Done-for-you marketing for contractors
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-background md:text-5xl lg:text-6xl xl:text-7xl">
                More Leads.
                <br />
                More Jobs.
                <br />
                <span className="text-primary">Zero Extra Work.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/60 md:text-xl">
                We build the website, set up the automations, and handle the follow-up —
                so your phone keeps ringing while you're out on the job site.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  Get a Free Strategy Call <ArrowRight className="h-5 w-5" />
                </Link>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-background/80">First clients get a free setup.</span>
                  <span className="text-xs text-background/50">Pay only if you love it. No obligation.</span>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-background/60">
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> No contracts</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Live in days</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Built for trades only</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FREE SETUP STRIP */}
      <div className="bg-primary px-4 py-4">
        <div className="container flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-3">
          <span className="text-sm font-extrabold uppercase tracking-wide text-primary-foreground">
            🎉 Limited Offer for First Clients
          </span>
          <span className="hidden text-primary-foreground/60 sm:inline">—</span>
          <span className="text-sm text-primary-foreground/90">
            We build your full website and set up all the systems. You pay nothing until you see it working — and only if you love it.
          </span>
          <Link
            to="/contact"
            className="mt-2 shrink-0 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary-foreground/20 sm:mt-0"
          >
            Claim Free Setup →
          </Link>
        </div>
      </div>

      {/* PROBLEM SECTION */}
      <section className="relative bg-secondary py-20 lg:py-28">
        <div className="container relative max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              You're Not Losing Jobs
              <br />
              Because of Bad Work.
              <br />
              <span className="text-primary">You're Losing Them Before You Even Know About It.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              You missed a call while you were elbow-deep in a crawlspace. Your website was built by your nephew in 2017 — no chat, no click-to-call, just a contact form nobody fills out. Your Google reviews are stuck at 8. Three leads came in last week and you followed up two days later. They'd already hired someone else.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
              Meanwhile you're paying Angi or Thumbtack for leads every month — and building absolutely nothing. No rankings. No reviews. No asset. Just a recurring bill.
            </p>
            <p className="mt-6 text-lg font-semibold text-foreground">
              None of that is your fault. You're a contractor, not a marketing agency. That's exactly why we built Varga Flow.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">What We Build For You</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Eight Systems.
                <br />
                <span className="text-primary">One Platform. Zero Headaches.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Some work the same day. Others compound over weeks and months. Together they replace paid lead sources with something you actually own.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <ScrollReveal key={service.slug} delay={i * 0.05}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group relative block overflow-hidden rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-foreground transition-colors group-hover:text-primary">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SERVICE_DESCRIPTIONS[i]}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY VARGA FLOW */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Why Varga Flow</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Not Another Agency
                <br />
                <span className="text-primary">That Overpromises and Disappears</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 h-full">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRADES WE SERVE */}
      <TradesWeServe />

      {/* HOW IT WORKS */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Process</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Three Steps.{" "}
                <span className="text-primary">That's It.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                We keep it simple because you're busy enough.
              </p>
            </div>
          </ScrollReveal>

          {/* Steps with connectors */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                num: "1",
                title: "Strategy Call",
                time: "20 min",
                desc: "Tell us about your business. No pitch, no pressure — just figuring out exactly where you're losing leads and what to fix first.",
              },
              {
                num: "2",
                title: "We Build Everything",
                time: "7–10 days",
                desc: "Website, automations, review funnel, follow-up sequences — all set up and tested. You stay on the job site. We handle it all.",
              },
              {
                num: "3",
                title: "Launch & Go Live",
                time: "20 min",
                desc: "We walk you through everything, flip the switch, and your systems go live. From this point on, leads start coming in automatically.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="relative text-center">

                  {/* Dotted connector line — desktop only */}
                  {i < 2 && (
                    <div className="absolute left-[calc(50%+40px)] top-10 hidden w-[calc(100%-80px)] md:block"
                      style={{ borderTop: "2px dashed", borderColor: "hsl(var(--primary) / 0.25)" }}
                    />
                  )}

                  {/* Numbered circle */}
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <span className="text-2xl font-extrabold text-primary-foreground">{step.num}</span>
                  </div>

                  {/* Time badge */}
                  <div className="mt-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                    <span className="text-xs font-bold text-primary">{step.time}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                Your Competition Is Already
                <br />
                <span className="text-primary">Online and Getting Your Leads.</span>
              </h2>
              <p className="mt-6 text-lg text-background/60">
                Book a free call. 20 minutes. We'll look at your current setup and show you exactly where
                you're losing leads — and how fast we can fix it.
              </p>
              <ul className="mt-8 flex flex-wrap justify-center gap-6">
                {[
                  { icon: CheckCircle, text: "No contracts or commitments" },
                  { icon: Clock, text: "Systems live in days" },
                  { icon: ShieldCheck, text: "Built for contractors only" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-background">
                    <item.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Claim Your Free Strategy Call <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-4 lg:hidden" />
    </>
  );
};

export default Index;
