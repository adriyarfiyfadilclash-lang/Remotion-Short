import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = { start?: number; duration?: number; color?: string; intensity?: number; side?: "left" | "right" };

/** Gentle film light leak sweep. Use sparingly as a transition accent. */
export const DocumentaryLightLeak: React.FC<Props> = ({
  start = 0, duration = 70, color = "#d9a36b", intensity = 0.18, side = "left",
}) => {
  const frame = useCurrentFrame() - start;
  const p = interpolate(frame, [0, duration * .25, duration * .75, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const x = side === "left" ? "-15%" : "115%";
  return <AbsoluteFill style={{ pointerEvents: "none", opacity: p * intensity,
    background: `radial-gradient(ellipse at ${x} 50%, ${color} 0%, transparent 58%)`,
    mixBlendMode: "screen" }} />;
};
