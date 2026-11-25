import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; color?: string; direction?: "left"|"right"|"up"|"down" };

/** Reveals the next scene through a moving paper-like edge. */
export const PaperRevealTransition: React.FC<Props> = ({children,duration=24,delay=0,color="#e9e1d2",direction="right"}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const clip = direction==="right" ? `inset(0 ${(1-p)*100}% 0 0)` : direction==="left" ? `inset(0 0 0 ${(1-p)*100}%)` : direction==="down" ? `inset(0 0 ${(1-p)*100}% 0)` : `inset(${(1-p)*100}% 0 0 0)`;
  const paperX = direction==="right" ? p*100 : direction==="left" ? (1-p)*100 : 0;
  const paperY = direction==="down" ? p*100 : direction==="up" ? (1-p)*100 : 0;
  return <AbsoluteFill style={{overflow:"hidden"}}>
    <AbsoluteFill style={{clipPath:clip}}>{children}</AbsoluteFill>
    {p<1 && <AbsoluteFill style={{pointerEvents:"none",background:color,clipPath: direction==="right" ? `inset(0 0 0 ${Math.max(0,p*100-1)}%)` : direction==="left" ? `inset(0 ${Math.max(0,(1-p)*100-1)}% 0 0)` : direction==="down" ? `inset(${Math.max(0,p*100-1)}% 0 0 0)` : `inset(0 0 ${Math.max(0,(1-p)*100-1)}% 0)`,opacity:1}} />}
  </AbsoluteFill>;
};
