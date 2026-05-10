import { Link } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle, ShieldCheck, Clock, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import TradesWeServe from "@/components/TradesWeServe";
import ScrollReveal from "@/components/ScrollReveal";
import FlowVisual from "@/components/FlowVisual";
import { MOCKUP_BY_SLUG } from "@/components/mockups/FeatureMockups";
import ConfiguratorWidget from "@/components/configurator/ConfiguratorWidget";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Is this actually going to work for me?",
    answer: "Depends. What I build is a foundation — a website that actually converts, automations that stop leads slipping through, a review funnel that compounds month over month. It's not magic. You still have to do good work, answer the phone when it rings, and keep running the basics every contractor should be running — Google Business, word of mouth, the occasional ad. This makes all of that work harder and pay better. It doesn't replace it. If you think you pay the monthly, close your eyes, and leads just appear, we're not a fit. I build the foundation. You still have to build the business.",
  },
  {
    question: "How is this different from the agency I already tried?",
    answer: "Four things. One — I only work with trades. Plumbers, roofers, HVAC, electricians. I don't touch restaurants or dentists. Two — you deal directly with me, not a junior account manager who's never held a wrench. Three — no contracts, ever. Cancel any month. Four — setup is free. If I can't get it working, you owe me nothing. Most agencies can't say any of that, let alone all four.",
  },
  {
    question: "Why is setup free and the monthly so low?",
    answer: "No catch. Setup is free because I only get paid once your systems are live and earning — I'm betting on myself, not on your deposit. The monthly stays low because I'm a solo operator who codes everything: no office, no junior account managers, no white-label platform charging me $200/mo per client and getting marked up to you. I'd rather keep you for years at a fair price than squeeze you for six months and watch you quit.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel any month, no fees, no questions. But here's the honest part — you lose everything I built. The website, the automations, the inbox, the review funnel, the follow-up system. All of it stops. You keep what was yours before we started: your Google Business profile, your old site if you had one, the reviews tied to your GMB. Nothing I built stays with you. That's the trade-off of free setup — if I don't charge you up front to build it, I can't let you walk away with it. Clean line: you pay, the system runs. You stop, the system stops. No contracts, no lock-ins, no hidden fees anywhere.",
  },
];

const HERO_BADGES = [
  { title: "No contracts. Ever.", desc: "Cancel any month, no fees." },
  { title: "Live in days.", desc: "7–10 days, not 6–12 weeks." },
  { title: "Trades only.", desc: "Every home service trade." },
];

const ALSO_INCLUDES = [
  { slug: "business-phone", label: "Business Line" },
  { slug: "local-seo", label: "Local SEO" },
  { slug: "automated-follow-up", label: "Automated Lead Follow-Up" },
];

const Index = () => {

  return (
    <>
      <Helmet>
        <title>VargaFlow — More Leads for Contractors. Done For You.</title>
        <meta name="description" content="Done-for-you marketing systems for home service contractors. Websites, automations, lead generation, and review funnels — built so you can stay on the job site." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "VargaFlow",
            "url": "https://vargaflow.com",
            "email": "kornel@vargaflow.com",
            "description": "Done-for-you marketing systems for home service contractors and tradespeople.",
          })}
        </script>
      </Helmet>

      {/* HERO — text-left, full-bleed flow as ambient atmosphere.
          Mobile uses the portrait variant; desktop uses the wide variant so all 4
          currents flow uninterrupted across the full hero. */}
      <section className="relative -mt-16 min-h-[500px] overflow-hidden bg-foreground lg:-mt-20 lg:min-h-[620px]">
        <div className="pointer-events-none absolute inset-0 opacity-55 lg:hidden">
          <FlowVisual />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden opacity-55 lg:block">
          <FlowVisual wide />
        </div>

        <div className="container relative z-10 pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* LEFT: Text + CTA + badges */}
            <div>
              <ScrollReveal>
                <div className="flex justify-start">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-background/70 sm:px-4 sm:text-xs sm:tracking-wider">
                    <Zap className="h-3.5 w-3.5" /> Done-for-you marketing for contractors
                  </div>
                </div>
                <h1 className="text-left text-4xl font-extrabold leading-[1.08] tracking-tight text-background md:text-5xl lg:text-6xl xl:text-7xl">
                  More Leads.
                  <br />
                  More Jobs.
                  <br />
                  Zero Agency BS.
                </h1>
                <p className="mt-6 max-w-xl text-left text-lg leading-relaxed text-background/60 md:text-xl">
                  I build the website, set up the automations, and handle the follow-up —
                  so your phone keeps ringing while you're out on the job site.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:justify-start">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-background px-6 py-4 text-base font-bold text-foreground transition-all hover:bg-background/90 sm:px-8 sm:text-lg"
                  >
                    Book Your Free Walkthrough <ArrowRight className="hidden h-5 w-5 sm:inline-block" />
                  </Link>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-semibold text-background/80">Free setup. You only pay once it's working.</span>
                    <span className="text-xs text-background/50">I only make money when you do.</span>
                  </div>
                </div>
                <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3 sm:gap-6">
                  {HERO_BADGES.map((b) => (
                    <div key={b.title} className="flex items-start justify-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-background/40" />
                      <div>
                        <p className="text-sm font-bold text-background">{b.title}</p>
                        <p className="mt-0.5 text-xs leading-snug text-background/60">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative bg-secondary py-20 lg:py-28">
        <div className="container relative max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              Most Jobs Are Lost
              <br />
              Before the Phone Rings.
            </h2>
            <p className="mx-auto mt-8 max-w-[720px] text-lg leading-relaxed text-muted-foreground">
              You missed a call while you were elbow-deep in a crawlspace. Your website was built by your nephew in 2017 — no chat, no click-to-call, just a contact form nobody fills out. Your Google reviews are stuck at 8. Three leads came in last week and you followed up two days later. They'd already hired someone else.
            </p>
            <p className="mt-6 text-lg font-semibold text-foreground">
              None of that's your fault — and it's exactly what I fix.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONFIGURATOR — the headliner demo, full interactive */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Interactive Demo
              </span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Configure Your Website.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Pick your trade, choose your color, type your name — watch your site build itself in real time.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-12">
              <ConfiguratorWidget />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Every site includes:</span>{" "}
              click-to-call <span className="mx-1 text-foreground/30">·</span> missed-call text-back <span className="mx-1 text-foreground/30">·</span> chat-to-SMS <span className="mx-1 text-foreground/30">·</span> mobile-first <span className="mx-1 text-foreground/30">·</span> SEO-ready <span className="mx-1 text-foreground/30">·</span> magic review funnel
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SYSTEMS IN ACTION — animated mockups carry the feature explanation */}
      <section className="bg-foreground py-20 lg:py-28">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-background/50">What I Build For You</span>
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                The Systems In Action.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-background/60">
                Some work the same day. Others compound over weeks and months. Together they replace paid lead sources with something you actually own.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 flex flex-col gap-20 lg:gap-24">
            {[
              {
                label: "5-Star Magic Review Funnel",
                desc: "Job's done. The system texts the customer asking for a review — and keeps politely asking until it lands, then stops the moment it does. Happy customers land on your Google page. Unhappy ones get routed to you privately, before anything goes public.",
                slug: "review-funnel",
              },
              {
                label: "Missed Call Text Back",
                desc: "You're on the ladder. A lead calls. You can't pick up. Within seconds, the system texts them back — before they've even had a chance to call the next contractor. The conversation starts. You jump in when you're off the ladder.",
                slug: "missed-call-text-back",
              },
              {
                label: "One-Click Marketing Campaigns",
                desc: "Add each customer when the job's done — ten seconds of work. The system handles the rest for a full year: review asks, then referral nudges with discount offers across the months. Past jobs quietly become your next jobs.",
                slug: "one-click-campaigns",
              },
              {
                label: "Website Chat Widget",
                desc: "A visitor types into the chat on your site — it comes straight to your phone as a text, with their number attached. You reply by SMS, they get it on their phone, and the conversation continues as a real text thread from there. No more dead contact forms nobody answers.",
                slug: "chat-widget",
              },
            ].map((demo, i) => {
              const Mockup = MOCKUP_BY_SLUG[demo.slug];
              const isWide = demo.slug === "functional-website" || demo.slug === "chat-widget";
              return (
                <ScrollReveal key={demo.label} delay={0.1}>
                  <div className={`flex flex-col items-center gap-10 lg:gap-16 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className={`w-full shrink-0 ${isWide ? "max-w-[280px] lg:max-w-[420px]" : "max-w-[200px] lg:max-w-[260px]"}`}>
                      {Mockup && <Mockup />}
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-xs font-bold uppercase tracking-widest text-background/50">Feature 0{i + 1}</p>
                      <h3 className="mt-3 text-2xl font-extrabold text-background lg:text-3xl">{demo.label}</h3>
                      <p className="mt-4 text-base leading-relaxed text-background/60 lg:text-lg">{demo.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Also includes — chip row for the abstract services */}
          <ScrollReveal delay={0.2}>
            <div className="mt-20 text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-background/50">Also Includes</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {ALSO_INCLUDES.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-background/15 bg-background/5 px-4 py-2 text-sm font-semibold text-background/80 transition-colors hover:bg-background/10 hover:text-background"
                  >
                    {s.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TRADES WE SERVE */}
      <TradesWeServe />

      {/* HOW IT WORKS */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">The Process</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Three Steps. Free Until You Keep It.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                You shouldn't have to take my word for it — so you don't.
              </p>
            </div>
          </ScrollReveal>

          {/* Steps with connectors */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                num: "1",
                title: "Walkthrough Call",
                time: "20 min",
                desc: "I show you the system end-to-end — website, automations, lead follow-up, all of it. You ask whatever you want. If it's not your thing, walk. If it is, we move to step two.",
              },
              {
                num: "2",
                title: "I Build It Out — Free",
                time: "7–10 days",
                desc: "Custom website, automations, review funnel, follow-up sequences — all wired up to your brand, your trade, your service area. I do the work. You stay on the job site. Costs you nothing yet.",
              },
              {
                num: "3",
                title: "Keep It Or Walk",
                time: "20 min",
                desc: "I walk you through the finished build — your branding, your services, working live. Like it? We wire it up to your domain and Google Business and you go live within the hour. Don't like it? Walk. Nothing owed.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div className="relative text-center">

                  {/* Dotted connector line — desktop only */}
                  {i < 2 && (
                    <div className="absolute left-[calc(50%+40px)] top-10 hidden w-[calc(100%-80px)] md:block"
                      style={{ borderTop: "2px dashed", borderColor: "hsl(var(--foreground) / 0.15)" }}
                    />
                  )}

                  {/* Numbered circle */}
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-foreground shadow-lg">
                    <span className="text-2xl font-extrabold text-background">{step.num}</span>
                  </div>

                  {/* Time badge */}
                  <div className="mt-4 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1">
                    <span className="text-xs font-bold text-muted-foreground">{step.time}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                See the Full Process <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <HelpCircle className="h-4 w-4" /> The Honest Answers
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                What You're Actually Wondering About.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                The questions every contractor asks before booking the call. Answered straight.
              </p>
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="rounded-lg border border-border bg-background px-5 data-[state=open]:border-foreground/20">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-foreground py-20 lg:py-28">
        <div className="container relative">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                Your Competition Is Already
                <br />
                Online and Getting Your Leads.
              </h2>
              <p className="mt-6 text-lg text-background/60">
                Book a free call. 20 minutes. I'll look at your current setup and show you exactly where
                you're losing leads — and how fast I can fix it.
              </p>
              <ul className="mt-8 flex flex-wrap justify-center gap-6">
                {[
                  { icon: CheckCircle, text: "No contracts or commitments" },
                  { icon: Clock, text: "Systems live in days" },
                  { icon: ShieldCheck, text: "Built for contractors only" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-background">
                    <item.icon className="h-5 w-5 shrink-0 text-background/40" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-base font-semibold text-background md:text-lg">
                $297 a month. Free until you keep it. No contracts.
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-background px-10 py-4 text-lg font-bold text-foreground transition-all hover:bg-background/90"
              >
                Claim Your Free Walkthrough <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default Index;
