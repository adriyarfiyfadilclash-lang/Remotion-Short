import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export type TimelineItem={time:string;title:string;description?:string;color?:string};
type Props={items:TimelineItem[];duration?:number;orientation?:"horizontal"|"vertical"};
export const FlatTimeline:React.FC<Props>=({items,duration=28,orientation="horizontal"})=>{
 const f=useCurrentFrame(); const vertical=orientation==="vertical";
 return <div style={{display:"flex",flexDirection:vertical?"column":"row",alignItems:vertical?"flex-start":"center",gap:vertical?28:18,fontFamily:"Arial,sans-serif"}}>
  {items.map((item,i)=>{
   const p=interpolate(f,[i*5,i*5+duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
   return <div key={`${item.time}-${i}`} style={{display:"flex",flexDirection:vertical?"row":"column",alignItems:vertical?"flex-start":"center",gap:10,opacity:p,transform:vertical?`translateX(${(1-p)*24}px)`:`translateY(${(1-p)*20}px)`,flex:1,minWidth:0}}>
    <div style={{width:18,height:18,borderRadius:"50%",backgroundColor:item.color??"#2563EB",flexShrink:0}}/>
    <div style={{textAlign:vertical?"left":"center"}}>
     <div style={{fontSize:16,fontWeight:800,color:item.color??"#2563EB"}}>{item.time}</div>
     <div style={{fontSize:19,fontWeight:900,color:"#0F172A"}}>{item.title}</div>
     {item.description&&<div style={{fontSize:14,color:"#64748B",marginTop:4}}>{item.description}</div>}
    </div>
   </div>;
  })}
 </div>;
};
