import React from "react";
import {useCurrentFrame,interpolate,Easing} from "remotion";
export type CosmicEndCreditsProps={startFrame?:number;durationInFrames?:number;brand?:string;credit?:string};
/** Closing credits card for a finished cosmic explainer or short film. */
export const CosmicEndCredits:React.FC<CosmicEndCreditsProps>=({startFrame=0,durationInFrames=90,brand="ADRIY.PROJECT",credit="COSMIC MOTION"})=>{
const f=useCurrentFrame(),t=f-startFrame,opacity=interpolate(t,[0,16,durationInFrames-12,durationInFrames],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
const scale=interpolate(t,[0,20],[.96,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.out(Easing.quad)});
return <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background:"rgba(2,7,19,.72)",opacity,transform:`scale(${scale})`,fontFamily:"Arial,sans-serif",pointerEvents:"none"}}>
<div style={{fontSize:14,letterSpacing:7,color:"#7ddfff",fontWeight:800}}>{brand}</div><div style={{marginTop:16,fontSize:32,color:"#f4f8ff",fontWeight:900,letterSpacing:4}}>{credit}</div><div style={{marginTop:18,width:90,height:2,background:"#65d6ff"}}/>
</div>;
};
