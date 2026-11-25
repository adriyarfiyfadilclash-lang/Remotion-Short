import React from "react";
import {Line} from "@react-three/drei";
export type MagneticField3DProps={radius?:number;lines?:number;color?:string;frame?:number;rotationSpeed?:number};
/** Garis medan magnet berbentuk lengkungan dipol di sekitar objek pusat. */
export const MagneticField3D:React.FC<MagneticField3DProps>=({radius=2,lines=14,color="#75c9f0",frame=0,rotationSpeed=.004})=>{
 const rot=frame*rotationSpeed;
 const paths=Array.from({length:lines},(_,i)=>{const a=i/lines*Math.PI*2;const p:[number,number,number][]=[];for(let j=0;j<=48;j++){const t=-1+2*j/48;const r=radius*(.42+Math.abs(t)*.58);p.push([Math.cos(a)*r, t*radius*.85, Math.sin(a)*r]);}return p;});
 return <group rotation={[0,rot,0]}>{paths.map((p,i)=><Line key={i} points={p} color={color} lineWidth={1.2} transparent opacity={.55}/>)}</group>;
};