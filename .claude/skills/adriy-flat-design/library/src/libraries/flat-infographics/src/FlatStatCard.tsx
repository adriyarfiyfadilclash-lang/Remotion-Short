import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={label:string;value:string;change?:string;color?:string;duration?:number};
export const FlatStatCard:React.FC<Props>=({label,value,change,color="#2563EB",duration=18})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.1))});
 return <div style={{background:"#FFFFFF",borderRadius:18,padding:26,minWidth:210,boxShadow:"0 8px 28px #0F172A10",fontFamily:"Arial,sans-serif",opacity:p,transform:`translateY(${(1-p)*22}px)`}}>
  <div style={{fontSize:17,fontWeight:700,color:"#64748B"}}>{label}</div>
  <div style={{fontSize:44,fontWeight:900,color:"#0F172A",margin:"8px 0"}}>{value}</div>
  {change&&<div style={{fontSize:15,fontWeight:800,color}}>{change}</div>}
 </div>;
};
