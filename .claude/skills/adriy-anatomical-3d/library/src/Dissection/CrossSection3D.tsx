import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Cylinder, Torus } from "@react-three/drei";

export type CrossSection3DProps = GroupProps & {
  radius?: number;
  depth?: number;
  tissueColor?: string;
  innerColor?: string;
  ringCount?: number;
};

/** Penampang silinder berlapis untuk ilustrasi konseptual jaringan, bukan irisan anatomi klinis. */
export const CrossSection3D: React.FC<CrossSection3DProps> = ({
  radius=0.72, depth=0.24, tissueColor="#c77e70", innerColor="#8f3d43", ringCount=3, ...props
}) => (
  <group {...props}>
    <Cylinder args={[radius,radius,depth,64,1,false]} rotation={[Math.PI/2,0,0]}>
      <meshStandardMaterial color={tissueColor} roughness={0.7}/>
    </Cylinder>
    {Array.from({length:ringCount},(_,i)=>{
      const r=radius*(0.76-i*0.19);
      return <Torus key={i} args={[r,0.035,10,64]} rotation={[Math.PI/2,0,0]} position={[0,0,depth*0.56]}>
        <meshStandardMaterial color={i===ringCount-1?innerColor:"#e6b49a"} roughness={0.62}/>
      </Torus>;
    })}
  </group>
);
