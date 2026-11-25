import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; dotColor?: string; background?: string; direction?: "left"|"right" };

/** A halftone field sweeps across the screen before clearing to the scene. */
export const HalftoneWipeTransition: React.FC<Props> = ({children,duration=30,delay=0,dotColor="#f2b84b",background="#17191f",direction="right"}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const x=direction==="right"?p*100:(1-p)*100;
  return <AbsoluteFill style={{overflow:"hidden",background}}>
    <AbsoluteFill style={{clipPath:direction==="right"?`inset(0 ${(1-p)*100}% 0 0)`:`inset(0 0 0 ${(1-p)*100}%)`}}>{children}</AbsoluteFill>
    {p<1 && <AbsoluteFill style={{pointerEvents:"none",backgroundImage:`radial-gradient(${dotColor} 1.5px, transparent 1.8px)`,backgroundSize:"9px 9px",maskImage:`linear-gradient(90deg, transparent ${Math.max(0,x-32)}%, black ${Math.max(0,x-8)}%, black ${Math.min(100,x+8)}%, transparent ${Math.min(100,x+32)}%)`,opacity:1-p*.25}}/>}
  </AbsoluteFill>;
};
