import React,{useMemo} from "react";
import {Line} from "@react-three/drei";
export type PlanetaryOrbit3DProps={semiMajorAxis?:number;eccentricity?:number;segments?:number;inclination?:number;rotation?:number;color?:string;opacity?:number};
/** Lintasan orbit elips berdasarkan sumbu semi-mayor dan eksentrisitas. */
export const PlanetaryOrbit3D:React.FC<PlanetaryOrbit3DProps>=({semiMajorAxis=2,eccentricity=0,segments=160,inclination=0,rotation=0,color="#607d96",opacity=.5})=>{
 const points=useMemo(()=>{const e=Math.max(0,Math.min(.95,eccentricity));const b=semiMajorAxis*Math.sqrt(1-e*e);const p:[number,number,number][]=[];for(let i=0;i<=segments;i++){const t=i/segments*Math.PI*2,x=semiMajorAxis*(Math.cos(t)-e),z=b*Math.sin(t);const xr=x*Math.cos(rotation)-z*Math.sin(rotation),zr=x*Math.sin(rotation)+z*Math.cos(rotation);p.push([xr,zr*Math.sin(inclination),zr*Math.cos(inclination)]);}return p;},[semiMajorAxis,eccentricity,segments,inclination,rotation]);
 return <Line points={points} color={color} lineWidth={1} transparent opacity={opacity}/>;
};