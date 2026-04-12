import type { NicheConfig } from "@/data/configurator-niches";
import MockHeader from "./MockHeader";
import MockHero from "./MockHero";
import MockTrustBar from "./MockTrustBar";
import MockChatWidget from "./MockChatWidget";

interface DemoPreviewProps {
  niche: NicheConfig;
  accentColor: string;
  companyName: string;
  logoUrl: string | null;
}

const DemoPreview = ({
  niche,
  accentColor,
  companyName,
  logoUrl,
}: DemoPreviewProps) => (
  <div className="relative w-[700px] h-[440px] select-none pointer-events-none flex flex-col">
    {/* Hero — fills all space above trust bar */}
    <div
      className="relative flex-1"
      style={{
        backgroundImage: `url(${niche.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MockHeader
        accentColor={accentColor}
        companyName={companyName}
        logoUrl={logoUrl}
      />
      <MockHero
        accentColor={accentColor}
        companyName={companyName}
        headline={niche.headline}
        heroImage={niche.heroImage}
        logoUrl={logoUrl}
      />
    </div>
    {/* Trust bar — flush at bottom */}
    <MockTrustBar accentColor={accentColor} />
    {/* Chat widget */}
    <MockChatWidget accentColor={accentColor} />
  </div>
);

export default DemoPreview;
