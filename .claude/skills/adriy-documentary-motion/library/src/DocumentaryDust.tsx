import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

type Props = { count?: number; opacity?: number; speed?: number; seed?: number };

/** Deterministic floating dust motes; dots are generated from stable index math. */
export const DocumentaryDust: React.FC<Props> = ({
  count = 28, opacity = 0.22, speed = 0.35, seed = 1,
}) => {
  const frame = useCurrentFrame();
  const dots = Array.from({ length: count }, (_, i) => {
    const a = (i * 47 + seed * 19) % 100;
    const b = (i * 71 + seed * 13) % 100;
    const size = 1 + ((i * 13) % 3);
    const y = (b - frame * speed * (0.45 + (i % 4) * 0.12) + 1200) % 110;
    const x = a + Math.sin((frame + i * 9) * 0.012) * 1.8;
    return <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: "50%", background: "#fff",
      opacity: opacity * (0.45 + (i % 5) * 0.11), boxShadow: "0 0 4px rgba(255,255,255,.35)" }} />;
  });
  return <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>{dots}</AbsoluteFill>;
};
