import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Clock, MessageSquare, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Book Your Free Walkthrough — VargaFlow</title>
        <meta
          name="description"
          content="Book a free 20-minute call with Kornél at VargaFlow. No pressure — just a straight conversation about how to get more leads for your contracting business."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-10 lg:py-24">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-foreground/[0.02] blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-foreground/[0.02] blur-3xl" />

        <div className="container relative">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                Let's Look at Your Business
                <br />
                and Fix What's Costing You Leads.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                20 minutes with Kornél — not a salesperson, not an account manager. Just an honest look at where you're losing leads and what I can do about it. Free setup, no contracts — you only pay when it's working.
              </p>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal delay={0.15}>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 lg:mt-12 lg:gap-6">
              {[
                { icon: Clock, label: "20 Minutes", sub: "Focused, no fluff" },
                { icon: MessageSquare, label: "Talk to Kornél", sub: "Direct, no middlemen" },
                { icon: Zap, label: "Free Setup", sub: "Pay only if you're happy" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-5 text-center transition-all duration-300 hover:border-foreground/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-muted">
                    <item.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="relative bg-secondary py-16 lg:py-24">
        <div className="container relative">
          <div className="mx-auto w-full">
            <ScrollReveal>
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                  Pick a Time That Works for You
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  On the call I'll look at your current setup, identify exactly where leads are slipping through, and walk you through what it would look like to fix it. No pressure to sign up.
                </p>
              </div>
            </ScrollReveal>
            <div className="w-full overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/kornelvarga/vargaflow-consulting-call?hide_gdpr_banner=1&primary_color=1a1a1a"
                style={{ minWidth: "320px", width: "100%", height: "950px" }}
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Contact;
