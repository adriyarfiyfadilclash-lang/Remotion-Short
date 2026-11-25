import React from "react";
import {SpiralGalaxy3D} from "./SpiralGalaxy3D";
/** Dua galaksi spiral berdekatan untuk menggambarkan interaksi dan tabrakan galaksi. */
export type GalaxyCollision3DProps={frame?:number;separation?:number;approach?:number;scale?:number;rotationSpeed?:number};
export const GalaxyCollision3D:React.FC<GalaxyCollision3DProps>=({frame=0,separation=3.4,approach=.006,scale=.58,rotationSpeed=.002})=>{
 const distance=Math.max(.8,separation-frame*approach);
 return <group>
  <group position={[-distance/2,0,0]} rotation={[.12,0,.22]}><SpiralGalaxy3D frame={frame} rotationSpeed={rotationSpeed} scale={scale} seed={17} coreColor="#ffd3a0"/></group>
  <group position={[distance/2,0,0]} rotation={[-.18,.35,-.2]}><SpiralGalaxy3D frame={-frame} rotationSpeed={rotationSpeed*1.3} scale={scale} seed={37} coreColor="#9fd9ff"/></group>
 </group>;
};