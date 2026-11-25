import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  phase?: number;
  axis?: "x" | "y" | "z";
  startFrame?: number;
};

/** Small periodic displacement for illustrating molecular vibration. */
export const MolecularVibration3D: React.FC<Props> = ({
  children,
  amplitude = 0.08,
  frequency = 0.22,
  phase = 0,
  axis = "x",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const displacement = Math.sin((frame - startFrame) * frequency + phase) * amplitude;
  const position: [number, number, number] = axis === "x"
    ? [displacement, 0, 0]
    : axis === "y"
      ? [0, displacement, 0]
      : [0, 0, displacement];
  return <group position={position}>{children}</group>;
};
