import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props={children:React.ReactNode;color?:string;duration?:number;origin?:"left"|"right"|"top"|"bottom"};
export const PaperFoldTransition:React.FC<Props>=({children,color="#E7D8BD",duration=28,origin="left"})=>{
 const f=useCurrentFrame();
 const p=interpolate(f,[0,duration],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp",easing:Easing.inOut(Easing.cubic)});
 const rotate=interpolate(p,[0,1],[origin==="left"?-88:origin==="right"?88:0,0]);
 const axis=origin==="left"||origin==="right"?"Y":"X";
 const transformOrigin=origin==="left"?"left center":origin==="right"?"right center":origin==="top"?"center top":"center bottom";
 return <div style={{position:"relative",width:"100%",height:"100%",perspective:1200,background:color,overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:"#F8F1DF",transformStyle:"preserve-3d",transform:`rotate${axis}(${rotate}deg)`,transformOrigin,boxShadow:"0 10px 25px rgba(50,35,15,.2)"}}>{children}</div>
 </div>;
};
