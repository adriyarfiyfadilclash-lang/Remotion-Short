import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  axis?: "x" | "y" | "z";
  distance?: number;
  fromNegative?: boolean;
};

/** Slides an assembly into view along one axis; pair with a clipping/mask layer if needed. */
export const AssemblyWipeTransition: React.FC<Props> = ({
  children, startFrame = 0, duration = 30, axis = "x", distance = 5, fromNegative = true,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const d = (fromNegative ? -1 : 1) * distance * p;
  const position: [number, number, number] = axis === "x" ? [d, 0, 0] : axis === "y" ? [0, d, 0] : [0, 0, d];
  return <group position={position}>{children}</group>;
};
