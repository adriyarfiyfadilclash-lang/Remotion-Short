import React from "react";
import { Text } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  number: string | number;
  position?: [number, number, number];
  color?: string;
  backgroundColor?: string;
  radius?: number;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
};

/** Number marker for identifying individual exploded components. */
export const ComponentNumber3D: React.FC<Props> = ({
  number, position = [0, 0, 0], color = "#07111d", backgroundColor = "#e8b65d",
  radius = 0.16, fontSize = 0.16, startFrame = 0, duration = 16,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0.2, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <group position={position} scale={scale}>
      <mesh>
        <circleGeometry args={[radius, 40]} />
        <meshBasicMaterial color={backgroundColor} />
      </mesh>
      <Text position={[0, 0, 0.012]} fontSize={fontSize} color={color} anchorX="center" anchorY="middle">
        {String(number)}
      </Text>
    </group>
  );
};
