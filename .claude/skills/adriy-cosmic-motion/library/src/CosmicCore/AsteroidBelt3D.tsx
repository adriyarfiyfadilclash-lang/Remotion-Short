import React,{useMemo} from "react";
export type AsteroidBelt3DProps={count?:number;innerRadius?:number;outerRadius?:number;thickness?:number;frame?:number;rotationSpeed?:number;color?:string;seed?:number};
/** Sabuk asteroid prosedural dengan posisi stabil berdasarkan seed. */
export const AsteroidBelt3D:React.FC<AsteroidBelt3DProps>=({count=120,innerRadius=2.2,outerRadius=3.1,thickness=.22,frame=0,rotationSpeed=.0018,color="#8d8174",seed=29})=>{
 const rocks=useMemo(()=>{let s=seed>>>0;const rand=()=>{s=(1103515245*s+12345)>>>0;return s/4294967296;};return Array.from({length:count},(_,i)=>{const angle=rand()*Math.PI*2,radius=innerRadius+rand()*(outerRadius-innerRadius);return {angle,radius,y:(rand()-.5)*thickness,scale:.025+rand()*.075,rot:[rand()*Math.PI,rand()*Math.PI,rand()*Math.PI] as [number,number,number],key:i};});},[count,innerRadius,outerRadius,thickness,seed]);
 const spin=frame*rotationSpeed;return <group>{rocks.map(r=><mesh key={r.key} position={[Math.cos(r.angle+spin)*r.radius,r.y,Math.sin(r.angle+spin)*r.radius]} rotation={r.rot} scale={r.scale}><dodecahedronGeometry args={[1,0]}/><meshStandardMaterial color={color} roughness={1}/></mesh>)}</group>;
};