import React from "react";
import { Cylinder, Sphere } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";

export type AnatomyMaterialProps = {
  color?: string;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
};

export const AnatomyMaterial: React.FC<AnatomyMaterialProps> = ({
  color = "#c98778", roughness = 0.72, metalness = 0, opacity = 1, transparent = false,
}) => <meshStandardMaterial color={color} roughness={roughness} metalness={metalness}
  opacity={opacity} transparent={transparent} />;

export const Bone: React.FC<{from:[number,number,number];to:[number,number,number];radius?:number;color?:string}> = ({
  from,to,radius=0.055,color="#e8dfc8"
}) => {
  const a = new Vector3(...from);
  const b = new Vector3(...to);
  const direction = b.clone().sub(a);
  const midpoint = a.clone().add(b).multiplyScalar(0.5);
  return <Cylinder args={[radius,radius,direction.length(),10]} position={midpoint.toArray()}
    quaternion={new Quaternion().setFromUnitVectors(new Vector3(0,1,0),direction.normalize())}>
    <meshStandardMaterial color={color} roughness={0.86}/>
  </Cylinder>;
};

export const Joint: React.FC<{position:[number,number,number];radius?:number;color?:string}> = ({
  position,radius=0.075,color="#e8dfc8"
}) => <Sphere args={[radius,16,12]} position={position}>
  <meshStandardMaterial color={color} roughness={0.82}/>
</Sphere>;
