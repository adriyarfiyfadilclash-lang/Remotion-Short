import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;count?:number;spread?:number;startFrame?:number;duration?:number;color?:string;seed?:number};
export const ParticleReveal3D:React.FC<Props>=({children,count=120,spread=5,startFrame=0,duration=40,color="#D9E9F5",seed=11})=>{
 const frame=useCurrentFrame();
 const t=THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,duration),0,1);
 const e=t*t*(3-2*t);
 const positions=React.useMemo(()=>{
  const arr=new Float32Array(count*3);
  for(let i=0;i<count;i++){
   const n=i+seed*17;
   arr[i*3]=(((n*127.1)%997)/997-.5)*spread*2;
   arr[i*3+1]=(((n*311.7)%991)/991-.5)*spread*2;
   arr[i*3+2]=(((n*74.7)%983)/983-.5)*spread*2;
  }
  return arr;
 },[count,spread,seed]);
 const geometry=React.useMemo(()=>new THREE.BufferGeometry(),[]);
 React.useLayoutEffect(()=>{
  const p=positions.slice();
  for(let i=0;i<count;i++){
   p[i*3]*=(1-e); p[i*3+1]*=(1-e); p[i*3+2]*=(1-e);
  }
  geometry.setAttribute("position",new THREE.BufferAttribute(p,3));
  geometry.computeBoundingSphere();
 },[positions,count,e,geometry]);
 return <>
  <group scale={THREE.MathUtils.lerp(.7,1,e)}>{children}</group>
  <points geometry={geometry}>
   <pointsMaterial color={color} size={.035} transparent opacity={1-e} depthWrite={false}/>
  </points>
 </>;
};
