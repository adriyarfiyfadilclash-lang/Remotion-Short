import React from "react";
import { GroupProps } from "@react-three/fiber";

export type AnatomicalDepthLayerProps = GroupProps & {
  depth?: number;
  opacity?: number;
  tint?: string;
  visible?: boolean;
};

/**
 * Grup pengatur kedalaman lapisan anatomi.
 * opacity dan tint disimpan sebagai metadata agar komponen material anak
 * dapat membaca/menyesuaikannya tanpa memaksakan material generik yang keliru.
 */
export const AnatomicalDepthLayer: React.FC<AnatomicalDepthLayerProps> = ({
  children, depth = 0, opacity = 1, tint = "#ffffff",
  visible = true, position = [0, 0, 0], ...rest
}) => (
  <group
    visible={visible}
    position={[position[0] as number, (position[1] as number) + depth, position[2] as number]}
    userData={{ anatomicalDepth: depth, anatomicalOpacity: opacity, anatomicalTint: tint }}
    {...rest}
  >
    {children}
  </group>
);
