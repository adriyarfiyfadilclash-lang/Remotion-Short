import React from "react";
import { GroupProps } from "@react-three/fiber";

export type DissectionExplainerSceneProps = GroupProps & {
  frame: number;
  revealAt?: number;
  hideAt?: number;
  children: React.ReactNode;
};

/** Mengatur kapan kelompok objek pembedahan konseptual tampil dalam timeline. */
export const DissectionExplainerScene: React.FC<DissectionExplainerSceneProps> = ({
  frame, revealAt = 0, hideAt = Number.POSITIVE_INFINITY, children, ...props
}) => (
  <group visible={frame >= revealAt && frame < hideAt} {...props}>
    {children}
  </group>
);
