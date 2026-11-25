import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={name:string;role?:string;paperColor?:string;accent?:string;duration?:number};
export const PaperLowerThird:React.FC<Props>=({name,role,paperColor="#F8F1DF",accent="#C8794A",duration=20})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{display:"inline-flex",alignItems:"stretch",opacity:p,transform:`translateX(${(1-p)*-90}px) rotate(${(1-p)*-1.5}deg)`,boxShadow:"0 8px 18px rgba(55,42,24,.18)"}}>
  <div style={{width:12,background:accent}}/>
  <div style={{background:paperColor,padding:"16px 26px"}}>
   <div style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:900,color:"#443827"}}>{name}</div>
   {role&&<div style={{fontFamily:"Arial,sans-serif",fontSize:18,fontWeight:700,color:"#76664F",marginTop:4}}>{role}</div>}
  </div>
 </div>;
};
