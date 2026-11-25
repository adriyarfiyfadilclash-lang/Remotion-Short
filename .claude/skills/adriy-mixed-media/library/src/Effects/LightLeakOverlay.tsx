import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={color?:string;intensity?:number;side?:"left"|"right"|"top"|"bottom";delay?:number;duration?:number;drift?:number};

/** Warm analog light leak that slowly drifts along one edge. */
export const LightLeakOverlay:React.FC<Props>=({color="#ff713d",intensity=.32,side="left",delay=0,duration=120,drift=12})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const pos=side==="left"?`${12+Math.sin(f*.025)*drift}% 50%`:side==="right"?`${88+Math.sin(f*.025)*drift}% 50%`:side==="top"?`50% ${12+Math.sin(f*.025)*drift}%`:`50% ${88+Math.sin(f*.025)*drift}%`;
 return <AbsoluteFill style={{pointerEvents:"none",opacity:intensity*p,mixBlendMode:"screen",background:`radial-gradient(ellipse at ${pos},${color} 0%,${color}66 12%,transparent 48%)`}}/>;
};
