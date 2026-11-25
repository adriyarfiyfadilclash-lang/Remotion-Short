import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Capsule } from "@react-three/drei";

export type MuscleContractionAnimationProps = GroupProps & {
  contraction?: number;
  frequency?: number;
  color?: string;
  paused?: boolean;
};

/** Serat otot stilisasi memendek dan menebal saat fase kontraksi. */
export const MuscleContractionAnimation: React.FC<MuscleContractionAnimationProps> = ({
  contraction=0.22, frequency=0.7, color="#a9433e", paused=false, ...props
}) => {
  const frame=useCurrentFrame();
  const phase=paused?0:(1-Math.cos(frame/30*frequency*Math.PI*2))/2;
  const scaleY=1-contraction*phase;
  const scaleX=1+contraction*0.35*phase;
  return <group {...props}>
    {Array.from({length:5},(_,i)=><Capsule key={i} args={[0.09,0.5,8,18]}
      position={[(i-2)*0.2,0,0]} scale={[scaleX,scaleY,1]}>
      <meshStandardMaterial color={color} roughness={0.58}/>
    </Capsule>)}
  </group>;
};
