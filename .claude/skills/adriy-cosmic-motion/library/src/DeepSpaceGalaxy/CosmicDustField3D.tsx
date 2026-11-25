import React,{useMemo} from "react";
/** Partikel debu kosmik yang menyebar dalam volume ruang. */
export type CosmicDustField3DProps={count?:number;spread?:number;seed?:number;frame?:number;drift?:number;color?:string;size?:number;opacity?:number};
export const CosmicDustField3D:React.FC<CosmicDustField3DProps>=({count=1000,spread=8,seed=53,frame=0,drift=.002,color="#9ab8d7",size=.025,opacity=.5})=>{
 const positions=useMemo(()=>{let s=seed>>>0;const rand=()=>{s=(22695477*s+1)>>>0;return s/4294967296;};const p:number[]=[];for(let i=0;i<count;i++)p.push((rand()-.5)*spread,(rand()-.5)*spread,(rand()-.5)*spread);return new Float32Array(p);},[count,spread,seed]);
 return <points rotation={[frame*drift*.6,frame*drift,frame*drift*.3]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation depthWrite={false}/></points>;
};