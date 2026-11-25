import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Side={title:string;points:string[];color:string};
type Props={left:Side;right:Side;width?:number;height?:number;delay?:number};

export const PaperComparison:React.FC<Props>=({left,right,width=900,height=430,delay=0})=>{
 const frame=useCurrentFrame();
 const p=interpolate(frame,[delay,delay+20],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const panel=(side:Side,x:number)=><g transform={`translate(${x},0)`} opacity={p}>
  <path d={`M5 8 L${width/2-22} 0 L${width/2-12} ${height-12} L0 ${height}Z`} fill={side.color} stroke="rgba(50,35,20,.2)" strokeWidth="2"/>
  <text x="28" y="54" fontSize="27" fontWeight="bold" fill="#342F28">{side.title}</text>
  {side.points.map((t,i)=><g key={i}><circle cx="36" cy={105+i*58} r="7" fill="#F7EEDC"/><text x="58" y={111+i*58} fontSize="18" fill="#342F28">{t}</text></g>)}
 </g>;
 return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>{panel(left,0)}{panel(right,width/2+8)}</svg>;
};
