import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Side={title:string;value:string;details:string[];color:string};
type Props={left:Side;right:Side;duration?:number};
export const FlatComparison:React.FC<Props>=({left,right,duration=24})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,fontFamily:"Arial,sans-serif",width:"100%"}}>
  {[left,right].map((side,i)=><div key={side.title} style={{background:"#FFFFFF",borderTop:`10px solid ${side.color}`,borderRadius:18,padding:26,opacity:p,transform:`translateY(${(1-p)*25}px)`}}>
   <div style={{fontSize:23,fontWeight:900,color:"#0F172A"}}>{side.title}</div>
   <div style={{fontSize:48,fontWeight:900,color:side.color,margin:"12px 0"}}>{side.value}</div>
   {side.details.map((detail,j)=><div key={j} style={{fontSize:17,color:"#475569",marginTop:8}}>• {detail}</div>)}
  </div>)}
 </div>;
};
