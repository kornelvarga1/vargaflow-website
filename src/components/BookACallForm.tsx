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
  darkMode?: boolean;
}

const BookACallForm = ({ className, darkMode }: BookACallFormProps) => {
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
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold ${darkMode ? "text-background" : "text-foreground"}`}>I'll Be In Touch</h3>
          <p className={`mt-2 ${darkMode ? "text-background/60" : "text-muted-foreground"}`}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  const fields = [
    { name: "name" as const, type: "text", placeholder: "Your Name" },
    { name: "company" as const, type: "text", placeholder: "Company Name" },
    { name: "phone" as const, type: "tel", placeholder: "Phone Number" },
    { name: "email" as const, type: "email", placeholder: "Email Address" },
  ];

  const inputClasses = darkMode
    ? "w-full rounded-md border border-background/20 bg-background/10 px-4 py-3.5 text-sm text-background placeholder:text-background/40 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    : "w-full rounded-md border border-border bg-muted px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors[field.name] && <p className="mt-1.5 text-xs font-medium text-destructive">{errors[field.name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Book A Call →"}
        </button>
        <p className={`text-center text-xs ${darkMode ? "text-background/50" : "text-muted-foreground"}`}>Free 20-minute call. No pitch. No obligation.</p>
        {status === "error" && (
          <p className="text-center text-sm text-destructive">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
};

export default BookACallForm;
