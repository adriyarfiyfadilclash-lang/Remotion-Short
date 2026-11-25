import React from "react";
export type RelativityLens3DProps={radius?:number;strength?:number;color?:string;frame?:number};
/** Cincin lensa gravitasi sebagai representasi visual pembelokan cahaya. */
export const RelativityLens3D:React.FC<RelativityLens3DProps>=({radius=1.15,strength=.65,color="#f5c77a",frame=0})=>{
 const pulse=1+Math.sin(frame*.035)*.025;
 return <group scale={pulse}>
  <mesh><sphereGeometry args={[radius*.48,40,32]}/><meshBasicMaterial color="#03050b"/></mesh>
  <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,strength*.11,12,120]}/><meshBasicMaterial color={color} transparent opacity={.5+strength*.35}/></mesh>
  <pointLight color={color} intensity={strength*5} distance={radius*5}/>
 </group>;
};