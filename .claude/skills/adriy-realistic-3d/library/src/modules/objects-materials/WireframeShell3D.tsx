import React from "react";

type Props={
  geometry?:React.ReactNode;
  position?:[number,number,number];
  scale?:number;
  color?:string;
  opacity?:number;
  thickness?:number;
};

export const WireframeShell3D:React.FC<Props>=({
  geometry,position=[0,0,0],scale=1,color="#72D5E8",opacity=.48
})=>(
  <mesh position={position} scale={scale}>
    {geometry ?? <icosahedronGeometry args={[1.15,2]}/>}
    <meshBasicMaterial color={color} wireframe transparent opacity={opacity}/>
  </mesh>
);
