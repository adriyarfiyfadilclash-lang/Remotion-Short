import React from "react";
import {Line} from "@react-three/drei";
export type GravityWell3DProps={frame?:number;radius?:number;depth?:number;rings?:number;color?:string;rotationSpeed?:number};
/** Sumur gravitasi konseptual berupa cincin konsentris yang melengkung ke pusat. */
export const GravityWell3D:React.FC<GravityWell3DProps>=({frame=0,radius=2.6,depth=1.05,rings=18,color="#63b9e8",rotationSpeed=.003})=>{
 const spin=frame*rotationSpeed;
 return <group rotation={[0,spin,0]}>
  {Array.from({length:rings},(_,i)=>{const r=radius*(i+1)/rings;const y=-depth*(1-r/radius)*(1-r/radius);const pts:[number,number,number][]=[];for(let j=0;j<=128;j++){const a=j/128*Math.PI*2;pts.push([Math.cos(a)*r,y,Math.sin(a)*r]);}return <Line key={i} points={pts} color={color} lineWidth={1} transparent opacity={.18+.52*(i/rings)}/>;})}
 </group>;
};