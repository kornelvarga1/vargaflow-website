import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

const SUPABASE_BASE = "https://zfmchywjmgykmlhjihls.supabase.co/functions/v1";

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required"),
  business_phone: z.string().trim().min(7, "Valid phone number required"),
  business_name: z.string().trim().min(1, "Business name is required"),
  tax_id: z.string().trim().optional(),
  current_website: z.string().trim().optional(),
  domain_registrar: z.string().trim().optional(),
  about_us: z.string().trim().min(1, "Please tell us about your business"),
  service_areas: z.string().trim().min(1, "Service areas are required"),
  services_offered: z.string().trim().min(1, "Services offered are required"),
  business_highlights: z.string().trim().optional(),
  business_hours: z.string().trim().min(1, "Business hours are required"),
  instagram: z.string().trim().optional(),
  facebook: z.string().trim().optional(),
  tiktok: z.string().trim().optional(),
  bbb: z.string().trim().optional(),
  yelp: z.string().trim().optional(),
  discount_offers: z.string().trim().optional(),
  need_logo: z.enum(["yes", "no"], { required_error: "Please select an option" }),
  additional_notes: z.string().trim().optional(),
});

type FormData = z.infer<typeof formSchema>;

const initialForm: FormData = {
  full_name: "",
  business_phone: "",
  business_name: "",
  tax_id: "",
  current_website: "",
  domain_registrar: "",
  about_us: "",
  service_areas: "",
  services_offered: "",
  business_highlights: "",
  business_hours: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  bbb: "",
  yelp: "",
  discount_offers: "",
  need_logo: "no",
  additional_notes: "",
};

const inputClass =
  "w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const textareaClass = inputClass + " min-h-[100px] resize-y";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const errorClass = "mt-1.5 text-xs font-medium text-destructive";

const OnboardingForm = () => {
  const [searchParams] = useSearchParams();
  const contactId = searchParams.get("contact_id") ?? "";

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
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
      // Scroll to first error
      const firstErrorEl = document.querySelector("[data-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_BASE}/flow-ob-form-submitted`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ contact_id: contactId, ...result.data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <>
        <Helmet>
          <title>Onboarding — Varga Flow</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
          <div className="mx-auto w-full max-w-lg text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">You're All Set!</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Thanks for filling out your onboarding form. We have everything we need to get started.
            </p>
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 text-left">
              <p className="text-sm font-semibold text-foreground">One last thing —</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Please email any photos of your work, your team, or your trucks/equipment to{" "}
                <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">
                  kornel@vargaflow.com
                </a>
                . High-quality photos make a huge difference on your website and listings.
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              You'll hear from Kornél within 1 business day with next steps.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Client Onboarding — Varga Flow</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-5">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Varga<span className="text-primary">Flow</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl px-4 py-10 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground">Client Onboarding Form</h1>
            <p className="mt-2 text-muted-foreground">
              Fill this out as completely as you can — the more detail you give us, the better your results. Fields marked <span className="text-destructive">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* Section: Business Basics */}
            <section className="space-y-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">Business Basics</h2>

              <div>
                <label className={labelClass}>Full Name <span className="text-destructive">*</span></label>
                <input type="text" placeholder="Your full name" value={formData.full_name} onChange={set("full_name")} className={inputClass} data-error={errors.full_name ? true : undefined} />
                {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
              </div>

              <div>
                <label className={labelClass}>Business Phone <span className="text-destructive">*</span></label>
                <input type="tel" placeholder="(555) 000-0000" value={formData.business_phone} onChange={set("business_phone")} className={inputClass} />
                {errors.business_phone && <p className={errorClass}>{errors.business_phone}</p>}
              </div>

              <div>
                <label className={labelClass}>Business Name <span className="text-destructive">*</span></label>
                <input type="text" placeholder="Your company name" value={formData.business_name} onChange={set("business_name")} className={inputClass} />
                {errors.business_name && <p className={errorClass}>{errors.business_name}</p>}
              </div>

              <div>
                <label className={labelClass}>Tax ID / EIN <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="text" placeholder="XX-XXXXXXX" value={formData.tax_id} onChange={set("tax_id")} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Current Website <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="url" placeholder="https://yoursite.com" value={formData.current_website} onChange={set("current_website")} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Domain Registrar <span className="text-muted-foreground font-normal">(optional — e.g. GoDaddy, Namecheap)</span></label>
                <input type="text" placeholder="GoDaddy, Namecheap, Google Domains..." value={formData.domain_registrar} onChange={set("domain_registrar")} className={inputClass} />
              </div>
            </section>

            {/* Section: About Your Business */}
            <section className="space-y-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">About Your Business</h2>

              <div>
                <label className={labelClass}>About Us <span className="text-destructive">*</span></label>
                <p className="mb-2 text-xs text-muted-foreground">Describe your business in your own words — who you are, how long you've been around, what makes you different.</p>
                <textarea placeholder="We're a family-owned plumbing company serving the Denver metro since 2008..." value={formData.about_us} onChange={set("about_us")} className={textareaClass} />
                {errors.about_us && <p className={errorClass}>{errors.about_us}</p>}
              </div>

              <div>
                <label className={labelClass}>Service Areas <span className="text-destructive">*</span></label>
                <p className="mb-2 text-xs text-muted-foreground">List the cities, towns, or zip codes you serve.</p>
                <textarea placeholder="Denver, Aurora, Littleton, Englewood, Parker..." value={formData.service_areas} onChange={set("service_areas")} className={textareaClass} />
                {errors.service_areas && <p className={errorClass}>{errors.service_areas}</p>}
              </div>

              <div>
                <label className={labelClass}>Services Offered <span className="text-destructive">*</span></label>
                <p className="mb-2 text-xs text-muted-foreground">List every service you want to appear on your website.</p>
                <textarea placeholder="Drain cleaning, water heater installation, leak repair, emergency plumbing..." value={formData.services_offered} onChange={set("services_offered")} className={textareaClass} />
                {errors.services_offered && <p className={errorClass}>{errors.services_offered}</p>}
              </div>

              <div>
                <label className={labelClass}>Business Highlights <span className="text-muted-foreground font-normal">(optional)</span></label>
                <p className="mb-2 text-xs text-muted-foreground">Awards, licenses, certifications, years in business, number of jobs completed, guarantees — anything worth bragging about.</p>
                <textarea placeholder="Licensed & insured, A+ BBB rating, 500+ five-star reviews, 24/7 emergency service..." value={formData.business_highlights} onChange={set("business_highlights")} className={textareaClass} />
              </div>

              <div>
                <label className={labelClass}>Business Hours <span className="text-destructive">*</span></label>
                <textarea placeholder="Mon–Fri: 7am–6pm&#10;Sat: 8am–4pm&#10;Sun: Closed&#10;24/7 for emergencies" value={formData.business_hours} onChange={set("business_hours")} className={textareaClass + " min-h-[80px]"} />
                {errors.business_hours && <p className={errorClass}>{errors.business_hours}</p>}
              </div>
            </section>

            {/* Section: Online Profiles */}
            <section className="space-y-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">Online Profiles <span className="text-sm font-normal text-muted-foreground">(all optional)</span></h2>
              <p className="text-sm text-muted-foreground">Paste the full URLs for any profiles you have. Leave blank if you don't have them yet.</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Instagram</label>
                  <input type="url" placeholder="https://instagram.com/yourbiz" value={formData.instagram} onChange={set("instagram")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Facebook</label>
                  <input type="url" placeholder="https://facebook.com/yourbiz" value={formData.facebook} onChange={set("facebook")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>TikTok</label>
                  <input type="url" placeholder="https://tiktok.com/@yourbiz" value={formData.tiktok} onChange={set("tiktok")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>BBB Profile</label>
                  <input type="url" placeholder="https://bbb.org/..." value={formData.bbb} onChange={set("bbb")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Yelp</label>
                  <input type="url" placeholder="https://yelp.com/biz/..." value={formData.yelp} onChange={set("yelp")} className={inputClass} />
                </div>
              </div>
            </section>

            {/* Section: Marketing */}
            <section className="space-y-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">Marketing Details</h2>

              <div>
                <label className={labelClass}>Discount Offers <span className="text-muted-foreground font-normal">(optional)</span></label>
                <p className="mb-2 text-xs text-muted-foreground">Any special offers, seasonal discounts, or promotions we should feature (e.g. "10% off first service", "$50 off water heater install").</p>
                <textarea placeholder="$25 off any service call for new customers..." value={formData.discount_offers} onChange={set("discount_offers")} className={textareaClass + " min-h-[80px]"} />
              </div>

              <div>
                <label className={labelClass}>Do you need a logo? <span className="text-destructive">*</span></label>
                <div className="mt-2 flex gap-4">
                  {(["yes", "no"] as const).map((val) => (
                    <label key={val} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="need_logo"
                        value={val}
                        checked={formData.need_logo === val}
                        onChange={() => {
                          setFormData((prev) => ({ ...prev, need_logo: val }));
                          setErrors((prev) => ({ ...prev, need_logo: undefined }));
                        }}
                        className="accent-primary h-4 w-4"
                      />
                      <span className="text-sm font-medium text-foreground capitalize">{val === "yes" ? "Yes, I need a logo" : "No, I already have one"}</span>
                    </label>
                  ))}
                </div>
                {errors.need_logo && <p className={errorClass}>{errors.need_logo}</p>}
              </div>
            </section>

            {/* Section: Anything Else */}
            <section className="space-y-5">
              <h2 className="border-b border-border pb-2 text-lg font-bold text-foreground">Anything Else?</h2>
              <div>
                <label className={labelClass}>Additional Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea placeholder="Anything else we should know — preferences, deadlines, concerns, specific requests..." value={formData.additional_notes} onChange={set("additional_notes")} className={textareaClass} />
              </div>
            </section>

            {status === "error" && (
              <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Something went wrong submitting the form. Please try again or email{" "}
                <a href="mailto:kornel@vargaflow.com" className="underline">kornel@vargaflow.com</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-md bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
            >
              {status === "sending" ? "Submitting..." : "Submit Onboarding Form →"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OnboardingForm;
