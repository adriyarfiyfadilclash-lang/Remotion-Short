import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere } from "@react-three/drei";

export type HumanBody3DProps = GroupProps & {
  skinColor?: string;
  detail?: "simple" | "standard";
  showHead?: boolean;
};

/** Model tubuh manusia stilisasi untuk visual edukasi, bukan model klinis diagnostik. */
export const HumanBody3D: React.FC<HumanBody3DProps> = ({
  skinColor="#bd806f", detail="standard", showHead=true, ...groupProps
}) => (
  <group {...groupProps}>
    {showHead && <Sphere args={[0.22,32,24]} position={[0,1.63,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.62}/>
    </Sphere>}
    <Capsule args={[0.34,0.58,8,24]} position={[0,0.91,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.68}/>
    </Capsule>
    <Capsule args={[0.25,0.28,8,20]} position={[0,0.32,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.7}/>
    </Capsule>
    <Capsule args={[0.12,0.52,8,16]} position={[-0.43,0.88,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.7}/>
    </Capsule>
    <Capsule args={[0.12,0.52,8,16]} position={[0.43,0.88,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.7}/>
    </Capsule>
    <Capsule args={[0.13,0.66,8,16]} position={[-0.16,-0.48,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.7}/>
    </Capsule>
    <Capsule args={[0.13,0.66,8,16]} position={[0.16,-0.48,0]}>
      <meshStandardMaterial color={skinColor} roughness={0.7}/>
    </Capsule>
    {detail==="standard" && <>
      <Sphere args={[0.09,20,16]} position={[-0.43,0.48,0]}><meshStandardMaterial color={skinColor}/></Sphere>
      <Sphere args={[0.09,20,16]} position={[0.43,0.48,0]}><meshStandardMaterial color={skinColor}/></Sphere>
      <Sphere args={[0.11,20,16]} position={[-0.16,-1.02,0.04]}><meshStandardMaterial color={skinColor}/></Sphere>
      <Sphere args={[0.11,20,16]} position={[0.16,-1.02,0.04]}><meshStandardMaterial color={skinColor}/></Sphere>
    </>}
  </group>
);
