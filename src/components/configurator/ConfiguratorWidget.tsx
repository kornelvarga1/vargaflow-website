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

const NICHE_HSL: Record<string, { hue: number; lightness: number }> = {
  plumbing: { hue: 210, lightness: 50 },
  roofing: { hue: 355, lightness: 50 },
  hvac: { hue: 200, lightness: 45 },
  electrical: { hue: 45, lightness: 50 },
  landscaping: { hue: 140, lightness: 40 },
  painting: { hue: 25, lightness: 50 },
  fencing: { hue: 30, lightness: 35 },
  "pest-control": { hue: 160, lightness: 40 },
  "garage-doors": { hue: 215, lightness: 45 },
  concrete: { hue: 220, lightness: 40 },
  "windows-doors": { hue: 185, lightness: 45 },
  gutters: { hue: 220, lightness: 40 },
};

// Saturation kept fixed at 85% for the niche presets (matches the original
// HueWheel design). Users override freely once they touch the picker.
const PRESET_SATURATION = 85;

const ConfiguratorWidget = () => {
  const NICHE_HEX = useMemo(() => {
    const out: Record<string, string> = {};
    for (const [slug, { hue, lightness }] of Object.entries(NICHE_HSL)) {
      out[slug] = hslToHex(hue, PRESET_SATURATION, lightness);
    }
    return out;
  }, []);

  const [activeNiche, setActiveNiche] = useState(DEFAULT_NICHE);
  const [accentColor, setAccentColor] = useState(() => {
    const fallback = NICHE_HSL[DEFAULT_NICHE] ?? { hue: 210, lightness: 50 };
    return hslToHex(fallback.hue, PRESET_SATURATION, fallback.lightness);
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
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-gold-dark hover:shadow-lg"
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
