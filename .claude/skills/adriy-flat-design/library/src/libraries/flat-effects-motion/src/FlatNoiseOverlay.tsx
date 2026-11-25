import React from "react";
import { useCurrentFrame } from "remotion";

type Props={opacity?:number;cellSize?:number;color?:string;seedOffset?:number};
export const FlatNoiseOverlay:React.FC<Props>=({opacity=.07,cellSize=4,color="#0F172A",seedOffset=0})=>{
 const f=useCurrentFrame();
 const seed=(f+seedOffset)%997;
 const backgroundImage=`repeating-conic-gradient(${color} 0% 25%, transparent 0% 50%)`;
 return <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity,backgroundImage,backgroundSize:`${cellSize}px ${cellSize}px`,backgroundPosition:`${seed%cellSize}px ${(seed*3)%cellSize}px`,mixBlendMode:"multiply"}}/>;
};
