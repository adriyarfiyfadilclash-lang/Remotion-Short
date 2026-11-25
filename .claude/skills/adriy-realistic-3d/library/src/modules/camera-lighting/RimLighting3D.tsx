import React from "react";

type Props = { color?: string; intensity?: number; position?: [number, number, number]; angle?: number; distance?: number };

/** Focused back/rim light to separate an object from its background. */
export const RimLighting3D: React.FC<Props> = ({ color = "#9fc8ff", intensity = 3, position = [0, 3, -4], angle = 0.7, distance = 16 }) => (
  <spotLight position={position} color={color} intensity={intensity} angle={angle} penumbra={0.9} distance={distance} />
);
