import { useState } from "react";
import { z } from "zod";
import { WEBHOOK_URL } from "@/config/constants";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone number required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
});

type FormData = z.infer<typeof formSchema>;

interface BookACallFormProps {
  className?: string;
}

const BookACallForm = ({ className }: BookACallFormProps) => {
  const [formData, setFormData] = useState<FormData>({ name: "", company: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      setStatus("success");
      setFormData({ name: "", company: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-lg border border-primary/30 bg-secondary p-8 text-center">
          <h3 className="text-2xl font-bold text-primary">We'll Be In Touch</h3>
          <p className="mt-2 text-muted-foreground">Thanks for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-border bg-navy-deep px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        {(["name", "company", "phone", "email"] as const).map((field) => (
          <div key={field}>
            <input
              name={field}
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              placeholder={field === "company" ? "Company Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
            {errors[field] && <p className="mt-1 text-xs text-destructive">{errors[field]}</p>}
          </div>
        ))}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-primary py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-gold-dark disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Book A Call"}
        </button>
        {status === "error" && (
          <p className="text-center text-sm text-destructive">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
};

export default BookACallForm;
