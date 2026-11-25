import React from "react";
import {useCurrentFrame,interpolate,Easing} from "remotion";
export type CosmicTransitionWipeProps={startFrame?:number;durationInFrames?:number;color?:string;direction?:"left"|"right"|"up"|"down";children?:React.ReactNode};
/** Animated color wipe overlay for transitions between cosmic shots. */
export const CosmicTransitionWipe:React.FC<CosmicTransitionWipeProps>=({startFrame=0,durationInFrames=24,color="#07152d",direction="left",children})=>{
const f=useCurrentFrame(),p=interpolate(f,[startFrame,startFrame+durationInFrames],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
const horizontal=direction==="left"||direction==="right";
const reverse=direction==="right"||direction==="down";
const size=`${p*100}%`;
const style:React.CSSProperties=horizontal?{width:size,height:"100%",left:reverse?undefined:0,right:reverse?0:undefined,top:0}:{height:size,width:"100%",top:reverse?undefined:0,bottom:reverse?0:undefined,left:0};
return <><div style={{position:"absolute",inset:0,background:color,...style,pointerEvents:"none"}}/>{children}</>;
};
