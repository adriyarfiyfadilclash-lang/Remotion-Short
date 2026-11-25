import React,{useMemo} from "react";
import {Line} from "@react-three/drei";
export type OrbitPath3DProps={radius?:number;segments?:number;position?:[number,number,number];color?:string;opacity?:number;tilt?:number};
/** Garis orbit melingkar untuk planet, bulan, atau satelit. */
export const OrbitPath3D:React.FC<OrbitPath3DProps>=({radius=2,segments=128,position=[0,0,0],color="#5c839b",opacity=.55,tilt=0})=>{
 const points=useMemo(()=>{const p:[number,number,number][]=[];for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2;p.push([Math.cos(a)*radius,Math.sin(a)*radius*Math.sin(tilt),Math.sin(a)*radius*Math.cos(tilt)]);}return p;},[radius,segments,tilt]);
 return <group position={position}><Line points={points} color={color} lineWidth={1} transparent opacity={opacity}/></group>;
};