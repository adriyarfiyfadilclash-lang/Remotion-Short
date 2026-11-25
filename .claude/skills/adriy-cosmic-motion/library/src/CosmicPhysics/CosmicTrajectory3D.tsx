import React,{useMemo} from "react";
import {Line} from "@react-three/drei";
export type CosmicTrajectory3DProps={start?:[number,number,number];end?:[number,number,number];control?:[number,number,number];segments?:number;frame?:number;duration?:number;color?:string;showMarker?:boolean};
/** Lintasan Bézier kuadratik dengan penanda yang bergerak sepanjang kurva. */
export const CosmicTrajectory3D:React.FC<CosmicTrajectory3DProps>=({start=[-3,0,0],end=[3,0,0],control=[0,2,0],segments=100,frame=0,duration=180,color="#f1c77b",showMarker=true})=>{
 const points=useMemo(()=>{const p:[number,number,number][]=[];for(let i=0;i<=segments;i++){const t=i/segments,u=1-t;p.push([u*u*start[0]+2*u*t*control[0]+t*t*end[0],u*u*start[1]+2*u*t*control[1]+t*t*end[1],u*u*start[2]+2*u*t*control[2]+t*t*end[2]]);}return p;},[start,end,control,segments]);
 const t=((frame%duration)+duration)%duration/duration,u=1-t;
 const marker:[number,number,number]=[u*u*start[0]+2*u*t*control[0]+t*t*end[0],u*u*start[1]+2*u*t*control[1]+t*t*end[1],u*u*start[2]+2*u*t*control[2]+t*t*end[2]];
 return <group><Line points={points} color={color} lineWidth={1.6} transparent opacity={.75}/>{showMarker&&<mesh position={marker}><sphereGeometry args={[.075,16,12]}/><meshBasicMaterial color={color}/></mesh>}</group>;
};