import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Capsule, Sphere } from "@react-three/drei";

export type DigestionMotionAnimationProps = GroupProps & {
  transitSpeed?: number;
  particleColor?: string;
  particleCount?: number;
};

/** Partikel makanan bergerak melalui jalur pencernaan sederhana secara ilustratif. */
export const DigestionMotionAnimation: React.FC<DigestionMotionAnimationProps> = ({
  transitSpeed=1, particleColor="#f4c36b", particleCount=8, ...props
}) => {
  const frame=useCurrentFrame();
  const path:[number,number,number][]=[[0,0.9,0],[0,0.35,0],[0.35,0.05,0],[0.2,-0.45,0],[-0.1,-0.8,0]];
  return <group {...props}>
    <Capsule args={[0.055,0.55,8,16]} position={[0,0.58,0]}>
      <meshStandardMaterial color="#d5a27e"/>
    </Capsule>
    <Capsule args={[0.22,0.28,8,18]} position={[0.28,0.05,0]} rotation={[0,0,-0.5]}>
      <meshStandardMaterial color="#c77a53"/>
    </Capsule>
    <Capsule args={[0.07,0.55,8,16]} position={[0,-0.55,0]}>
      <meshStandardMaterial color="#d8a17e"/>
    </Capsule>
    {Array.from({length:particleCount},(_,i)=>{
      const t=((frame*transitSpeed/100+i/particleCount)%1)*(path.length-1);
      const idx=Math.min(path.length-2,Math.floor(t));
      const u=t-idx, a=path[idx],b=path[idx+1];
      const p:[number,number,number]=[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u+0.1];
      return <Sphere key={i} args={[0.045,12,10]} position={p}>
        <meshStandardMaterial color={particleColor} emissive={particleColor} emissiveIntensity={0.3}/>
      </Sphere>;
    })}
  </group>;
};
