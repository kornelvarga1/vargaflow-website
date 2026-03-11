import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Quote } from "lucide-react";

const REVIEWS = [
  { name: "Mike R.", business: "Roofing Contractor", rating: 5, quote: "I was losing half my leads to missed calls. Now every single one gets a text back automatically. My close rate went up 30% in the first month. Game changer.", highlight: true },
  { name: "Sarah T.", business: "Plumbing Company", rating: 5, quote: "We went from 12 Google reviews to 47 in three months. The review funnel basically runs itself. I barely have to think about it." },
  { name: "Dave K.", business: "HVAC Specialist", rating: 5, quote: "I used to spend hours every week trying to figure out marketing. Now I just check my inbox and the leads are already there. Wish I found these guys years ago." },
  { name: "Carlos M.", business: "Electrician", rating: 5, quote: "They built my website in a week. A WEEK. My old 'marketing agency' took three months and it still looked terrible. Night and day difference.", highlight: true },
  { name: "Jenny L.", business: "Landscaping Business", rating: 5, quote: "The all-in-one inbox saved my sanity. I was checking Facebook, email, texts, voicemails — all separate. Now it's all in one place. So simple." },
  { name: "Tom W.", business: "Painting Contractor", rating: 5, quote: "I was skeptical at first. Another marketing company? But these guys actually deliver. No BS, no fluff. My phone rings more and my calendar stays full.", highlight: true },
  { name: "Rachel S.", business: "Cleaning Service", rating: 5, quote: "The automated follow-up alone paid for itself in the first week. I had leads sitting in my inbox for days. Now they get a text within seconds." },
  { name: "Steve B.", business: "General Contractor", rating: 5, quote: "Kornél told me straight up what was wrong with my old setup. Didn't sugarcoat it. Fixed everything in days. That's the kind of honesty I respect." },
  { name: "Maria G.", business: "Flooring Installer", rating: 5, quote: "I don't understand half the tech stuff. I don't need to. They handle everything. I just show up to estimates and close deals. That's how it should be." },
];

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Reviews — What Contractors Say About Varga Flow</title>
        <meta name="description" content="See what home service contractors and tradespeople are saying about Varga Flow's done-for-you marketing systems. Real results, real businesses." />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep py-20 lg:py-28">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Testimonials</span>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
            Don't Take Our
            <br />
            <span className="text-primary">Word for It</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Here's what contractors and tradespeople are saying after switching to Varga Flow. No cherry-picking. No made-up stats. Just honest feedback.
          </p>
          {/* Aggregate rating */}
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">5.0</span>
            <span className="text-sm text-muted-foreground">from {REVIEWS.length} reviews</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  review.highlight
                    ? "border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg shadow-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Decorative quote */}
                <Quote className="absolute -right-2 -top-2 h-20 w-20 rotate-12 text-primary/5 transition-transform duration-300 group-hover:scale-110" />
                
                <div className="relative">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{review.quote}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.business}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Your Turn</span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Ready to Be the
            <br />
            <span className="text-primary">Next Success Story?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            15 minutes. No pitch. Let's figure out if Varga Flow is right for your business.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30"
          >
            Book A Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Reviews;
