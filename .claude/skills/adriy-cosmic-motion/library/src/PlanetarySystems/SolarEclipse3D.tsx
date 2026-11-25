import React from "react";
export type SolarEclipse3DProps={frame?:number;duration?:number;sunRadius?:number;moonRadius?:number;orbitOffset?:number;sunColor?:string};
/** Simulasi visual gerhana Matahari: Bulan melintas di depan cakram Matahari. */
export const SolarEclipse3D:React.FC<SolarEclipse3DProps>=({frame=0,duration=180,sunRadius=1,moonRadius=.32,orbitOffset=1.6,sunColor="#ffc96b"})=>{
 const t=(frame%duration)/duration;const x=Math.cos(t*Math.PI*2)*orbitOffset;
 return <group>
  <mesh><sphereGeometry args={[sunRadius,48,32]}/><meshBasicMaterial color={sunColor}/></mesh>
  <mesh position={[x,0,.82]}><sphereGeometry args={[moonRadius,40,32]}/><meshStandardMaterial color="#171d28" roughness={1}/></mesh>
  <pointLight intensity={35} distance={16} color={sunColor}/>
 </group>;
};