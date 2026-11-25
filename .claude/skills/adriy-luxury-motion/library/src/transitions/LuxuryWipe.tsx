import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Direction = "left" | "right" | "up" | "down";
type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  direction?: Direction;
  easing?: (value: number) => number;
};

const hiddenClip: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

const visibleClip: Record<Direction, string> = {
  left: "inset(0 0 0 0)",
  right: "inset(0 0 0 0)",
  up: "inset(0 0 0 0)",
  down: "inset(0 0 0 0)",
};

export const LuxuryWipe: React.FC<Props> = ({
  children,
  startFrame = 0,
  duration = 30,
  direction = "left",
  easing = Easing.bezier(0.22, 1, 0.36, 1),
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + Math.max(1, duration)], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inset = (1 - progress) * 100;
  const clip = direction === "left"
    ? `inset(0 ${inset}% 0 0)`
    : direction === "right"
      ? `inset(0 0 0 ${inset}%)`
      : direction === "up"
        ? `inset(${inset}% 0 0 0)`
        : `inset(0 0 ${inset}% 0)`;

  return (
    <AbsoluteFill style={{ clipPath: progress >= 1 ? visibleClip[direction] : clip }}>
      {children}
    </AbsoluteFill>
  );
};
