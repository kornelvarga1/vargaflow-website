import { useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/vf-icon.png";

const SUPABASE_URL = "https://zfmchywjmgykmlhjihls.supabase.co";
const SUPABASE_BASE = `${SUPABASE_URL}/functions/v1`;

// Hardcoded version string so we can prove which exact wording was shown
// if a recipient ever challenges consent. Bump this whenever the consent text
// below changes — the edge function stores its own copy and they must stay
// in lockstep (sms-optin-submit/index.ts).
const CONSENT_TEXT_VERSION = "2026-04-27-v1";

const CUSTOMER_CARE_CONSENT_TEXT =
  "By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message and AI-powered voice calls from VargaFlow LLC, regarding Customer Care, (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from VargaFlow LLC. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.";

const MARKETING_CONSENT_TEXT =
  "By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message from VargaFlow LLC, regarding new offers (marketing), (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from VargaFlow LLC. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.";

const CLOSING_CONSENT_TEXT =
  "Consent is provided exclusively for VargaFlow LLC to contact the user based on the selection, not any other third parties mentioned on the site. SMS opt-in data is not shared/sold to third parties for promotional/marketing purposes.";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

const initialForm: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

const inputClass =
  "w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

const SmsOptin = () => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [customerCareConsent, setCustomerCareConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const digits = formData.phone.replace(/\D/g, "");
    const phone = digits ? `+1${digits}` : "";

    setStatus("sending");
    try {
      const res = await fetch(`${SUPABASE_BASE}/sms-optin-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone,
          customer_care_consent: customerCareConsent,
          marketing_consent: marketingConsent,
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
          <title>Thank You — VargaFlow LLC</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="flex min-h-screen flex-col bg-background">
          <div className="flex flex-1 items-center justify-center px-4 py-16">
            <div className="mx-auto w-full max-w-md text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-foreground">
                ✓ Thank you for submitting.
              </p>
            </div>
          </div>
          <SmsOptinFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Get Started — VargaFlow LLC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-5">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <img src={logo} alt="VargaFlow LLC" className="h-8 w-auto" />
            <span className="text-base font-bold tracking-tight text-foreground">VargaFlow LLC</span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10 pb-16">
          {/* About */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground">About Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Done-for-you marketing automation services for home service businesses.
            </p>
          </section>

          {/* Section Header */}
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Input Your Information Here to Get Started 👋
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* First Name */}
            <div>
              <label className={labelClass}>First name</label>
              <input
                type="text"
                placeholder="First name"
                value={formData.first_name}
                onChange={set("first_name")}
                className={inputClass}
                autoComplete="given-name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className={labelClass}>Last name</label>
              <input
                type="text"
                placeholder="Last name"
                value={formData.last_name}
                onChange={set("last_name")}
                className={inputClass}
                autoComplete="family-name"
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={set("email")}
                className={inputClass}
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone</label>
              <div className="flex">
                <span
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-1.5 rounded-l-md border border-r-0 border-border bg-muted px-3 text-sm text-foreground"
                >
                  <span>🇺🇸</span>
                  <span className="font-medium">+1</span>
                </span>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={set("phone")}
                  className={
                    "w-full rounded-r-md border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15"
                  }
                  autoComplete="tel-national"
                  inputMode="tel"
                />
              </div>
            </div>

            {/* Consent Checkboxes */}
            <fieldset className="space-y-4 pt-2">
              <legend className="sr-only">Consent</legend>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-4">
                <input
                  type="checkbox"
                  checked={customerCareConsent}
                  onChange={(e) => setCustomerCareConsent(e.target.checked)}
                  className="accent-foreground mt-1 h-4 w-4 shrink-0"
                />
                <span className="text-xs leading-relaxed text-foreground/80">
                  {CUSTOMER_CARE_CONSENT_TEXT}
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-4">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="accent-foreground mt-1 h-4 w-4 shrink-0"
                />
                <span className="text-xs leading-relaxed text-foreground/80">
                  {MARKETING_CONSENT_TEXT}
                </span>
              </label>
            </fieldset>

            {/* Closing Consent Statement */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              {CLOSING_CONSENT_TEXT}
            </p>

            {status === "error" && (
              <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Something went wrong submitting the form. Please try again or email{" "}
                <a href="mailto:kornel@vargaflow.com" className="underline">
                  kornel@vargaflow.com
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-md bg-foreground py-4 text-base font-bold text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>
          </form>
          {/* Hidden marker so we can verify on inspection which consent text version was rendered */}
          <p className="sr-only">Consent text version: {CONSENT_TEXT_VERSION}</p>
        </div>

        <SmsOptinFooter />
      </div>
    </>
  );
};

const SmsOptinFooter = () => (
  <footer className="border-t border-border bg-muted/30 px-4 py-6">
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} VargaFlow LLC. All rights reserved.</span>
      <div className="flex gap-4">
        <a href="/terms-of-service" className="hover:text-foreground transition-colors">
          Terms of Service
        </a>
        <a href="/privacy-policy" className="hover:text-foreground transition-colors">
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
);

export default SmsOptin;
