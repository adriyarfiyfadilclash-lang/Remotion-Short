import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/** A vertical divider panel that travels across the scene like a technical data cut. */
export const ScientificDataCutTransition: React.FC<{
  height?: number; thickness?: number; color?: string; startFrame?: number; duration?: number;
  fromX?: number; toX?: number;
}> = ({ height = 12, thickness = 0.08, color = "#e9b85e", startFrame = 0, duration = 28, fromX = -8, toX = 8 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <mesh position={[fromX + (toX - fromX) * p, 0, 1.8]} renderOrder={950}>
      <planeGeometry args={[thickness, height]} />
      <meshBasicMaterial color={color} depthTest={false} />
    </mesh>
  );
};
