import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle, type LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BookACallForm from "@/components/BookACallForm";

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
      "name": "Varga Flow",
      "url": "https://vargaflow.com",
    },
  };

  const HeroIcon = data.icon;

  return (
    <>
      <Helmet>
        <title>{data.title} — Varga Flow</title>
        <meta name="description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />

        <div className="container relative max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                {HeroIcon && <HeroIcon className="h-4 w-4" />}
                Service
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
                {data.headline}
                <br />
                <span className="text-primary">{data.headlineAccent}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{data.subheadline}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  Book A Call <ArrowRight className="h-5 w-5" />
                </Link>
                <span className="text-sm text-muted-foreground">Free 20-min call. No obligation.</span>
              </div>
            </div>
            {HeroIcon && (
              <div className="hidden lg:flex">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/[0.02] blur-xl" />
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl border border-primary/20 bg-secondary">
                    <HeroIcon className="h-20 w-20 text-primary/60" strokeWidth={1.2} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {data.stats && data.stats.length > 0 && (
        <section className="border-b border-t border-border bg-secondary">
          <div className="container">
            <div className={`grid grid-cols-${data.stats.length} divide-x divide-border`}>
              {data.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 py-8 lg:py-10">
                  <p className="text-2xl font-extrabold text-primary lg:text-3xl">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground lg:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Problem */}
      <section className="relative bg-secondary py-20 lg:py-28">
        <div className="container relative max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="hidden lg:block">
              <div className="sticky top-32 flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Problem</span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                {data.problemHeadline}
                <br />
                <span className="text-primary">{data.problemAccent}</span>
              </h2>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {data.problemText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution + Features */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">The Solution</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              {data.solutionHeadline}
              <br />
              <span className="text-primary">{data.solutionAccent}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.solutionText}</p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {data.features.map((feature, idx) => {
              const FeatureIcon = feature.icon || CheckCircle;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <span className="absolute -right-2 -top-4 text-7xl font-extrabold text-primary/[0.04] transition-transform duration-300 group-hover:scale-110">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/[0.03] transition-transform duration-300 group-hover:scale-150" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                      <FeatureIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">FAQ</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border bg-background px-5 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA — dark */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Get Started</span>
              <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
                Ready to Get Started
                <br />
                <span className="text-primary">With {data.title}?</span>
              </h2>
              <p className="mt-6 text-lg text-background/60">
                Book a call. 15 minutes. We'll walk you through exactly how this works for your business.
              </p>
              <ul className="mt-8 space-y-4">
                {["No contracts or commitments", "Set up in days, not months", "Built for contractors like you"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-background">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BookACallForm darkMode className="rounded-xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm lg:p-8" />
          </div>
        </div>
      </section>

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default ServicePageTemplate;
