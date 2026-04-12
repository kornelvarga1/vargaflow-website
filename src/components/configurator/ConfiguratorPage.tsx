import { useState, useEffect } from "react";
import { NICHES, NICHE_LIST, DEFAULT_NICHE } from "@/data/configurator-niches";
import ScrollReveal from "@/components/ScrollReveal";
import NicheSwitcher from "./controls/NicheSwitcher";
import HueWheel from "./controls/HueWheel";
import CompanyNameInput from "./controls/CompanyNameInput";
import LogoUpload from "./controls/LogoUpload";
import MacFrame from "./preview/MacFrame";
import DemoPreview from "./preview/DemoPreview";
import ConfiguratorCTA from "./ConfiguratorCTA";

const ConfiguratorPage = () => {
  const [activeNiche, setActiveNiche] = useState(DEFAULT_NICHE);
  const [hue, setHue] = useState(355); // warm red default
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const niche = NICHES[activeNiche];
  const displayName = companyName.trim() || niche.defaultCompanyName;
  const accentColor = `hsl(${hue}, 85%, 50%)`;

  // Preload all hero images on mount
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
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
                Interactive Demo
              </span>
              <h1 className="text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
                See Your Website{" "}
                <span className="text-primary">Come to Life</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground lg:text-lg">
                Pick your trade, choose your color, type your name — watch your
                site build itself in real time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Configurator */}
      <section className="bg-secondary pb-20 lg:pb-28">
        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Controls */}
              <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[300px]">
                <NicheSwitcher
                  activeNiche={activeNiche}
                  onSelect={handleNicheSelect}
                />
                <HueWheel hue={hue} onChange={setHue} />
                <CompanyNameInput
                  value={companyName}
                  placeholder={niche.defaultCompanyName}
                  onChange={setCompanyName}
                />
                <LogoUpload logoUrl={logoUrl} onUpload={setLogoUrl} />
              </div>

              {/* Preview */}
              <div className="min-w-0 flex-1">
                <MacFrame displayName={displayName}>
                  <DemoPreview
                    niche={niche}
                    accentColor={accentColor}
                    companyName={displayName}
                    logoUrl={logoUrl}
                  />
                </MacFrame>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ConfiguratorCTA />
    </>
  );
};

export default ConfiguratorPage;
