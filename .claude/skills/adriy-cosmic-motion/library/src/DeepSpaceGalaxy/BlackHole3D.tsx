import React from "react";
/** Lubang hitam bergaya edukasi dengan horizon gelap dan piringan akresi bercahaya. */
export type BlackHole3DProps={radius?:number;diskRadius?:number;frame?:number;rotationSpeed?:number;diskColor?:string;glowColor?:string;tilt?:number};
export const BlackHole3D:React.FC<BlackHole3DProps>=({radius=.72,diskRadius=1.75,frame=0,rotationSpeed=.018,diskColor="#f08a4b",glowColor="#65b9ff",tilt=.22})=><group rotation={[tilt,0,0]}>
 <mesh><sphereGeometry args={[radius,48,36]}/><meshBasicMaterial color="#020308"/></mesh>
 <group rotation={[0,frame*rotationSpeed,0]}>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[diskRadius*.72,.19,12,96]}/><meshStandardMaterial color={diskColor} emissive={diskColor} emissiveIntensity={2.1} metalness={.25} roughness={.35}/></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[diskRadius,.055,8,96]}/><meshBasicMaterial color={glowColor} transparent opacity={.72}/></mesh>
 </group>
 <pointLight color={diskColor} intensity={22} distance={diskRadius*5}/>
 </group>;
};