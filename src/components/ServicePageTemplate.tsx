import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BookACallForm from "@/components/BookACallForm";

export interface ServiceFeature {
  title: string;
  description: string;
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
  faqs: ServiceFAQ[];
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

  return (
    <>
      <Helmet>
        <title>{data.title} — Varga Flow</title>
        <meta name="description" content={data.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Text-First Hero */}
      <section className="bg-navy-deep py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl">
            {data.headline}
            <br />
            <span className="text-primary">{data.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{data.subheadline}</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
          >
            Book A Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Problem / Agitation */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {data.problemHeadline}
            <br />
            <span className="text-primary">{data.problemAccent}</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {data.problemText.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Solution + Features */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {data.solutionHeadline}
              <br />
              <span className="text-primary">{data.solutionAccent}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{data.solutionText}</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {data.features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Ready to Get Started
                <br />
                <span className="text-primary">With {data.title}?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Book a call. 15 minutes. We'll walk you through exactly how this works for your business.
              </p>
              <ul className="mt-6 space-y-3">
                {["No contracts or commitments", "Set up in days, not months", "Built for contractors like you"].map((item) => (
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

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default ServicePageTemplate;
