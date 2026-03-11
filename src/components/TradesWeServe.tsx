import { Link } from "react-router-dom";
import {
  Trees, Hammer, Droplets, Scissors, Truck, Sparkles,
  Home, Wind, Wrench, Zap, PaintBucket, Fence,
  Building2, Bug, Waves, Brush, ArrowRight,
} from "lucide-react";

const TRADES = [
  { name: "Roofers", icon: Home },
  { name: "HVAC", icon: Wind },
  { name: "Plumbers", icon: Wrench },
  { name: "Electricians", icon: Zap },
  { name: "Landscapers", icon: Trees },
  { name: "Remodelers", icon: Hammer },
  { name: "Pressure Washers", icon: Droplets },
  { name: "Painters", icon: PaintBucket },
  { name: "Handymen", icon: Building2 },
  { name: "Moving Companies", icon: Truck },
  { name: "Carpet Cleaners", icon: Sparkles },
  { name: "Decks & Patios", icon: Fence },
  { name: "Pest Control", icon: Bug },
  { name: "Pool Services", icon: Waves },
  { name: "Cleaning Services", icon: Brush },
  { name: "Dog Groomers", icon: Scissors },
];

interface TradesWeServeProps {
  /** Show as compact grid (homepage) vs full page */
  compact?: boolean;
}

const TradesWeServe = ({ compact = true }: TradesWeServeProps) => {
  const trades = compact ? TRADES.slice(0, 8) : TRADES;

  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="container">
        <div className="text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
            Who We Serve
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Built for the Trades —{" "}
            <span className="text-primary">All of Them</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you work with your hands and serve homeowners, our systems are built for you.
            Here are some of the trades we help every day.
          </p>
        </div>

        <div className={`mt-14 grid gap-4 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
          {trades.map((trade) => {
            const Icon = trade.icon;
            return (
              <div
                key={trade.name}
                className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-bold text-foreground">{trade.name}</span>
              </div>
            );
          })}
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <Link
              to="/trades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              See all trades we serve <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export { TRADES };
export default TradesWeServe;
