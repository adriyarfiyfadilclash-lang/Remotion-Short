import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

type Props = {
  from: React.ReactNode;
  to: React.ReactNode;
  duration?: number;
  axis?: "x" | "y";
};

/**
 * Directional match-cut bridge. Use related shapes/compositions in both scenes
 * so the movement feels motivated rather than like a generic slide transition.
 */
export const DocumentaryMatchCut: React.FC<Props> = ({
  from, to, duration = 20, axis = "x",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  const offset = (1 - p) * 100;
  const transformFrom = axis === "x" ? `translateX(${-p * 100}%)` : `translateY(${-p * 100}%)`;
  const transformTo = axis === "x" ? `translateX(${offset}%)` : `translateY(${offset}%)`;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#08090c" }}>
      <AbsoluteFill style={{ transform: transformFrom }}>{from}</AbsoluteFill>
      <AbsoluteFill style={{ transform: transformTo }}>{to}</AbsoluteFill>
    </AbsoluteFill>
  );
};
