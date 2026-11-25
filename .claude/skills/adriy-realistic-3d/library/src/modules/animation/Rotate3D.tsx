import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;axis?:"x"|"y"|"z";degreesPerSecond?:number;startDegrees?:number;startFrame?:number;style?:never};

export const Rotate3D:React.FC<Props>=({children,axis="y",degreesPerSecond=45,startDegrees=0,startFrame=0})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Group>(null);
 const angle=THREE.MathUtils.degToRad(startDegrees+(Math.max(0,frame-startFrame)/30)*degreesPerSecond);
 React.useLayoutEffect(()=>{if(ref.current) ref.current.rotation[axis]=angle;},[angle,axis]);
 return <group ref={ref}>{children}</group>;
};
