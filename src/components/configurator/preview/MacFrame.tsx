import { useRef, useState, useEffect, type ReactNode } from "react";

interface MacFrameProps {
  displayName: string;
  children: ReactNode;
}

/** Design dimensions of the mock website content */
const DESIGN_W = 700;
const DESIGN_H = 440;

const MacFrame = ({ displayName, children }: MacFrameProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const fakeDomain =
    displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 30) || "yoursite";

  // Measure viewport container and compute scale to fill width
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(w / DESIGN_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-8">
          <div className="mx-auto max-w-md rounded-md bg-[#1a1a1a] px-3 py-1 text-center text-xs text-white/40 truncate">
            {fakeDomain}.com
          </div>
        </div>
      </div>

      {/* Viewport — scales design-size content to fill frame width */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ height: DESIGN_H * scale }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MacFrame;
