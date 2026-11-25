import React from "react";
import * as THREE from "three";

export type CinematicSpaceLightingProps = {
  keyPosition?: [number, number, number];
  fillPosition?: [number, number, number];
  rimPosition?: [number, number, number];
  keyColor?: THREE.ColorRepresentation;
  fillColor?: THREE.ColorRepresentation;
  rimColor?: THREE.ColorRepresentation;
  keyIntensity?: number;
  fillIntensity?: number;
  rimIntensity?: number;
  ambientIntensity?: number;
};

/** Three-point lighting preset for polished cinematic space scenes. */
export const CinematicSpaceLighting: React.FC<CinematicSpaceLightingProps> = ({
  keyPosition = [7, 8, 10], fillPosition = [-8, 1, 5], rimPosition = [0, 5, -9],
  keyColor = "#fff0d6", fillColor = "#638dff", rimColor = "#a27aff",
  keyIntensity = 2.8, fillIntensity = 0.8, rimIntensity = 2.1, ambientIntensity = 0.12,
}) => <>
  <ambientLight intensity={ambientIntensity} />
  <directionalLight position={keyPosition} color={keyColor} intensity={keyIntensity} />
  <pointLight position={fillPosition} color={fillColor} intensity={fillIntensity} distance={80} decay={2} />
  <pointLight position={rimPosition} color={rimColor} intensity={rimIntensity} distance={100} decay={2} />
</>;
