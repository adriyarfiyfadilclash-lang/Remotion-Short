import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={blur?:number;opacity?:number;delay?:number;duration?:number;focus?:"center"|"top"|"bottom"|"left"|"right";children?:React.ReactNode};

/** Adds a subtle vignette and edge softness to mimic a shallow-focus lens. */
export const DepthOfFieldOverlay:React.FC<Props>=({blur=2,opacity=.34,delay=0,duration=24,focus="center",children})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const pos=focus==="top"?"50% 0%":focus==="bottom"?"50% 100%":focus==="left"?"0% 50%":focus==="right"?"100% 50%":"50% 50%";
 return <AbsoluteFill style={{pointerEvents:"none"}}>
  {children}
  <AbsoluteFill style={{opacity:opacity*p,backdropFilter:`blur(${blur}px)`,WebkitBackdropFilter:`blur(${blur}px)`,maskImage:`radial-gradient(ellipse at ${pos}, transparent 28%, black 88%)`}}/>
  <AbsoluteFill style={{opacity:.22*p,background:"radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.65) 100%)"}}/>
 </AbsoluteFill>;
};
