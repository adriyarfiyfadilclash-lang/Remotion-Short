import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type Props={children?:React.ReactNode;zoomFrom?:number;zoomTo?:number;panX?:number;panY?:number;duration?:number;delay?:number;rotateFrom?:number;rotateTo?:number;origin?:string};

/** Animated 2D camera rig for gently pushing and panning across a collage scene. */
export const MixedMediaCameraRig:React.FC<Props>=({children,zoomFrom=1,zoomTo=1.08,panX=0,panY=0,duration=90,delay=0,rotateFrom=0,rotateTo=0,origin="50% 50%"})=>{
 const f=useCurrentFrame()-delay;
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const zoom=interpolate(p,[0,1],[zoomFrom,zoomTo]);
 const rot=interpolate(p,[0,1],[rotateFrom,rotateTo]);
 return <AbsoluteFill style={{overflow:"hidden"}}>
  <AbsoluteFill style={{transform:`translate(${panX*p}px,${panY*p}px) scale(${zoom}) rotate(${rot}deg)`,transformOrigin:origin}}>
   {children}
  </AbsoluteFill>
 </AbsoluteFill>;
};
