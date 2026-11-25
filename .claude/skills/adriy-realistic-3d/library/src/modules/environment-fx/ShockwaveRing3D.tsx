import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

type Props = { duration?: number; maxRadius?: number; color?: string; thickness?: number; y?: number; opacity?: number };

/** Expanding ring pulse, useful for impact, energy release, or scientific visualizations. */
export const ShockwaveRing3D: React.FC<Props> = ({ duration = 36, maxRadius = 4, color = "#69d9ff", thickness = 0.035, y = 0, opacity = 0.85 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame % Math.max(1, duration);
  const radius = interpolate(local, [0, duration], [0.15, maxRadius], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const fade = interpolate(local, [0, duration * 0.75, duration], [opacity, opacity * 0.45, 0], { extrapolateRight: "clamp" });
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y + Math.sin(frame / fps) * 0.001, 0]}>
    <ringGeometry args={[Math.max(0.01, radius - thickness), radius + thickness, 96]} />
    <meshBasicMaterial color={color} transparent opacity={fade} side={2} depthWrite={false} />
  </mesh>;
};
