import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Check, Pencil } from "lucide-react";
import SlotPicker from "@/components/SlotPicker";
import { SUPABASE_FUNCTIONS_URL } from "@/config/constants";

const contactSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});

type ContactData = z.infer<typeof contactSchema>;
type Step = "pick" | "details";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const errorClass = "mt-1.5 text-xs font-medium text-destructive";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-all hover:bg-foreground/90 disabled:pointer-events-none disabled:opacity-50";

const StepDot = ({ index, label, active, done }: { index: number; label: string; active: boolean; done: boolean }) => (
  <div className="flex items-center gap-2">
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
        done
          ? "bg-foreground text-background"
          : active
            ? "border-2 border-foreground text-foreground"
            : "border border-border text-muted-foreground"
      }`}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : index}
    </span>
    <span className={`text-sm font-semibold ${active || done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
  </div>
);

const BookingWidget = () => {
  const [step, setStep] = useState<Step>("pick");
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

  const selectedLabel = selected
    ? new Date(selected.start_iso).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: browserTz,
      })
    : "";

  const handlePickSlot = (start_iso: string, end_iso: string) => {
    setSelected({ start_iso, end_iso });
    setStatus("idle");
    setStep("details");
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
        setStep("pick");
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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        className="mx-auto max-w-lg rounded-2xl border border-border bg-background p-8 text-center shadow-sm sm:p-10"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="mb-5 flex justify-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <Check className="h-7 w-7 text-primary" strokeWidth={2.5} />
          </div>
        </motion.div>
        <h3 className="text-xl font-extrabold text-foreground">You're booked!</h3>
        <p className="mt-2 text-muted-foreground">{timeLabel}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation text and email are on their way — they'll include a link to reschedule or cancel if you need to.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex items-center justify-center gap-4">
        <StepDot index={1} label="Time" active={step === "pick"} done={step === "details"} />
        <div className="h-px w-8 shrink-0 bg-border" />
        <StepDot index={2} label="Your details" active={step === "details"} done={false} />
      </div>

      {status === "slot_taken" && (
        <p className="mb-5 rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          That time was just taken — pick another below.
        </p>
      )}

      <AnimatePresence mode="wait">
        {step === "pick" && (
          <motion.div
            key="pick"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease }}
          >
            <SlotPicker refreshKey={refreshKey} selectedStartIso={selected?.start_iso} onSelect={handlePickSlot} />
          </motion.div>
        )}

        {step === "details" && selected && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease }}
            className="mx-auto max-w-md"
          >
            <button
              type="button"
              onClick={() => setStep("pick")}
              className="mb-6 flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-left transition-colors hover:border-foreground/30"
            >
              <span className="text-sm font-semibold text-foreground">{selectedLabel}</span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Pencil className="h-3 w-3" /> Change
              </span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={contact.full_name} onChange={set("full_name")} className={inputClass} placeholder="Your name" autoFocus />
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

              {status === "error" && (
                <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  Something went wrong booking your call. Please try again or email{" "}
                  <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className={`${primaryBtn} w-full`}>
                {status === "sending" ? "Booking..." : "Confirm Call"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingWidget;
