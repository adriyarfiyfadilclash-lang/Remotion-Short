import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  count?: number;
  from?: [number, number, number];
  to?: [number, number, number];
  duration?: number;
  startFrame?: number;
  size?: number;
  color?: string;
  seed?: number;
};

/** Deterministic particles traveling along a straight vector field. */
export const ParticleFlow3D: React.FC<Props> = ({
  count = 40,
  from = [-2, 0, 0],
  to = [2, 0, 0],
  duration = 90,
  startFrame = 0,
  size = 0.025,
  color = "#76d8ff",
  seed = 11,
}) => {
  const frame = useCurrentFrame();
  const offsets = useMemo(() => {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
    return Array.from({ length: Math.max(0, count) }, () => rand());
  }, [count, seed]);
  const progress = ((frame - startFrame) / Math.max(1, duration));
  return (
    <group>
      {offsets.map((offset, i) => {
        const p = ((progress + offset) % 1 + 1) % 1;
        const spread = (Math.sin(i * 17.13) * 0.12);
        const x = from[0] + (to[0] - from[0]) * p;
        const y = from[1] + (to[1] - from[1]) * p + spread;
        const z = from[2] + (to[2] - from[2]) * p + Math.cos(i * 9.7) * 0.12;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 7, 7]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
};
