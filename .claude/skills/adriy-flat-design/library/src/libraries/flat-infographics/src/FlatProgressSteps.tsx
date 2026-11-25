import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={steps:string[];activeIndex:number;color?:string;duration?:number};
export const FlatProgressSteps:React.FC<Props>=({steps,activeIndex,color="#2563EB",duration=20})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{display:"flex",alignItems:"flex-start",gap:8,fontFamily:"Arial,sans-serif"}}>
  {steps.map((step,i)=>{
   const done=i<=activeIndex; return <React.Fragment key={`${step}-${i}`}>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,flex:1}}>
     <div style={{width:38,height:38,borderRadius:"50%",display:"grid",placeItems:"center",backgroundColor:done?color:"#E2E8F0",color:done?"white":"#64748B",fontWeight:900,transform:`scale(${i===activeIndex?p:1})`}}>{i+1}</div>
     <div style={{fontSize:14,fontWeight:700,color:done?"#0F172A":"#64748B",textAlign:"center"}}>{step}</div>
    </div>
    {i<steps.length-1&&<div style={{height:5,flex:0.6,backgroundColor:i<activeIndex?color:"#E2E8F0",borderRadius:9,marginTop:17}}/>}
   </React.Fragment>;
  })}
 </div>;
};
