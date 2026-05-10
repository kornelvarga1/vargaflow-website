import { Phone, ChevronDown } from "lucide-react";
import MockLogo from "./MockLogo";

interface MockHeaderProps {
  accentColor: string;
  accentTextColor: string;
  companyName: string;
  logoUrl: string | null;
}

const MockHeader = ({ accentColor, accentTextColor, companyName, logoUrl }: MockHeaderProps) => (
  <div className="absolute top-0 left-0 right-0 z-20 flex h-[42px] items-center justify-between px-7">
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
            className="flex items-center gap-[3px] px-[7px] py-[4px] text-[9px] font-semibold text-white/90"
          >
            {item}
            {(item === "Services" || item === "Service Areas") && (
              <ChevronDown size={6} className="text-white/60" />
            )}
          </span>
        )
      )}
    </nav>

    {/* Right — phone + CTA */}
    <div className="flex items-center gap-3">
      <span className="inline-flex h-[20px] items-center gap-[4px] rounded-sm bg-white px-[9px] text-[7.5px] font-bold text-foreground">
        <Phone size={7} />
        (602) 555-0100
      </span>
      <span
        className="inline-flex h-[20px] items-center rounded-sm px-[11px] text-[7.5px] font-semibold"
        style={{ backgroundColor: accentColor, color: accentTextColor }}
      >
        Get Free Quote
      </span>
    </div>
  </div>
);

export default MockHeader;
