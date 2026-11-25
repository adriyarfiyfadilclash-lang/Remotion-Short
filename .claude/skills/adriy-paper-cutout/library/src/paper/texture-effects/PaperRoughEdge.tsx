import React from "react";

type Props={width?:number;height?:number;color?:string;edge?:"top"|"bottom"|"left"|"right";seed?:number;style?:React.CSSProperties};
export const PaperRoughEdge:React.FC<Props>=({width=600,height=45,color="#F1E5CF",edge="bottom",seed=0,style})=>{
 const pts=Array.from({length:31},(_,i)=>{const v=(i*17+seed*13)%9;return `${i*width/30},${height*.25+v*height*.065}`}).join(" ");
 const vertical=edge==="left"||edge==="right";
 const transform=edge==="top"?"rotate(180deg)":edge==="left"?"rotate(90deg) translate(0,-100%)":edge==="right"?"rotate(-90deg) translate(-100%,0)":undefined;
 return <svg width={vertical?height:width} height={vertical?width:height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{display:"block",transformOrigin:"center",transform,...style}}>
  <polygon points={`0,${height} ${pts} ${width},${height}`} fill={color}/>
 </svg>;
};
