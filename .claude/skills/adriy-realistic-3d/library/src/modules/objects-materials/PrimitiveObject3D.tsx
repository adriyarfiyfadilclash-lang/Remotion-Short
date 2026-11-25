import React from "react";

type Props = {
  type?: "box" | "sphere" | "cylinder" | "cone" | "torus" | "torusKnot" | "icosahedron" | "octahedron";
  color?: string;
  size?: number;
  detail?: number;
  position?: [number,number,number];
  rotation?: [number,number,number];
  roughness?: number;
  metalness?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export const PrimitiveObject3D: React.FC<Props> = ({
  type="sphere", color="#8EA9C1", size=1, detail=2, position=[0,0,0],
  rotation=[0,0,0], roughness=.35, metalness=.15, castShadow=true, receiveShadow=true
}) => {
  const material = <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/>;
  let geometry: React.ReactNode;
  switch(type) {
    case "box": geometry=<boxGeometry args={[size*1.5,size*1.5,size*1.5]}/>; break;
    case "cylinder": geometry=<cylinderGeometry args={[size*.75,size*.75,size*1.5,48]}/>; break;
    case "cone": geometry=<coneGeometry args={[size,size*1.7,48]}/>; break;
    case "torus": geometry=<torusGeometry args={[size*.72,size*.22,24,72]}/>; break;
    case "torusKnot": geometry=<torusKnotGeometry args={[size*.65,size*.2,160,24]}/>; break;
    case "icosahedron": geometry=<icosahedronGeometry args={[size,detail]}/>; break;
    case "octahedron": geometry=<octahedronGeometry args={[size,detail]}/>; break;
    default: geometry=<sphereGeometry args={[size,64,48]}/>; break;
  }
  return <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
    {geometry}
    {material}
  </mesh>;
};
