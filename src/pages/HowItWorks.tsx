import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, Wrench, ToggleRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const STEPS = [
  {
    num: "1",
    icon: Phone,
    title: "Walkthrough Call",
    time: "20 min",
    intro: "I show you the system end-to-end — website, automations, lead follow-up, all of it. You ask whatever you want.",
    bullets: [
      "Live walkthrough of the full system using a demo build",
      "Honest answers — what it does, what it doesn't, where it'll move the needle for your business",
      "We figure out together if this is even the right fit",
    ],
    walkaway: "If it's not your thing, walk. No follow-up emails, no funnel, no sales person calling you next week.",
  },
  {
    num: "2",
    icon: Wrench,
    title: "I Build It Out — Free",
    time: "7–10 days",
    intro: "Custom website, automations, review funnel, follow-up sequences — all wired up to your brand, your trade, your service area.",
    bullets: [
      "Real website with your branding, services, photos, testimonials",
      "Lead-capture, missed-call text-back, follow-up sequences all live",
      "Connected to a temporary domain so you can see it actually work",
    ],
    walkaway: "Costs you nothing yet. I do the work. You stay on the job site.",
  },
  {
    num: "3",
    icon: ToggleRight,
    title: "Keep It Or Walk",
    time: "20 min",
    intro: "I walk you through the finished build — your branding, your services, working live. Now you decide.",
    bullets: [
      "If you keep it — we wire it to your domain and Google Business and you go live within the hour",
      "If you walk — the build comes down. Anything you gave me (photos, content, brand assets) stays yours, nothing of yours leaves with me",
      "Either way, no contracts, no minimum term, no cancellation hoops",
    ],
    walkaway: "Don't like it? Walk. Nothing owed.",
  },
] as const;

const FAQS = [
  {
    q: "What's the catch?",
    a: "There isn't one. I build the full system before you decide because that's the only way you'll know if it actually fits your business. If it doesn't, walk. I'd rather lose the build time than have a customer who's unsure.",
  },
  {
    q: "How do I know I won't get pressured to keep it?",
    a: "There's nothing to pressure you with. By the time you're deciding, you've already seen the system running on your business. If it's not for you, that's the answer — I move on.",
  },
  {
    q: "What happens if I walk?",
    a: "The build comes down. Anything you gave me — your photos, your content, your brand assets — stays yours. You don't lose anything you came in with.",
  },
  {
    q: "Doesn't building it for free cost you a ton of time?",
    a: "Yeah. That's the bet — that the system speaks for itself once it's running on your business. So far, that bet's been worth it.",
  },
  {
    q: "What does it cost if I keep it?",
    a: "See the pricing page. Straightforward, no contracts, ever.",
    link: { to: "/pricing", label: "See pricing →" },
  },
] as const;

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How It Works — VargaFlow</title>
        <meta
          name="description"
          content="VargaFlow's process: I show you the system, build it for free, and you decide if you want to keep it. Free until you keep it. No contracts."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-28">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-4xl text-center">
          <ScrollReveal>
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              How It Works
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
              Three Steps.{" "}
              <span className="text-primary">Free Until You Keep It.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              You shouldn't have to take my word for it — so you don't.
              I build the full system before you decide. If it works for your business, you keep it. If it doesn't, you walk. Nothing owed either way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Book Your Free Walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See Pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Three Steps — expanded */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container max-w-4xl">
          <div className="space-y-10 lg:space-y-14">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.num} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                      {/* Number + icon column */}
                      <div className="flex shrink-0 flex-row items-center gap-4 md:flex-col md:items-start md:gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                          <span className="text-2xl font-extrabold">{step.num}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-bold text-primary">{step.time}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
                          {step.title}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                          {step.intro}
                        </p>

                        <ul className="mt-5 space-y-2.5">
                          {step.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                              <span className="text-sm leading-relaxed text-foreground">{b}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="mt-5 rounded-lg border border-border bg-muted/60 px-4 py-3 text-sm font-medium text-foreground">
                          {step.walkaway}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why I do it this way */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative max-w-3xl">
          <ScrollReveal>
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              The Philosophy
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.1] text-background md:text-4xl lg:text-5xl">
              Why I Do It{" "}
              <span className="text-primary">This Way.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-background/70 md:text-lg">
              <p>
                Most marketing agencies show you a deck, sign you up for six months, and then start the work. I think that's backwards.
              </p>
              <p>
                You're a contractor. You judge work by looking at it — not by reading a proposal. So that's how I sell it: I do the work first. You see it running on your business, with your branding, your services, your real photos. Then you tell me whether to keep it or take it down.
              </p>
              <p className="text-lg font-semibold text-background md:text-xl">
                If the system is as good as I say it is, the decision is easy. If it's not, you weren't going to be happy six months in anyway. Either way, neither of us wastes the other's time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ — objection handling */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
                Common Questions
              </span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                What Contractors{" "}
                <span className="text-primary">Ask First.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <div className="rounded-xl border border-border bg-background p-5 md:p-6">
                  <h3 className="text-base font-bold text-foreground md:text-lg">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.a}
                  </p>
                  {"link" in faq && faq.link && (
                    <Link
                      to={faq.link.to}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {faq.link.label}
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              See It Running on{" "}
              <span className="text-primary">Your Business.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Twenty minutes. No commitment. If it's not for you, walk.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
              >
                Book Your Free Walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See a Live Demo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
