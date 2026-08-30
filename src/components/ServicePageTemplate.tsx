import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, AlertTriangle, type LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import { MOCKUP_BY_SLUG } from "@/components/mockups/FeatureMockups";

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  metaDescription: string;
  problemHeadline: string;
  problemAccent: string;
  problemText: string[];
  solutionHeadline: string;
  solutionAccent: string;
  solutionText: string;
  features: ServiceFeature[];
  stats?: ServiceStat[];
  faqs: ServiceFAQ[];
  icon?: LucideIcon;
}

const ServicePageTemplate = ({ data }: { data: ServicePageData }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "VargaFlow",
      "url": "https://vargaflow.com",
    },
  };

  const HeroIcon = data.icon;
  const Mockup = MOCKUP_BY_SLUG[data.slug];

  return (
    <>
      <Helmet>
        <title>{data.title} — VargaFlow</title>
        <meta name="description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-foreground/[0.02] blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-foreground/[0.02] blur-3xl" />

        <div className="container relative max-w-5xl">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {HeroIcon && <HeroIcon className="h-4 w-4" />}
                  Service
                </span>
                <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
                  {data.headline}
                  <br />
                  {data.headlineAccent}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{data.subheadline}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-4 text-lg font-bold text-background transition-all hover:bg-foreground/90"
                  >
                    Book A Call <ArrowRight className="h-5 w-5" />
                  </Link>
                  <span className="text-sm text-muted-foreground">Free 20-min call. No obligation.</span>
                </div>
                {data.slug === "functional-website" && (
                  <Link
                    to="/demo"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground/70"
                  >
                    See what yours could look like <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                {data.slug === "ai-receptionist" && (
                  <a
                    href="tel:+12132385364"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground/70"
                  >
                    Call the live demo: (213) 238-5364 <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
              {Mockup ? (
                <div className="flex justify-center lg:justify-end">
                  <div className={`w-full shrink-0 ${data.slug === "functional-website" || data.slug === "chat-widget" ? "max-w-[420px] lg:w-[420px]" : "max-w-[260px] lg:w-[260px]"}`}>
                    <Mockup />
                  </div>
                </div>
              ) : HeroIcon ? (
                <div className="hidden lg:flex">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-foreground/10 to-foreground/[0.02] blur-xl" />
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl border border-border bg-secondary">
                      <HeroIcon className="h-20 w-20 text-muted-foreground" strokeWidth={1.2} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Problem */}
      <section className="relative bg-secondary py-20 lg:py-28">
        <div className="container relative max-w-4xl">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
              <div className="hidden lg:block">
                <div className="sticky top-32 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary">
                  <AlertTriangle className="h-7 w-7 text-muted-foreground" strokeWidth={1.8} />
                </div>
              </div>
              <div>
                <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">The Problem</span>
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                  {data.problemHeadline}
                  <br />
                  {data.problemAccent}
                </h2>
                <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {data.problemText.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution + Features */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">The Solution</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                {data.solutionHeadline}
                <br />
                {data.solutionAccent}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.solutionText}</p>
            </div>
          </ScrollReveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {data.features.map((feature, idx) => {
              const FeatureIcon = feature.icon || CheckCircle;
              return (
                <ScrollReveal key={feature.title} delay={idx * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-7 transition-colors duration-300 hover:border-foreground/30">
                    <span className="absolute right-2 top-2 text-5xl font-extrabold leading-none text-foreground/[0.04] md:text-7xl md:-right-2 md:-top-4">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                        <FeatureIcon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">FAQ</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {data.faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="rounded-lg border border-border bg-background px-5 data-[state=open]:border-foreground/20">
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-5">
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

      {/* Bottom CTA — dark */}
      <section className="relative bg-foreground py-20 lg:py-28">
        <div className="container relative">
          <ScrollReveal>
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-background/50">Get Started</span>
                <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                  Ready to Get Started
                  <br />
                  With {data.title}?
                </h2>
                <p className="mt-6 text-lg text-background/60">
                  Book a call. 20 minutes. I'll walk you through exactly how this works for your business.
                </p>
                <ul className="mt-8 space-y-4">
                  {["No contracts or commitments", "Set up in days, not months", "Built for contractors like you"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-background">
                      <CheckCircle className="h-5 w-5 shrink-0 text-background/40" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-background px-10 py-4 text-lg font-bold text-foreground transition-all hover:bg-background/90"
              >
                Book A Call <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default ServicePageTemplate;
