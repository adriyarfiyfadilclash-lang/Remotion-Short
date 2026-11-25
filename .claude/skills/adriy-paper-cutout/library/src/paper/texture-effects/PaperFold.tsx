import React from "react";
import {interpolate,useCurrentFrame} from "remotion";

type Props={width?:number;height?:number;color?:string;progress?:number;delay?:number;corner?:"top-left"|"top-right"|"bottom-left"|"bottom-right";style?:React.CSSProperties};
export const PaperFold:React.FC<Props>=({width=300,height=220,color="#E9DCC4",progress,delay=0,corner="top-right",style})=>{
 const frame=useCurrentFrame();
 const p=progress??interpolate(frame,[delay,delay+24],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
 const size= Math.min(width,height)*.34;
 const points=corner==="top-left"?`0,0 ${size},0 0,${size}`:corner==="top-right"?`${width},0 ${width-size},0 ${width},${size}`:corner==="bottom-left"?`0,${height} ${size},${height} 0,${height-size}`:`${width},${height} ${width-size},${height} ${width},${height-size}`;
 const crease=corner==="top-left"?`M0 ${size} L${size} 0`:corner==="top-right"?`M${width-size} 0 L${width} ${size}`:corner==="bottom-left"?`M0 ${height-size} L${size} ${height}`:`M${width-size} ${height} L${width} ${height-size}`;
 return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{filter:"drop-shadow(3px 5px 2px rgba(40,29,18,.18))",...style}}>
  <rect width={width} height={height} fill={color} stroke="rgba(70,50,30,.16)"/>
  <polygon points={points} fill="#BDAE94" opacity={p*.75}/>
  <path d={crease} stroke="#8D7B61" strokeWidth="1.5" opacity={p*.8} fill="none"/>
 </svg>;
};
