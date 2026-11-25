import React from "react";
import { useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  phase?: number;
  axis?: "x" | "y" | "z";
};

/** Adds subtle deterministic floating motion to an already separated component. */
export const ExplodedPartFloat: React.FC<Props> = ({ children, amplitude = 0.035, frequency = 0.045, phase = 0, axis = "y" }) => {
  const frame = useCurrentFrame();
  const offset = Math.sin(frame * frequency + phase) * amplitude;
  const position: [number, number, number] = axis === "x" ? [offset, 0, 0] : axis === "z" ? [0, 0, offset] : [0, offset, 0];
  return <group position={position}>{children}</group>;
};
