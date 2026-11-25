import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  fromScale?: number;
  toScale?: number;
  duration?: number;
  focalPoint?: string;
};

/** Slow pull-back: gradually reveals more of the scene. */
export const DocumentaryCameraPull: React.FC<Props> = ({
  children, fromScale = 1.16, toScale = 1, duration, focalPoint = "center",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const d = duration ?? durationInFrames;
  const scale = interpolate(frame, [0, Math.max(1, d - 1)], [fromScale, toScale], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  return <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: focalPoint }}>{children}</AbsoluteFill>
  </AbsoluteFill>;
};
