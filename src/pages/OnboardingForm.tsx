import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/vf-icon.png";
import { z } from "zod";

const SUPABASE_URL = "https://zfmchywjmgykmlhjihls.supabase.co";
const SUPABASE_BASE = `${SUPABASE_URL}/functions/v1`;
const STORAGE_BUCKET = "onboarding-photos";
const MAX_FILE_SIZE_MB = 25;

interface UploadedPhoto {
  id: string;
  name: string;
  url: string;
  size: number;
}

interface UploadingPhoto {
  id: string;
  name: string;
  progress: number;
  error?: string;
}

function randomId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  business_phone: z.string().trim().optional(),
  business_name: z.string().trim().min(1, "Business name is required"),
  trade_type: z.string().trim().min(1, "Trade type is required"),
  license_number: z.string().trim().min(1, "Contractor license number is required"),
  tax_id: z.string().trim().optional(),
  street_address: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  zip: z.string().trim().min(1, "ZIP is required"),
  years_in_business: z.string().trim().min(1, "Years in business is required"),
  current_website: z.string().trim().optional(),
  google_business_url: z.string().trim().optional(),
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
  brand_color: z.string().trim().optional(),
  need_logo: z.string().trim().optional(),
});

type FormData = z.infer<typeof formSchema>;

const initialForm: FormData = {
  full_name: "",
  email: "",
  business_phone: "",
  business_name: "",
  trade_type: "",
  license_number: "",
  tax_id: "",
  street_address: "",
  city: "",
  state: "",
  zip: "",
  years_in_business: "",
  current_website: "",
  google_business_url: "",
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
  brand_color: "#f59e0b",
  need_logo: "",
};

const inputClass =
  "w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const textareaClass = inputClass + " min-h-[100px] resize-y";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const errorClass = "mt-1.5 text-xs font-medium text-destructive";

const OnboardingForm = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState<UploadingPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Stable folder ID per form session so all photos group together in storage.
  const sessionId = useMemo(() => randomId(), []);

  const uploadPhoto = async (file: File) => {
    const uploadId = randomId();

    if (!file.type.startsWith("image/")) {
      setUploading((prev) => [
        ...prev,
        { id: uploadId, name: file.name, progress: 0, error: "Only images are allowed" },
      ]);
      setTimeout(() => setUploading((prev) => prev.filter((u) => u.id !== uploadId)), 4000);
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_SIZE_MB) {
      setUploading((prev) => [
        ...prev,
        { id: uploadId, name: file.name, progress: 0, error: `Over ${MAX_FILE_SIZE_MB}MB` },
      ]);
      setTimeout(() => setUploading((prev) => prev.filter((u) => u.id !== uploadId)), 4000);
      return;
    }

    setUploading((prev) => [...prev, { id: uploadId, name: file.name, progress: 0 }]);

    // Clean filename, prefix with timestamp for uniqueness within folder
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${sessionId}/${Date.now()}-${safeName}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`;

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": file.type,
          "x-upsert": "true",
        },
        body: file,
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Upload failed");
        throw new Error(msg.slice(0, 80));
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
      setPhotos((prev) => [...prev, { id: uploadId, name: file.name, url: publicUrl, size: file.size }]);
      setUploading((prev) => prev.filter((u) => u.id !== uploadId));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setUploading((prev) =>
        prev.map((u) => (u.id === uploadId ? { ...u, error: message } : u))
      );
      setTimeout(() => setUploading((prev) => prev.filter((u) => u.id !== uploadId)), 5000);
    }
  };

  const handleFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => uploadPhoto(file));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        body: JSON.stringify({
          ...result.data,
          photos: photos.map((p) => ({ name: p.name, url: p.url, size: p.size })),
        }),
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
          <title>Onboarding — VargaFlow</title>
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
              Thanks for filling out your onboarding form. I have everything I need to get started.
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
        <title>Client Onboarding — VargaFlow</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-5">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <img src={logo} alt="VargaFlow" className="h-8 w-auto" />
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl px-4 py-10 pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground">Client Onboarding Form</h1>
            <p className="mt-4 rounded-xl border border-border bg-muted px-5 py-4 text-sm leading-relaxed text-foreground">
              Please fill out these questions to the best of your ability. This will be the content of your website. If you need clarification on anything or don't want any of this information included just leave it blank/contact me :)!
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

            {/* Email */}
            <div data-error={errors.email ? true : undefined}>
              <label className={labelClass}>
                Business Email <span className="text-destructive">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                This is the email we'll show on your website for customers to reach you.
              </p>
              <input
                type="email"
                placeholder="you@yourbusiness.com"
                value={formData.email}
                onChange={set("email")}
                className={inputClass}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
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

            {/* Trade Type */}
            <div data-error={errors.trade_type ? true : undefined}>
              <label className={labelClass}>
                Your Trade <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.trade_type}
                onChange={set("trade_type")}
                className={inputClass}
              >
                <option value="">Select your trade…</option>
                <option value="roofing">Roofing</option>
                <option value="plumbing">Plumbing</option>
                <option value="hvac">HVAC</option>
                <option value="electrical">Electrical</option>
                <option value="general-contractor">General Contractor</option>
                <option value="landscaping">Landscaping</option>
                <option value="painting">Painting</option>
                <option value="flooring">Flooring</option>
                <option value="concrete-masonry">Concrete / Masonry</option>
                <option value="other">Other</option>
              </select>
              {errors.trade_type && <p className={errorClass}>{errors.trade_type}</p>}
            </div>

            {/* Contractor License Number */}
            <div data-error={errors.license_number ? true : undefined}>
              <label className={labelClass}>
                Contractor License Number <span className="text-destructive">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                The license number issued by your state's contractor board (e.g. ROC # in Arizona, CSLB # in California).
              </p>
              <input
                type="text"
                placeholder="License # from your state contractor board"
                value={formData.license_number}
                onChange={set("license_number")}
                className={inputClass}
              />
              {errors.license_number && <p className={errorClass}>{errors.license_number}</p>}
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

            {/* Business Address */}
            <div className="space-y-3">
              <label className={labelClass}>
                Business Address <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground">
                We'll use this for your website footer, contact page, and Google Maps embed.
              </p>

              <div data-error={errors.street_address ? true : undefined}>
                <input
                  type="text"
                  placeholder="Street address"
                  value={formData.street_address}
                  onChange={set("street_address")}
                  className={inputClass}
                />
                {errors.street_address && <p className={errorClass}>{errors.street_address}</p>}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px_120px]">
                <div data-error={errors.city ? true : undefined}>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={set("city")}
                    className={inputClass}
                  />
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
                <div data-error={errors.state ? true : undefined}>
                  <input
                    type="text"
                    placeholder="State"
                    maxLength={2}
                    value={formData.state}
                    onChange={set("state")}
                    className={inputClass}
                  />
                  {errors.state && <p className={errorClass}>{errors.state}</p>}
                </div>
                <div data-error={errors.zip ? true : undefined}>
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={set("zip")}
                    className={inputClass}
                  />
                  {errors.zip && <p className={errorClass}>{errors.zip}</p>}
                </div>
              </div>
            </div>

            {/* Years in Business */}
            <div data-error={errors.years_in_business ? true : undefined}>
              <label className={labelClass}>
                Years in Business <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="Ex: 15"
                value={formData.years_in_business}
                onChange={set("years_in_business")}
                className={inputClass}
              />
              {errors.years_in_business && <p className={errorClass}>{errors.years_in_business}</p>}
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

            {/* Google Business Profile */}
            <div>
              <label className={labelClass}>
                Google Business Profile URL <span className="font-normal text-muted-foreground">(if you have one)</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Paste the link to your Google Business listing — we'll use it so customers can leave reviews with one click.
              </p>
              <input
                type="text"
                placeholder="https://g.page/your-business or Google Maps listing URL"
                value={formData.google_business_url}
                onChange={set("google_business_url")}
                className={inputClass}
              />
            </div>

            {/* About Us */}
            <div data-error={errors.about_us ? true : undefined}>
              <label className={labelClass}>
                Your "About Us" section <span className="text-destructive">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                This should be 3–5 sentences about yourself and how you got started in the business — remember I'm trying to build a personal brand around you.
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
                Give me a few special things about your business that I can show off on your website!
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
                Ex: $500 off your next roof / 15% off your next service — I will market these on your behalf to all your past customers.
              </p>
              <textarea
                placeholder="This is for your automated re-marketing campaigns"
                value={formData.return_customer_discount}
                onChange={set("return_customer_discount")}
                className={textareaClass + " min-h-[80px]"}
              />
            </div>

            {/* Brand Color */}
            <div>
              <label className={labelClass}>
                Your Brand Color <span className="font-normal text-muted-foreground">(the main accent color for your website)</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Click to pick the color that matches your logo / branding. We'll use it for buttons, links, and accents across your site.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.brand_color || "#f59e0b"}
                  onChange={set("brand_color")}
                  className="h-12 w-16 cursor-pointer rounded-md border border-border bg-muted"
                />
                <input
                  type="text"
                  placeholder="#f59e0b"
                  value={formData.brand_color}
                  onChange={set("brand_color")}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className={labelClass}>Your Company Logo <span className="font-normal text-muted-foreground">(Let me know if you need me to make you one)</span></label>
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
              <label className={labelClass}>Do you need me to make you a logo?</label>
              <input
                type="text"
                placeholder="Yes or No"
                value={formData.need_logo}
                onChange={set("need_logo")}
                className={inputClass}
              />
            </div>

            {/* Photos Uploader */}
            <div>
              <label className={labelClass}>
                Your Photos <span className="text-primary">📸</span>
              </label>
              <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                Upload 25–60 of your best project photos. Include at least one nice picture of yourself or your team — customers want to see who they'll be working with. Max {MAX_FILE_SIZE_MB}MB per photo.
              </p>

              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
                }}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                <svg className="mb-2 h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-sm font-semibold text-foreground">Click to upload or drag & drop</p>
                <p className="mt-0.5 text-xs text-muted-foreground">JPG, PNG, HEIC up to {MAX_FILE_SIZE_MB}MB</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    if (e.target.files?.length) handleFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>

              {/* Upload progress items */}
              {uploading.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {uploading.map((u) => (
                    <div
                      key={u.id}
                      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
                        u.error
                          ? "border-destructive/40 bg-destructive/5 text-destructive"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {u.error ? (
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      <span className="truncate flex-1">{u.name}</span>
                      {u.error && <span className="shrink-0">{u.error}</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Uploaded thumbnails */}
              {photos.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {photos.length} {photos.length === 1 ? "photo" : "photos"} uploaded
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                    {photos.map((p) => (
                      <div key={p.id} className="group relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
                        <img
                          src={p.url}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.id)}
                          className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-destructive opacity-0 shadow-sm transition-opacity hover:bg-background group-hover:opacity-100"
                          aria-label={`Remove ${p.name}`}
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
