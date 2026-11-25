import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Item={src:string;caption?:string};
type Props={items:Item[];x?:number;y?:number;width?:number;columns?:number;gap?:number;cellHeight?:number;delay?:number;background?:string;captionColor?:string};

/** Contact sheet of archival images with sequential cell reveals. */
export const PhotoContactSheet:React.FC<Props>=({items,x=0,y=0,width=760,columns=3,gap=12,cellHeight=170,delay=0,background="#e9e1d2",captionColor="#222"})=>{
 const f=useCurrentFrame()-delay; const cols=Math.max(1,Math.min(5,columns)); const safe=items.slice(0,15);
 const cellW=(width-gap*(cols-1))/cols;
 return <div style={{position:"absolute",left:x,top:y,width,display:"grid",gridTemplateColumns:`repeat(${cols}, ${cellW}px)`,gap,background,padding:gap,boxSizing:"border-box",boxShadow:"0 14px 28px rgba(0,0,0,.22)"}}>
  {safe.map((item,i)=>{const p=interpolate(f,[i*4,i*4+12],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});return <div key={i} style={{opacity:p,transform:`translateY(${(1-p)*16}px)`,background:"#c9c0b1",padding:5}}>
   <Img src={item.src} style={{width:"100%",height:cellHeight,objectFit:"cover",display:"block",filter:"saturate(.75) contrast(1.04)"}}/>
   {item.caption&&<div style={{fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:700,color:captionColor,padding:"6px 2px 2px"}}>{item.caption}</div>}
  </div>;})}
 </div>;
};
