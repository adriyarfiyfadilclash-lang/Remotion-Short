import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

type Props = {
  width?: number;
  depth?: number;
  rows?: number;
  columns?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  color?: string;
  lineWidth?: number;
  position?: [number, number, number];
};

/** Animated mathematical wave grid. Illustrative, not measured data. */
export const ScientificWaveField3D: React.FC<Props> = ({
  width = 4,
  depth = 3,
  rows = 12,
  columns = 36,
  amplitude = 0.28,
  frequency = 2.4,
  speed = 0.08,
  color = "#55cbe9",
  lineWidth = 1.2,
  position = [0, 0, 0],
}) => {
  const frame = useCurrentFrame();
  const lines = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let r = 0; r <= rows; r++) {
      const z = -depth / 2 + (depth * r) / Math.max(1, rows);
      const pts: [number, number, number][] = [];
      for (let c = 0; c <= columns; c++) {
        const x = -width / 2 + (width * c) / Math.max(1, columns);
        pts.push([x, 0, z]);
      }
      result.push(pts);
    }
    return result;
  }, [width, depth, rows, columns]);
  return (
    <group position={position}>
      {lines.map((line, i) => {
        const points = line.map(([x, , z]) => [
          x,
          Math.sin(x * frequency + frame * speed + z * 1.5) * amplitude,
          z,
        ] as [number, number, number]);
        return <Line key={i} points={points} color={color} lineWidth={lineWidth} transparent opacity={0.82} />;
      })}
    </group>
  );
};
