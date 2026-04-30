import { HexColorInput, HexColorPicker } from "react-colorful";
import { Pencil, Pipette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { hexToRgb, rgbToHex } from "@/lib/color";

interface BrandColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperConstructor {
  new (): { open(): Promise<EyeDropperResult> };
}
declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor;
  }
}

const BrandColorPicker = ({ value, onChange }: BrandColorPickerProps) => {
  const rgb = hexToRgb(value);
  const eyedropperSupported = typeof window !== "undefined" && "EyeDropper" in window;

  const handleRgbChange = (key: "r" | "g" | "b", input: string) => {
    const n = Math.max(0, Math.min(255, Math.round(Number(input) || 0)));
    onChange(rgbToHex({ ...rgb, [key]: n }));
  };

  const handleEyeDropper = async () => {
    if (!window.EyeDropper) return;
    try {
      const ed = new window.EyeDropper();
      const result = await ed.open();
      onChange(result.sRGBHex);
    } catch {
      /* user canceled */
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">
        Brand color
      </label>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open color picker"
              className="flex h-10 w-24 shrink-0 overflow-hidden rounded-md border-2 border-foreground/20 bg-background shadow-sm ring-offset-background transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span
                className="flex-1"
                style={{ backgroundColor: value }}
                aria-hidden="true"
              />
              <span className="flex w-9 shrink-0 items-center justify-center border-l border-foreground/10">
                <Pencil className="h-3.5 w-3.5 text-foreground/70" strokeWidth={2.5} />
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="brand-color-popover w-64 p-3"
            align="start"
            side="bottom"
            sideOffset={8}
          >
            <div className="space-y-3">
              <HexColorPicker color={value} onChange={onChange} style={{ width: "100%" }} />

              <div className="grid grid-cols-3 gap-2">
                {(["r", "g", "b"] as const).map((k) => (
                  <label key={k} className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {k}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={255}
                      value={rgb[k]}
                      onChange={(e) => handleRgbChange(k, e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono tabular-nums text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                ))}
              </div>

              {eyedropperSupported && (
                <button
                  type="button"
                  onClick={handleEyeDropper}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Pipette className="h-4 w-4" /> Pick from screen
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <HexColorInput
          color={value}
          onChange={onChange}
          prefixed
          className="flex h-10 min-w-0 flex-1 rounded-md border-2 border-foreground/20 bg-background px-3 py-2 font-sans text-base uppercase tabular-nums text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
        />
      </div>
    </div>
  );
};

export default BrandColorPicker;
