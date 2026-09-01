import { useEffect, useMemo, useState } from "react";
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
}

// Groups/labels everything in the viewer's own browser-detected timezone —
// never a stored or hardcoded one — same technique the backend already uses
// server-side (Intl + toLocaleString with an explicit timeZone).
const dateKey = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

const SlotPicker = ({ onSelect, refreshKey }: SlotPickerProps) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [selectedStartIso, setSelectedStartIso] = useState<string | null>(null);

  const browserTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  useEffect(() => {
    setStatus("loading");
    setSelectedStartIso(null);
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
        if (loaded.length > 0) setSelectedDayKey(dateKey(new Date(loaded[0].start_iso), browserTz));
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
    return <p className="text-sm text-muted-foreground">Loading available times…</p>;
  }

  if (status === "error") {
    return (
      <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
        Couldn't load available times. Please refresh, or email{" "}
        <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No open times in the next two weeks — email{" "}
        <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a> and I'll find a time.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (!date) return;
          setSelectedDayKey(dateKey(date, browserTz));
          setSelectedStartIso(null);
        }}
        disabled={(date) => !slotsByDay.has(dateKey(date, browserTz))}
        className="rounded-xl border border-border bg-background p-3"
      />

      <div className="rounded-xl border border-border bg-background p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {selectedDate?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                onClick={() => {
                  setSelectedStartIso(slot.start_iso);
                  onSelect(slot.start_iso, slot.end_iso);
                }}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Times shown in your local timezone ({browserTz.replace(/_/g, " ")}).</p>
      </div>
    </div>
  );
};

export default SlotPicker;
