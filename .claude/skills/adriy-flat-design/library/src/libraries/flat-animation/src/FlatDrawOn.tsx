import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
};

/** Reveals a flat illustration through a simple directional clip mask. */
export const FlatDrawOn: React.FC<Props> = ({
  children, delay = 0, duration = 30, direction = "left",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  const inset = direction === "left" ? `0 ${100-p}% 0 0`
    : direction === "right" ? `0 0 0 ${100-p}%`
    : direction === "up" ? `0 0 ${100-p}% 0`
    : `${100-p}% 0 0 0`;
  return <AbsoluteFill style={{ clipPath: `inset(${inset})` }}>{children}</AbsoluteFill>;
};
