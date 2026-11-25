import React from "react";

/** Rear or side light that separates transparent and solid scientific objects from the background. */
type Props = {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
  distance?: number;
};

export const ScientificRimLight3D: React.FC<Props> = ({
  position = [-4, 2, -4],
  color = "#55c9f2",
  intensity = 24,
  distance = 12,
}) => (
  <pointLight position={position} color={color} intensity={intensity} distance={distance} />
);
