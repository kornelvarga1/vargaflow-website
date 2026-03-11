import { Link } from "react-router-dom";
import {
  Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap,
  ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Clock
} from "lucide-react";
import BookACallForm from "@/components/BookACallForm";
import { SERVICES } from "@/config/constants";
import { Helmet } from "react-helmet-async";
import heroBg from "@/assets/hero-bg.jpg";

const SERVICE_ICONS = [Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap];

const SERVICE_DESCRIPTIONS = [
  "A lead-generating website that works while you're on the job site.",
  "Never lose a lead to a missed call again. Automatic text-back in seconds.",
  "Texts, emails, DMs, voicemails — all in one place. No more juggling apps.",
  "Keep your personal number personal. One business line, every device.",
  "Actually show up when homeowners search for your trade on Google.",
  "Get more 5-star reviews automatically. Stop bad ones before they go public.",
  "Stay top of mind with past customers. One click, done.",
  "Leads go cold fast. We follow up for you — by text, automatically.",
];

const STEPS = [
  { num: "01", title: "Book A Call", desc: "Tell us about your business. 15 minutes. No sales pitch. Just figuring out if we can help.", icon: Phone },
  { num: "02", title: "We Build It", desc: "We set up your website, automations, and follow-up systems. You stay on the job site.", icon: ShieldCheck },
  { num: "03", title: "You Get Leads", desc: "Your phone starts ringing. Your reviews start growing. Your calendar fills up.", icon: TrendingUp },
];

const TESTIMONIALS = [
  { name: "Mike R.", business: "Roofing Contractor", quote: "I was losing half my leads to missed calls. Now every single one gets a text back automatically. Game changer." },
  { name: "Sarah T.", business: "Plumbing Company", quote: "We went from 12 Google reviews to 47 in three months. The review funnel basically runs itself." },
  { name: "Dave K.", business: "HVAC Specialist", quote: "I used to spend hours every week on marketing. Now I just check my inbox and the leads are there." },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Varga Flow — Marketing Systems That Actually Work for Contractors</title>
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
      <section className="relative min-h-[600px] overflow-hidden bg-foreground lg:min-h-[700px]">
        <div
          className="absolute inset-0 hidden bg-cover bg-center xl:block"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/70 xl:from-foreground xl:via-foreground/90 xl:to-foreground/60" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative z-10 flex flex-col justify-center py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="h-3.5 w-3.5" /> Marketing Systems for Contractors
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-background md:text-5xl lg:text-6xl xl:text-7xl">
              Marketing Systems
              <br />
              That Actually Work —
              <br />
              <span className="text-primary">Built for Contractors</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/60 md:text-xl">
              You're great at your trade. We're great at getting you leads.
              Done-for-you websites, automations, and follow-up systems — so you can stay on the job site and still win new business.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Book A Call <ArrowRight className="h-5 w-5" />
              </Link>
              <span className="text-sm text-background/50">Free 15-min strategy call. No pitch.</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-background/60">
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> No contracts</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> No agency BS</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Results in days, not months</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative bg-secondary py-20 lg:py-28">
        <div className="container relative max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Problem</span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            You're Great at Your Trade.
            <br />
            <span className="text-primary">But Leads Keep Slipping
            <br className="hidden sm:block" /> Through the Cracks.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            You're not losing jobs because of bad work. You're losing them because nobody picks up when you're elbow-deep in a crawlspace. Your website was built by your nephew in 2017. Your Google reviews are stuck at 8. And your "marketing strategy" is hoping the phone rings.
          </p>
          <p className="mt-4 text-lg font-semibold text-foreground">
            Sound familiar? Yeah. That's why we built Varga Flow.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Our Services</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              Everything You Need to
              <br />
              <span className="text-primary">Stop Losing Leads</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Eight systems. One platform. Zero headaches. Each one designed to solve a specific problem contractors face every single day.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Process</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              How It Works —{" "}
              <span className="text-primary">Dead Simple</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <StepIcon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/50">Step {step.num}</span>
                  <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Testimonials</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              Don't Take Our Word for It
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Here's what contractors are saying after switching to Varga Flow.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{t.quote}"</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — dark section */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Let's Go</span>
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                Ready to Stop
                <br />
                Losing Leads
                <br />
                <span className="text-primary">and Start Growing?</span>
              </h2>
              <p className="mt-6 text-lg text-background/60">
                Book a call. 15 minutes. No pitch. We'll look at your current setup and tell you exactly what's costing you leads — and how to fix it.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: CheckCircle, text: "No contracts or commitments" },
                  { icon: Clock, text: "See results in days, not months" },
                  { icon: ShieldCheck, text: "Built specifically for contractors" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-background">
                    <item.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BookACallForm darkMode className="rounded-lg border border-background/10 bg-background/5 p-6 backdrop-blur-sm lg:p-8" />
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Index;
