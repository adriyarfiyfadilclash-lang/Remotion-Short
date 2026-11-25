import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import * as THREE from "three";

export type CosmicParticleBurst3DProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  count?: number;
  radius?: number;
  durationInFrames?: number;
  startFrame?: number;
  seed?: number;
  particleSize?: number;
};

/** Seeded radial particle burst; particles move identically on every render. */
export const CosmicParticleBurst3D: React.FC<CosmicParticleBurst3DProps> = ({
  position = [0, 0, 0], color = "#9ddfff", count = 48, radius = 5,
  durationInFrames = 60, startFrame = 0, seed = 17, particleSize = 0.045,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const progress = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad),
  });
  const points = React.useMemo(() => {
    let s = seed >>> 0;
    const random = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
    return Array.from({ length: Math.max(1, count) }, () => {
      const z = random() * 2 - 1;
      const a = random() * Math.PI * 2;
      const r = Math.sqrt(1 - z * z);
      return [r * Math.cos(a), z, r * Math.sin(a)] as [number, number, number];
    });
  }, [count, seed]);
  const opacity = 1 - progress;
  if (local < 0 || local > durationInFrames) return null;
  return <group position={position}>
    {points.map((dir, i) => (
      <mesh key={i} position={[dir[0] * radius * progress, dir[1] * radius * progress, dir[2] * radius * progress]}>
        <sphereGeometry args={[particleSize * (0.45 + opacity * 0.55), 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    ))}
  </group>;
};
