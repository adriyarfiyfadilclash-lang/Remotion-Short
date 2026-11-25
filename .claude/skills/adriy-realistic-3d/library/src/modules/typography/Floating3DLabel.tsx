import React from "react";
import {Text} from "@react-three/drei";
import {useCurrentFrame} from "remotion";

type Props={
  text:string;
  fontSize?:number;
  color?:string;
  amplitude?:number;
  frequency?:number;
  phase?:number;
  position?:[number,number,number];
  rotation?:[number,number,number];
};

export const Floating3DLabel:React.FC<Props>=({
  text,fontSize=.45,color="#E8EDF3",amplitude=.16,frequency=.8,phase=0,
  position=[0,0,0],rotation=[0,0,0]
})=>{
  const frame=useCurrentFrame();
  const y=amplitude*Math.sin((frame/30)*Math.PI*2*frequency+phase);
  return <Text position={[position[0],position[1]+y,position[2]]} rotation={rotation} fontSize={fontSize} anchorX="center" anchorY="middle">
    {text}
    <meshStandardMaterial color={color} roughness={.5}/>
  </Text>;
};
