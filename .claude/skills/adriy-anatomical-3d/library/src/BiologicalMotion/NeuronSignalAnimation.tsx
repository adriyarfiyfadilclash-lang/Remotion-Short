import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Line, Sphere } from "@react-three/drei";

export type NeuronSignalAnimationProps = GroupProps & {
  speed?: number;
  signalColor?: string;
  branchCount?: number;
};

/** Impuls cahaya berjalan di sepanjang akson dan cabang saraf skematis. */
export const NeuronSignalAnimation: React.FC<NeuronSignalAnimationProps> = ({
  speed=1, signalColor="#f6d76d", branchCount=4, ...props
}) => {
  const frame=useCurrentFrame();
  const main:[number,number,number][]=[[-1.2,0,0],[-0.45,0,0],[0.35,0,0],[1.2,0,0]];
  const t=((frame*speed/75)%1);
  const segment=Math.min(2,Math.floor(t*3));
  const u=t*3-segment;
  const a=main[segment],b=main[segment+1];
  const pos:[number,number,number]=[a[0]+(b[0]-a[0])*u,0.035,0.04];
  return <group {...props}>
    <Sphere args={[0.22,24,18]} position={[-1.35,0,0]}>
      <meshStandardMaterial color="#d9b66b"/>
    </Sphere>
    <Line points={main} color="#d9b66b" lineWidth={5}/>
    {Array.from({length:branchCount},(_,i)=>{
      const y=(i-(branchCount-1)/2)*0.18;
      return <Line key={i} points={[[0.25,0,0],[0.65,y,0],[0.95,y*1.6,0]]} color="#c9a95e" lineWidth={2}/>;
    })}
    <Sphere args={[0.09,16,12]} position={pos}>
      <meshStandardMaterial color={signalColor} emissive={signalColor} emissiveIntensity={1.5}/>
    </Sphere>
  </group>;
};
