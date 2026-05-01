import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bug,
  Dog,
  Droplets,
  Hammer,
  HardHat,
  Paintbrush,
  ShowerHead,
  Sofa,
  Sparkles,
  SprayCan,
  ThermometerSun,
  Trees,
  Truck,
  Waves,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const TRADES: { name: string; icon: LucideIcon }[] = [
  { name: "Roofers", icon: HardHat },
  { name: "HVAC", icon: ThermometerSun },
  { name: "Plumbers", icon: ShowerHead },
  { name: "Electricians", icon: Zap },
  { name: "Landscapers", icon: Trees },
  { name: "Remodelers", icon: Hammer },
  { name: "Pressure Washers", icon: Droplets },
  { name: "Painters", icon: Paintbrush },
  { name: "Handymen", icon: Wrench },
  { name: "Moving Companies", icon: Truck },
  { name: "Carpet Cleaners", icon: SprayCan },
  { name: "Decks & Patios", icon: Sofa },
  { name: "Pest Control", icon: Bug },
  { name: "Pool Services", icon: Waves },
  { name: "Cleaning Services", icon: Sparkles },
  { name: "Dog Groomers", icon: Dog },
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
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Who I Work With
          </span>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Built for the Trades — All of Them
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            If you work with your hands and serve homeowners, my systems are built for you.
            Here are some of the trades I help every day.
          </p>
        </div>

        <div className={`mt-14 grid gap-5 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
          {trades.map((trade) => {
            const Icon = trade.icon;
            return (
              <div
                key={trade.name}
                className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-muted">
                  <Icon
                    className="h-9 w-9 text-foreground transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-label={trade.name}
                  />
                </div>
                <span className="text-base font-bold text-foreground">{trade.name}</span>
              </div>
            );
          })}
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <Link
              to="/trades"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground/70"
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
