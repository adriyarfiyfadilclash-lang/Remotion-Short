import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type PaperSymbolKind = "sun" | "moon" | "heart" | "lightning" | "leaf" | "location";
type Props = { kind?: PaperSymbolKind; size?: number; color?: string; delay?: number; style?: React.CSSProperties };

const paths: Record<PaperSymbolKind, string> = {
  sun: "M50 17 C68 17 83 32 83 50 C83 68 68 83 50 83 C32 83 17 68 17 50 C17 32 32 17 50 17Z M50 2 L50 12 M50 88 L50 98 M2 50 L12 50 M88 50 L98 50 M16 16 L23 23 M77 77 L84 84 M16 84 L23 77 M77 23 L84 16",
  moon: "M72 12 C42 16 27 40 34 64 C40 85 63 94 83 82 C70 101 38 99 20 78 C0 55 12 22 39 9 C51 3 63 4 72 12Z",
  heart: "M50 88 C39 76 9 54 9 31 C9 9 37 2 50 24 C63 2 91 9 91 31 C91 54 61 76 50 88Z",
  lightning: "M57 3 L20 55 L45 55 L37 97 L81 39 L55 39Z",
  leaf: "M90 9 C41 8 10 28 10 61 C10 82 30 94 49 82 C71 69 83 38 90 9Z M15 86 C34 61 53 43 79 23",
  location: "M50 96 C37 76 17 56 17 36 C17 17 32 4 50 4 C68 4 83 17 83 36 C83 56 63 76 50 96Z M50 24 C42 24 36 30 36 38 C36 46 42 52 50 52 C58 52 64 46 64 38 C64 30 58 24 50 24Z",
};

export const PaperSymbol: React.FC<Props> = ({ kind = "sun", size = 110, color = "#E8B85B", delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 13, stiffness: 105 } });
  const opacity = interpolate(frame, [delay, delay + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, transform: `scale(${interpolate(p, [0, 1], [.65, 1])})`, filter: "drop-shadow(2px 4px 2px rgba(35,25,15,.2))", ...style }} aria-hidden><path d={paths[kind]} fill={color} stroke="rgba(65,45,25,.25)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fillRule="evenodd" /></svg>;
};
