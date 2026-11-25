import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  count?: number;
  area?: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
  opacity?: number;
};

/** Slowly drifting dust motes for depth and atmosphere around the exploded model. */
export const ExplodedDust3D: React.FC<Props> = ({
  count = 55,
  area = [5, 3, 4],
  color = "#b9d7e8",
  size = 0.012,
  speed = 0.012,
  opacity = 0.45,
}) => {
  const frame = useCurrentFrame();
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const x = Math.sin(i * 12.9898) * area[0] * 0.5;
        const yBase = Math.cos(i * 7.233) * area[1] * 0.5;
        const z = Math.sin(i * 3.117 + 1.2) * area[2] * 0.5;
        const y = ((yBase + frame * speed * (0.6 + (i % 5) * 0.18) + area[1]) % area[1]) - area[1] / 2;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size * (0.6 + (i % 4) * 0.2), 5, 5]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};
