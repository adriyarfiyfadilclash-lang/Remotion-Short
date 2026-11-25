import React from "react";

type Props = { width?: number; height?: number; color?: string; edge?: "top" | "bottom"; seed?: number; style?: React.CSSProperties };

const edgePaths = [
  "M0 10 L35 7 L62 12 L91 6 L125 11 L158 5 L190 10 L225 6 L260 12 L295 7 L330 11 L365 5 L400 10 L435 7 L470 12 L500 8 L500 100 L0 100Z",
  "M0 7 L28 12 L57 5 L87 10 L117 6 L146 12 L178 7 L208 11 L239 5 L270 10 L300 6 L332 12 L362 7 L393 11 L425 5 L455 10 L480 6 L500 9 L500 100 L0 100Z",
];

export const PaperTornEdge: React.FC<Props> = ({ width = 500, height = 42, color = "#F3E7CE", edge = "bottom", seed = 0, style }) => {
  const path = edgePaths[Math.abs(seed) % edgePaths.length];
  return <svg width={width} height={height} viewBox="0 0 500 100" preserveAspectRatio="none" style={{ display: "block", transform: edge === "top" ? "rotate(180deg)" : undefined, filter: "drop-shadow(0 3px 2px rgba(35,25,15,.12))", ...style }} aria-hidden><path d={path} fill={color} /></svg>;
};
