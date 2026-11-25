import React from "react";
import {useCurrentFrame,interpolate,Easing} from "remotion";
import * as THREE from "three";
export type PlanetFlybyAnimationProps={from?:[number,number,number];to?:[number,number,number];durationInFrames?:number;startFrame?:number;radius?:number;color?:THREE.ColorRepresentation;spin?:number};
/** Planet glides through the frame on a deterministic Remotion timeline. */
export const PlanetFlybyAnimation:React.FC<PlanetFlybyAnimationProps>=({from=[-12,0,-2],to=[12,1,1],durationInFrames=180,startFrame=0,radius=1.5,color="#2867a8",spin=.025})=>{const f=useCurrentFrame(),t=f-startFrame,p=interpolate(t,[0,durationInFrames],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});if(t<0||t>durationInFrames)return null;const pos=from.map((v,i)=>THREE.MathUtils.lerp(v,to[i],p)) as [number,number,number];return <mesh position={pos} rotation={[.18,f*spin,.08]}><sphereGeometry args={[radius,48,48]}/><meshStandardMaterial color={color} roughness={.72} metalness={.12}/></mesh>;};
