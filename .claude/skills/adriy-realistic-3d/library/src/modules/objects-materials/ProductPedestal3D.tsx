import React from "react";

type Props={
  width?:number;
  height?:number;
  depth?:number;
  color?:string;
  topColor?:string;
  position?:[number,number,number];
  children?:React.ReactNode;
};

export const ProductPedestal3D:React.FC<Props>=({
  width=3,height=.35,depth=2,color="#202C3A",topColor="#52687D",position=[0,-1.2,0],children
})=>(
  <group position={position}>
    <mesh position={[0,-height/2,0]} receiveShadow castShadow>
      <boxGeometry args={[width,height,depth]}/>
      <meshStandardMaterial color={color} roughness={.48} metalness={.35}/>
    </mesh>
    <mesh position={[0,.012,0]} receiveShadow>
      <boxGeometry args={[width*.99,.025,depth*.99]}/>
      <meshStandardMaterial color={topColor} roughness={.3} metalness={.3}/>
    </mesh>
    {children}
  </group>
);
