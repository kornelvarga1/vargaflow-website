import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import roofers from "@/assets/trades/roofers.png";
import hvac from "@/assets/trades/hvac.png";
import plumbers from "@/assets/trades/plumbers.png";
import electricians from "@/assets/trades/electricians.png";
import landscapers from "@/assets/trades/landscapers.png";
import remodelers from "@/assets/trades/remodelers.png";
import pressureWashers from "@/assets/trades/pressure-washers.png";
import painters from "@/assets/trades/painters.png";
import handymen from "@/assets/trades/handymen.png";
import moving from "@/assets/trades/moving.png";
import carpetCleaners from "@/assets/trades/carpet-cleaners.png";
import decks from "@/assets/trades/decks.png";
import pestControl from "@/assets/trades/pest-control.png";
import pool from "@/assets/trades/pool.png";
import cleaning from "@/assets/trades/cleaning.png";
import dogGroomers from "@/assets/trades/dog-groomers.png";

const TRADES = [
  { name: "Roofers", icon: roofers },
  { name: "HVAC", icon: hvac },
  { name: "Plumbers", icon: plumbers },
  { name: "Electricians", icon: electricians },
  { name: "Landscapers", icon: landscapers },
  { name: "Remodelers", icon: remodelers },
  { name: "Pressure Washers", icon: pressureWashers },
  { name: "Painters", icon: painters },
  { name: "Handymen", icon: handymen },
  { name: "Moving Companies", icon: moving },
  { name: "Carpet Cleaners", icon: carpetCleaners },
  { name: "Decks & Patios", icon: decks },
  { name: "Pest Control", icon: pestControl },
  { name: "Pool Services", icon: pool },
  { name: "Cleaning Services", icon: cleaning },
  { name: "Dog Groomers", icon: dogGroomers },
];

interface TradesWeServeProps {
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
          {trades.map((trade) => (
            <div
              key={trade.name}
              className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  src={trade.icon}
                  alt={trade.name}
                  className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-bold text-foreground">{trade.name}</span>
            </div>
          ))}
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
