import React from "react";
import { AbsoluteFill } from "remotion";

type Props = { strength?: number; color?: string; softness?: number };

/** Darkens the outer frame to gently guide attention toward the center. */
export const DocumentaryVignette: React.FC<Props> = ({
  strength = 0.48, color = "0,0,0", softness = 48,
}) => <AbsoluteFill style={{
  pointerEvents: "none",
  background: `radial-gradient(ellipse at center, transparent ${softness}%, rgba(${color},${strength}) 100%)`,
}} />;
