import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  duration?: number;
  scale?: number;
};

/** Controlled pan across an oversized image or scene. Add image overscan to avoid edges. */
export const DocumentaryCameraPan: React.FC<Props> = ({
  children, direction = "left", distance = 8, duration, scale = 1.12,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const d = duration ?? durationInFrames;
  const p = interpolate(frame, [0, Math.max(1, d - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const x = direction === "left" ? distance * p : direction === "right" ? -distance * p : 0;
  const y = direction === "up" ? distance * p : direction === "down" ? -distance * p : 0;
  return <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `translate(${x}%, ${y}%) scale(${scale})` }}>{children}</AbsoluteFill>
  </AbsoluteFill>;
};
