import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props = {
  children: React.ReactNode;
  amount?: number;
  frequency?: number;
  rotation?: number;
  scale?: number;
  seed?: number;
};

/** Subtle simulated handheld drift. Keep amount low for documentary credibility. */
export const DocumentaryHandheld: React.FC<Props> = ({
  children, amount = 2, frequency = 0.055, rotation = 0.18, scale = 1.035, seed = 0,
}) => {
  const frame = useCurrentFrame() + seed;
  const x = Math.sin(frame * frequency * 1.7) * amount + Math.sin(frame * frequency * 0.63) * amount * 0.45;
  const y = Math.cos(frame * frequency * 1.23) * amount * 0.75;
  const r = Math.sin(frame * frequency * 0.8) * rotation;
  return <AbsoluteFill style={{ overflow: "hidden" }}>
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>;
};
