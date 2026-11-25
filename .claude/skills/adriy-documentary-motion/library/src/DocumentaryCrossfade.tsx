import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = { children: React.ReactNode; duration?: number; from?: number; curve?: "soft" | "linear" };

/** Restrained dissolve for documentary scenes and archival imagery. */
export const DocumentaryCrossfade: React.FC<Props> = ({
  children, duration = 24, from = 0, curve = "soft",
}) => {
  const frame = useCurrentFrame() - from;
  const { durationInFrames } = useVideoConfig();
  const d = Math.min(duration, durationInFrames);
  const opacity = interpolate(frame, [0, Math.max(1, d)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: curve === "soft" ? Easing.inOut(Easing.quad) : Easing.linear,
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
