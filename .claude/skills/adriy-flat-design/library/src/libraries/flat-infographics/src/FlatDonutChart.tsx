import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export type DonutDatum={label:string;value:number;color:string};
type Props={data:DonutDatum[];size?:number;thickness?:number;duration?:number;centerLabel?:string};
export const FlatDonutChart:React.FC<Props>=({data,size=300,thickness=34,duration=42,centerLabel="TOTAL"})=>{
 const f=useCurrentFrame(); const total=data.reduce((s,d)=>s+d.value,0)||1;
 const progress=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
 let offset=0;
 const stops=data.map(d=>{const start=offset;offset+=d.value/total*100;return `${d.color} ${start}% ${offset}%`;}).join(", ");
 return <div style={{position:"relative",width:size,height:size,borderRadius:"50%",background:`conic-gradient(${stops})`,transform:`rotate(${-90+360*(1-progress)}deg)`,display:"grid",placeItems:"center"}}>
  <div style={{width:size-thickness*2,height:size-thickness*2,borderRadius:"50%",background:"#FFFFFF",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transform:`rotate(${90-360*(1-progress)}deg)`}}>
   <span style={{fontFamily:"Arial,sans-serif",fontSize:16,fontWeight:700,color:"#64748B"}}>{centerLabel}</span>
   <span style={{fontFamily:"Arial,sans-serif",fontSize:34,fontWeight:900,color:"#0F172A"}}>{total.toLocaleString("id-ID")}</span>
  </div>
 </div>;
};
