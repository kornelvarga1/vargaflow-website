import { Link } from "react-router-dom";
import {
  Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap,
  ArrowRight, CheckCircle
} from "lucide-react";
import BookACallForm from "@/components/BookACallForm";
import { SERVICES } from "@/config/constants";
import { Helmet } from "react-helmet-async";

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
  { num: "01", title: "Book A Call", desc: "Tell us about your business. 15 minutes. No sales pitch. Just figuring out if we can help." },
  { num: "02", title: "We Build It", desc: "We set up your website, automations, and follow-up systems. You stay on the job site." },
  { num: "03", title: "You Get Leads", desc: "Your phone starts ringing. Your reviews start growing. Your calendar fills up." },
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-background to-charcoal opacity-80" />
        <div className="container relative z-10 flex flex-col items-center py-20 text-center lg:py-32">
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Marketing Systems That
            <br className="hidden sm:block" />
            {" "}Actually Work —{" "}
            <span className="text-primary">Built for Contractors</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            You're great at your trade. We're great at getting you leads.
            Done-for-you websites, automations, and follow-up systems — so you can stay on the job site and still win new business.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
          >
            Book A Call <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> No contracts</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> No agency BS</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Results in days, not months</span>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            You're Great at Your Trade.
            <br />
            <span className="text-primary">But Leads Keep Slipping Through the Cracks.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            You're not losing jobs because of bad work. You're losing them because nobody picks up when you're elbow-deep in a crawlspace. Your website was built by your nephew in 2017. Your Google reviews are stuck at 8. And your "marketing strategy" is hoping the phone rings.
          </p>
          <p className="mt-4 text-lg font-semibold text-foreground">
            Sound familiar? Yeah. That's why we built Varga Flow.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Everything You Need to
              <br />
              <span className="text-primary">Stop Losing Leads</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Eight systems. One platform. Zero headaches. Each one designed to solve a specific problem contractors face every single day.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SERVICE_DESCRIPTIONS[i]}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              How It Works —{" "}
              <span className="text-primary">Dead Simple</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <span className="text-5xl font-extrabold text-primary/20">{step.num}</span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Don't Take Our Word for It
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Here's what contractors are saying after switching to Varga Flow.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-lg border border-border bg-card p-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Ready to Stop Losing Leads
                <br />
                <span className="text-primary">and Start Growing?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Book a call. 15 minutes. No pitch. We'll look at your current setup and tell you exactly what's costing you leads — and how to fix it.
              </p>
              <ul className="mt-6 space-y-3">
                {["No contracts or commitments", "See results in days, not months", "Built specifically for contractors"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BookACallForm className="rounded-lg border border-border bg-card p-6 lg:p-8" />
          </div>
        </div>
      </section>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Index;
