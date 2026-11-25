import React from "react";

type Props = { color?: string; near?: number; far?: number };

/** Adds scene fog. The fog color should generally match the scene background. */
export const FogEnvironment3D: React.FC<Props> = ({ color = "#101827", near = 5, far = 22 }) => (
  <fog attach="fog" args={[color, near, far]} />
);
