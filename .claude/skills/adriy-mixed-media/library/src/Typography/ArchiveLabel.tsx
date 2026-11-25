import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props={text:string;subtext?:string;x?:number;y?:number;color?:string;background?:string;delay?:number;rotate?:number;size?:number;tracking?:number};

/** Small archive/document label with a stamped-in entrance. */
export const ArchiveLabel:React.FC<Props>=({text,subtext,x=0,y=0,color="#211f1b",background="#e9e1d2",delay=0,rotate=-2,size=13,tracking=2})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,10],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y,display:"inline-flex",flexDirection:"column",gap:5,padding:"9px 13px",background,color,fontFamily:"Arial,sans-serif",fontSize:size,fontWeight:900,letterSpacing:tracking,textTransform:"uppercase",opacity:p,transform:`scale(${.86+.14*p}) rotate(${rotate}deg)`,boxShadow:"0 7px 15px rgba(0,0,0,.18)"}}>
  <span>{text}</span>{subtext&&<span style={{fontSize:size*.72,letterSpacing:1,fontWeight:600,opacity:.72}}>{subtext}</span>}
 </div>;
};
