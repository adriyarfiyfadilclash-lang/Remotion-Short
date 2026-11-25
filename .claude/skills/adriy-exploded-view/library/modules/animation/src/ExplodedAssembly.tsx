import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  exploded?: boolean;
  easing?: boolean;
};

/** Drives a normalized assembly/explosion progress value for its child parts. */
export const ExplodedAssembly: React.FC<Props> = ({
  children, startFrame = 0, duration = 45, exploded = true, easing = true,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const progress = interpolate(local, [0, Math.max(1, duration)], exploded ? [0, 1] : [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easing ? Easing.inOut(Easing.cubic) : Easing.linear,
  });
  return <group userData={{ explodedProgress: progress }}>{React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { progress }) : child
  )}</group>;
};
