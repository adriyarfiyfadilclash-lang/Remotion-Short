import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; x?: number; y?: number; width?: number; height?: number; color?: string; rotate?: number; texture?: boolean; delay?: number; shadow?: boolean; padding?: number };

/** Torn-paper-inspired panel. Use as a layer behind titles, photos or labels. */
export const PaperLayer: React.FC<Props> = ({ children, x=0, y=0, width=500, height=260, color="#f1eadb", rotate=1.5, texture=true, delay=0, shadow=true, padding=24 }) => {
  const f = useCurrentFrame() - delay;
  const p = interpolate(f, [0, 16], [0, 1], { extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  return <div style={{ position:"absolute", left:x, top:y, width, height, boxSizing:"border-box", padding, color:"#242424", background:color, opacity:p, transform:`translateY(${(1-p)*26}px) rotate(${rotate}deg)`, boxShadow:shadow?"0 18px 35px rgba(0,0,0,.22)":undefined, clipPath:"polygon(1% 2%, 98% 0, 100% 97%, 3% 100%, 0 5%)", overflow:"hidden" }}>
    {texture && <div style={{ position:"absolute", inset:0, opacity:.11, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(0deg, transparent 0 3px, rgba(80,60,30,.18) 4px)" }} />}
    <div style={{ position:"relative", height:"100%" }}>{children}</div>
  </div>;
};
