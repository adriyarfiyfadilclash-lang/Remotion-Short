import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/** A translating panel for clean technical scene changes. */
export const ScientificWipeTransition: React.FC<{
  width?: number; height?: number; color?: string; startFrame?: number; duration?: number;
  fromX?: number; toX?: number; z?: number;
}> = ({ width = 20, height = 12, color = "#0b2032", startFrame = 0, duration = 24, fromX = -12, toX = 12, z = 2 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
  });
  return (
    <mesh position={[fromX + (toX - fromX) * p, 0, z]} renderOrder={1000}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} depthTest={false} />
    </mesh>
  );
};
