import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={count?:number;spread?:number;size?:number;color?:string;drift?:number;seed?:number};

export const ParticleField3D:React.FC<Props>=({count=180,spread=8,size=.025,color="#DDE8F2",drift=.12,seed=7})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Points>(null);
 const positions=React.useMemo(()=>{
  const arr=new Float32Array(count*3);
  for(let i=0;i<count;i++){
   const n=i+seed*31;
   arr[i*3]=(((n*127.1)%997)/997-.5)*spread;
   arr[i*3+1]=(((n*311.7)%991)/991-.5)*spread;
   arr[i*3+2]=(((n*74.7)%983)/983-.5)*spread;
  }
  return arr;
 },[count,spread,seed]);
 React.useLayoutEffect(()=>{if(ref.current)ref.current.rotation.y=frame/30*drift;},[frame,drift]);
 return <points ref={ref}>
  <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry>
  <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={.75} depthWrite={false}/>
 </points>;
};
