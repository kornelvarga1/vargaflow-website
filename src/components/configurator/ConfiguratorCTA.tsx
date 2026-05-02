import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const ConfiguratorCTA = () => (
  <section className="relative bg-foreground py-20 lg:py-28">
    <div className="container relative">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-background md:text-4xl lg:text-5xl">
            Want This for Your Business?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-background/60">
            Free call, free setup. No contracts, no catch. I'll build your site,
            connect your automations, and have you live within days.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-background px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-background/90"
          >
            Book Your Free Walkthrough
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ConfiguratorCTA;
