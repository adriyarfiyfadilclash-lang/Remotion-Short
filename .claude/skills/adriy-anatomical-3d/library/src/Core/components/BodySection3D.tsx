import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Box, Capsule, Sphere } from "@react-three/drei";

export type BodySection3DProps = GroupProps & {
  section?: "torso" | "head" | "abdomen";
  cutColor?: string;
  reveal?: number;
};

/** Potongan ilustratif untuk memperkenalkan konsep penampang tubuh. */
export const BodySection3D: React.FC<BodySection3DProps> = ({
  section="torso", cutColor="#b85c50", reveal=0.55, ...props
}) => {
  const height = section==="head" ? 0.42 : section==="abdomen" ? 0.52 : 0.9;
  const y = section==="head" ? 1.62 : section==="abdomen" ? 0.55 : 0.92;
  return <group {...props}>
    <Capsule args={[section==="head"?0.2:0.31,height,8,28]} position={[0,y,0]}>
      <meshStandardMaterial color="#c68b79" roughness={0.65}/>
    </Capsule>
    <group position={[0,y,0.18]}>
      <Sphere args={[section==="head"?0.105:0.17,24,20]} position={[-0.12,0,0]}>
        <meshStandardMaterial color={cutColor} roughness={0.52}/>
      </Sphere>
      <Sphere args={[section==="head"?0.105:0.17,24,20]} position={[0.12,0,0]}>
        <meshStandardMaterial color={cutColor} roughness={0.52}/>
      </Sphere>
      <Box args={[0.05,height*1.55,0.08]} position={[0,0.02,0.02]}>
        <meshStandardMaterial color="#e7c6a2" roughness={0.8}/>
      </Box>
      <mesh position={[0,0,0.08]}>
        <ringGeometry args={[0.18,0.21,40]} />
        <meshStandardMaterial color="#f1d5b2" side={2}/>
      </mesh>
    </group>
    <mesh position={[0,y,0.23]} scale={[1,1,reveal]}>
      <sphereGeometry args={[0.28,32,24]}/>
      <meshBasicMaterial color="#ffffff" transparent opacity={0.06} wireframe/>
    </mesh>
  </group>;
};
