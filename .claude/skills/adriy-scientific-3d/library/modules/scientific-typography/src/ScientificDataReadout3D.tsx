import React from "react";
import { Text } from "@react-three/drei";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  label: string;
  value: string | number;
  unit?: string;
  position?: [number, number, number];
  color?: string;
  valueColor?: string;
  fontSize?: number;
  startFrame?: number;
  duration?: number;
};

/** Technical readout with a label and a value/unit line. */
export const ScientificDataReadout3D: React.FC<Props> = ({
  label,
  value,
  unit = "",
  position = [0, 0, 0],
  color = "#91b7cb",
  valueColor = "#eaf5fc",
  fontSize = 0.13,
  startFrame = 0,
  duration = 18,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <group position={position}>
      <Text position={[0, fontSize * 0.8, 0]} fontSize={fontSize * 0.72} color={color} anchorX="left" anchorY="middle" fillOpacity={p}>
        {label.toUpperCase()}
      </Text>
      <Text position={[0, -fontSize * 0.55, 0]} fontSize={fontSize} color={valueColor} anchorX="left" anchorY="middle" fillOpacity={p}>
        {`${value}${unit ? ` ${unit}` : ""}`}
      </Text>
    </group>
  );
};
