import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export type BarDatum={label:string;value:number;color?:string};
type Props={data:BarDatum[];maxValue?:number;height?:number;barWidth?:number;gap?:number;duration?:number;showValues?:boolean};
export const FlatBarChart:React.FC<Props>=({data,maxValue,height=360,barWidth=72,gap=28,duration=36,showValues=true})=>{
 const f=useCurrentFrame(); const max=maxValue??Math.max(...data.map(d=>d.value),1);
 return <div style={{height,display:"flex",alignItems:"flex-end",justifyContent:"center",gap,padding:"20px 12px",fontFamily:"Arial,sans-serif"}}>
  {data.map((d,i)=>{
   const h=interpolate(f,[i*4,i*4+duration],[0,Math.max(0,d.value)/max*(height-76)],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
   return <div key={`${d.label}-${i}`} style={{height:"100%",width:barWidth,display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",gap:9}}>
    {showValues&&<div style={{fontSize:18,fontWeight:800,color:"#0F172A"}}>{Math.round(d.value*h/Math.max(h,1))}</div>}
    <div style={{height:h,width:"100%",backgroundColor:d.color??"#2563EB",borderRadius:"10px 10px 0 0"}}/>
    <div style={{fontSize:16,fontWeight:700,color:"#475569",textAlign:"center"}}>{d.label}</div>
   </div>;
  })}
 </div>;
};
