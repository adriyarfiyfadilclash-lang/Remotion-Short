import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Step={title:string;detail?:string};
type Props={steps:Step[];activeIndex?:number;width?:number;delay?:number};

export const PaperProgressSteps:React.FC<Props>=({steps,activeIndex=steps.length-1,width=900,delay=0})=>{
 const frame=useCurrentFrame(); const gap=width/Math.max(1,steps.length);
 return <div style={{display:"flex",width,gap:10,alignItems:"flex-start"}}>
 {steps.map((s,i)=>{const p=interpolate(frame,[delay+i*6,delay+i*6+12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}); const active=i<=activeIndex; return <div key={`${s.title}-${i}`} style={{flex:1,opacity:p,textAlign:"center",fontFamily:"Georgia,serif"}}>
  <div style={{height:14,background:active?"#73978B":"#DCCFB9",marginBottom:12,boxShadow:"2px 3px 0 rgba(50,35,20,.12)"}}/>
  <div style={{width:38,height:38,borderRadius:"50%",margin:"0 auto 8px",background:active?"#D77F69":"#E4D7C2",border:"3px solid #F8F0E4",boxShadow:"2px 4px 2px rgba(40,30,20,.18)",display:"grid",placeItems:"center",color:"#40382F",fontWeight:700}}>{i+1}</div>
  <div style={{fontSize:17,fontWeight:700,color:"#40382F"}}>{s.title}</div>
  {s.detail?<div style={{fontSize:13,color:"#756957",marginTop:5}}>{s.detail}</div>:null}
 </div>;})}
 </div>;
};
