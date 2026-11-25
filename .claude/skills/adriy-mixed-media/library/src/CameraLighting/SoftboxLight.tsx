import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={x?:number;y?:number;width?:number;height?:number;angle?:number;intensity?:number;color?:string;delay?:number;duration?:number;blend?:"screen"|"soft-light"|"overlay"};

/** Broad soft light wash for adding a studio-lit feel to a flat collage. */
export const SoftboxLight:React.FC<Props>=({x=15,y=8,width=70,height=55,angle=-18,intensity=.28,color="#ffd7a0",delay=0,duration=24,blend="screen"})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{pointerEvents:"none",mixBlendMode:blend,opacity:intensity*p,background:`radial-gradient(ellipse ${width}% ${height}% at ${x}% ${y}%, ${color}, transparent 72%)`,transform:`rotate(${angle}deg)`}}/>;
};
