import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { NICHE_LIST, NICHES } from "@/data/configurator-niches";

interface NicheSwitcherProps {
  activeNiche: string;
  onSelect: (slug: string) => void;
}

const NicheSwitcher = ({ activeNiche, onSelect }: NicheSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = NICHES[activeNiche];
  const CurrentIcon = current.icon;

  return (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">
        Choose a trade
      </label>
      <div ref={ref} className="relative">
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className="flex items-center gap-2">
            <CurrentIcon size={14} />
            {current.label}
          </span>
          <ChevronDown
            className={`h-4 w-4 opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
            <div className="p-1">
              {NICHE_LIST.map((n) => {
                const Icon = n.icon;
                const isActive = n.slug === activeNiche;
                return (
                  <button
                    key={n.slug}
                    onClick={() => {
                      onSelect(n.slug);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon size={14} />
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Don't see your trade? We've got you covered.
      </p>
    </div>
  );
};

export default NicheSwitcher;
