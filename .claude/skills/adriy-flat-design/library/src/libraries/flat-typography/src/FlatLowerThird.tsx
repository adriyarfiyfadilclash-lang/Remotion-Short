import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props={name:string;role?:string;accent?:string;duration?:number};
export const FlatLowerThird:React.FC<Props>=({name,role,accent="#2563EB",duration=18})=>{
 const f=useCurrentFrame();
 const x=interpolate(f,[0,duration],[-900,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 const opacity=interpolate(f,[0,4],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <AbsoluteFill style={{justifyContent:"flex-end",alignItems:"flex-start",padding:72,pointerEvents:"none"}}>
  <div style={{display:"flex",opacity,transform:`translateX(${x}px)`,fontFamily:"Arial,sans-serif"}}>
   <div style={{width:12,backgroundColor:accent,marginRight:18}}/>
   <div style={{backgroundColor:"#FFFFFF",padding:"18px 28px",boxShadow:"0 8px 28px #0002"}}>
    <div style={{fontSize:34,fontWeight:900,color:"#111827"}}>{name}</div>
    {role && <div style={{fontSize:21,fontWeight:600,color:"#64748B",marginTop:4}}>{role}</div>}
   </div>
  </div>
 </AbsoluteFill>;
};
