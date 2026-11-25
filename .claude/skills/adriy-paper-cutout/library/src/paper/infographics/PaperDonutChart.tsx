import React from "react";
import {interpolate, useCurrentFrame} from "remotion";

type Slice = {label:string; value:number; color:string};
type Props = {data:Slice[]; size?:number; thickness?:number; delay?:number; centerLabel?:string};

export const PaperDonutChart:React.FC<Props> = ({data,size=300,thickness=48,delay=0,centerLabel="TOTAL"}) => {
 const frame=useCurrentFrame(); const total=data.reduce((s,d)=>s+d.value,0)||1;
 const progress=interpolate(frame,[delay,delay+36],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const r=(size-thickness)/2, c=size/2, circumference=2*Math.PI*r;
 let offset=0;
 return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
  <circle cx={c} cy={c} r={r} fill="none" stroke="#E4D7C2" strokeWidth={thickness}/>
  {data.map((d,i)=>{const length=circumference*d.value/total*progress; const dash=`${length} ${circumference-length}`; const el=<circle key={i} cx={c} cy={c} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={dash} strokeDashoffset={-offset} transform={`rotate(-90 ${c} ${c})`} strokeLinecap="butt"/>; offset+=circumference*d.value/total; return el;})}
  <text x={c} y={c-2} textAnchor="middle" fontSize="19" fontWeight="bold" fill="#40382F">{centerLabel}</text>
  <text x={c} y={c+25} textAnchor="middle" fontSize="15" fill="#756957">{total}</text>
 </svg>;
};
