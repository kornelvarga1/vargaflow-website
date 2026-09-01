import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SUPABASE_FUNCTIONS_URL } from "@/config/constants";

interface Slot {
  start_iso: string;
  end_iso: string;
}

interface SlotPickerProps {
  onSelect: (startIso: string, endIso: string) => void;
  /** Bump this to force a refetch (e.g. after a 409 "slot just taken"). */
  refreshKey?: number;
  /** Currently selected slot, so the picker can show it as selected even after the parent moves on to another step. */
  selectedStartIso?: string | null;
}

// Groups/labels everything in the viewer's own browser-detected timezone —
// never a stored or hardcoded one — same technique the backend already uses
// server-side (Intl + toLocaleString with an explicit timeZone).
const dateKey = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

const ease = [0.16, 1, 0.3, 1] as const;

const SlotPicker = ({ onSelect, refreshKey, selectedStartIso }: SlotPickerProps) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  const browserTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  useEffect(() => {
    setStatus("loading");
    fetch(`${SUPABASE_FUNCTIONS_URL}/get-availability`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("failed to load availability");
        return res.json();
      })
      .then((data: { slots: Slot[] }) => {
        const loaded = data.slots ?? [];
        setSlots(loaded);
        setStatus("ready");
        if (loaded.length > 0) {
          // If the caller remembers a previously chosen slot (e.g. the user
          // hit "Change" after picking one), reopen on that slot's day
          // instead of defaulting back to the first available day.
          const preferred = selectedStartIso && loaded.find((s) => s.start_iso === selectedStartIso);
          setSelectedDayKey(dateKey(new Date(preferred ? preferred.start_iso : loaded[0].start_iso), browserTz));
        }
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = dateKey(new Date(slot.start_iso), browserTz);
      const existing = map.get(key) ?? [];
      existing.push(slot);
      map.set(key, existing);
    }
    for (const list of map.values()) list.sort((a, b) => a.start_iso.localeCompare(b.start_iso));
    return map;
  }, [slots, browserTz]);

  const selectedDate = selectedDayKey ? new Date(`${selectedDayKey}T00:00:00`) : undefined;
  const daySlots = selectedDayKey ? slotsByDay.get(selectedDayKey) ?? [] : [];

  if (status === "loading") {
    return (
      <div className="grid gap-8 sm:grid-cols-[minmax(0,320px)_1fr]" aria-busy="true">
        <div className="h-[300px] animate-pulse rounded-xl bg-muted" />
        <div className="space-y-2.5">
          <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-11 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-center text-sm text-destructive">
        Couldn't load available times. Please refresh, or email{" "}
        <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 px-5 py-6 text-center text-sm text-muted-foreground">
        No open times in the next two weeks — email{" "}
        <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a> and I'll find a time.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Pick a date &amp; time</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Globe className="h-3 w-3" />
          {browserTz.replace(/_/g, " ")}
        </span>
      </div>

      <div className="grid gap-8 sm:grid-cols-[minmax(0,320px)_1fr]">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            setSelectedDayKey(dateKey(date, browserTz));
          }}
          disabled={(date) => !slotsByDay.has(dateKey(date, browserTz))}
          className="mx-auto p-0"
        />

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDayKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
            >
              <p className="mb-4 text-base font-bold text-foreground">
                {selectedDate?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {daySlots.map((slot) => {
                  const label = new Date(slot.start_iso).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: browserTz,
                  });
                  const isSelected = selectedStartIso === slot.start_iso;
                  return (
                    <button
                      key={slot.start_iso}
                      type="button"
                      onClick={() => onSelect(slot.start_iso, slot.end_iso)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-foreground hover:border-foreground/30 hover:bg-muted/50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SlotPicker;
