import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import { useCurrentFrame } from "remotion";

export type CirculatorySystem3DProps = GroupProps & {
  arteryColor?: string;
  veinColor?: string;
  animateFlow?: boolean;
};

/** Jalur arteri dan vena utama sebagai skema aliran darah. */
export const CirculatorySystem3D: React.FC<CirculatorySystem3DProps> = ({
  arteryColor="#d84b4b", veinColor="#477fb8", animateFlow=true, ...props
}) => {
  const frame = useCurrentFrame();
  const pulse = animateFlow ? 0.8 + 0.2*Math.sin(frame/8) : 1;
  const arterial = [
    [[0,0.65,0],[0,0.25,0],[0,-0.1,0],[-0.15,-0.45,0],[-0.18,-0.95,0]],
    [[0,0.18,0],[-0.35,0.05,0],[-0.52,-0.3,0],[-0.62,-0.65,0]],
    [[0,0.18,0],[0.35,0.05,0],[0.52,-0.3,0],[0.62,-0.65,0]]
  ] as [number,number,number][][];
  const venous = [
    [[-0.18,-0.95,-0.04],[-0.12,-0.4,-0.04],[0,-0.05,-0.04],[0,0.55,-0.04]],
    [[-0.62,-0.65,-0.04],[-0.4,-0.2,-0.04],[0,0.05,-0.04]],
    [[0.62,-0.65,-0.04],[0.4,-0.2,-0.04],[0,0.05,-0.04]]
  ] as [number,number,number][][];
  return <group {...props} scale={pulse}>
    <Sphere args={[0.18,24,18]} position={[0,0.18,0]}>
      <meshStandardMaterial color="#b93643" emissive="#6b1720" emissiveIntensity={0.25}/>
    </Sphere>
    {arterial.map((p,i)=><Line key={`a${i}`} points={p} color={arteryColor} lineWidth={4}/>)}
    {venous.map((p,i)=><Line key={`v${i}`} points={p} color={veinColor} lineWidth={3}/>)}
  </group>;
};
