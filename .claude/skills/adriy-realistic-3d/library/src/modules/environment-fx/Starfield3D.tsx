import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";

type Props = { count?: number; radius?: number; size?: number; color?: string; seed?: number };

const seeded = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/** Deterministic star points distributed inside a spherical shell. */
export const Starfield3D: React.FC<Props> = ({ count = 900, radius = 38, size = 0.055, color = "#dceaff", seed = 7 }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = seeded(i + seed), v = seeded(i + seed + 1000), w = seeded(i + seed + 2000);
      const theta = 2 * Math.PI * u, phi = Math.acos(2 * v - 1), r = radius * (0.72 + 0.28 * w);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count, radius, seed]);
  return <Points positions={positions} stride={3} frustumCulled={false}><PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} /></Points>;
};
