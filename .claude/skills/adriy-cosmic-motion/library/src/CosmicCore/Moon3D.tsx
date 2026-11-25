import React from "react";
export type Moon3DProps={radius?:number;color?:string;position?:[number,number,number];frame?:number;orbitRadius?:number;orbitSpeed?:number;phase?:number};
/** Bulan atau satelit alami yang mengorbit titik pusat. */
export const Moon3D:React.FC<Moon3DProps>=({radius=.27,color="#b9c2cc",position=[0,0,0],frame=0,orbitRadius=1.8,orbitSpeed=.025,phase=0})=>{
 const a=phase+frame*orbitSpeed;return <mesh position={[position[0]+Math.cos(a)*orbitRadius,position[1]+Math.sin(a*.7)*orbitRadius*.08,position[2]+Math.sin(a)*orbitRadius]} rotation={[0,a*.35,0]}><sphereGeometry args={[radius,32,24]}/><meshStandardMaterial color={color} roughness={.95}/></mesh>;
};