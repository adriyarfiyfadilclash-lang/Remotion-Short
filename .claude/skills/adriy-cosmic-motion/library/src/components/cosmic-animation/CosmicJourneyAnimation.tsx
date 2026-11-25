import React from "react";
import {useCurrentFrame,interpolate,Easing} from "remotion";
import {PerspectiveCamera} from "@react-three/drei";
export type CosmicJourneyAnimationProps={start?:[number,number,number];end?:[number,number,number];durationInFrames?:number;startFrame?:number;fov?:number;arcHeight?:number};
/** Moves the active camera along a smooth arcing path through a space scene. */
export const CosmicJourneyAnimation:React.FC<CosmicJourneyAnimationProps>=({start=[0,2,22],end=[0,0,-18],durationInFrames=240,startFrame=0,fov=52,arcHeight=3})=>{const f=useCurrentFrame(),t=f-startFrame,p=interpolate(t,[0,durationInFrames],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.sine)});const pos:[number,number,number]=[start[0]+(end[0]-start[0])*p,start[1]+(end[1]-start[1])*p+Math.sin(p*Math.PI)*arcHeight,start[2]+(end[2]-start[2])*p];return <PerspectiveCamera makeDefault position={pos} fov={fov}/>;};
