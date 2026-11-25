import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={front:React.ReactNode;back?:React.ReactNode;duration?:number;axis?:"X"|"Y";perspective?:number};
export const PaperFlip:React.FC<Props>=({front,back, duration=24,axis="Y",perspective=1000})=>{
 const f=useCurrentFrame();
 const angle=interpolate(f,[0,duration],[0,180],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const showBack=angle>90;
 return <div style={{perspective, width:"100%",height:"100%"}}>
  <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transform:`rotate${axis}(${angle}deg)`}}>
   <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden"}}>{front}</div>
   <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:`rotate${axis}(180deg)`}}>{back??front}</div>
  </div>
 </div>;
};
