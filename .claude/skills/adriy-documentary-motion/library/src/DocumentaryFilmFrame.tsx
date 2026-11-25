import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  bars?: number;
  vignette?: number;
  grainOpacity?: number;
};

/** Adds restrained widescreen framing, vignette and a subtle procedural grain texture. */
export const DocumentaryFilmFrame: React.FC<Props> = ({
  children, bars = 64, vignette = 0.42, grainOpacity = 0.075,
}) => {
  const frame = useCurrentFrame();
  const flicker = interpolate(Math.sin(frame * 0.73), [-1, 1], [0.985, 1.015]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#050608" }}>
      <AbsoluteFill style={{ transform: `scale(${flicker})` }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ pointerEvents: "none", background:
        `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${vignette}) 100%)` }} />
      <AbsoluteFill style={{ pointerEvents: "none", opacity: grainOpacity, mixBlendMode: "soft-light",
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.8%27/%3E%3C/svg%3E')" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: bars, background: "#050608" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: bars, background: "#050608" }} />
    </AbsoluteFill>
  );
};
