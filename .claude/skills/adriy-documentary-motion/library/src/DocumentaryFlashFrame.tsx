import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children: React.ReactNode; at?: number; duration?: number; intensity?: number; tint?: string };

/** Very brief light flash used as a motivated cut accent; keep intensity restrained. */
export const DocumentaryFlashFrame: React.FC<Props> = ({
  children, at = 0, duration = 5, intensity = 0.22, tint = "#e9e4d8",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 1, at + duration], [0, intensity, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill style={{ backgroundColor: tint, opacity, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
