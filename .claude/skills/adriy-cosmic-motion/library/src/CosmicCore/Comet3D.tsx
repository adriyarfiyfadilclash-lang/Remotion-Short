import React from "react";
export type Comet3DProps={frame?:number;duration?:number;start?:[number,number,number];end?:[number,number,number];radius?:number;color?:string;tailLength?:number};
/** Komet bergerak di lintasan lurus dengan ekor ke belakang. */
export const Comet3D:React.FC<Comet3DProps>=({frame=0,duration=180,start=[-5,1,0],end=[5,-1,0],radius=.12,color="#bfeaff",tailLength=1.6})=>{
 const t=((frame%duration)+duration)%duration/duration,x=start[0]+(end[0]-start[0])*t,y=start[1]+(end[1]-start[1])*t,z=start[2]+(end[2]-start[2])*t;
 const dx=end[0]-start[0],dy=end[1]-start[1],dz=end[2]-start[2],len=Math.sqrt(dx*dx+dy*dy+dz*dz)||1;
 const mid:[number,number,number]=[x-dx/len*tailLength/2,y-dy/len*tailLength/2,z-dz/len*tailLength/2];
 return <group><mesh position={[x,y,z]}><sphereGeometry args={[radius,24,20]}/><meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2.5}/></mesh><mesh position={mid} rotation={[0,0,Math.atan2(-dy,-dx)]} scale={[tailLength,radius*2.5,radius*2.5]}><coneGeometry args={[.5,1,16]}/><meshBasicMaterial color={color} transparent opacity={.42}/></mesh><pointLight position={[x,y,z]} color={color} intensity={2.5} distance={4}/></group>;
};