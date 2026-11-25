import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/** Circular iris reveal plane. Use as a visual mask layer in a 3D scene. */
export const ScientificIrisTransition: React.FC<{
  radius?: number; maxRadius?: number; color?: string; startFrame?: number; duration?: number;
}> = ({ radius = 0.05, maxRadius = 5, color = "#071522", startFrame = 0, duration = 30 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <mesh position={[0, 0, 2]} renderOrder={1000}>
      <circleGeometry args={[radius + (maxRadius - radius) * p, 64]} />
      <meshBasicMaterial color={color} side={2} depthTest={false} />
    </mesh>
  );
};
