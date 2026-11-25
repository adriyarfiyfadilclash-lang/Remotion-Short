import React from "react";
import { Line } from "@react-three/drei";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  lineWidth?: number;
  headRadius?: number;
  startFrame?: number;
  duration?: number;
};

/** Animated directional beam with a moving marker travelling along a path. */
export const ScientificDataBeam3D: React.FC<Props> = ({
  start,
  end,
  color = "#7de7ff",
  lineWidth = 1.5,
  headRadius = 0.045,
  startFrame = 0,
  duration = 48,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const head: [number, number, number] = [
    start[0] + (end[0] - start[0]) * p,
    start[1] + (end[1] - start[1]) * p,
    start[2] + (end[2] - start[2]) * p,
  ];
  return (
    <group>
      <Line points={[start, end]} color={color} lineWidth={lineWidth} transparent opacity={0.5} />
      <mesh position={head}>
        <sphereGeometry args={[headRadius, 12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};
