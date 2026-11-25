import React from "react";

type Props={
  children?: React.ReactNode;
  position?:[number,number,number];
  scale?:number;
  color?:string;
  thickness?:number;
  roughness?:number;
  ior?:number;
};

export const GlassObject3D:React.FC<Props>=({
  children,position=[0,0,0],scale=1,color="#B9E7F2",thickness=.8,roughness=.06,ior=1.46
})=>(
  <group position={position} scale={scale}>
    {children ?? <mesh>
      <sphereGeometry args={[1,64,48]}/>
      <meshPhysicalMaterial color={color} transmission={1} thickness={thickness} roughness={roughness} ior={ior} transparent/>
    </mesh>}
  </group>
);
