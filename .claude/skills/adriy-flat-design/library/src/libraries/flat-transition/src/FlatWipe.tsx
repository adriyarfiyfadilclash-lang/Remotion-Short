import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = { children: React.ReactNode; color?: string; duration?: number; direction?: "left"|"right"|"up"|"down" };
export const FlatWipe: React.FC<Props> = ({ children, color="#2563EB", duration=24, direction="left" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const p = interpolate(frame, [0, duration], [0, 100], { extrapolateLeft:"clamp", extrapolateRight:"clamp", easing:Easing.inOut(Easing.cubic) });
  const clip = direction==="left" ? `inset(0 ${100-p}% 0 0)` :
    direction==="right" ? `inset(0 0 0 ${100-p}%)` :
    direction==="up" ? `inset(0 0 ${100-p}% 0)` : `inset(${100-p}% 0 0 0)`;
  return <AbsoluteFill style={{overflow:"hidden"}}>
    <AbsoluteFill style={{clipPath:clip}}>{children}</AbsoluteFill>
    <AbsoluteFill style={{backgroundColor:color, pointerEvents:"none", transform: direction==="left" ? `translateX(${(p-100)*width/100}px)` : direction==="right" ? `translateX(${(100-p)*width/100}px)` : direction==="up" ? `translateY(${(p-100)*height/100}px)` : `translateY(${(100-p)*height/100}px)`, opacity:p<100?1:0}} />
  </AbsoluteFill>;
};
