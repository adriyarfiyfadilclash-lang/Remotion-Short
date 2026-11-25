import React from "react";

type Props = {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  opacity?: number;
};

/** Adds a subtle emissive accent to child meshes through a lightweight group wrapper.
 * Apply emissive materials directly to child meshes for the actual glow response.
 */
export const ComponentGlow3D: React.FC<Props> = ({
  children,
  color = "#65d9ff",
  intensity = 0.7,
  opacity = 0.22,
}) => (
  <group userData={{ glowColor: color, glowIntensity: intensity, glowOpacity: opacity }}>
    {children}
  </group>
);
