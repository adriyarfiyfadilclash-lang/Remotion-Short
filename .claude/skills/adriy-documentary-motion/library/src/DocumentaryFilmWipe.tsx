import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  color?: string;
};

/** A clean editorial wipe, suitable for chapter changes and location shifts. */
export const DocumentaryFilmWipe: React.FC<Props> = ({
  children, direction = "left", duration = 28, delay = 0, color = "#111318",
}) => {
  const frame = useCurrentFrame() - delay;
  const p = interpolate(frame, [0, duration], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  const inset = direction === "left" ? `0 ${100-p}% 0 0`
    : direction === "right" ? `0 0 0 ${100-p}%`
    : direction === "up" ? `0 0 ${100-p}% 0`
    : `${100-p}% 0 0 0`;
  return (
    <AbsoluteFill style={{ background: color }}>
      <AbsoluteFill style={{ clipPath: `inset(${inset})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
