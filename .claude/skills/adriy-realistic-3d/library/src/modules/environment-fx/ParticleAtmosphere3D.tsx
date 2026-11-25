import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

type Props = { count?: number; radius?: number; color?: string; size?: number; speed?: number };

const random = (n: number) => { const x = Math.sin(n * 78.233 + 12.9898) * 43758.5453; return x - Math.floor(x); };

/** Ambient particle field with slow vertical drift. */
export const ParticleAtmosphere3D: React.FC<Props> = ({ count = 260, radius = 5, color = "#82cfff", size = 0.045, speed = 0.012 }) => {
  const frame = useCurrentFrame();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = random(i + 1) * Math.PI * 2;
      const r = Math.sqrt(random(i + 2000)) * radius;
      a[i * 3] = Math.cos(angle) * r;
      a[i * 3 + 1] = (random(i + 4000) - 0.5) * radius * 2;
      a[i * 3 + 2] = Math.sin(angle) * r;
    }
    return a;
  }, [count, radius]);
  const moved = useMemo(() => {
    const a = positions.slice();
    for (let i = 0; i < count; i++) a[i * 3 + 1] += Math.sin(frame * speed + i * 0.37) * 0.22;
    return a;
  }, [positions, count, frame, speed]);
  return <Points positions={moved} stride={3} frustumCulled={false}><PointMaterial transparent color={color} size={size} sizeAttenuation depthWrite={false} /></Points>;
};
