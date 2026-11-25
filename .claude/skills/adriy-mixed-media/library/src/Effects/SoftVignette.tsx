import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={strength?:number;inner?:number;color?:string;delay?:number;duration?:number};

/** Adjustable edge darkening to frame the subject and guide viewer attention. */
export const SoftVignette:React.FC<Props>=({strength=.48,inner=42,color="#000",delay=0,duration=20})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{pointerEvents:"none",opacity:strength*p,background:`radial-gradient(ellipse at center,transparent ${inner}%,${color} 120%)`}}/>;
};
