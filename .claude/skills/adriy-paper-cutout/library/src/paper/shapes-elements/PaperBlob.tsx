import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  size?: number;
  color?: string;
  seed?: number;
  delay?: number;
  rotation?: number;
  shadow?: boolean;
  style?: React.CSSProperties;
};

const paths = [
  "M51 5 C70 1 91 17 94 37 C99 58 81 82 61 92 C41 102 14 88 7 67 C0 46 17 18 37 11 C42 9 47 7 51 5Z",
  "M48 4 C68 7 89 8 95 31 C101 54 83 76 65 91 C46 106 19 88 8 69 C-3 49 12 23 29 12 C35 8 41 5 48 4Z",
  "M53 6 C76 2 93 22 91 43 C89 64 75 88 52 94 C29 100 8 82 6 60 C4 38 19 14 39 8Z",
  "M44 5 C64 0 88 15 95 35 C102 55 83 82 62 93 C41 104 15 86 7 66 C-1 46 16 20 34 10Z",
];

export const PaperBlob: React.FC<Props> = ({ size = 190, color = "#D77F69", seed = 0, delay = 0, rotation = -5, shadow = true, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 90 } });
  const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const path = paths[Math.abs(seed) % paths.length];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, transform: `rotate(${rotation}deg) scale(${interpolate(p, [0, 1], [.7, 1])})`, filter: shadow ? "drop-shadow(3px 6px 2px rgba(35,25,15,.22))" : undefined, ...style }} aria-hidden>
      <path d={path} fill={color} stroke="rgba(70,48,25,.18)" strokeWidth="1.2" />
      <path d={path} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" transform="translate(-1 -1)" />
    </svg>
  );
};
