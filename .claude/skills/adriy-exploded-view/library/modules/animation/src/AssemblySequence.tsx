import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  reverse?: boolean;
};

/** Shared progress controller for a clean reassembly sequence. */
export const AssemblySequence: React.FC<Props> = ({ children, startFrame = 0, duration = 60, reverse = true }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], reverse ? [1, 0] : [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad),
  });
  return <group>{React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { progress: p }) : child
  )}</group>;
};
