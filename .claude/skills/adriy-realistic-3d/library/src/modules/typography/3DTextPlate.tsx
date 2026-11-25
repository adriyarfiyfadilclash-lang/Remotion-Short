import React from "react";
import {Text} from "@react-three/drei";

type Props={
  title:string;
  subtitle?:string;
  width?:number;
  height?:number;
  depth?:number;
  plateColor?:string;
  textColor?:string;
  position?:[number,number,number];
  radius?:number;
};

export const Text3DPlate:React.FC<Props>=({
  title,subtitle,width=4,height=1.6,depth=.12,plateColor="#263746",
  textColor="#F2F4F6",position=[0,0,0],radius=.08
})=>(
  <group position={position}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[width,height,depth]}/>
      <meshPhysicalMaterial color={plateColor} metalness={.38} roughness={.32}/>
    </mesh>
    <Text position={[0,subtitle ? .18 : -.02,depth/2+.012]} fontSize={.36} color={textColor} anchorX="center" anchorY="middle" maxWidth={width-.3}>
      {title}
    </Text>
    {subtitle?<Text position={[0,-.42,depth/2+.014]} fontSize={.16} color="#B8C8D6" anchorX="center" anchorY="middle" maxWidth={width-.4}>{subtitle}</Text>:null}
  </group>
);
