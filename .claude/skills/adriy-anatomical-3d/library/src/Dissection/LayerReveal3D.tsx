import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";

export type LayerReveal3DProps = GroupProps & {
  children?: React.ReactNode;
  startFrame?: number;
  durationInFrames?: number;
  direction?: "up" | "down" | "left" | "right" | "forward" | "back";
  distance?: number;
};

/** Menggeser satu lapisan secara bertahap untuk memperlihatkan struktur di bawahnya. */
export const LayerReveal3D: React.FC<LayerReveal3DProps> = ({
  children, startFrame=0, durationInFrames=45, direction="forward", distance=0.55,
  position=[0,0,0], ...props
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, Math.min(1, (frame-startFrame)/Math.max(1,durationInFrames)));
  const eased = t*t*(3-2*t);
  const vector: Record<string,[number,number,number]> = {
    up:[0,distance,0], down:[0,-distance,0], left:[-distance,0,0],
    right:[distance,0,0], forward:[0,0,distance], back:[0,0,-distance]
  };
  const v = vector[direction];
  const base = Array.isArray(position) ? position : [0,0,0];
  return <group {...props} position={[
    (base[0] || 0)+v[0]*eased,
    (base[1] || 0)+v[1]*eased,
    (base[2] || 0)+v[2]*eased
  ]}>{children}</group>;
};
