import React from "react";

/** Main directional light for readable scientific forms. */
type Props = {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
  castShadow?: boolean;
};

export const ScientificKeyLight3D: React.FC<Props> = ({
  position = [4, 6, 5],
  color = "#e8f5ff",
  intensity = 1.8,
  castShadow = true,
}) => (
  <directionalLight
    position={position}
    color={color}
    intensity={intensity}
    castShadow={castShadow}
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
  />
);
