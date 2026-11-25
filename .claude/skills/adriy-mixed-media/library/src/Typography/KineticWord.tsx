import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props={text:string;x?:number;y?:number;fontSize?:number;color?:string;accent?:string;delay?:number;direction?:"up"|"down"|"left"|"right";tracking?:number;weight?:number};

/** A single kinetic word that pops into the layout with controlled spring motion. */
export const KineticWord:React.FC<Props>=({text,x=0,y=0,fontSize=84,color="#f4f0e8",accent="#ef6b4a",delay=0,direction="up",tracking=-2,weight=900})=>{
 const frame=useCurrentFrame()-delay; const {fps}=useVideoConfig();
 const p=spring({frame, fps, config:{damping:14,stiffness:130,mass:.7}});
 const distance=direction==="up"?36:direction==="down"?-36:0;
 const dx=direction==="left"?42:direction==="right"?-42:0;
 return <div style={{position:"absolute",left:x,top:y,fontFamily:"Arial,sans-serif",fontSize,fontWeight:weight,letterSpacing:tracking,color,opacity:interpolate(frame,[0,5],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}),transform:`translate(${dx*(1-p)}px,${distance*(1-p)}px) scale(${.88+.12*p})`,textShadow:`5px 5px 0 ${accent}55`}}>{text}</div>;
};
