import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;distance?:number;duration?:number;direction?:"left"|"right"|"up"|"down";trailColor?:string};
export const FlatMotionTrail:React.FC<Props>=({children,distance=100,duration=16,direction="right",trailColor="#93C5FD"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const dx=direction==="right"?distance*(1-p):direction==="left"?-distance*(1-p):0;
 const dy=direction==="down"?distance*(1-p):direction==="up"?-distance*(1-p):0;
 return <div style={{position:"relative",display:"inline-block",transform:`translate(${dx}px,${dy}px)`,opacity:p}}>
  <div style={{position:"absolute",inset:0,transform:`translate(${-dx*.35}px,${-dy*.35}px)`,backgroundColor:trailColor,opacity:(1-p)*.5,borderRadius:8,filter:"blur(8px)"}}/>
  <div style={{position:"relative"}}>{children}</div>
 </div>;
};
