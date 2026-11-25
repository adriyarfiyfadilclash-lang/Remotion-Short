import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;points:[number,number,number][];duration?:number;startFrame?:number;loop?:boolean;lookAhead?:boolean};

export const PathMotion3D:React.FC<Props>=({children,points,duration=90,startFrame=0,loop=false,lookAhead=false})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Group>(null);
 const curve=React.useMemo(()=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),[points]);
 let progress=(frame-startFrame)/Math.max(1,duration);
 progress=loop?((progress%1)+1)%1:THREE.MathUtils.clamp(progress,0,1);
 const position=curve.getPoint(progress);
 const ahead=curve.getPoint(Math.min(1,progress+.01));
 React.useLayoutEffect(()=>{
  if(!ref.current)return;
  ref.current.position.copy(position);
  if(lookAhead) ref.current.lookAt(ahead);
 },[position.x,position.y,position.z,ahead.x,ahead.y,ahead.z,lookAhead]);
 return <group ref={ref}>{children}</group>;
};
