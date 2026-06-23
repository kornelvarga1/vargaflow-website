import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/vf-icon.png";
import { z } from "zod";

const SUPABASE_URL = "https://zfmchywjmgykmlhjihls.supabase.co";
const SUPABASE_BASE = `${SUPABASE_URL}/functions/v1`;
const STORAGE_BUCKET = "onboarding-photos";
const MAX_FILE_SIZE_MB = 25;
const MAX_LOGO_SIZE_MB = 10;

// Bumped to v2 when the wizard + logo upload were added. Old v1 drafts (boring
// long-page version) are ignored on load instead of half-hydrating.
const DRAFT_STORAGE_KEY = "vargaflow-onboarding-draft-v2";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
}

interface UploadingFile {
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
  trade_type_other: z.string().trim().optional(),
  tax_id: z.string().trim().min(1, "Tax ID / EIN is required"),
  street_address: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  zip: z.string().trim().min(1, "ZIP is required"),
  years_in_business: z.string().trim().min(1, "Years in business is required"),
  current_website: z.string().trim().optional(),
  domain_registrar: z.string().trim().optional(),
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
type FieldKey = keyof FormData;

const initialForm: FormData = {
  full_name: "",
  email: "",
  business_phone: "",
  business_name: "",
  trade_type: "",
  trade_type_other: "",
  tax_id: "",
  street_address: "",
  city: "",
  state: "",
  zip: "",
  years_in_business: "",
  current_website: "",
  domain_registrar: "",
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

type StepId = "about" | "business" | "story" | "online" | "brand" | "review";

interface StepConfig {
  id: StepId;
  title: string;
  subtitle?: string;
  required: FieldKey[];
}

const STEPS: StepConfig[] = [
  {
    id: "about",
    title: "About You",
    subtitle: "Just the basics so I can reach you.",
    required: ["full_name", "email"],
  },
  {
    id: "business",
    title: "Your Business",
    subtitle: "Your business identity and where you operate.",
    required: [
      "business_name",
      "trade_type",
      "street_address",
      "city",
      "state",
      "zip",
      "years_in_business",
      "business_hours",
      "tax_id",
    ],
  },
  {
    id: "story",
    title: "Story & Services",
    subtitle: "This becomes the bulk of your website copy.",
    required: ["about_us", "services_offered"],
  },
  {
    id: "online",
    title: "Online Presence",
    subtitle: "Existing links — skip any you don't have.",
    required: [],
  },
  {
    id: "brand",
    title: "Brand & Photos",
    subtitle: "Color, logo, and project photos.",
    required: [],
  },
  {
    id: "review",
    title: "Review & Submit",
    subtitle: "Double-check everything before you send.",
    required: [],
  },
];

const inputClass =
  "w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15";
const textareaClass = inputClass + " min-h-[100px] resize-y";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const errorClass = "mt-1.5 text-xs font-medium text-destructive";

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 disabled:opacity-50";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50";

type PersistedDraft = {
  formData?: Partial<FormData>;
  photos?: UploadedFile[];
  logoFile?: UploadedFile | null;
  termsAgreed?: boolean;
  currentStep?: number;
};

function readDraft(): PersistedDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedDraft) : {};
  } catch {
    return {};
  }
}

const TRADE_LABELS: Record<string, string> = {
  roofing: "Roofing",
  plumbing: "Plumbing",
  hvac: "HVAC",
  electrical: "Electrical",
  "general-contractor": "General Contractor",
  landscaping: "Landscaping",
  painting: "Painting",
  flooring: "Flooring",
  "concrete-masonry": "Concrete / Masonry",
  other: "Other",
};

const OnboardingForm = () => {
  const draft = useMemo(readDraft, []);

  const [formData, setFormData] = useState<FormData>(() => ({ ...initialForm, ...(draft.formData ?? {}) }));
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [termsAgreed, setTermsAgreed] = useState<boolean>(() => !!draft.termsAgreed);
  const [termsError, setTermsError] = useState(false);
  const [photos, setPhotos] = useState<UploadedFile[]>(() => draft.photos ?? []);
  const [logoFile, setLogoFile] = useState<UploadedFile | null>(() => draft.logoFile ?? null);
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [logoUploading, setLogoUploading] = useState<UploadingFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const s = draft.currentStep;
    if (typeof s === "number" && s >= 0 && s < STEPS.length) return s;
    return 0;
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Stable folder ID per form session so all uploads group together in storage.
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

  const uploadLogo = async (file: File) => {
    const uploadId = randomId();

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_LOGO_SIZE_MB) {
      setLogoUploading({ id: uploadId, name: file.name, progress: 0, error: `Over ${MAX_LOGO_SIZE_MB}MB` });
      setTimeout(() => setLogoUploading((prev) => (prev?.id === uploadId ? null : prev)), 4000);
      return;
    }

    setLogoUploading({ id: uploadId, name: file.name, progress: 0 });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${sessionId}/logo-${Date.now()}-${safeName}`;
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`;

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: file,
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Upload failed");
        throw new Error(msg.slice(0, 80));
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
      setLogoFile({ id: uploadId, name: file.name, url: publicUrl, size: file.size });
      setLogoUploading(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setLogoUploading({ id: uploadId, name: file.name, progress: 0, error: message });
      setTimeout(() => setLogoUploading((prev) => (prev?.id === uploadId ? null : prev)), 5000);
    }
  };

  const handleFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => uploadPhoto(file));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Autosave draft to localStorage so a refresh/crash/close doesn't wipe progress.
  useEffect(() => {
    if (status === "success") return;
    try {
      const payload: PersistedDraft = { formData, photos, logoFile, termsAgreed, currentStep };
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Quota/private-mode: silently skip — form still works in-memory.
    }
  }, [formData, photos, logoFile, termsAgreed, currentStep, status]);

  const isDirty = useMemo(() => {
    if (termsAgreed) return true;
    if (photos.length > 0) return true;
    if (logoFile) return true;
    return (Object.keys(initialForm) as FieldKey[]).some(
      (k) => formData[k] !== initialForm[k],
    );
  }, [formData, photos, logoFile, termsAgreed]);

  useEffect(() => {
    if (!isDirty || status === "success") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, status]);

  const set = (field: FieldKey) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const checkConditionalRequired = (): Partial<Record<FieldKey, string>> => {
    const errs: Partial<Record<FieldKey, string>> = {};
    if (formData.trade_type === "other" && !formData.trade_type_other.trim()) {
      errs.trade_type_other = "Please specify your trade";
    }
    return errs;
  };

  const validateStep = (stepIndex: number): boolean => {
    const required = STEPS[stepIndex].required;
    const fieldErrors: Partial<Record<FieldKey, string>> = {};

    if (required.length > 0) {
      const pickShape = required.reduce<Record<string, true>>((acc, k) => {
        acc[k] = true;
        return acc;
      }, {});
      const subset = formSchema.pick(pickShape as { [K in FieldKey]?: true });
      const result = subset.safeParse(formData);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as FieldKey;
          if (!fieldErrors[field]) fieldErrors[field] = issue.message;
        });
      }
    }

    // Conditional rules tied to specific steps
    if (STEPS[stepIndex].id === "business") {
      Object.assign(fieldErrors, checkConditionalRequired());
    }

    if (Object.keys(fieldErrors).length === 0) return true;
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
    return false;
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    if (!validateStep(currentStep)) {
      setTimeout(() => {
        document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToTop();
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  };

  const jumpToStep = (i: number) => {
    setCurrentStep(i);
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAgreed) {
      setTermsError(true);
      document.querySelector("[data-terms-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const result = formSchema.safeParse(formData);
    const conditionalErrs = checkConditionalRequired();
    const conditionalStepMap: Partial<Record<FieldKey, StepId>> = { trade_type_other: "business" };

    if (!result.success || Object.keys(conditionalErrs).length > 0) {
      const fieldErrors: Partial<Record<FieldKey, string>> = { ...conditionalErrs };
      let firstStep = STEPS.length - 1;
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as FieldKey;
          if (!fieldErrors[field]) fieldErrors[field] = issue.message;
          const owningStep = STEPS.findIndex((s) => s.required.includes(field));
          if (owningStep !== -1 && owningStep < firstStep) firstStep = owningStep;
        });
      }
      Object.keys(conditionalErrs).forEach((field) => {
        const stepId = conditionalStepMap[field as FieldKey];
        const idx = stepId ? STEPS.findIndex((s) => s.id === stepId) : -1;
        if (idx !== -1 && idx < firstStep) firstStep = idx;
      });
      setErrors(fieldErrors);
      setCurrentStep(firstStep);
      setTimeout(() => {
        document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
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
          logo: logoFile ? { name: logoFile.name, url: logoFile.url, size: logoFile.size } : null,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      try { window.localStorage.removeItem(DRAFT_STORAGE_KEY); } catch { /* ignore */ }
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
            <p className="mt-6 text-sm text-muted-foreground">
              You'll hear from Kornél within 1 business day with next steps.
            </p>
          </div>
        </div>
      </>
    );
  }

  const step = STEPS[currentStep];
  const progressPct = Math.round(((currentStep + 1) / STEPS.length) * 100);
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <>
      <Helmet>
        <title>Client Onboarding — VargaFlow</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Sticky progress header */}
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={logo} alt="VargaFlow" className="h-6 w-auto shrink-0" />
                <span className="truncate text-sm font-semibold text-foreground">
                  Step {currentStep + 1} of {STEPS.length} — {step.title}
                </span>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">{progressPct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-8 pb-24">
          {currentStep === 0 && (
            <p className="mb-6 rounded-xl border border-border bg-muted px-5 py-4 text-sm leading-relaxed text-foreground">
              Please fill out these questions to the best of your ability. This will be the content of your website. If you need clarification on anything or don't want any of this information included just leave it blank/contact me :)!
            </p>
          )}

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-foreground">{step.title}</h1>
            {step.subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{step.subtitle}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {step.id === "about" && (
              <>
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
              </>
            )}

            {step.id === "business" && (
              <>
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
                    {Object.entries(TRADE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  {errors.trade_type && <p className={errorClass}>{errors.trade_type}</p>}
                </div>

                {formData.trade_type === "other" && (
                  <div data-error={errors.trade_type_other ? true : undefined}>
                    <label className={labelClass}>
                      What trade? <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Garage Doors, Pool Service, Foundations…"
                      value={formData.trade_type_other}
                      onChange={set("trade_type_other")}
                      className={inputClass}
                    />
                    {errors.trade_type_other && <p className={errorClass}>{errors.trade_type_other}</p>}
                  </div>
                )}


                <div>
                  <label className={labelClass}>Your Businesses Tax ID or EIN # <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    placeholder="Input business Tax ID or EIN #"
                    value={formData.tax_id}
                    onChange={set("tax_id")}
                    className={inputClass}
                  />
                  {errors.tax_id && <p className={errorClass}>{errors.tax_id}</p>}
                </div>

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
              </>
            )}

            {step.id === "story" && (
              <>
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

                <div>
                  <label className={labelClass}>
                    <span className="font-bold text-foreground">IMPORTANT:</span> Discounts you would offer for return customers or friends of past customers
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
              </>
            )}

            {step.id === "online" && (
              <>
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

                <div>
                  <label className={labelClass}>
                    Where did you register your domain? <span className="font-normal text-muted-foreground">(if you have one)</span>
                  </label>
                  <p className="mb-2 text-xs text-muted-foreground">
                    e.g. GoDaddy, Namecheap, Wix, Squarespace, Google Domains — or "I don't have one."
                  </p>
                  <input
                    type="text"
                    placeholder="GoDaddy, Namecheap, Wix, other..."
                    value={formData.domain_registrar}
                    onChange={set("domain_registrar")}
                    className={inputClass}
                  />
                </div>

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
              </>
            )}

            {step.id === "brand" && (
              <>
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

                <div>
                  <label className={labelClass}>Your Company Logo <span className="font-normal text-muted-foreground">(Let me know if you need me to make you one)</span></label>
                  <p className="mb-2 text-xs text-muted-foreground">
                    Vector files (SVG, AI, EPS, PDF) are best, but a high-res PNG/JPG works too. Max {MAX_LOGO_SIZE_MB}MB.
                  </p>

                  {!logoFile ? (
                    <label className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
                      <svg className="h-5 w-5 shrink-0 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Click to upload your logo</span>
                      <input
                        type="file"
                        accept="image/*,.pdf,.svg,.ai,.eps"
                        className="sr-only"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) uploadLogo(f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 rounded-md border border-border bg-muted p-3">
                      {/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(logoFile.name) ? (
                        <img
                          src={logoFile.url}
                          alt={logoFile.name}
                          className="h-14 w-14 shrink-0 rounded-md border border-border bg-background object-contain"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-background text-xs font-semibold uppercase text-muted-foreground">
                          {logoFile.name.split(".").pop()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{logoFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(logoFile.size / 1024 / 1024).toFixed(2)} MB · uploaded
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLogoFile(null)}
                        className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        Replace
                      </button>
                    </div>
                  )}

                  {logoUploading && (
                    <div className={`mt-2 flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
                      logoUploading.error
                        ? "border-destructive/40 bg-destructive/5 text-destructive"
                        : "border-border bg-muted text-muted-foreground"
                    }`}>
                      {logoUploading.error ? (
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      <span className="truncate flex-1">{logoUploading.name}</span>
                      {logoUploading.error && <span className="shrink-0">{logoUploading.error}</span>}
                    </div>
                  )}
                </div>

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

                <div>
                  <label className={labelClass}>
                    Your Photos 📸
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
                        ? "border-foreground bg-secondary"
                        : "border-border bg-muted hover:border-foreground/40 hover:bg-secondary"
                    }`}
                  >
                    <svg className="mb-2 h-8 w-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              </>
            )}

            {step.id === "review" && (
              <>
                <ReviewSection title="About You" stepIndex={0} onEdit={jumpToStep} items={[
                  { label: "Full Name", value: formData.full_name },
                  { label: "Email", value: formData.email },
                  { label: "Business Phone", value: formData.business_phone },
                ]} />

                <ReviewSection title="Your Business" stepIndex={1} onEdit={jumpToStep} items={[
                  { label: "Business Name", value: formData.business_name },
                  {
                    label: "Trade",
                    value: formData.trade_type
                      ? formData.trade_type === "other"
                        ? `Other${formData.trade_type_other ? ` — ${formData.trade_type_other}` : ""}`
                        : TRADE_LABELS[formData.trade_type] ?? formData.trade_type
                      : "",
                  },
                  { label: "Tax ID / EIN", value: formData.tax_id },
                  {
                    label: "Address",
                    value: [formData.street_address, formData.city, formData.state, formData.zip]
                      .filter(Boolean)
                      .join(", "),
                  },
                  { label: "Years in Business", value: formData.years_in_business },
                  { label: "Hours", value: formData.business_hours, multiline: true },
                ]} />

                <ReviewSection title="Story & Services" stepIndex={2} onEdit={jumpToStep} items={[
                  { label: "About Us", value: formData.about_us, multiline: true },
                  { label: "Service Areas", value: formData.service_areas, multiline: true },
                  { label: "Services Offered", value: formData.services_offered, multiline: true },
                  { label: "Differentiators", value: formData.business_differentiators, multiline: true },
                  { label: "Return Customer Discount", value: formData.return_customer_discount, multiline: true },
                ]} />

                <ReviewSection title="Online Presence" stepIndex={3} onEdit={jumpToStep} items={[
                  { label: "Current Website", value: formData.current_website },
                  { label: "Domain Registrar", value: formData.domain_registrar },
                  { label: "Google Business", value: formData.google_business_url },
                  { label: "Instagram", value: formData.instagram },
                  { label: "Facebook", value: formData.facebook },
                  { label: "BBB", value: formData.bbb },
                  { label: "TikTok", value: formData.tiktok },
                  { label: "Yelp", value: formData.yelp },
                ]} />

                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Brand & Photos</h3>
                    <button type="button" onClick={() => jumpToStep(4)} className="text-xs font-semibold text-foreground hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="w-32 shrink-0 text-muted-foreground">Brand Color</span>
                      <div className="flex items-center gap-2 text-foreground">
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: formData.brand_color || "#f59e0b" }}
                        />
                        <span>{formData.brand_color || "—"}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-32 shrink-0 text-muted-foreground">Logo</span>
                      <span className="text-foreground">{logoFile ? logoFile.name : "—"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-32 shrink-0 text-muted-foreground">Need a logo?</span>
                      <span className="text-foreground">{formData.need_logo || "—"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-32 shrink-0 text-muted-foreground">Photos</span>
                      <span className="text-foreground">
                        {photos.length > 0 ? `${photos.length} uploaded` : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div data-terms-error={termsError ? true : undefined} className="rounded-xl border border-border bg-muted/40 p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => {
                        setTermsAgreed(e.target.checked);
                        if (e.target.checked) setTermsError(false);
                      }}
                      className="accent-foreground mt-0.5 h-4 w-4 shrink-0"
                    />
                    <span className="text-sm text-foreground">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
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
              </>
            )}

            <div className="flex items-center justify-between gap-3 pt-4">
              {currentStep > 0 ? (
                <button type="button" onClick={goBack} className={secondaryBtn}>
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {!isLastStep ? (
                <button type="button" onClick={goNext} className={primaryBtn}>
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={primaryBtn}
                >
                  {status === "sending" ? "Submitting..." : "➡ Submit ⬅"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

interface ReviewItem {
  label: string;
  value?: string;
  multiline?: boolean;
}

interface ReviewSectionProps {
  title: string;
  stepIndex: number;
  onEdit: (i: number) => void;
  items: ReviewItem[];
}

function ReviewSection({ title, stepIndex, onEdit, items }: ReviewSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <button type="button" onClick={() => onEdit(stepIndex)} className="text-xs font-semibold text-foreground hover:underline">
          Edit
        </button>
      </div>
      <dl className="space-y-2.5 text-sm">
        {items.map((item) => (
          <div key={item.label} className={item.multiline ? "" : "flex items-start gap-3"}>
            <dt className={`shrink-0 text-muted-foreground ${item.multiline ? "mb-1 block" : "w-32"}`}>
              {item.label}
            </dt>
            <dd className={`text-foreground ${item.multiline ? "whitespace-pre-wrap break-words" : "min-w-0 flex-1 break-words"}`}>
              {item.value?.trim() ? item.value : <span className="text-muted-foreground">—</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default OnboardingForm;
