export interface RGB {
  r: number;
  g: number;
  b: number;
}

const clamp255 = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

export function hexToRgb(hex: string): RGB {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [clamp255(r), clamp255(g), clamp255(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

// W3C perceived brightness (0–255). Used for auto-contrast on accents.
export function hexBrightness(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex({ r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 });
}
