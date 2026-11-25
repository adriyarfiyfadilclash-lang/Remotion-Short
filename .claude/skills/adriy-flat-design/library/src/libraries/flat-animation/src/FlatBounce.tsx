import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  height?: number;
  bounces?: number;
};

/** Playful vertical bounce for icons, characters and simple flat objects. */
export const FlatBounce: React.FC<Props> = ({
  children, delay = 0, height = 70, bounces = 2,
}) => {
  const frame = useCurrentFrame() - delay;
  const { fps } = useVideoConfig();
  const settle = spring({ frame, fps, config: { damping: 8, stiffness: 170, mass: 0.65 } });
  const oscillation = Math.sin(Math.max(0, frame) * 0.42 * Math.PI) * Math.exp(-Math.max(0, frame) / 15);
  const y = interpolate(settle, [0, 1], [-height, 0]) - Math.abs(oscillation) * height * 0.28 * bounces;
  const opacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity, transform: `translateY(${y}px)` }}>{children}</AbsoluteFill>;
};
