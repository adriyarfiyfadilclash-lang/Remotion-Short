import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Props={src:string;x?:number;y?:number;width?:number;height?:number;caption?:string;rotate?:number;delay?:number;frameColor?:string;fit?:"cover"|"contain"};

/** Instant-photo frame with a caption margin and gentle drop-in. */
export const PolaroidFrame:React.FC<Props>=({src,x=0,y=0,width=300,height=360,caption="MOMEN",rotate=3,delay=0,frameColor="#f7f4ec",fit="cover"})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,18],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const bottom=Math.max(48,Math.round(height*.17));
 return <div style={{position:"absolute",left:x,top:y,width,height,background:frameColor,padding:12,paddingBottom:bottom,boxSizing:"border-box",opacity:p,transform:`translateY(${(1-p)*28}px) rotate(${rotate}deg)`,boxShadow:"0 16px 28px rgba(0,0,0,.28)"}}>
  <Img src={src} style={{width:"100%",height:`calc(100% - ${bottom-12}px)`,objectFit:fit,display:"block"}}/>
  <div style={{position:"absolute",left:14,right:14,bottom:12,textAlign:"center",fontFamily:"'Comic Sans MS',cursive",fontSize:Math.max(13,bottom*.34),color:"#34312c"}}>{caption}</div>
 </div>;
};
