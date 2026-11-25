import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

type Props = { count?: number; area?: [number, number, number]; color?: string; size?: number; drift?: number };

const rand = (n: number) => { const x = Math.sin(n * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); };

/** Subtle floating dust particles; positions are deterministic for frame-accurate rendering. */
export const DustMotes3D: React.FC<Props> = ({ count = 180, area = [12, 7, 10], color = "#d9e3ed", size = 0.035, drift = 0.018 }) => {
  const frame = useCurrentFrame();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rand(i * 3 + 1) - 0.5) * area[0];
      a[i * 3 + 1] = (rand(i * 3 + 2) - 0.5) * area[1];
      a[i * 3 + 2] = (rand(i * 3 + 3) - 0.5) * area[2];
    }
    return a;
  }, [count, area]);
  const animated = useMemo(() => {
    const a = positions.slice();
    for (let i = 0; i < count; i++) {
      a[i * 3] += Math.sin(frame * 0.025 + i) * drift * 12;
      a[i * 3 + 1] += Math.cos(frame * 0.018 + i * 0.7) * drift * 12;
    }
    return a;
  }, [positions, count, frame, drift]);
  return <Points positions={animated} stride={3} frustumCulled={false}><PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} /></Points>;
};
