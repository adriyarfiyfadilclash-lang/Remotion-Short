import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  direction?: "up" | "down";
  distance?: number;
  duration?: number;
  scale?: number;
};

/** Vertical tilt-like move for revealing a tall subject, building or landscape. */
export const DocumentaryCameraTilt: React.FC<Props> = ({
  children, direction = "up", distance = 7, duration, scale = 1.12,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const d = duration ?? durationInFrames;
  const p = interpolate(frame, [0, Math.max(1, d - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  const y = direction === "up" ? distance * p : -distance * p;
  return <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `translateY(${y}%) scale(${scale})` }}>{children}</AbsoluteFill>
  </AbsoluteFill>;
};
