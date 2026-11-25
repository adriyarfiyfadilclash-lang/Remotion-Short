import React from "react";
import {useCurrentFrame} from "remotion";
import * as THREE from "three";

type Props={children:React.ReactNode;amplitude?:number;frequency?:number;phase?:number;axis?:"x"|"y"|"z";startFrame?:number};

export const Float3D:React.FC<Props>=({children,amplitude=.18,frequency=1,phase=0,axis="y",startFrame=0})=>{
 const frame=useCurrentFrame();
 const ref=React.useRef<THREE.Group>(null);
 const offset=amplitude*Math.sin(((frame-startFrame)/30)*Math.PI*2*frequency+phase);
 React.useLayoutEffect(()=>{if(ref.current) ref.current.position[axis]=offset;},[offset,axis]);
 return <group ref={ref}>{children}</group>;
};
