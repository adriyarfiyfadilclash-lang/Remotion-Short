import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  count?: number;
  position?: [number, number, number];
  color?: string;
  size?: number;
  spread?: number;
  startFrame?: number;
  duration?: number;
  seed?: number;
};

/** Deterministic radial burst of small glowing points. */
export const ScientificSparkBurst3D: React.FC<Props> = ({
  count = 28,
  position = [0, 0, 0],
  color = "#ffd27a",
  size = 0.035,
  spread = 1.4,
  startFrame = 0,
  duration = 32,
  seed = 29,
}) => {
  const frame = useCurrentFrame();
  const vectors = useMemo(() => {
    let state = seed >>> 0;
    const random = () => {
      state = (state * 1103515245 + 12345) >>> 0;
      return state / 4294967296;
    };
    return Array.from({ length: Math.max(1, count) }, () => {
      const z = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const planar = Math.sqrt(1 - z * z);
      const distance = 0.35 + random() * 0.65;
      return [planar * Math.cos(angle) * distance, z * distance, planar * Math.sin(angle) * distance] as [number, number, number];
    });
  }, [count, seed]);
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const fade = 1 - p;
  return (
    <group position={position}>
      {vectors.map((v, i) => (
        <mesh key={i} position={[v[0] * spread * p, v[1] * spread * p, v[2] * spread * p]} scale={Math.max(0.001, fade)}>
          <sphereGeometry args={[size, 8, 6]} />
          <meshBasicMaterial color={color} transparent opacity={fade} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};
