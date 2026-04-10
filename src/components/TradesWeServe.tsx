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
            Who I Work With
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Built for the Trades —{" "}
            <span className="text-primary">All of Them</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you work with your hands and serve homeowners, my systems are built for you.
            Here are some of the trades I help every day.
          </p>
        </div>

        <div className={`mt-14 grid gap-5 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
          {trades.map((trade) => (
            <div
              key={trade.name}
              className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20">
                <img
                  src={trade.icon}
                  alt={trade.name}
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-base font-bold text-foreground">{trade.name}</span>
            </div>
          ))}
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <Link
              to="/trades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              See all trades I work with <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export { TRADES };
export default TradesWeServe;
