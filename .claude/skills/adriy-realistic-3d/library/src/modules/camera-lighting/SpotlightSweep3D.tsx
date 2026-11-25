import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

type Props = { from?: [number, number, number]; to?: [number, number, number]; color?: string; intensity?: number; angle?: number; penumbra?: number };

/** A spotlight that sweeps smoothly across the scene. */
export const SpotlightSweep3D: React.FC<Props> = ({ from = [-5, 5, 2], to = [5, 5, 2], color = "#ffffff", intensity = 4, angle = 0.55, penumbra = 0.8 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) });
  const position = useMemo(() => [from[0] + (to[0] - from[0]) * p, from[1] + (to[1] - from[1]) * p, from[2] + (to[2] - from[2]) * p] as [number, number, number], [from, to, p]);
  return <spotLight position={position} target-position={[0, 0, 0]} color={color} intensity={intensity} angle={angle} penumbra={penumbra} distance={20} />;
};
