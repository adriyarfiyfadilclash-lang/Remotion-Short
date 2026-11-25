import React from "react";
import { GroupProps } from "@react-three/fiber";

export type OrganFocusSequenceProps = GroupProps & {
  frame: number;
  startFrame: number;
  endFrame: number;
  children: React.ReactNode;
};

/** Mengaktifkan grup organ hanya selama bab fokus yang ditentukan. */
export const OrganFocusSequence: React.FC<OrganFocusSequenceProps> = ({
  frame, startFrame, endFrame, children, ...groupProps
}) => (
  <group visible={frame >= startFrame && frame < endFrame} {...groupProps}>
    {children}
  </group>
);
