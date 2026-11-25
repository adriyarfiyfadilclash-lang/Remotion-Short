import React,{useMemo} from "react";
/** Galaksi spiral dengan lengan bintang prosedural dan tonjolan inti. */
export type SpiralGalaxy3DProps={starCount?:number;arms?:number;radius?:number;thickness?:number;seed?:number;frame?:number;rotationSpeed?:number;scale?:number;coreColor?:string};
export const SpiralGalaxy3D:React.FC<SpiralGalaxy3DProps>=({starCount=2600,arms=4,radius=3.1,thickness=.16,seed=7,frame=0,rotationSpeed=.0015,scale=1,coreColor="#ffe2ad"})=>{
 const positions=useMemo(()=>{let s=seed>>>0;const rand=()=>{s=(1103515245*s+12345)>>>0;return s/4294967296;};const p:number[]=[];for(let i=0;i<starCount;i++){const arm=i%Math.max(1,arms),r=Math.pow(rand(),.62)*radius,a=arm/arms*Math.PI*2+r*1.65+(rand()-.5)*.42;p.push(Math.cos(a)*r,(rand()-.5)*thickness*(1+r*.35),Math.sin(a)*r);}return new Float32Array(p);},[starCount,arms,radius,thickness,seed]);
 return <group rotation={[0,frame*rotationSpeed,0]} scale={scale}>
  <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#c7d9ff" size={.035} transparent opacity={.92} sizeAttenuation/></points>
  <mesh><sphereGeometry args={[radius*.16,32,24]}/><meshBasicMaterial color={coreColor}/></mesh>
  <pointLight color={coreColor} intensity={12} distance={radius*3}/>
 </group>;
};