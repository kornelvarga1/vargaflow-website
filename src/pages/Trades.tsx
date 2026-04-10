import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TradesWeServe from "@/components/TradesWeServe";

const Trades = () => (
  <>
    <Helmet>
      <title>Trades I Work With — VargaFlow</title>
      <meta name="description" content="VargaFlow builds marketing systems for roofers, plumbers, HVAC techs, electricians, landscapers, painters, and every other home service trade." />
    </Helmet>

    {/* Hero */}
    <section className="bg-foreground py-20 lg:py-28">
      <div className="container text-center">
        <h1 className="text-4xl font-extrabold text-background md:text-5xl lg:text-6xl">
          Trades I <span className="text-primary">Work With</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-background/60">
          I work exclusively with home service contractors and tradespeople.
          If you fix it, build it, install it, or clean it — I've got you covered.
        </p>
      </div>
    </section>

    {/* Full grid */}
    <TradesWeServe compact={false} />

    {/* CTA */}
    <section className="bg-background py-20 lg:py-28">
      <div className="container text-center">
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Don't See Your Trade? <span className="text-primary">I Still Got You.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          If you serve homeowners and want more leads, I can help. Book a call and let's talk.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl"
        >
          Book A Call <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>

  </>
);

export default Trades;
