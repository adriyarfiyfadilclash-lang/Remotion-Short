import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

type Layer={src:string;x?:number;y?:number;width?:number;height?:number;rotate?:number;z?:number};
type Props={layers:Layer[];x?:number;y?:number;delay?:number;shadow?:boolean};

/** Groups multiple transparent cutouts into one layered collage cluster. */
export const LayeredCutout:React.FC<Props>=({layers,x=0,y=0,delay=0,shadow=true})=>{
 const f=useCurrentFrame()-delay; const p=interpolate(f,[0,20],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 return <div style={{position:"absolute",left:x,top:y}}>
  {layers.map((l,i)=>{const q=interpolate(f,[i*3,i*3+16],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});return <Img key={i} src={l.src} style={{position:"absolute",left:l.x??0,top:l.y??0,width:l.width??220,height:l.height??220,objectFit:"contain",zIndex:l.z??i,opacity:q,transform:`translateY(${(1-q)*24}px) rotate(${l.rotate??0}deg)`,filter:shadow?"drop-shadow(0 10px 12px rgba(0,0,0,.28))":undefined}}/>;})}
 </div>;
};
