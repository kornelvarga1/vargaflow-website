import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NICHES, NICHE_LIST, DEFAULT_NICHE } from "@/data/configurator-niches";
import { hslToHex, hexBrightness } from "@/lib/color";
import NicheSwitcher from "./controls/NicheSwitcher";
import BrandColorPicker from "./controls/BrandColorPicker";
import CompanyNameInput from "./controls/CompanyNameInput";
import LogoUpload from "./controls/LogoUpload";
import MacFrame from "./preview/MacFrame";
import DemoPreview from "./preview/DemoPreview";

// Premium curated palette — each trade gets its own saturation/lightness so the
// presets read as real brand colors rather than crayon stereotypes. Users
// override freely once they touch the picker.
const NICHE_HSL: Record<string, { hue: number; saturation: number; lightness: number }> = {
  plumbing: { hue: 210, saturation: 32, lightness: 38 },        // muted slate-blue
  roofing: { hue: 8, saturation: 45, lightness: 38 },           // oxblood
  hvac: { hue: 195, saturation: 30, lightness: 42 },            // dusty teal
  electrical: { hue: 42, saturation: 55, lightness: 48 },       // rich ochre
  landscaping: { hue: 145, saturation: 25, lightness: 32 },     // forest sage
  painting: { hue: 22, saturation: 32, lightness: 42 },         // muted rust-clay
  fencing: { hue: 28, saturation: 22, lightness: 30 },          // wood brown
  "pest-control": { hue: 155, saturation: 28, lightness: 32 },  // deep teal-green
  "garage-doors": { hue: 220, saturation: 22, lightness: 35 },  // slate
  concrete: { hue: 25, saturation: 8, lightness: 38 },          // warm gray
  "windows-doors": { hue: 188, saturation: 28, lightness: 42 }, // dusty cyan
  gutters: { hue: 32, saturation: 40, lightness: 35 },          // copper-bronze
};

const ConfiguratorWidget = () => {
  const NICHE_HEX = useMemo(() => {
    const out: Record<string, string> = {};
    for (const [slug, { hue, saturation, lightness }] of Object.entries(NICHE_HSL)) {
      out[slug] = hslToHex(hue, saturation, lightness);
    }
    return out;
  }, []);

  const [activeNiche, setActiveNiche] = useState(DEFAULT_NICHE);
  const [accentColor, setAccentColor] = useState(() => {
    const fallback = NICHE_HSL[DEFAULT_NICHE] ?? { hue: 210, saturation: 32, lightness: 38 };
    return hslToHex(fallback.hue, fallback.saturation, fallback.lightness);
  });
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const niche = NICHES[activeNiche];
  const displayName = companyName.trim() || niche.defaultCompanyName;
  // Auto-contrast: white text on dark accents, dark text on light accents.
  // Threshold 140/255 is roughly the perceived-brightness midpoint.
  const accentTextColor = hexBrightness(accentColor) < 140 ? "#ffffff" : "#1a1a1a";

  useEffect(() => {
    NICHE_LIST.forEach((n) => {
      const img = new Image();
      img.src = n.heroImage;
    });
  }, []);

  const handleNicheSelect = (slug: string) => {
    setActiveNiche(slug);
    setCompanyName("");
    setLogoUrl(null);
    const preset = NICHE_HEX[slug];
    if (preset) setAccentColor(preset);
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[300px]">
        <NicheSwitcher activeNiche={activeNiche} onSelect={handleNicheSelect} />
        <BrandColorPicker value={accentColor} onChange={setAccentColor} />
        <CompanyNameInput
          value={companyName}
          placeholder={niche.defaultCompanyName}
          onChange={setCompanyName}
        />
        <LogoUpload logoUrl={logoUrl} onUpload={setLogoUrl} />

        <div className="mt-2 flex flex-col gap-1.5">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90"
          >
            Build This For Me — Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            Book a free 20-min walkthrough.
          </p>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <MacFrame displayName={displayName}>
          <DemoPreview
            niche={niche}
            accentColor={accentColor}
            accentTextColor={accentTextColor}
            companyName={displayName}
            logoUrl={logoUrl}
          />
        </MacFrame>
      </div>
    </div>
  );
};

export default ConfiguratorWidget;
