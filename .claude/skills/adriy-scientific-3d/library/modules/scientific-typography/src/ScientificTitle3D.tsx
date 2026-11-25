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
  maxWidth?: number;
  anchorX?: "left" | "center" | "right";
};

/** Main scientific heading with a gentle rise and fade-in. */
export const ScientificTitle3D: React.FC<Props> = ({
  text,
  position = [0, 1.5, 0],
  color = "#eaf5fc",
  fontSize = 0.42,
  startFrame = 0,
  duration = 24,
  maxWidth = 8,
  anchorX = "center",
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <group position={[position[0], position[1] - (1 - p) * 0.18, position[2]]}>
      <Text
        fontSize={fontSize}
        color={color}
        maxWidth={maxWidth}
        anchorX={anchorX}
        anchorY="middle"
        fillOpacity={p}
        outlineWidth={0.001}
        outlineColor="#071522"
      >
        {text}
      </Text>
    </group>
  );
};
