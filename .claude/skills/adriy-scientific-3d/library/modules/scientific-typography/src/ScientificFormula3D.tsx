import React from "react";
import { Text } from "@react-three/drei";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  formula: string;
  position?: [number, number, number];
  color?: string;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
  background?: boolean;
};

/** Displays a scientific formula as readable 3D text. Use Unicode/plain text notation. */
export const ScientificFormula3D: React.FC<Props> = ({
  formula,
  position = [0, 0, 0],
  color = "#f1c878",
  fontSize = 0.24,
  startFrame = 0,
  duration = 20,
  background = false,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  return (
    <group position={position} scale={0.92 + 0.08 * p}>
      {background ? (
        <mesh position={[0, 0, -0.025]}>
          <planeGeometry args={[Math.max(1, formula.length * fontSize * 0.62), fontSize * 1.8]} />
          <meshBasicMaterial color="#10283a" transparent opacity={0.9 * p} />
        </mesh>
      ) : null}
      <Text fontSize={fontSize} color={color} anchorX="center" anchorY="middle" fillOpacity={p}>
        {formula}
      </Text>
    </group>
  );
};
