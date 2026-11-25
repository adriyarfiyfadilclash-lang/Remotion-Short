import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  background?: string;
  accent?: string;
  children?: React.ReactNode;
  grainOpacity?: number;
  vignette?: boolean;
  enter?: boolean;
};

/** A cinematic canvas for combining photographs, typography, paper and 2D/3D renders. */
export const MixedMediaScene: React.FC<Props> = ({
  background = "#17191f",
  accent = "#f2b84b",
  children,
  grainOpacity = 0.08,
  vignette = true,
  enter = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = enter ? interpolate(frame, [0, Math.round(fps * 0.45)], [0, 1], { extrapolateRight: "clamp" }) : 1;
  const scale = enter ? interpolate(frame, [0, Math.round(fps * 0.7)], [1.035, 1], { extrapolateRight: "clamp" }) : 1;
  return (
    <AbsoluteFill style={{ background, overflow: "hidden", opacity, transform: `scale(${scale})` }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 72% 20%, ${accent}20, transparent 42%)` }} />
      {children}
      {vignette && <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.48) 100%)" }} />}
      <AbsoluteFill style={{ pointerEvents: "none", opacity: grainOpacity, mixBlendMode: "soft-light", backgroundImage: "repeating-radial-gradient(circle at 17% 31%, #fff 0 0.6px, transparent .7px 3px)", backgroundSize: "7px 7px" }} />
    </AbsoluteFill>
  );
};
