import React from "react";
export type Satellite3DProps={position?:[number,number,number];frame?:number;rotationSpeed?:number;scale?:number;panelColor?:string;bodyColor?:string};
/** Satelit buatan sederhana dengan badan utama dan dua panel surya. */
export const Satellite3D:React.FC<Satellite3DProps>=({position=[0,0,0],frame=0,rotationSpeed=.018,scale=1,panelColor="#3f83b8",bodyColor="#c4cbd1"})=><group position={position} rotation={[0,frame*rotationSpeed,0]} scale={scale}>
 <mesh><boxGeometry args={[.34,.28,.3]}/><meshStandardMaterial color={bodyColor} metalness={.75} roughness={.28}/></mesh>
 <mesh position={[-.62,0,0]}><boxGeometry args={[.82,.045,.34]}/><meshStandardMaterial color={panelColor} metalness={.45} roughness={.4}/></mesh>
 <mesh position={[.62,0,0]}><boxGeometry args={[.82,.045,.34]}/><meshStandardMaterial color={panelColor} metalness={.45} roughness={.4}/></mesh>
 <mesh position={[0,0,.25]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.045,.045,.3,12]}/><meshStandardMaterial color="#e4e9ed" metalness={.7}/></mesh>
 </group>;