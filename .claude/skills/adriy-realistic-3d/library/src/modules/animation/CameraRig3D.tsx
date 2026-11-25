import React from "react";
import {useCurrentFrame} from "remotion";
import {useThree} from "@react-three/fiber";
import * as THREE from "three";

type Props={position?:[number,number,number];target?:[number,number,number];moveTo?:[number,number,number];startFrame?:number;endFrame?:number;fov?:number};

export const CameraRig3D:React.FC<Props>=({position=[4,3,6],target=[0,0,0],moveTo,startFrame=0,endFrame=45,fov})=>{
 const frame=useCurrentFrame();
 const {camera}=useThree();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,endFrame-startFrame),0,1);
 const ease=t*t*(3-2*t);
 const p=moveTo?new THREE.Vector3(...position).lerp(new THREE.Vector3(...moveTo),ease):new THREE.Vector3(...position);
 React.useLayoutEffect(()=>{
  camera.position.copy(p);
  camera.lookAt(new THREE.Vector3(...target));
  if(fov!==undefined && camera instanceof THREE.PerspectiveCamera){camera.fov=fov;camera.updateProjectionMatrix();}
 },[camera,p.x,p.y,p.z,target[0],target[1],target[2],fov]);
 return null;
};
