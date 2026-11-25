import { Easing } from "remotion";

export const luxuryPalette = {
  background: "#090A0C",
  surface: "#15171A",
  ivory: "#F2EFE8",
  muted: "#A9A49A",
  champagne: "#C8B58A",
  line: "rgba(200, 181, 138, 0.32)",
};

export const luxuryTiming = {
  // Semua nilai dalam frame; sesuaikan dengan fps komposisi.
  titleIn: [8, 34] as [number, number],
  productIn: [12, 48] as [number, number],
  detailIn: [42, 62] as [number, number],
  outroIn: [100, 126] as [number, number],
};

export const luxuryEase = Easing.bezier(0.22, 1, 0.36, 1);
