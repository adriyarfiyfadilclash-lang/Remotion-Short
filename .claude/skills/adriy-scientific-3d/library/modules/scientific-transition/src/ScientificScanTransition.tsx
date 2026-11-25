import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/** A luminous scan plane used to introduce the next scientific subject. */
export const ScientificScanTransition: React.FC<{
  width?: number; height?: number; color?: string; startFrame?: number; duration?: number;
  fromY?: number; toY?: number; opacity?: number;
}> = ({ width = 12, height = 0.035, color = "#67d9ff", startFrame = 0, duration = 36, fromY = -6, toY = 6, opacity = 0.8 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <mesh position={[0, fromY + (toY - fromY) * p, 1.5]} renderOrder={900}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} transparent opacity={opacity * (p > 0 && p < 1 ? 1 : 0)} depthTest={false} />
    </mesh>
  );
};
