import { ShieldCheck, Phone } from "lucide-react";
import MockLogo from "./MockLogo";

interface MockHeroProps {
  accentColor: string;
  companyName: string;
  headline: string;
  heroImage: string;
  logoUrl: string | null;
}

const MockHero = ({
  accentColor,
  companyName,
  headline,
  logoUrl,
}: MockHeroProps) => (
  <div className="absolute inset-0 flex items-center">
    {/* Scrim */}
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/60 to-transparent" />

    <div className="relative z-10 w-full px-5 pt-[10px]">
      <div
        className="grid items-center gap-6"
        style={{ gridTemplateColumns: "1fr 42%" }}
      >
        {/* Left: headline + trust */}
        <div>
          <h1 className="text-[18px] font-extrabold leading-[1.15] tracking-tight text-white">
            {headline}
          </h1>
          <p className="mt-[5px] text-[7px] leading-relaxed text-white/75">
            Serving homeowners with quality workmanship and honest pricing.
            {" "}{companyName} — your trusted local experts.
          </p>
          {/* Trust badges + phone */}
          <div className="mt-[10px] flex items-center gap-[8px]">
            <span className="flex items-center gap-[2px] text-[6px] font-semibold text-white">
              <ShieldCheck size={8} style={{ color: accentColor }} />
              Licensed &amp; Insured
            </span>
            <span
              className="flex items-center gap-[2px] text-[6px] font-bold"
              style={{ color: accentColor }}
            >
              <Phone size={6} />
              (602) 555-0100
            </span>
          </div>
        </div>

        {/* Right: quote form card */}
        <div
          className="rounded-md p-[14px]"
          style={{
            backgroundColor: "rgba(26,26,26,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(245,158,11,0.08)",
          }}
        >
          {/* Logo centered */}
          <div className="flex justify-center mb-[6px]">
            <MockLogo
              accentColor={accentColor}
              companyName={companyName}
              logoUrl={logoUrl}
            />
          </div>

          {/* Title */}
          <p className="text-center text-[7px] font-extrabold uppercase tracking-[0.12em] text-white">
            Get a Free Quote
          </p>

          {/* Form fields */}
          <div className="mt-[10px] space-y-[6px]">
            {/* Full Name */}
            <div>
              <span className="block text-[4.5px] font-medium text-white/70 mb-[2px]">
                Full Name <span style={{ color: accentColor }}>*</span>
              </span>
              <div className="h-[16px] w-full rounded-sm bg-white px-[4px] flex items-center">
                <span className="text-[4.5px] text-gray-400">John Smith</span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <span className="block text-[4.5px] font-medium text-white/70 mb-[2px]">
                Phone <span style={{ color: accentColor }}>*</span>
              </span>
              <div className="h-[16px] w-full rounded-sm bg-white px-[4px] flex items-center">
                <span className="text-[4.5px] text-gray-400">
                  (808) 555-1234
                </span>
              </div>
            </div>

            {/* Message */}
            <div>
              <span className="block text-[4.5px] font-medium text-white/70 mb-[2px]">
                Short message about your needs <span style={{ color: accentColor }}>*</span>
              </span>
              <div className="h-[34px] w-full rounded-sm bg-white px-[4px] pt-[4px] overflow-hidden">
                <span className="text-[4.5px] text-gray-400 font-bold block leading-[1.3] w-full">
                  Your message goes straight to my phone, I'll get back to you as soon as I'm available
                </span>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-[3px]">
              <div
                className="mt-[1px] h-[5px] w-[5px] shrink-0 rounded-[1px] border"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              />
              <span className="text-[3.5px] leading-[1.4] text-white/50">
                I agree to the terms &amp; conditions. I agree to receive texts.
              </span>
            </div>

            {/* Submit button */}
            <div
              className="flex h-[18px] w-full items-center justify-center rounded-sm"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-[6px] font-extrabold uppercase tracking-[0.1em] text-[#1a1a1a]">
                Send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MockHero;
