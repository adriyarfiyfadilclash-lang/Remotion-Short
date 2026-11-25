import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={color?:string;intensity?:number;size?:number;side?:"left"|"right"|"top"|"bottom";delay?:number;duration?:number};

/** Colored edge glow to separate cutout assets from a dark background. */
export const RimLightEdge:React.FC<Props>=({color="#77d9e8",intensity=.38,size=18,side="right",delay=0,duration=20})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const gradient=side==="left"?`linear-gradient(90deg,${color},transparent ${size}%)`:side==="right"?`linear-gradient(270deg,${color},transparent ${size}%)`:side==="top"?`linear-gradient(180deg,${color},transparent ${size}%)`:`linear-gradient(0deg,${color},transparent ${size}%)`;
 return <AbsoluteFill style={{pointerEvents:"none",opacity:intensity*p,background:gradient,mixBlendMode:"screen"}}/>;
};
