import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Capsule, Sphere, Box } from "@react-three/drei";
import { OrganIsolation3D } from "./OrganIsolation3D";

/** Potongan depan torso untuk memperkenalkan posisi organ utama secara skematis. */
export const AnatomicalCutaway3D: React.FC<GroupProps & {showOrgans?:boolean;showRibs?:boolean}> = ({
  showOrgans=true, showRibs=true, ...props
}) => (
  <group {...props}>
    <Capsule args={[0.43,0.8,8,28]} position={[0,0.3,0]}>
      <meshStandardMaterial color="#c99080" transparent opacity={0.22} depthWrite={false}/>
    </Capsule>
    {showRibs && Array.from({length:6},(_,i)=><group key={i} position={[0,0.73-i*0.14,0.12]}>
      {[-1,1].map(s=><Capsule key={s} args={[0.025,0.25,6,12]} position={[s*0.17,0,0]} rotation={[0,0,s*0.65]}>
        <meshStandardMaterial color="#eadfc8"/>
      </Capsule>)}
    </group>)}
    {showOrgans && <>
      <group position={[-0.14,0.65,0.23]} scale={0.55}><OrganIsolation3D organ="lungs"/></group>
      <group position={[0.17,0.48,0.34]} scale={0.38}><OrganIsolation3D organ="heart"/></group>
      <Sphere args={[0.2,24,18]} position={[0,-0.28,0.22]} scale={[1.2,0.8,0.8]}>
        <meshStandardMaterial color="#b87542" roughness={0.6}/>
      </Sphere>
      <Capsule args={[0.12,0.26,8,18]} position={[0,-0.62,0.24]} rotation={[0,0,-0.3]}>
        <meshStandardMaterial color="#d3a04e"/>
      </Capsule>
    </>}
    <Box args={[0.035,1.35,0.035]} position={[0,0.28,0.31]}>
      <meshStandardMaterial color="#eee2c9"/>
    </Box>
  </group>
);
