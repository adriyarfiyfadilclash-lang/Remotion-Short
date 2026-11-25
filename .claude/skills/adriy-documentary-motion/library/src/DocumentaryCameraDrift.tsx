import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  x?: number;
  y?: number;
  scaleFrom?: number;
  scaleTo?: number;
  duration?: number;
};

/** Combined slow diagonal drift and zoom for atmospheric establishing shots. */
export const DocumentaryCameraDrift: React.FC<Props> = ({
  children, x = 3, y = -2, scaleFrom = 1.04, scaleTo = 1.12, duration,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const d = duration ?? durationInFrames;
  const p = interpolate(frame, [0, Math.max(1, d - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin),
  });
  const scale = interpolate(p, [0, 1], [scaleFrom, scaleTo]);
  return <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `translate(${x * p}%, ${y * p}%) scale(${scale})` }}>{children}</AbsoluteFill>
  </AbsoluteFill>;
};
