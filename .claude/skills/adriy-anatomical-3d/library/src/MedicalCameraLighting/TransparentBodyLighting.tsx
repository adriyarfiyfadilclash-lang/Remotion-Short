import React from "react";

export type TransparentBodyLightingProps = {
  intensity?: number;
  tint?: string;
  backlight?: number;
};

/** Pencahayaan lembut untuk model tubuh transparan atau semi-transparan. */
export const TransparentBodyLighting: React.FC<TransparentBodyLightingProps> = ({
  intensity = 1.2, tint = "#8edcf2", backlight = 2.4,
}) => <>
  <ambientLight intensity={intensity * 0.65} color="#d8f5ff" />
  <pointLight position={[0, 2, 4]} intensity={intensity} color={tint} distance={12} />
  <pointLight position={[0, 1, -3]} intensity={backlight} color={tint} distance={10} />
  <directionalLight position={[-4, 5, 3]} intensity={intensity * 0.7} color="#ffffff" />
</>;
