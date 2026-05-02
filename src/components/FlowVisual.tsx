// Path d-strings shared between visible cream currents and the orb motion paths.
// Using `path` attribute on <animateMotion> directly (not <mpath href>) means
// no SVG IDs are needed — the visual can render in multiple DOM positions
// without ID-collision warnings.
const PORTRAIT_PATHS = [
  "M-50,90 Q120,160 260,110 Q380,70 580,200",
  "M-50,260 Q140,210 280,300 Q420,380 580,280",
  "M-50,420 Q160,380 320,470 Q450,540 580,420",
  "M-50,560 Q180,530 360,580 Q470,610 580,540",
] as const;

// Landscape variant — paths spread across a wider, shorter viewBox so all 4
// currents stay in frame on wide sections (slice would otherwise crop top/bottom).
const WIDE_PATHS = [
  "M-150,60 Q360,107 780,73 Q1140,47 1740,133",
  "M-150,173 Q420,140 840,200 Q1260,253 1740,187",
  "M-150,280 Q480,253 960,313 Q1350,360 1740,280",
  "M-150,373 Q540,353 1080,387 Q1410,395 1740,360",
] as const;

interface FlowVisualProps {
  wide?: boolean;
}

const FlowVisual = ({ wide = false }: FlowVisualProps) => {
  const viewBox = wide ? "0 0 1500 400" : "0 0 500 600";
  const [P1, P2, P3, P4] = wide ? WIDE_PATHS : PORTRAIT_PATHS;
  // Scale animation durations so particles in the wide variant drift at the
  // same visual pace as the portrait version despite the longer travel distance.
  const k = wide ? 2.5 : 1;
  const t = (n: number) => `${+(n * k).toFixed(2)}s`;

  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {/* Cream current lines — ambient backdrop */}
      <g opacity="0.14">
        <path d={P1} stroke="hsl(var(--background))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={P2} stroke="hsl(var(--background))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={P3} stroke="hsl(var(--background))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={P4} stroke="hsl(var(--background))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Terracotta particles drifting along the currents */}
      <circle r="4" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(13)} repeatCount="indefinite" path={P1} />
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur={t(13)} repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(13)} repeatCount="indefinite" begin={t(-7)} path={P1} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur={t(13)} repeatCount="indefinite" begin={t(-7)} />
      </circle>

      <circle r="3" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(17)} repeatCount="indefinite" begin={t(-4)} path={P2} />
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.15;0.85;1" dur={t(17)} repeatCount="indefinite" begin={t(-4)} />
      </circle>

      <circle r="3.5" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(15)} repeatCount="indefinite" begin={t(-9)} path={P3} />
        <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.15;0.85;1" dur={t(15)} repeatCount="indefinite" begin={t(-9)} />
      </circle>
      <circle r="2" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(15)} repeatCount="indefinite" begin={t(-2)} path={P3} />
        <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.15;0.85;1" dur={t(15)} repeatCount="indefinite" begin={t(-2)} />
      </circle>

      <circle r="2.5" fill="hsl(var(--primary))" opacity="0">
        <animateMotion dur={t(19)} repeatCount="indefinite" begin={t(-13)} path={P4} />
        <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.15;0.85;1" dur={t(19)} repeatCount="indefinite" begin={t(-13)} />
      </circle>
    </svg>
  );
};

export default FlowVisual;
