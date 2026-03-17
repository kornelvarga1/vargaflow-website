import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/logo.png";
import { z } from "zod";

const SUPABASE_BASE = "https://zfmchywjmgykmlhjihls.supabase.co/functions/v1";

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required"),
  business_phone: z.string().trim().optional(),
  business_name: z.string().trim().min(1, "Business name is required"),
  tax_id: z.string().trim().optional(),
  current_website: z.string().trim().optional(),
  about_us: z.string().trim().min(1, "About Us is required"),
  service_areas: z.string().trim().optional(),
  services_offered: z.string().trim().min(1, "Services offered are required"),
  business_differentiators: z.string().trim().optional(),
  business_hours: z.string().trim().min(1, "Hours of operation are required"),
  instagram: z.string().trim().optional(),
  facebook: z.string().trim().optional(),
  bbb: z.string().trim().optional(),
  tiktok: z.string().trim().optional(),
  yelp: z.string().trim().optional(),
  return_customer_discount: z.string().trim().optional(),
  need_logo: z.string().trim().optional(),
});

type FormData = z.infer<typeof formSchema>;

const initialForm: FormData = {
  full_name: "",
  business_phone: "",
  business_name: "",
  tax_id: "",
  current_website: "",
  about_us: "",
  service_areas: "",
  services_offered: "",
  business_differentiators: "",
  business_hours: "",
  instagram: "",
  facebook: "",
  bbb: "",
  tiktok: "",
  yelp: "",
  return_customer_discount: "",
  need_logo: "",
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
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAgreed) {
      setTermsError(true);
      document.querySelector("[data-terms-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
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
                Please send 25–60 of your best photos to{" "}
                <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">
                  kornel@vargaflow.com
                </a>
                . Include a nice photo of yourself and/or your team. High-quality photos make a huge difference on your website and listings.
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
            <img src={logo} alt="Varga Flow" className="h-8 w-auto" />
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl px-4 py-10 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground">Client Onboarding Form</h1>
            <p className="mt-4 rounded-xl border border-border bg-muted px-5 py-4 text-sm leading-relaxed text-foreground">
              Please fill out these questions to the best of your ability. This will be the content of your website. If you need clarification on anything or don't want any of this information included just leave it blank/contact us :)!
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Full Name */}
            <div data-error={errors.full_name ? true : undefined}>
              <label className={labelClass}>
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={set("full_name")}
                className={inputClass}
              />
              {errors.full_name && <p className={errorClass}>{errors.full_name}</p>}
            </div>

            {/* Business Phone */}
            <div>
              <label className={labelClass}>
                Business Phone{" "}
                <span className="font-normal text-muted-foreground">(Whereever you want to be notified when you have a new lead)</span>
              </label>
              <input
                type="tel"
                placeholder="*this can be your personal # if you want"
                value={formData.business_phone}
                onChange={set("business_phone")}
                className={inputClass}
              />
            </div>

            {/* Business Name */}
            <div data-error={errors.business_name ? true : undefined}>
              <label className={labelClass}>
                Your Official Business Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Your Official Business Name"
                value={formData.business_name}
                onChange={set("business_name")}
                className={inputClass}
              />
              {errors.business_name && <p className={errorClass}>{errors.business_name}</p>}
            </div>

            {/* Tax ID */}
            <div>
              <label className={labelClass}>Your Businesses Tax ID or EIN #</label>
              <input
                type="text"
                placeholder="Input business Tax ID or EIN #"
                value={formData.tax_id}
                onChange={set("tax_id")}
                className={inputClass}
              />
            </div>

            {/* Current Website */}
            <div>
              <label className={labelClass}>Link to your current website <span className="font-normal text-muted-foreground">(IF YOU HAVE ONE)</span></label>
              <input
                type="text"
                placeholder="Paste the link to your current site"
                value={formData.current_website}
                onChange={set("current_website")}
                className={inputClass}
              />
            </div>

            {/* About Us */}
            <div data-error={errors.about_us ? true : undefined}>
              <label className={labelClass}>
                Your "About Us" section <span className="text-destructive">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                This should be 3–5 sentences about yourself and how you got started in the business — remember we are trying to build a personal brand around you.
              </p>
              <textarea
                placeholder="About Us"
                value={formData.about_us}
                onChange={set("about_us")}
                className={textareaClass}
              />
              {errors.about_us && <p className={errorClass}>{errors.about_us}</p>}
            </div>

            {/* Service Areas */}
            <div>
              <label className={labelClass}>
                Your TOP Location and the Areas that you service
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Be as SPECIFIC as possible! (surrounding cities, suburbs, counties, etc) <span className="font-semibold text-foreground">DO NOT ADD MORE THAN 14</span>
              </p>
              <textarea
                placeholder="do NOT add more than 14"
                value={formData.service_areas}
                onChange={set("service_areas")}
                className={textareaClass}
              />
            </div>

            {/* Services Offered */}
            <div data-error={errors.services_offered ? true : undefined}>
              <label className={labelClass}>
                All the services you offer, be as SPECIFIC as possible <span className="text-destructive">*</span>
              </label>
              <textarea
                placeholder="List at least 4 services that your company provides"
                value={formData.services_offered}
                onChange={set("services_offered")}
                className={textareaClass}
              />
              {errors.services_offered && <p className={errorClass}>{errors.services_offered}</p>}
            </div>

            {/* Business Differentiators */}
            <div>
              <label className={labelClass}>
                Give us a few special things about your business that we can show off on your website!
              </label>
              <textarea
                placeholder="Ex: 10+ Years in business, Veteran Owned, Fully Insured, etc"
                value={formData.business_differentiators}
                onChange={set("business_differentiators")}
                className={textareaClass}
              />
            </div>

            {/* Hours of Operation */}
            <div data-error={errors.business_hours ? true : undefined}>
              <label className={labelClass}>
                Your business's hour of operations <span className="text-destructive">*</span>
              </label>
              <textarea
                placeholder="EX: 9 am to 5 pm Mon-Friday"
                value={formData.business_hours}
                onChange={set("business_hours")}
                className={textareaClass + " min-h-[80px]"}
              />
              {errors.business_hours && <p className={errorClass}>{errors.business_hours}</p>}
            </div>

            {/* Instagram */}
            <div>
              <label className={labelClass}>Your Instagram page. Control copy the link into the box below</label>
              <input
                type="text"
                placeholder="Example: https://www.instagram.com/vargaflow/"
                value={formData.instagram}
                onChange={set("instagram")}
                className={inputClass}
              />
            </div>

            {/* Facebook */}
            <div>
              <label className={labelClass}>Your Facebook Page. Control copy the link into the box below</label>
              <input
                type="text"
                placeholder="Example: www.facebook.com/vargaflow/"
                value={formData.facebook}
                onChange={set("facebook")}
                className={inputClass}
              />
            </div>

            {/* BBB */}
            <div>
              <label className={labelClass}>BBB Link <span className="font-normal text-muted-foreground">(if applicable)</span></label>
              <input
                type="text"
                placeholder="www.bbb.org/johnconstruction"
                value={formData.bbb}
                onChange={set("bbb")}
                className={inputClass}
              />
            </div>

            {/* TikTok */}
            <div>
              <label className={labelClass}>TikTok Link <span className="font-normal text-muted-foreground">(if applicable)</span></label>
              <input
                type="text"
                placeholder="www.tiktok.com/@johnconstruction"
                value={formData.tiktok}
                onChange={set("tiktok")}
                className={inputClass}
              />
            </div>

            {/* Yelp */}
            <div>
              <label className={labelClass}>Yelp Link <span className="font-normal text-muted-foreground">(if applicable)</span></label>
              <input
                type="text"
                placeholder="https://www.yelp.com/biz/test-test-test-test-test-3?osq=JohnConconstruct"
                value={formData.yelp}
                onChange={set("yelp")}
                className={inputClass}
              />
            </div>

            {/* Return Customer Discount */}
            <div>
              <label className={labelClass}>
                <span className="text-primary">IMPORTANT:</span> Discounts you would offer for return customers or friends of past customers
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Ex: $500 off your next roof / 15% off your next service — we will market these on your behalf to all your past customers.
              </p>
              <textarea
                placeholder="This is for your automated re-marketing campaigns"
                value={formData.return_customer_discount}
                onChange={set("return_customer_discount")}
                className={textareaClass + " min-h-[80px]"}
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className={labelClass}>Your Company Logo <span className="font-normal text-muted-foreground">(Let us know if you need us to make you one)</span></label>
              <div className="mt-1">
                <label className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                  <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Click to upload your logo</span>
                  <input type="file" accept="image/*,.pdf,.svg,.ai,.eps" className="sr-only" />
                </label>
              </div>
            </div>

            {/* Need Logo */}
            <div>
              <label className={labelClass}>Do you need us to make you a logo?</label>
              <input
                type="text"
                placeholder="Yes or No"
                value={formData.need_logo}
                onChange={set("need_logo")}
                className={inputClass}
              />
            </div>

            {/* Photos Callout Block */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 px-5 py-5">
              <p className="text-base font-bold text-foreground">PHOTOS 📸</p>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">1.</span> Send 25–60 of your best photos to{" "}
                  <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">
                    kornel@vargaflow.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">2.</span> Please include a nice picture of yourself and/or your team — customers want to know who they will be working with.
                </li>
              </ol>
            </div>

            {/* Terms & Conditions */}
            <div data-terms-error={termsError ? true : undefined}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => {
                    setTermsAgreed(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="accent-primary mt-0.5 h-4 w-4 shrink-0"
                />
                <span className="text-sm text-foreground">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </label>
              {termsError && (
                <p className={errorClass}>You must agree to the terms & conditions to continue.</p>
              )}
            </div>

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
              {status === "sending" ? "Submitting..." : "➡ Submit! ⬅"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OnboardingForm;
