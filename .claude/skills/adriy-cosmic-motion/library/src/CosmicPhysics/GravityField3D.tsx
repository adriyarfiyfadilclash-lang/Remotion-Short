import React from "react";
import {Line} from "@react-three/drei";
export type GravityField3DProps={sourcePosition?:[number,number,number];fieldRadius?:number;lines?:number;color?:string;curvature?:number};
/** Garis medan gravitasi ilustratif yang mengarah ke sumber massa. */
export const GravityField3D:React.FC<GravityField3DProps>=({sourcePosition=[0,0,0],fieldRadius=2.5,lines=16,color="#8ecdf0",curvature=.25})=>{
 const paths=Array.from({length:lines},(_,i)=>{const a=i/lines*Math.PI*2;const p:[number,number,number][]=[];for(let j=0;j<=24;j++){const t=j/24,r=fieldRadius*(1-t),bend=Math.sin(t*Math.PI)*curvature;p.push([sourcePosition[0]+Math.cos(a)*r,sourcePosition[1]+bend,sourcePosition[2]+Math.sin(a)*r]);}return p;});
 return <group>{paths.map((p,i)=><Line key={i} points={p} color={color} lineWidth={1} transparent opacity={.5}/>)}</group>;
};