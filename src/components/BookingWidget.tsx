import { useMemo, useState } from "react";
import { z } from "zod";
import SlotPicker from "@/components/SlotPicker";
import { SUPABASE_FUNCTIONS_URL } from "@/config/constants";

const contactSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});

type ContactData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const errorClass = "mt-1.5 text-xs font-medium text-destructive";
const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 disabled:opacity-50";

const BookingWidget = () => {
  const [contact, setContact] = useState<ContactData>({ full_name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [selected, setSelected] = useState<{ start_iso: string; end_iso: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "slot_taken">("idle");
  const [refreshKey, setRefreshKey] = useState(0);

  const browserTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const set = (field: keyof ContactData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    const result = contactSchema.safeParse(contact);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/book-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...result.data,
          start_iso: selected.start_iso,
          end_iso: selected.end_iso,
          timezone: browserTz,
        }),
      });

      if (res.status === 409) {
        setStatus("slot_taken");
        setSelected(null);
        setRefreshKey((k) => k + 1);
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" && selected) {
    const timeLabel = new Date(selected.start_iso).toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: browserTz,
    });
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-background p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-extrabold text-foreground">You're booked!</h3>
        <p className="mt-2 text-muted-foreground">{timeLabel}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation text and email are on their way — they'll include a link to reschedule or cancel if you need to.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SlotPicker refreshKey={refreshKey} onSelect={(start_iso, end_iso) => setSelected({ start_iso, end_iso })} />

      {status === "slot_taken" && (
        <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          That time was just taken — pick another above.
        </p>
      )}

      {selected && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-background p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Name</label>
              <input type="text" value={contact.full_name} onChange={set("full_name")} className={inputClass} placeholder="Your name" />
              {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={contact.email} onChange={set("email")} className={inputClass} placeholder="you@company.com" />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={contact.phone} onChange={set("phone")} className={inputClass} placeholder="(555) 555-5555" />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>
          </div>

          {status === "error" && (
            <p className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Something went wrong booking your call. Please try again or email{" "}
              <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className={`${primaryBtn} mt-4 w-full sm:w-auto`}>
            {status === "sending" ? "Booking..." : "Confirm Call"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingWidget;
