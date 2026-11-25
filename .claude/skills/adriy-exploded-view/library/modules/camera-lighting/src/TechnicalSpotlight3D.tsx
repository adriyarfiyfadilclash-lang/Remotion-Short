import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  from?: [number, number, number];
  to?: [number, number, number];
  target?: [number, number, number];
  color?: string;
  intensity?: number;
  angle?: number;
  penumbra?: number;
  distance?: number;
  startFrame?: number;
  duration?: number;
};

/** Moving spotlight for drawing attention to one component at a time. */
export const TechnicalSpotlight3D: React.FC<Props> = ({
  from = [-3, 5, 4],
  to = [3, 4, 2],
  target = [0, 0, 0],
  color = "#f5d58d",
  intensity = 3.5,
  angle = 0.48,
  penumbra = 0.65,
  distance = 18,
  startFrame = 0,
  duration = 60,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const mix = (a: number, b: number) => a + (b - a) * p;
  return (
    <spotLight
      position={[mix(from[0], to[0]), mix(from[1], to[1]), mix(from[2], to[2])]}
      target-position={target}
      color={color}
      intensity={intensity * 12}
      angle={angle}
      penumbra={penumbra}
      distance={distance}
      castShadow
    />
  );
};
