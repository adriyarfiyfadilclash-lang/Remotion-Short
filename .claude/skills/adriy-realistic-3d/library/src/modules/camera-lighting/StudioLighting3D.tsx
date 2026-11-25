import React from "react";

type Props = {
  ambient?: number; keyIntensity?: number; fillIntensity?: number; rimIntensity?: number;
  keyPosition?: [number, number, number]; fillPosition?: [number, number, number]; rimPosition?: [number, number, number];
  keyColor?: string; fillColor?: string; rimColor?: string; shadows?: boolean;
};

/** Three-point studio setup using native Three.js lights; no HDRI assets required. */
export const StudioLighting3D: React.FC<Props> = ({
  ambient = 0.35, keyIntensity = 2.2, fillIntensity = 0.8, rimIntensity = 2.8,
  keyPosition = [-4, 5, 5], fillPosition = [4, 1, 3], rimPosition = [0, 4, -4],
  keyColor = "#fff1dc", fillColor = "#c9dcff", rimColor = "#ffffff", shadows = true,
}) => (
  <>
    <ambientLight intensity={ambient} />
    <directionalLight position={keyPosition} intensity={keyIntensity} color={keyColor} castShadow={shadows} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    <pointLight position={fillPosition} intensity={fillIntensity} color={fillColor} />
    <spotLight position={rimPosition} intensity={rimIntensity} color={rimColor} angle={0.65} penumbra={0.8} distance={18} />
  </>
);
