import React from "react";
import * as THREE from "three";

export type PlanetRimLightingProps = {
  position?: [number, number, number];
  color?: THREE.ColorRepresentation;
  intensity?: number;
  width?: number;
};

/** Back/side light setup to create a readable illuminated planetary edge. */
export const PlanetRimLighting: React.FC<PlanetRimLightingProps> = ({
  position = [-5, 2, -4], color = "#69baff", intensity = 2.4, width = 1,
}) => <>
  <directionalLight position={position} color={color} intensity={intensity} />
  <pointLight position={[position[0] * 0.75, position[1] * 0.5, position[2] - width]} color={color} intensity={intensity * 0.22} distance={35} />
</>;
