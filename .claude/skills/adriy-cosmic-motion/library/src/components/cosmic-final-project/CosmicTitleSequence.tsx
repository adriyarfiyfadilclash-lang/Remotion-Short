import React from "react";
import {useCurrentFrame,interpolate,Easing} from "remotion";
export type CosmicTitleSequenceProps={title:string;subtitle?:string;startFrame?:number;durationInFrames?:number;accent?:string};
/** Cinematic centered title and subtitle with a controlled reveal and fade. */
export const CosmicTitleSequence:React.FC<CosmicTitleSequenceProps>=({title,subtitle,startFrame=0,durationInFrames=100,accent="#80dcff"})=>{
const f=useCurrentFrame(),t=f-startFrame;
const opacity=interpolate(t,[0,18,durationInFrames-16,durationInFrames],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
const y=interpolate(t,[0,24],[24,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.cubic)});
return <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",opacity,transform:`translateY(${y}px)`,pointerEvents:"none",fontFamily:"Arial,sans-serif"}}>
<div style={{fontSize:12,letterSpacing:6,color:accent,fontWeight:800}}>ADRIY COSMIC MOTION</div><div style={{marginTop:18,fontSize:58,fontWeight:900,color:"#f4f9ff",letterSpacing:2,textShadow:"0 0 30px rgba(75,170,255,.4)"}}>{title}</div>{subtitle?<div style={{marginTop:14,fontSize:19,color:"#b9cce0",letterSpacing:1}}>{subtitle}</div>:null}
</div>;
};
