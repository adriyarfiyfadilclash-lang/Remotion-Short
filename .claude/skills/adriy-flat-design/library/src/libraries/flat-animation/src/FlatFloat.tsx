import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  amplitude?: number;
  speed?: number;
  phase?: number;
  rotate?: number;
};

/** Gentle looping float for decorative flat illustrations and icons. */
export const FlatFloat: React.FC<Props> = ({
  children, amplitude = 8, speed = 0.045, phase = 0, rotate = 0,
}) => {
  const frame = useCurrentFrame();
  const y = Math.sin((frame + phase) * speed * 2 * Math.PI) * amplitude;
  const r = Math.sin((frame + phase) * speed * Math.PI) * rotate;
  return <AbsoluteFill style={{ transform: `translateY(${y}px) rotate(${r}deg)` }}>{children}</AbsoluteFill>;
};
