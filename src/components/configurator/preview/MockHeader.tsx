import { Phone, ChevronDown } from "lucide-react";
import MockLogo from "./MockLogo";

interface MockHeaderProps {
  accentColor: string;
  accentTextColor: string;
  companyName: string;
  logoUrl: string | null;
}

const MockHeader = ({ accentColor, accentTextColor, companyName, logoUrl }: MockHeaderProps) => (
  <div className="absolute top-0 left-0 right-0 z-20 flex h-[30px] items-center justify-between px-5">
    {/* Logo — far left */}
    <MockLogo
      accentColor={accentColor}
      companyName={companyName}
      logoUrl={logoUrl}
    />

    {/* Nav links — center */}
    <nav className="flex items-center">
      {["Home", "Services", "Service Areas", "Gallery", "Blog", "Contact"].map(
        (item) => (
          <span
            key={item}
            className="flex items-center gap-[1px] px-[4px] py-[3px] text-[5px] font-medium text-white/90"
          >
            {item}
            {(item === "Services" || item === "Service Areas") && (
              <ChevronDown size={3.5} className="text-white/60" />
            )}
          </span>
        )
      )}
    </nav>

    {/* Right — phone + CTA */}
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-[2px] text-[5px] font-bold text-white tracking-wide">
        <Phone size={4} style={{ color: accentColor }} />
        (602) 555-0100
      </span>
      <span
        className="inline-flex h-[12px] items-center rounded-sm px-[6px] text-[4.5px] font-semibold"
        style={{ backgroundColor: accentColor, color: accentTextColor }}
      >
        Get Free Quote
      </span>
    </div>
  </div>
);

export default MockHeader;
