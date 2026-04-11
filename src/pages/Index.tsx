import { Link } from "react-router-dom";
import ParallaxBg from "@/components/shared/ParallaxBg";
import {
  Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap,
  ArrowRight, CheckCircle, ShieldCheck, Clock, Timer, Wrench, Users, DollarSign, HelpCircle
} from "lucide-react";
import { SERVICES } from "@/config/constants";
import { Helmet } from "react-helmet-async";
import heroBg from "@/assets/hero-bg.png";
import TradesWeServe from "@/components/TradesWeServe";
import ScrollReveal from "@/components/ScrollReveal";
import { MOCKUP_BY_SLUG } from "@/components/mockups/FeatureMockups";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SERVICE_ICONS = [Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap];

const FAQS = [
  {
    question: "Is this actually going to work for me?",
    answer: "Depends. If you're doing good work and you answer the phone when it rings, yes — the system brings you more leads and makes sure none of them slip through. If your work is bad, or you ignore leads for two days, no amount of marketing fixes that. I build the foundation. You still have to show up.",
  },
  {
    question: "Why is setup really free? What's the catch?",
    answer: "No catch. I only make money once your systems are live and working — that's how I know I'm betting on myself, not on your deposit. Most agencies want $3–5k upfront because they know half their clients cancel in month two. I'd rather not get paid than trap someone into paying for nothing. If I can't deliver, I don't deserve the money.",
  },
  {
    question: "Can one guy really run all my marketing?",
    answer: "After setup, the automations do 90% of the work — missed calls get texted back, reviews get asked for, follow-ups go out, leads get routed to you. I'm not manually running your marketing every day. I built a system that runs itself, and I'm here to keep it tuned. That's exactly why I can work with multiple contractors without dropping the ball on any of them.",
  },
  {
    question: "How is this different from the agency I already tried?",
    answer: "Four things. One — I only work with trades. Plumbers, roofers, HVAC, electricians. I don't touch restaurants or dentists. Two — you deal directly with me, not a junior account manager who's never held a wrench. Three — no contracts, ever. Cancel any month. Four — setup is free. If I can't get it working, you owe me nothing. Most agencies can't say any of that, let alone all four.",
  },
  {
    question: "What if I already have a website or reviews or a phone number?",
    answer: "Keep what works, replace what doesn't. If your current site is converting, I'll layer the automations on top and leave it alone. If it's a 2017 template nobody fills out, I'll build you one that actually gets leads. Same with your phone number, your Google Business profile, your review history — I work with what's there. Nothing gets thrown out just to justify a bigger invoice.",
  },
  {
    question: "What if I want to cancel?",
    answer: "Cancel any month, no fees, no questions. The website stays yours — I hand over the files. Your Google reviews and Google Business profile are yours, always. What stops are the automations: the missed-call text-back, the follow-ups, the review funnel, the inbox. That's it. No lock-in, no hostage situation. If I'm not earning the monthly, you shouldn't be paying it.",
  },
];

// Lead with the pain each service solves, not just what it does
const SERVICE_DESCRIPTIONS = [
  "Stop losing jobs to contractors with a better-looking site. A fast, professional website that turns visitors into calls.",
  "Every missed call is a job you're giving to a competitor. The system texts them back in seconds — automatically.",
  "Keep your personal number private. One business line that rings on every device you already own.",
  "Your best customers are searching Google right now. I make sure they find you — not the guy down the street.",
  "8 reviews is invisible. I automate the ask so reviews pile up without you lifting a finger.",
  "Your past customers are your easiest sales. One click sends a campaign to your whole list.",
  "Most leads go cold in under an hour. The follow-up system reaches out automatically so you never lose one.",
];

const WHY_US = [
  {
    icon: Timer,
    title: "Live in Days, Not Months",
    desc: "Most agencies take 6–12 weeks to deliver anything. I have your systems running in days. Because leads don't wait.",
  },
  {
    icon: Wrench,
    title: "Contractors Only",
    desc: "I don't work with dentists, restaurants, or anyone else. Only trades. That focus is what makes my systems actually work.",
  },
  {
    icon: Users,
    title: "No Contracts. Ever.",
    desc: "Month-to-month, always. No 12-month lock-ins, no cancellation fees. I earn your business every single month or you walk.",
  },
  {
    icon: DollarSign,
    title: "Priced to Keep You for 10 Years",
    desc: "No setup fees, no lock-ins, no hidden upsells. One flat monthly rate — built to earn you leads for years, not weeks.",
  },
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

      {/* HERO — dark section for impact */}
      <section className="relative -mt-16 min-h-[500px] overflow-hidden bg-foreground lg:-mt-20 lg:min-h-[700px]">
        <ParallaxBg imageUrl={heroBg} />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 lg:block" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        {/* Mobile-only atmospheric warm glow — makes the dim photo read as
            an intentional sunset light source instead of a faded image. */}
        <div className="pointer-events-none absolute -bottom-16 -right-20 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-3xl lg:hidden" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl lg:hidden" />

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
                <span className="text-primary">Zero Agency BS.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/60 md:text-xl">
                I build the website, set up the automations, and handle the follow-up —
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
                  <span className="text-sm font-semibold text-background/80">Free setup. You only pay once it's working.</span>
                  <span className="text-xs text-background/50">I only make money when you do.</span>
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
            Free Setup — I Only Win When You Do
          </span>
          <span className="hidden text-primary-foreground/60 sm:inline">—</span>
          <span className="text-sm text-primary-foreground/90">
            I build your website and set up all your systems up front. You don't pay a dollar until it's live and working for you.
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
              None of that is your fault. You're a contractor, not a marketing agency. That's exactly why I built VargaFlow.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">What I Build For You</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Seven Systems.
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

      {/* SEE IT IN ACTION */}
      <section className="bg-foreground py-20 lg:py-28">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">See It In Action</span>
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                A Few Features
                <br />
                <span className="text-primary">In Action.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-background/60">
                No fluff. Just the systems running — leads coming in, reviews going out, follow-ups firing automatically.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 flex flex-col gap-20 lg:gap-24">
            {[
              {
                label: "Functional Website",
                desc: "Fast, mobile-first, built for one thing: turning visitors into calls. Click-to-call on every page and a chat widget that turns into a real SMS conversation. Everything a contractor site needs, nothing it doesn't.",
                slug: "functional-website",
              },
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
                    <div className={`w-full shrink-0 ${isWide ? "max-w-[420px]" : "max-w-[260px]"}`}>
                      {Mockup && <Mockup />}
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">Feature 0{i + 1}</p>
                      <h3 className="mt-3 text-2xl font-extrabold text-background lg:text-3xl">{demo.label}</h3>
                      <p className="mt-4 text-base leading-relaxed text-background/60 lg:text-lg">{demo.desc}</p>
                    </div>
                  </div>
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
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Why VargaFlow</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Not Another Agency
                <br />
                <span className="text-primary">That Overpromises and Disappears</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
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
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                See Pricing — No Surprises <ArrowRight className="h-4 w-4" />
              </Link>
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
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Process</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                Three Steps.{" "}
                <span className="text-primary">That's It.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                I keep it simple because you're busy enough.
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
                desc: "Tell me about your business. No pitch, no pressure — just figuring out exactly where you're losing leads and what to fix first.",
              },
              {
                num: "2",
                title: "I Build Everything",
                time: "7–10 days",
                desc: "Website, automations, review funnel, follow-up sequences — all set up and tested. You stay on the job site. I handle it all.",
              },
              {
                num: "3",
                title: "Launch & Go Live",
                time: "20 min",
                desc: "I walk you through everything, flip the switch, and your systems go live. From this point on, leads start coming in automatically.",
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

      {/* FAQ */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                <HelpCircle className="h-4 w-4" /> The Honest Answers
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                What You're Actually{" "}
                <span className="text-primary">Wondering About.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                The questions every contractor asks before booking the call. Answered straight.
              </p>
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="rounded-lg border border-border bg-background px-5 data-[state=open]:border-primary/30">
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
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

    </>
  );
};

export default Index;
