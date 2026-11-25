import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";
export type BlackHoleAccretionAnimationProps={position?:[number,number,number];diskRadius?:number;diskThickness?:number;rotationSpeed?:number;innerColor?:THREE.ColorRepresentation;outerColor?:THREE.ColorRepresentation};
/** Stylized rotating accretion disk surrounding a dark event-horizon sphere. */
export const BlackHoleAccretionAnimation:React.FC<BlackHoleAccretionAnimationProps>=({position=[0,0,0],diskRadius=3.2,diskThickness=.12,rotationSpeed=.018,innerColor="#fff0c2",outerColor="#ff6a32"})=>{const f=useCurrentFrame();return <group position={position}><mesh><sphereGeometry args={[.92,48,48]}/><meshBasicMaterial color="#000"/></mesh><group rotation={[.28,f*rotationSpeed,.08]}>{[0,1,2,3,4].map(i=><mesh key={i} rotation={[Math.PI/2,0,0]}><torusGeometry args={[diskRadius*(.42+i*.115),diskThickness*(1-i*.12),12,128]}/><meshBasicMaterial color={i<2?innerColor:outerColor} transparent opacity={.78-i*.1}/></mesh>)}</group><pointLight position={[0,.25,0]} color={innerColor} intensity={2.1} distance={12}/></group>;};
