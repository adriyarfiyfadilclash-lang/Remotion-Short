import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Props={label:string;value:string|number;note?:string;color?:string;delay?:number;width?:number;height?:number};

export const PaperStatCard:React.FC<Props>=({label,value,note,color="#E4B85E",delay=0,width=250,height=160})=>{
 const frame=useCurrentFrame(); const p=interpolate(frame,[delay,delay+18],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{width,height,boxSizing:"border-box",padding:20,background:color,transform:`translateY(${(1-p)*22}px) rotate(-1deg)`,opacity:p,boxShadow:"4px 7px 2px rgba(45,32,18,.2)",border:"1px solid rgba(70,48,25,.18)",fontFamily:"Georgia,serif",color:"#383128"}}>
  <div style={{fontSize:16,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{label}</div>
  <div style={{fontSize:42,fontWeight:700,marginTop:13}}>{value}</div>
  {note?<div style={{fontSize:13,marginTop:6,opacity:.8}}>{note}</div>:null}
 </div>;
};
