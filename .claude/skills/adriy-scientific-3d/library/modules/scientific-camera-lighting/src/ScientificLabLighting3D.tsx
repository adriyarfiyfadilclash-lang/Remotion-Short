import React from "react";
import { ScientificKeyLight3D } from "./ScientificKeyLight3D";
import { ScientificRimLight3D } from "./ScientificRimLight3D";

type Props = {
  ambientIntensity?: number;
  keyIntensity?: number;
  fillIntensity?: number;
  rimIntensity?: number;
  backgroundColor?: string;
  shadows?: boolean;
};

/** Three-point laboratory-style lighting preset for scientific scenes. */
export const ScientificLabLighting3D: React.FC<Props> = ({
  ambientIntensity = 0.45,
  keyIntensity = 1.7,
  fillIntensity = 0.55,
  rimIntensity = 18,
  backgroundColor = "#071522",
  shadows = true,
}) => (
  <group>
    <color attach="background" args={[backgroundColor]} />
    <ambientLight intensity={ambientIntensity} color="#d8eaff" />
    <ScientificKeyLight3D intensity={keyIntensity} castShadow={shadows} />
    <directionalLight position={[-4, 1, 3]} color="#8db9d8" intensity={fillIntensity} />
    <ScientificRimLight3D intensity={rimIntensity} />
  </group>
);
