import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
};

/** Clean directional entrance for cards, labels and vector illustrations. */
export const FlatSlide: React.FC<Props> = ({
  children, direction = "up", delay = 0, duration = 22, distance = 90,
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  const x = direction === "left" ? -distance * (1-p) : direction === "right" ? distance * (1-p) : 0;
  const y = direction === "up" ? distance * (1-p) : direction === "down" ? -distance * (1-p) : 0;
  return <AbsoluteFill style={{ opacity: p, transform: `translate(${x}px, ${y}px)` }}>{children}</AbsoluteFill>;
};
