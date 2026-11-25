import React from "react";
import {interpolate, useCurrentFrame} from "remotion";

type Event = {time:string; title:string; detail?:string; color?:string};
type Props = {events:Event[]; width?:number; delay?:number; direction?:"horizontal"|"vertical"};

export const PaperTimeline:React.FC<Props>=({events,width=900,delay=0,direction="horizontal"})=>{
 const frame=useCurrentFrame(); const vertical=direction==="vertical";
 const height=vertical?Math.max(260,events.length*150):190;
 const line=interpolate(frame,[delay,delay+24],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const span=vertical?height-80:width-100;
 return <svg width={vertical?360:width} height={height} viewBox={`0 0 ${vertical?360:width} ${height}`}>
  <path d={vertical?`M70 35 V${35+span*line}`:`M50 90 H${50+span*line}`} stroke="#9B8B73" strokeWidth="5" strokeLinecap="round"/>
  {events.map((e,i)=>{const pos=35+(span*i/Math.max(1,events.length-1)); const x=vertical?70:50+span*i/Math.max(1,events.length-1); const y=vertical?pos:90; const show=interpolate(frame,[delay+i*5,delay+i*5+8],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}); return <g key={`${e.time}-${i}`} opacity={show}>
   <circle cx={x} cy={y} r="13" fill={e.color??"#D77F69"} stroke="#F5EBDD" strokeWidth="4"/>
   <text x={vertical?105:x} y={vertical?y-8:35} fontSize="17" fontWeight="bold" fill="#40382F">{e.time}</text>
   <text x={vertical?105:x} y={vertical?y+17:130} textAnchor={vertical?"start":"middle"} fontSize="16" fill="#40382F">{e.title}</text>
   {e.detail?<text x={vertical?105:x} y={vertical?y+40:153} textAnchor={vertical?"start":"middle"} fontSize="12" fill="#756957">{e.detail}</text>:null}
  </g>;})}
 </svg>;
};
