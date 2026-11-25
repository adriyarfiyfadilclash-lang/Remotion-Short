import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export type AnatomicalRegion = "head" | "chest" | "abdomen" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg";
const positions: Record<AnatomicalRegion,[number,number,number]> = {
  head:[0,1.63,0.02], chest:[0,1.05,0.19], abdomen:[0,0.55,0.19],
  leftArm:[-0.43,0.82,0.05], rightArm:[0.43,0.82,0.05],
  leftLeg:[-0.16,-0.55,0.06], rightLeg:[0.16,-0.55,0.06],
};
export const AnatomicalRegion3D: React.FC<GroupProps & {
  region: AnatomicalRegion; color?:string; pulse?:number; active?:boolean;
}> = ({region,color="#36c5df",pulse=0,active=true,...props}) => {
  const p = positions[region];
  const scale = active ? 1 + Math.sin(pulse* Math.PI*2)*0.07 : 1;
  return <group {...props}>
    <Sphere args={[region==="chest"||region==="abdomen"?0.24:0.17,24,20]} position={p} scale={scale}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active?0.55:0.05}
        transparent opacity={active?0.78:0.2}/>
    </Sphere>
  </group>;
};
