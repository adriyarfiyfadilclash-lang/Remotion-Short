import React,{useMemo} from "react";
/** Gugus bintang padat dengan variasi ukuran yang stabil berdasarkan seed. */
export type StarCluster3DProps={count?:number;radius?:number;seed?:number;color?:string;size?:number;opacity?:number;ellipticity?:number};
export const StarCluster3D:React.FC<StarCluster3DProps>=({count=1400,radius=2,seed=23,color="#e2eaff",size=.045,opacity=.95,ellipticity=.7})=>{
 const positions=useMemo(()=>{let s=seed>>>0;const rand=()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};const p:number[]=[];for(let i=0;i<count;i++){const u=rand()*2-1,a=rand()*Math.PI*2,r=Math.pow(rand(),2/3)*radius,k=Math.sqrt(1-u*u);p.push(r*k*Math.cos(a),r*u*ellipticity,r*k*Math.sin(a));}return new Float32Array(p);},[count,radius,seed,ellipticity]);
 return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false}/></points>;
};