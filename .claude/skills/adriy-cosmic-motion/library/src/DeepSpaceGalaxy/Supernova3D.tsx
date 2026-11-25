import React from "react";
/** Ledakan supernova konseptual berupa selubung bercahaya yang mengembang. */
export type Supernova3DProps={frame?:number;cycleFrames?:number;maxRadius?:number;color?:string;opacity?:number;position?:[number,number,number]};
export const Supernova3D:React.FC<Supernova3DProps>=({frame=0,cycleFrames=150,maxRadius=2.6,color="#ff9a62",opacity=.48,position=[0,0,0]})=>{
 const t=((frame%cycleFrames)+cycleFrames)%cycleFrames/cycleFrames,r=.18+t*maxRadius,o=opacity*(1-t*.72);
 return <group position={position}>
  <mesh><sphereGeometry args={[.18,24,20]}/><meshBasicMaterial color="#fff4ce"/></mesh>
  <mesh scale={r/.18}><sphereGeometry args={[.18,32,24]}/><meshBasicMaterial color={color} transparent opacity={o} wireframe side={2}/></mesh>
  <pointLight intensity={8*(1-t*.8)} color={color} distance={maxRadius*4}/>
 </group>;
};