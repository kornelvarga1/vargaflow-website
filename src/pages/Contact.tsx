import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Clock, MessageSquare, Shield, Star, Users } from "lucide-react";

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
        <title>Book A Call — Varga Flow</title>
        <meta
          name="description"
          content="Book a free 20-minute call with Varga Flow. No sales pitch — just a straight conversation about how to get more leads for your contracting business."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-10 lg:py-24">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              Let's Talk
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
              Ready to Get More
              <br />
              <span className="text-primary">Leads &amp; Customers?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              No pitch. No pressure. Just a 20-minute conversation about where
              you're losing leads — and what we can do about it.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 lg:mt-12 lg:gap-6">
            {[
              { icon: Clock, label: "20 Min Call", sub: "Quick & focused" },
              { icon: MessageSquare, label: "Straight Talk", sub: "No jargon or upsells" },
              { icon: Shield, label: "Zero Obligation", sub: "No contracts" },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-5 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="relative bg-secondary py-16 lg:py-24">
        <div className="container relative">
          <div className="mx-auto w-full">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
                Schedule Now
              </span>
              <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
                Pick a Time That <span className="text-primary">Works for You</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Choose a slot below. You'll get a confirmation email with everything you need.
              </p>
            </div>
            <div className="w-full overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/kornelvarga/vargaflow-consulting-call?hide_gdpr_banner=1"
                style={{ minWidth: "320px", width: "100%", height: "700px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-20">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
              Trusted by <span className="text-primary">Contractors</span> Who Want Results
            </h2>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-8">
              {[
                { icon: Users, value: "50+", label: "Contractors Served" },
                { icon: Star, value: "5.0", label: "Average Rating" },
                { icon: CheckCircle, value: "3x", label: "More Leads" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                  <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-4 lg:hidden" />
    </>
  );
};

export default Contact;
