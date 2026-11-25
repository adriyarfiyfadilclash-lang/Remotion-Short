import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

type Props = { count?: number; spread?: number; color?: string; opacity?: number; size?: number; speed?: number };

/** Small instanced-looking debris field built from lightweight individual meshes. */
export const FloatingDebris3D: React.FC<Props> = ({ count = 24, spread = 7, color = "#8d9baa", opacity = 0.65, size = 0.055, speed = 0.012 }) => {
  const frame = useCurrentFrame();
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.sin(i * 12.7) * 0.5) * spread,
    y: (Math.cos(i * 4.1) * 0.5) * spread,
    z: (Math.sin(i * 8.3) * 0.5) * spread,
    phase: i * 1.73,
  })), [count, spread]);
  return <group>{items.map((p, i) => (
    <mesh key={i} position={[p.x + Math.sin(frame * speed + p.phase) * 0.18, p.y + Math.cos(frame * speed * 0.8 + p.phase) * 0.2, p.z]} rotation={[frame * speed + p.phase, frame * speed * 0.7, p.phase]}>
      <icosahedronGeometry args={[size * (0.6 + (i % 4) * 0.35), 0]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.85} metalness={0.1} />
    </mesh>
  ))}</group>;
};
