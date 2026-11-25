import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  opacity?: number;
  startFrame?: number;
  duration?: number;
  yFrom?: number;
  yTo?: number;
};

/** Thin luminous scan plane that travels across a technical object. */
export const ComponentScanSweep3D: React.FC<Props> = ({
  width = 3,
  height = 0.018,
  depth = 2.5,
  color = "#6adfff",
  opacity = 0.65,
  startFrame = 0,
  duration = 60,
  yFrom = -1.5,
  yTo = 1.5,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <mesh position={[0, yFrom + (yTo - yFrom) * p, 0]}>
      <boxGeometry args={[width, height, depth]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};
