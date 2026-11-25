import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type PaperShapeKind = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "star";

type Props = {
  kind?: PaperShapeKind;
  size?: number;
  color?: string;
  rotation?: number;
  delay?: number;
  duration?: number;
  shadow?: boolean;
  roughness?: number;
  style?: React.CSSProperties;
};

const shapePaths: Record<PaperShapeKind, string> = {
  circle: "M50 5 C76 4 96 23 95 50 C96 76 76 95 50 95 C24 96 5 76 5 50 C4 24 24 5 50 5Z",
  square: "M12 9 L91 12 L89 90 L10 88Z",
  triangle: "M50 7 L94 89 L8 92Z",
  diamond: "M50 4 L94 49 L51 96 L6 51Z",
  hexagon: "M27 7 L74 8 L96 50 L73 92 L26 91 L5 49Z",
  star: "M50 4 L61 36 L95 37 L68 58 L78 92 L50 72 L22 92 L32 58 L5 37 L39 36Z",
};

export const PaperShape: React.FC<Props> = ({
  kind = "circle", size = 180, color = "#E8B85B", rotation = 0,
  delay = 0, duration = 18, shadow = true, roughness = 1, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 13, stiffness: 115, mass: 0.8 } });
  const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(progress, [0, 1], [0.72, 1]);
  return (
    <div style={{ width: size, height: size, opacity, transform: `rotate(${rotation}deg) scale(${scale})`, transformOrigin: "center", filter: shadow ? "drop-shadow(3px 6px 2px rgba(35,25,15,.22))" : undefined, ...style }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
        <path d={shapePaths[kind]} fill={color} stroke="rgba(70,48,25,.18)" strokeWidth={roughness * 0.8} strokeLinejoin="round" />
        <path d={shapePaths[kind]} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" transform="translate(-1 -1)" />
      </svg>
    </div>
  );
};
