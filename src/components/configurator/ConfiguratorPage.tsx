import ScrollReveal from "@/components/ScrollReveal";
import ConfiguratorWidget from "./ConfiguratorWidget";
import ConfiguratorCTA from "./ConfiguratorCTA";

const ConfiguratorPage = () => (
  <>
    {/* Hero */}
    <section className="bg-background py-16 lg:py-24">
      <div className="container">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Interactive Demo
            </span>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
              Configure Your Website.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground lg:text-lg">
              Pick your trade, choose your color, type your name — watch your
              site build itself in real time.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Configurator */}
    <section className="bg-secondary pb-20 lg:pb-28">
      <div className="container">
        <ScrollReveal>
          <ConfiguratorWidget />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Every site includes:</span>{" "}
            click-to-call <span className="mx-1 text-foreground/30">·</span> missed-call text-back <span className="mx-1 text-foreground/30">·</span> chat-to-SMS <span className="mx-1 text-foreground/30">·</span> mobile-first <span className="mx-1 text-foreground/30">·</span> SEO-ready <span className="mx-1 text-foreground/30">·</span> magic review funnel
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* CTA */}
    <ConfiguratorCTA />
  </>
);

export default ConfiguratorPage;
