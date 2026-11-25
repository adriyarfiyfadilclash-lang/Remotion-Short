import React from "react";
import {useCurrentFrame,interpolate} from "remotion";
export type CosmicTimelineMarkerProps={atFrame:number;label:string;color?:string;top?:number};
/** Small timeline cue that appears at a configured frame. */
export const CosmicTimelineMarker:React.FC<CosmicTimelineMarkerProps>=({atFrame,label,color="#79dcff",top=32})=>{
const f=useCurrentFrame(),opacity=interpolate(f,[atFrame-5,atFrame,atFrame+8],[0,1,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
return <div style={{position:"absolute",top,left:32,opacity,color,font:"700 12px Arial",letterSpacing:2,textShadow:"0 0 12px currentColor",pointerEvents:"none"}}>{label}</div>;
};
