import React from "react";
import {Planet3D} from "../CosmicCore/Planet3D";
import {PlanetRevolution3D} from "./PlanetRevolution3D";
import {PlanetaryOrbit3D} from "./PlanetaryOrbit3D";
export type SolarSystemBody={name?:string;radius:number;color:string;orbitRadius:number;orbitSpeed:number;rotationSpeed?:number;phase?:number;eccentricity?:number;inclination?:number};
export type SolarSystem3DProps={frame?:number;bodies?:SolarSystemBody[];sunRadius?:number;sunColor?:string;showOrbits?:boolean};
/** Tata surya mini dengan bintang pusat dan daftar planet yang bergerak secara deterministik. */
const defaults:SolarSystemBody[]=[
 {name:"Planet A",radius:.22,color:"#b98b69",orbitRadius:1.35,orbitSpeed:.025},
 {name:"Planet B",radius:.34,color:"#d7a66e",orbitRadius:2.05,orbitSpeed:.016},
 {name:"Planet C",radius:.38,color:"#438bc2",orbitRadius:2.9,orbitSpeed:.011},
 {name:"Planet D",radius:.29,color:"#b75f4e",orbitRadius:3.8,orbitSpeed:.008},
];
export const SolarSystem3D:React.FC<SolarSystem3DProps>=({frame=0,bodies=defaults,sunRadius=.62,sunColor="#ffcf72",showOrbits=true})=><group>
 <pointLight position={[0,0,0]} intensity={90} distance={28} color={sunColor}/>
 <mesh><sphereGeometry args={[sunRadius,48,36]}/><meshBasicMaterial color={sunColor}/></mesh>
 {bodies.map((body,i)=><group key={body.name??i}>
  {showOrbits&&<PlanetaryOrbit3D semiMajorAxis={body.orbitRadius} eccentricity={body.eccentricity??0} inclination={body.inclination??0} color="#64829a" opacity={.48}/>}
  <PlanetRevolution3D frame={frame} orbitRadius={body.orbitRadius} speed={body.orbitSpeed} phase={body.phase??i*.8} inclination={body.inclination??0}>
   <Planet3D radius={body.radius} color={body.color} frame={frame} rotationSpeed={body.rotationSpeed??.012}/>
  </PlanetRevolution3D>
 </group>)}
 </group>;
