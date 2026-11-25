import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type Props = {
  children: React.ReactNode;
  amount?: number;
  frequency?: number;
  phase?: number;
  startFrame?: number;
  scaleAxis?: "uniform" | "x" | "y" | "z";
};

/** Gentle rhythmic scaling to suggest a pulsing cell or biological structure. */
export const CellPulse3D: React.FC<Props> = ({
  children,
  amount = 0.08,
  frequency = 0.12,
  phase = 0,
  startFrame = 0,
  scaleAxis = "uniform",
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin((frame - startFrame) * frequency + phase) * amount;
  const scale: [number, number, number] = scaleAxis === "x"
    ? [pulse, 1, 1]
    : scaleAxis === "y"
      ? [1, pulse, 1]
      : scaleAxis === "z"
        ? [1, 1, pulse]
        : [pulse, pulse, pulse];
  return <group scale={scale}>{children}</group>;
};
