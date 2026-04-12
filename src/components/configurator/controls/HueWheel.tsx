import { useCallback, useRef } from "react";

interface HueWheelProps {
  hue: number;
  onChange: (hue: number) => void;
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

const HueWheel = ({ hue, onChange }: HueWheelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const el = ref.current;
      if (!el) return;
      el.setPointerCapture(e.pointerId);
      const rect = el.getBoundingClientRect();
      onChange(angleFromEvent(e, rect));

      const onMove = (ev: PointerEvent) => onChange(angleFromEvent(ev, rect));
      const onUp = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
    },
    [onChange]
  );

  // Thumb position on the ring
  const rad = ((hue - 90) * Math.PI) / 180;
  const thumbX = CENTER + RADIUS * Math.cos(rad);
  const thumbY = CENTER + RADIUS * Math.sin(rad);

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
              background: `conic-gradient(from 0deg, hsl(0,85%,50%), hsl(60,85%,50%), hsl(120,85%,50%), hsl(180,85%,50%), hsl(240,85%,50%), hsl(300,85%,50%), hsl(360,85%,50%))`,
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
              backgroundColor: `hsl(${hue}, 85%, 50%)`,
            }}
          />
        </div>
        {/* Swatch preview */}
        <div
          className="w-10 h-10 rounded-lg shadow-inner border border-black/10"
          style={{ backgroundColor: `hsl(${hue}, 85%, 50%)` }}
        />
      </div>
    </div>
  );
};

export default HueWheel;
