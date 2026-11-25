import React from "react";

type Props={
  children?:React.ReactNode;
  position?:[number,number,number];
  scale?:number;
  color?:string;
  roughness?:number;
  metalness?:number;
};

export const MetalObject3D:React.FC<Props>=({
  children,position=[0,0,0],scale=1,color="#AEBBC8",roughness=.22,metalness=.92
})=>(
  <group position={position} scale={scale}>
    {children ?? <mesh castShadow receiveShadow>
      <sphereGeometry args={[1,64,48]}/>
      <meshPhysicalMaterial color={color} roughness={roughness} metalness={metalness} clearcoat={1}/>
    </mesh>}
  </group>
);
