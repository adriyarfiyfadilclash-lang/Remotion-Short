import React from "react";
export type LunarPhase3DProps={frame?:number;phase?:number;cycleFrames?:number;radius?:number;position?:[number,number,number];moonColor?:string;lightColor?:string};
/** Model fase Bulan konseptual dengan sumber cahaya yang bergerak mengitari bola. */
export const LunarPhase3D:React.FC<LunarPhase3DProps>=({frame=0,phase=0,cycleFrames=240,radius=.8,position=[0,0,0],moonColor="#b9c3d0",lightColor="#fff2d4"})=>{
 const a=phase+frame/cycleFrames*Math.PI*2;
 return <group position={position}>
  <mesh><sphereGeometry args={[radius,48,36]}/><meshStandardMaterial color={moonColor} roughness={.98}/></mesh>
  <directionalLight position={[Math.cos(a)*4,1,Math.sin(a)*4]} intensity={2.4} color={lightColor}/>
 </group>;
};