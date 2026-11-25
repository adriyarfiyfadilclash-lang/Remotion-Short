import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={front:React.ReactNode;back:React.ReactNode;duration?:number;direction?:"left"|"right"};
export const PaperPageTurn:React.FC<Props>=({front,back,duration=30,direction="left"})=>{
 const f=useCurrentFrame();
 const angle=interpolate(f,[0,duration],[0,direction==="left"?-180:180],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 return <div style={{position:"relative",width:"100%",height:"100%",perspective:1400}}>
  <div style={{position:"absolute",inset:0,background:"#E8DCC3"}}>{back}</div>
  <div style={{position:"absolute",inset:0,transformStyle:"preserve-3d",transform:`rotateY(${angle}deg)`,transformOrigin:direction==="left"?"left center":"right center"}}>
   <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#F8F1DF",boxShadow:"8px 0 18px rgba(50,35,15,.18)"}}>{front}</div>
   <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:"#F1E6D0"}}>{back}</div>
  </div>
 </div>;
};
