import React from "react";

export type MedicalStudioLightingProps = {
  intensity?: number;
  keyColor?: string;
  fillColor?: string;
  rimColor?: string;
  ambient?: number;
};

/** Susunan lampu studio medis: cahaya utama, pengisi, dan garis tepi. */
export const MedicalStudioLighting: React.FC<MedicalStudioLightingProps> = ({
  intensity = 1.6, keyColor = "#f3fbff", fillColor = "#8bd8f2",
  rimColor = "#b7e9ff", ambient = 0.55,
}) => <>
  <ambientLight intensity={ambient} color="#d9eaf2" />
  <directionalLight position={[4, 6, 5]} intensity={intensity} color={keyColor} />
  <directionalLight position={[-5, 1, 2]} intensity={intensity * 0.48} color={fillColor} />
  <pointLight position={[0, 3, -4]} intensity={intensity * 2.2} color={rimColor} distance={14} />
</>;
