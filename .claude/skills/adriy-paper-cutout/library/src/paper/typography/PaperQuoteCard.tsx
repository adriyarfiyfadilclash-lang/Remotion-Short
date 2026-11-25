import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={quote:string;author?:string;paperColor?:string;accent?:string;duration?:number};
export const PaperQuoteCard:React.FC<Props>=({quote,author,paperColor="#FFF8E9",accent="#B96B45",duration=22})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.back(1.08))});
 return <div style={{maxWidth:1000,background:paperColor,padding:"42px 52px",boxShadow:"0 12px 24px rgba(55,42,24,.2)",transform:`translateY(${(1-p)*35}px) rotate(${(1-p)*1.2}deg)`,opacity:p}}>
  <div style={{fontFamily:"Georgia,serif",fontSize:68,fontWeight:900,color:accent,lineHeight:.7}}>“</div>
  <div style={{fontFamily:"Georgia,serif",fontSize:38,fontWeight:700,lineHeight:1.3,color:"#443827"}}>{quote}</div>
  {author&&<div style={{fontFamily:"Arial,sans-serif",fontSize:19,fontWeight:700,color:"#8A765B",marginTop:22}}>— {author}</div>}
 </div>;
};
