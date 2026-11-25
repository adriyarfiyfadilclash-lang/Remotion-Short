import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Line, Sphere } from "@react-three/drei";

export type BloodFlowAnimationProps = GroupProps & {
  speed?: number;
  particleCount?: number;
  arteryColor?: string;
  veinColor?: string;
};

/** Partikel bergerak di sepanjang jalur pembuluh sederhana untuk menjelaskan arah aliran. */
export const BloodFlowAnimation: React.FC<BloodFlowAnimationProps> = ({
  speed=1, particleCount=12, arteryColor="#ed5a55", veinColor="#5796d0", ...props
}) => {
  const frame = useCurrentFrame();
  const paths = [
    {points:[[-0.8,0.55,0],[0,0.25,0],[0.8,0.55,0]] as [number,number,number][], color:arteryColor},
    {points:[[0.8,-0.55,0],[0,-0.25,0],[-0.8,-0.55,0]] as [number,number,number][], color:veinColor}
  ];
  return <group {...props}>
    {paths.map((path,i)=><group key={i}>
      <Line points={path.points} color={path.color} lineWidth={5}/>
      {Array.from({length:Math.max(1,particleCount)},(_,j)=>{
        const t = ((frame*speed/90 + j/particleCount + i*0.5)%1);
        const segment = t<0.5 ? 0 : 1;
        const local = t<0.5 ? t*2 : (t-0.5)*2;
        const a=path.points[segment], b=path.points[segment+1];
        const pos:[number,number,number]=[
          a[0]+(b[0]-a[0])*local,
          a[1]+(b[1]-a[1])*local,
          a[2]+(b[2]-a[2])*local+0.035
        ];
        return <Sphere key={j} args={[0.045,12,10]} position={pos}>
          <meshStandardMaterial color={path.color} emissive={path.color} emissiveIntensity={0.35}/>
        </Sphere>;
      })}
    </group>)}
  </group>;
};
