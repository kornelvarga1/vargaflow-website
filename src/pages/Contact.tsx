import { Helmet } from "react-helmet-async";
import BookACallForm from "@/components/BookACallForm";
import { CheckCircle, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Book A Call — Varga Flow</title>
        <meta name="description" content="Book a free 15-minute call with Varga Flow. No sales pitch — just a straight conversation about how to get more leads for your contracting business." />
      </Helmet>

      <section className="bg-navy-deep py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left — Copy */}
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl">
                Let's Talk About
                <br />
                <span className="text-primary">Growing Your Business</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                No pitch. No pressure. Just a 15-minute conversation about where you're losing leads — and what we can do about it. If we can help, we'll tell you how. If we can't, we'll tell you that too.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-bold text-foreground">15 Minutes. That's It.</h3>
                    <p className="mt-1 text-sm text-muted-foreground">We respect your time. You've got jobs to run. We'll keep it tight.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-bold text-foreground">Straight Talk Only</h3>
                    <p className="mt-1 text-sm text-muted-foreground">No jargon. No upsells. Just honest feedback on what's working and what's not.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-bold text-foreground">Zero Obligation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">If we're not the right fit, we'll say so. No contracts. No hard feelings.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-foreground">Book Your Free Call</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fill this out and we'll get back to you within 24 hours.</p>
              <BookACallForm className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Contact;
