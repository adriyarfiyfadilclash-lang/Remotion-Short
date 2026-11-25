import React, { useMemo } from "react";
import { Line } from "@react-three/drei";

type Props = {
  height?: number;
  turns?: number;
  radius?: number;
  steps?: number;
  colorA?: string;
  colorB?: string;
  rungColor?: string;
  rungEvery?: number;
};

/** Stylized double helix with two rails and periodic base-pair rungs. */
export const DNAHelix3D: React.FC<Props> = ({
  height = 2.4,
  turns = 2,
  radius = 0.42,
  steps = 100,
  colorA = "#59c7ef",
  colorB = "#f2a65a",
  rungColor = "#d7e7ef",
  rungEvery = 8,
}) => {
  const count = Math.max(12, steps);
  const railA: [number, number, number][] = [];
  const railB: [number, number, number][] = [];
  const rungs: [number, number, number][][] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;
    railA.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
    railB.push([Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius]);
    if (i % Math.max(1, rungEvery) === 0) rungs.push([railA[i], railB[i]]);
  }
  return (
    <group>
      <Line points={railA} color={colorA} lineWidth={2.4} />
      <Line points={railB} color={colorB} lineWidth={2.4} />
      {rungs.map((rung, i) => <Line key={i} points={rung} color={rungColor} lineWidth={1.2} />)}
    </group>
  );
};
