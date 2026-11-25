import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere, Cylinder } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

export type Heart3DProps = GroupProps & {
  color?: string;
  beat?: boolean;
  beatRate?: number;
};

/** Model jantung bergaya untuk visual edukasi; bukan model anatomi klinis presisi. */
export const Heart3D: React.FC<Heart3DProps> = ({
  color="#b93443", beat=true, beatRate=1, ...props
}) => {
  const frame = useCurrentFrame();
  const pulse = beat ? 1 + 0.055*Math.max(0,Math.sin((frame/30)*Math.PI*2*beatRate)) : 1;
  const mat = <meshPhysicalMaterial color={color} roughness={0.48} clearcoat={0.25}/>;
  return <group {...props} scale={pulse}>
    <Sphere args={[0.34,32,24]} position={[-0.19,0.03,0]} scale={[1,1.05,0.82]}>{mat}</Sphere>
    <Sphere args={[0.34,32,24]} position={[0.19,0.03,0]} scale={[1,1.05,0.82]}>{mat}</Sphere>
    <Capsule args={[0.075,0.27,8,16]} position={[-0.13,0.48,0]} rotation={[0,0,0.12]}>
      <meshStandardMaterial color="#a82c3b"/>
    </Capsule>
    <Capsule args={[0.065,0.25,8,16]} position={[0.12,0.48,0]} rotation={[0,0,-0.12]}>
      <meshStandardMaterial color="#477d9b"/>
    </Capsule>
    <Cylinder args={[0.045,0.055,0.25,12]} position={[0,-0.43,0]}>
      <meshStandardMaterial color="#8e2637"/>
    </Cylinder>
  </group>;
};
