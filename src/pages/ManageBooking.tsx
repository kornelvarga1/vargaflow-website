import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import vfIcon from "@/assets/vf-icon.png";
import SlotPicker from "@/components/SlotPicker";
import { SUPABASE_FUNCTIONS_URL } from "@/config/constants";

interface BookingInfo {
  start_time: string;
  end_time: string;
  status: "confirmed" | "cancelled";
  contact_first_name: string;
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 disabled:opacity-50";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50";

const ManageBooking = () => {
  const { token } = useParams<{ token: string }>();
  const [state, setState] = useState<"loading" | "not_found" | "loaded" | "error">("loading");
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [mode, setMode] = useState<"view" | "reschedule" | "confirm_cancel">("view");
  const [selected, setSelected] = useState<{ start_iso: string; end_iso: string } | null>(null);
  const [action, setAction] = useState<"idle" | "sending" | "cancelled" | "rescheduled" | "error">("idle");

  const browserTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  useEffect(() => {
    if (!token) return;
    fetch(`${SUPABASE_FUNCTIONS_URL}/manage-booking?token=${encodeURIComponent(token)}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
    })
      .then((res) => {
        if (res.status === 404) {
          setState("not_found");
          return null;
        }
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setBooking(data);
        setState("loaded");
      })
      .catch(() => setState("error"));
  }, [token]);

  if (!token) return <Navigate to="/" replace />;

  const handleCancel = async () => {
    // Deliberately no window.confirm() here — native browser dialogs get
    // silently suppressed or auto-rejected in a lot of mobile webviews
    // (SMS apps' in-message browser especially), which would make this
    // button appear to do nothing at all with zero feedback. Confirming
    // in-page (see the "confirm_cancel" mode below) works everywhere.
    setAction("sending");
    try {
      const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/manage-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ token, action: "cancel" }),
      });
      if (!res.ok) throw new Error("failed");
      setAction("cancelled");
    } catch {
      setAction("error");
    }
  };

  const handleReschedule = async () => {
    if (!selected) return;
    setAction("sending");
    try {
      const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/manage-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ token, action: "reschedule", start_iso: selected.start_iso, end_iso: selected.end_iso, timezone: browserTz }),
      });
      if (res.status === 409) {
        setAction("error");
        setSelected(null);
        return;
      }
      if (!res.ok) throw new Error("failed");
      setAction("rescheduled");
    } catch {
      setAction("error");
    }
  };

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <>
      <Helmet>
        <title>Manage Your Call — VargaFlow</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center gap-2.5">
          <img src={vfIcon} alt="VargaFlow" className="h-8 w-8 rounded-md" />
          <span className="text-lg font-bold tracking-tight text-foreground">VargaFlow</span>
        </div>
      </header>
      <main className="bg-background py-10 md:py-16">
        <div className="container max-w-2xl px-3 md:px-6">{children}</div>
      </main>
    </>
  );

  if (state === "loading") {
    return <Shell><p className="text-center text-muted-foreground">Loading your booking…</p></Shell>;
  }

  if (state === "not_found") {
    return (
      <Shell>
        <p className="text-center text-muted-foreground">
          Couldn't find that booking. Email{" "}
          <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a> and I'll sort it out.
        </p>
      </Shell>
    );
  }

  if (state === "error" || !booking) {
    return (
      <Shell>
        <p className="rounded-md bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          Something went wrong loading your booking. Please refresh, or email{" "}
          <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
        </p>
      </Shell>
    );
  }

  if (action === "cancelled" || booking.status === "cancelled") {
    return (
      <Shell>
        <h1 className="text-center text-2xl font-extrabold text-foreground">Call cancelled</h1>
        <p className="mt-3 text-center text-muted-foreground">
          Your call is cancelled. Want to grab a new time?{" "}
          <a href="/contact#book" className="font-semibold text-foreground hover:underline">Book here</a>.
        </p>
      </Shell>
    );
  }

  if (action === "rescheduled") {
    return (
      <Shell>
        <h1 className="text-center text-2xl font-extrabold text-foreground">You're rescheduled!</h1>
        <p className="mt-3 text-center text-muted-foreground">A new confirmation text and email are on their way.</p>
      </Shell>
    );
  }

  const currentTimeLabel = new Date(booking.start_time).toLocaleString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: browserTz,
  });

  return (
    <Shell>
      <h1 className="text-2xl font-extrabold text-foreground">
        Hey {booking.contact_first_name || "there"}, manage your call
      </h1>
      <p className="mt-2 text-muted-foreground">
        Currently booked for <span className="font-semibold text-foreground">{currentTimeLabel}</span>
        {" "}({browserTz.replace(/_/g, " ")}).
      </p>

      {mode === "view" && (
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMode("reschedule")} className={primaryBtn}>
            Reschedule
          </button>
          <button type="button" onClick={() => setMode("confirm_cancel")} className={secondaryBtn}>
            Cancel Call
          </button>
        </div>
      )}

      {mode === "confirm_cancel" && (
        <div className="mt-6 rounded-md border border-border bg-muted/40 p-4">
          <p className="text-sm text-foreground">Cancel this call?</p>
          <div className="mt-3 flex gap-3">
            <button type="button" onClick={handleCancel} disabled={action === "sending"} className={secondaryBtn}>
              {action === "sending" ? "Cancelling..." : "Yes, cancel it"}
            </button>
            <button type="button" onClick={() => setMode("view")} disabled={action === "sending"} className={secondaryBtn}>
              Never mind
            </button>
          </div>
        </div>
      )}

      {action === "error" && (
        <p className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          That didn't go through — the time may have just been taken, or something went wrong. Try again, or email{" "}
          <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
        </p>
      )}

      {mode === "reschedule" && (
        <div className="mt-6 space-y-4">
          <SlotPicker selectedStartIso={selected?.start_iso} onSelect={(start_iso, end_iso) => setSelected({ start_iso, end_iso })} />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReschedule}
              disabled={!selected || action === "sending"}
              className={primaryBtn}
            >
              {action === "sending" ? "Rescheduling..." : "Confirm New Time"}
            </button>
            <button type="button" onClick={() => setMode("view")} className={secondaryBtn}>
              Back
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
};

export default ManageBooking;
