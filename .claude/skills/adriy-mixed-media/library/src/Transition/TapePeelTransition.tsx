import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props = { children?: React.ReactNode; duration?: number; delay?: number; tapeColor?: string; direction?: "left"|"right" };

/** A strip of masking tape peels away to uncover the incoming scene. */
export const TapePeelTransition: React.FC<Props> = ({children,duration=26,delay=0,tapeColor="#d7c69a",direction="right"}) => {
  const f=useCurrentFrame()-delay;
  const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const edge=direction==="right" ? (1-p)*100 : p*100;
  return <AbsoluteFill style={{overflow:"hidden"}}>
    <AbsoluteFill style={{clipPath:direction==="right"?`inset(0 ${100-p*100}% 0 0)`:`inset(0 0 0 ${(1-p)*100}%)`}}>{children}</AbsoluteFill>
    {p<1 && <div style={{position:"absolute",top:"46%",left:`${edge}%`,width:"115%",height:42,transform:`translate(-50%,-50%) rotate(-2deg)`,background:`repeating-linear-gradient(90deg,${tapeColor} 0 22px, #c7b487 23px 25px)`,boxShadow:"0 8px 16px rgba(0,0,0,.2)",opacity:1-p}}/>}
  </AbsoluteFill>;
};
