import { useCallback, useRef } from "react";

interface HueWheelProps {
  hue: number;
  onHueChange: (hue: number) => void;
  lightness: number;
  onLightnessChange: (lightness: number) => void;
}

const SIZE = 120;
const RING = 14;
const CENTER = SIZE / 2;
const RADIUS = (SIZE - RING) / 2;

function angleFromEvent(
  e: React.PointerEvent<HTMLDivElement> | PointerEvent,
  rect: DOMRect
) {
  const x = e.clientX - rect.left - CENTER;
  const y = e.clientY - rect.top - CENTER;
  let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (deg < 0) deg += 360;
  return Math.round(deg) % 360;
}

const HueWheel = ({ hue, onHueChange, lightness, onLightnessChange }: HueWheelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const el = ref.current;
      if (!el) return;
      el.setPointerCapture(e.pointerId);
      const rect = el.getBoundingClientRect();
      onHueChange(angleFromEvent(e, rect));

      const onMove = (ev: PointerEvent) => onHueChange(angleFromEvent(ev, rect));
      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    },
    [onHueChange]
  );

  // Thumb position on the ring
  const rad = ((hue - 90) * Math.PI) / 180;
  const thumbX = CENTER + RADIUS * Math.cos(rad);
  const thumbY = CENTER + RADIUS * Math.sin(rad);

  const accentColor = `hsl(${hue}, 85%, ${lightness}%)`;

  return (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">
        Brand color
      </label>
      <div className="flex items-center gap-4">
        <div
          ref={ref}
          className="relative shrink-0 cursor-pointer touch-none"
          style={{ width: SIZE, height: SIZE }}
          onPointerDown={handlePointerDown}
        >
          {/* Hue ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, hsl(0,85%,${lightness}%), hsl(60,85%,${lightness}%), hsl(120,85%,${lightness}%), hsl(180,85%,${lightness}%), hsl(240,85%,${lightness}%), hsl(300,85%,${lightness}%), hsl(360,85%,${lightness}%))`,
              mask: `radial-gradient(circle, transparent ${RADIUS - RING / 2}px, black ${RADIUS - RING / 2}px, black ${RADIUS + RING / 2}px, transparent ${RADIUS + RING / 2}px)`,
              WebkitMask: `radial-gradient(circle, transparent ${RADIUS - RING / 2}px, black ${RADIUS - RING / 2}px, black ${RADIUS + RING / 2}px, transparent ${RADIUS + RING / 2}px)`,
            }}
          />
          {/* Thumb */}
          <div
            className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md"
            style={{
              left: thumbX - 10,
              top: thumbY - 10,
              backgroundColor: accentColor,
            }}
          />
        </div>
        {/* Swatch preview */}
        <div
          className="w-10 h-10 rounded-lg shadow-inner border border-black/10"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Lightness slider */}
      <div className="mt-4">
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
          Lighter / Darker
        </label>
        <div className="relative">
          <div
            className="h-3 w-full rounded-full border border-black/10"
            style={{
              background: `linear-gradient(to right, hsl(${hue}, 85%, 20%), hsl(${hue}, 85%, 50%), hsl(${hue}, 85%, 80%))`,
            }}
          />
          <input
            type="range"
            min={20}
            max={80}
            value={lightness}
            onChange={(e) => onLightnessChange(Number(e.target.value))}
            className="absolute inset-0 w-full cursor-pointer opacity-0"
          />
          {/* Custom thumb indicator */}
          <div
            className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
            style={{
              left: `calc(${((lightness - 20) / 60) * 100}% - 10px)`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HueWheel;
