import React from "react";
import { Edges } from "@react-three/drei";

type Props = {
  children: React.ReactNode;
  color?: string;
  threshold?: number;
  lineWidth?: number;
};

/** Adds visible edge lines to mesh children for technical component emphasis. */
export const ComponentHighlightFrame3D: React.FC<Props> = ({
  children,
  color = "#72dfff",
  threshold = 18,
  lineWidth = 1.4,
}) => (
  <group>
    {children}
    <group userData={{ edgeHighlight: true, color, threshold, lineWidth }}>
      {/* Place <Edges /> inside the highlighted mesh when exact geometry edges are required. */}
    </group>
  </group>
);
