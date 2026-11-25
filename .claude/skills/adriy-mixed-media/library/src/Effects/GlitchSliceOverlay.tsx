import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={children?:React.ReactNode;delay?:number;duration?:number;intensity?:number;bands?:number;color?:string};

/** Brief horizontal scan slices that shift independently for a collage glitch. */
export const GlitchSliceOverlay:React.FC<Props>=({children,delay=0,duration=20,intensity=22,bands=4,color="#ef6b4a"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,duration],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const n=Math.max(1,Math.min(10,bands));
 return <AbsoluteFill style={{overflow:"hidden"}}>
  <AbsoluteFill>{children}</AbsoluteFill>
  {f>=0&&f<duration&&Array.from({length:n},(_,i)=>{
   const top=(i*37+f*13)%92; const offset=Math.sin(f*1.7+i*2.4)*intensity*p;
   return <div key={i} style={{position:"absolute",left:0,top:`${top}%`,width:"100%",height:`${2+(i%3)}%`,overflow:"hidden",transform:`translateX(${offset}px)`,background:`${color}18`,borderTop:`1px solid ${color}55`,borderBottom:"1px solid rgba(255,255,255,.12)"}}/>;
  })}
 </AbsoluteFill>;
};
