import React from "react";
import { Text } from "@react-three/drei";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  text: string;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "middle" | "bottom";
};

/** Clean 3D annotation label with a frame-driven fade and slight rise. */
export const ExplodedLabel3D: React.FC<Props> = ({
  text, position = [0, 0, 0], color = "#e8f1f8", fontSize = 0.18,
  startFrame = 0, duration = 18, anchorX = "left", anchorY = "middle",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
  });
  return (
    <group position={[position[0], position[1] - (1 - p) * 0.12, position[2]}>
      <Text fontSize={fontSize} color={color} anchorX={anchorX} anchorY={anchorY} fillOpacity={p} outlineWidth={0.001} outlineColor="#07111d">
        {text}
      </Text>
    </group>
  );
};
