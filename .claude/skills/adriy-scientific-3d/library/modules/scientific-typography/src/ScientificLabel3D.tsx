import React from "react";
import { Text } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  text: string;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
  anchorX?: "left" | "center" | "right";
};

/** Compact label for naming scientific structures and parts. */
export const ScientificLabel3D: React.FC<Props> = ({
  text,
  position = [0, 0, 0],
  color = "#9bdcf5",
  fontSize = 0.16,
  startFrame = 0,
  duration = 16,
  anchorX = "left",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY="middle"
      fillOpacity={opacity}
      outlineWidth={0.001}
      outlineColor="#071522"
    >
      {text}
    </Text>
  );
};
