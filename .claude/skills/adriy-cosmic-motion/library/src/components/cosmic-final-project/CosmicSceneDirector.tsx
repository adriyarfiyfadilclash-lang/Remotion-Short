import React from "react";
import {Sequence, useCurrentFrame, interpolate} from "remotion";
export type CosmicSceneDirectorProps={children:React.ReactNode;startFrame?:number;durationInFrames:number;fadeInFrames?:number;fadeOutFrames?:number};
/** Places a scene on the Remotion timeline and fades its opacity at the boundaries. */
export const CosmicSceneDirector:React.FC<CosmicSceneDirectorProps>=({children,startFrame=0,durationInFrames,fadeInFrames=18,fadeOutFrames=18})=>{
const f=useCurrentFrame(),local=f-startFrame;
const fadeIn=interpolate(local,[0,Math.max(1,fadeInFrames)],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
const fadeOut=interpolate(local,[Math.max(0,durationInFrames-fadeOutFrames),durationInFrames],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
return <Sequence from={startFrame} durationInFrames={durationInFrames}><div style={{width:"100%",height:"100%",opacity:Math.min(fadeIn,fadeOut)}}>{children}</div></Sequence>;
};
