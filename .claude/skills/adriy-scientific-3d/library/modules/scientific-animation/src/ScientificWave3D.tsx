import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  amplitude?: number;
  frequency?: number;
  speed?: number;
  length?: number;
  segments?: number;
  color?: string;
  lineWidth?: number;
  axis?: "x" | "z";
};

/** Animated sinusoidal wave line for sound, light or signal demonstrations. */
export const ScientificWave3D: React.FC<Props> = ({
  amplitude = 0.5,
  frequency = 2,
  speed = 0.12,
  length = 5,
  segments = 120,
  color = "#55c9f2",
  lineWidth = 2,
  axis = "x",
}) => {
  const frame = useCurrentFrame();
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments - 0.5) * length;
    const wave = Math.sin((i / segments) * Math.PI * 2 * frequency - frame * speed) * amplitude;
    points.push(axis === "x" ? [t, wave, 0] : [0, wave, t]);
  }
  return (
    <group>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.012, 5, 5]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};
