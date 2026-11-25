import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={color?:string;opacity?:number;delay?:number;duration?:number;spread?:number;side?:"left"|"right"|"top"|"bottom"};

/** Soft pigment bleed at the edges for a printed-paper/collage look. */
export const InkBleedOverlay:React.FC<Props>=({color="#1b1b1b",opacity=.22,delay=0,duration=24,spread=22,side="bottom"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const direction=side==="top"?"180deg":side==="left"?"90deg":side==="right"?"270deg":"0deg";
 return <AbsoluteFill style={{pointerEvents:"none",opacity:opacity*p,background:`linear-gradient(${direction},${color},transparent ${spread}%)`,mixBlendMode:"multiply"}}/>;
};
