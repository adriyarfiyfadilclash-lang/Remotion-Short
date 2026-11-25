import React from "react";
export type OrbitalMechanics3DProps={frame?:number;massParameter?:number;semiMajorAxis?:number;eccentricity?:number;periodFrames?:number;phase?:number;children:React.ReactNode};
/** Penggerak orbit Kepler sederhana: menghitung anomali eksentrik dengan iterasi Newton. */
export const OrbitalMechanics3D:React.FC<OrbitalMechanics3DProps>=({frame=0,massParameter=1,semiMajorAxis=2,eccentricity=.2,periodFrames=180,phase=0,children})=>{
 const e=Math.max(0,Math.min(.85,eccentricity));
 const mean=((frame/Math.max(1,periodFrames))*Math.PI*2+phase)%(Math.PI*2);
 let E=mean;for(let i=0;i<6;i++)E=E-(E-e*Math.sin(E)-mean)/(1-e*Math.cos(E));
 const x=semiMajorAxis*(Math.cos(E)-e),z=semiMajorAxis*Math.sqrt(1-e*e)*Math.sin(E);
 return <group position={[x,0,z]}>{children}</group>;
};