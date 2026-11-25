import React from "react";

type Props = {
  ambient?: number;
  keyPosition?: [number, number, number];
  keyIntensity?: number;
  fillPosition?: [number, number, number];
  fillIntensity?: number;
  rimPosition?: [number, number, number];
  rimIntensity?: number;
  keyColor?: string;
  fillColor?: string;
  rimColor?: string;
};

/** Three-point lighting preset tuned for metallic mechanical parts. */
export const ExplodedLightingRig3D: React.FC<Props> = ({
  ambient = 0.35,
  keyPosition = [4, 6, 5],
  keyIntensity = 2.2,
  fillPosition = [-5, 2, 3],
  fillIntensity = 1.1,
  rimPosition = [0, 4, -5],
  rimIntensity = 2.4,
  keyColor = "#fff1d6",
  fillColor = "#8bc9ed",
  rimColor = "#d2eaff",
}) => (
  <>
    <ambientLight intensity={ambient} />
    <directionalLight position={keyPosition} intensity={keyIntensity} color={keyColor} />
    <pointLight position={fillPosition} intensity={fillIntensity * 12} color={fillColor} />
    <pointLight position={rimPosition} intensity={rimIntensity * 12} color={rimColor} />
  </>
);
