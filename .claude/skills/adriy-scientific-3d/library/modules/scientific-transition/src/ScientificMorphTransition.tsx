import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/** Crossfades two scene elements while scaling the incoming element into place. */
export const ScientificMorphTransition: React.FC<{
  from: React.ReactNode; to: React.ReactNode; startFrame?: number; duration?: number;
  fromScale?: number; toScale?: number;
}> = ({ from, to, startFrame = 0, duration = 30, fromScale = 1, toScale = 1.08 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  return (
    <>
      <group scale={fromScale + (toScale - fromScale) * p} visible={p < 1}>{from}</group>
      <group scale={1.12 - 0.12 * p} visible={p > 0}>{to}</group>
    </>
  );
};
