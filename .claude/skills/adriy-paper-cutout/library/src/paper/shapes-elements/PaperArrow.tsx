import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = { width?: number; color?: string; direction?: "right" | "left" | "up" | "down"; delay?: number; style?: React.CSSProperties };

export const PaperArrow: React.FC<Props> = ({ width = 180, color = "#5D8C83", direction = "right", delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rotation = direction === "right" ? 0 : direction === "left" ? 180 : direction === "up" ? -90 : 90;
  return (
    <svg width={width} height={width * .42} viewBox="0 0 180 76" style={{ opacity, transform: `rotate(${rotation}deg) scale(${interpolate(p, [0, 1], [.7, 1])})`, filter: "drop-shadow(2px 4px 2px rgba(35,25,15,.2))", ...style }} aria-hidden>
      <path d="M7 26 L112 26 L111 8 L174 38 L111 68 L112 50 L7 50Z" fill={color} stroke="rgba(65,45,25,.2)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};
