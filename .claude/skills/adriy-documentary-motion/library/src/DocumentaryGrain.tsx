import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props = { opacity?: number; animated?: boolean; blendMode?: React.CSSProperties["mixBlendMode"] };

/** Subtle film-grain overlay using a small SVG turbulence texture. */
export const DocumentaryGrain: React.FC<Props> = ({
  opacity = 0.09, animated = true, blendMode = "soft-light",
}) => {
  const frame = useCurrentFrame();
  const offset = animated ? `${frame % 7}px ${frame % 5}px` : "0 0";
  return <AbsoluteFill style={{
    pointerEvents: "none", opacity, mixBlendMode: blendMode,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
    backgroundPosition: offset,
  }} />;
};
