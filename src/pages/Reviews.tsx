import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Results — VargaFlow</title>
        <meta name="description" content="Direct access to Kornél, systems built to compound over time, and a setup that pays for itself. No agency middlemen, no account managers." />
      </Helmet>

      <section className="relative overflow-hidden bg-background py-20 lg:py-40">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <MessageSquare className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-8 text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl">
            Results Are
            <br />
            <span className="text-primary">Being Written Right Now.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Instead of a wall of case studies, here's what you get: systems built to start working from day one, personally set up by Kornél, and a direct line to him the whole way. No account managers. No sales team. Just the work.
          </p>
          <p className="mt-4 text-base font-semibold text-foreground">
            Every client gets direct access and his full attention. That's the whole model — built to stay that way.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
          >
            Talk to Kornél Directly <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">20 minutes. No pressure. Just a real conversation.</p>
        </div>
      </section>

    </>
  );
};

export default Reviews;
