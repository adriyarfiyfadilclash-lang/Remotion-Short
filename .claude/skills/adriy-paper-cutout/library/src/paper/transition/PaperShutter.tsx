import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;panels?:number;duration?:number;direction?:"horizontal"|"vertical";paperColor?:string};
export const PaperShutter:React.FC<Props>=({children,panels=5,duration=24,direction="horizontal",paperColor="#E8DCC3"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[100,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const vertical=direction==="vertical";
 return <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0}}>{children}</div>
  {Array.from({length:panels},(_,i)=>{
   const size=100/panels;
   const delay=i*2;
   const reveal=interpolate(f,[delay,delay+duration],[100,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
   return <div key={i} style={{
    position:"absolute",background:paperColor,boxShadow:"0 4px 9px rgba(55,42,24,.15)",
    ...(vertical?{left:0,right:0,top:`${i*size}%`,height:`${size}%`,transform:`translateY(${(i%2?1:-1)*reveal}%)`}:
      {top:0,bottom:0,left:`${i*size}%`,width:`${size}%`,transform:`translateX(${(i%2?1:-1)*reveal}%)`})
   }}/>;
  })}
 </div>;
};
