import { ShieldCheck, Phone } from "lucide-react";
import MockLogo from "./MockLogo";

interface MockHeroProps {
  accentColor: string;
  accentTextColor: string;
  companyName: string;
  headline: string;
  heroImage: string;
  logoUrl: string | null;
}

const MockHero = ({
  accentColor,
  accentTextColor,
  companyName,
  headline,
  logoUrl,
}: MockHeroProps) => (
  <div className="absolute inset-0 flex items-center">
    {/* Scrim */}
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/60 to-transparent" />

    <div className="relative z-10 w-full px-7 pt-[18px]">
      <div
        className="grid items-center gap-8"
        style={{ gridTemplateColumns: "1fr 46%" }}
      >
        {/* Left: headline + trust */}
        <div>
          <h1 className="text-[27px] font-extrabold leading-[1.1] tracking-tight text-white">
            {headline}
          </h1>
          <p className="mt-[10px] text-[10px] leading-relaxed text-white/75">
            Serving homeowners with quality workmanship and honest pricing.
            {" "}{companyName} — your trusted local experts.
          </p>
          {/* Trust badges + phone */}
          <div className="mt-[16px] flex items-center gap-[8px]">
            <span className="flex items-center gap-[3px] text-[9px] font-semibold text-white">
              <ShieldCheck size={12} className="text-white/80" />
              Licensed &amp; Insured
            </span>
            <span className="inline-flex h-[20px] items-center gap-[4px] rounded-[2px] bg-white px-[8px] text-[9px] font-bold text-foreground">
              <Phone size={9} />
              (602) 555-0100
            </span>
          </div>
        </div>

        {/* Right: quote form card */}
        <div
          className="rounded-md p-[18px]"
          style={{
            backgroundColor: "rgba(26,26,26,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(245,158,11,0.08)",
          }}
        >
          {/* Logo centered */}
          <div className="flex justify-center mb-[8px]">
            <MockLogo
              accentColor={accentColor}
              companyName={companyName}
              logoUrl={logoUrl}
            />
          </div>

          {/* Title */}
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
            Get a Free Quote
          </p>

          {/* Form fields */}
          <div className="mt-[14px] space-y-[9px]">
            {/* Full Name */}
            <div>
              <span className="block text-[6.5px] font-medium text-white/70 mb-[3px]">
                Full Name <span className="text-white/70">*</span>
              </span>
              <div className="h-[22px] w-full rounded-sm bg-white px-[6px] flex items-center">
                <span className="text-[6.5px] text-gray-400">John Smith</span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <span className="block text-[6.5px] font-medium text-white/70 mb-[3px]">
                Phone <span className="text-white/70">*</span>
              </span>
              <div className="h-[22px] w-full rounded-sm bg-white px-[6px] flex items-center">
                <span className="text-[6.5px] text-gray-400">
                  (808) 555-1234
                </span>
              </div>
            </div>

            {/* Message */}
            <div>
              <span className="block text-[6.5px] font-medium text-white/70 mb-[3px]">
                Short message about your needs <span className="text-white/70">*</span>
              </span>
              <div className="h-[46px] w-full rounded-sm bg-white px-[6px] pt-[5px] overflow-hidden">
                <span className="text-[6.5px] text-gray-400 font-bold block leading-[1.3] w-full">
                  Your message goes straight to my phone, I'll get back to you as soon as I'm available
                </span>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-[4px]">
              <div
                className="mt-[1.5px] h-[7px] w-[7px] shrink-0 rounded-[1.5px] border"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              />
              <span className="text-[5px] leading-[1.4] text-white/50">
                I agree to the terms &amp; conditions. I agree to receive texts.
              </span>
            </div>

            {/* Submit button */}
            <div
              className="flex h-[26px] w-full items-center justify-center rounded-sm"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-[9px] font-extrabold uppercase tracking-[0.1em]" style={{ color: accentTextColor }}>
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
