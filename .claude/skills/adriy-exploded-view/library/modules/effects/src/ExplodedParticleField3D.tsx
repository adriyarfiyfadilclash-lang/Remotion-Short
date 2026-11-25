import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  startFrame?: number;
  duration?: number;
  spread?: number;
  seed?: number;
};

/** Deterministic particle cloud that expands from the assembly center. */
export const ExplodedParticleField3D: React.FC<Props> = ({
  count = 90,
  radius = 1.1,
  color = "#9bdcf5",
  size = 0.025,
  startFrame = 0,
  duration = 45,
  spread = 2.2,
  seed = 17,
}) => {
  const frame = useCurrentFrame();
  const particles = useMemo(() => {
    let state = seed >>> 0;
    const random = () => {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state / 4294967296;
    };
    return Array.from({ length: Math.max(0, count) }, () => {
      const z = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const r = Math.sqrt(1 - z * z);
      const distance = radius * (0.35 + random() * 0.65);
      return [Math.cos(angle) * r * distance, z * distance, Math.sin(angle) * r * distance] as [number, number, number];
    });
  }, [count, radius, seed]);

  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <group>
      {particles.map((point, index) => (
        <mesh
          key={index}
          position={[point[0] * (1 + p * spread), point[1] * (1 + p * spread), point[2] * (1 + p * spread)]}
          scale={0.35 + 0.65 * Math.sin(Math.PI * p)}
        >
          <sphereGeometry args={[size, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.15 + 0.75 * Math.sin(Math.PI * p)} />
        </mesh>
      ))}
    </group>
  );
};
