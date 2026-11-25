import React from "react";
import { GroupProps } from "@react-three/fiber";
import { Brain3D } from "./Brain3D";
import { Line } from "@react-three/drei";

export type NervousSystem3DProps = GroupProps & {
  nerveColor?: string;
  showPeripheral?: boolean;
};

/** Otak, sumsum tulang belakang, dan jalur saraf utama dalam bentuk skematis. */
export const NervousSystem3D: React.FC<NervousSystem3DProps> = ({
  nerveColor="#e9c76a", showPeripheral=true, ...props
}) => {
  const paths: [number,number,number][][] = [
    [[0,0.55,0],[0,0.25,0],[0,-0.15,0],[0,-0.55,0],[0,-1.05,0]],
    [[0,0.15,0],[-0.35,-0.1,0],[-0.48,-0.45,0],[-0.58,-0.8,0]],
    [[0,0.15,0],[0.35,-0.1,0],[0.48,-0.45,0],[0.58,-0.8,0]],
    [[0,-0.45,0],[-0.2,-0.85,0],[-0.24,-1.25,0]],
    [[0,-0.45,0],[0.2,-0.85,0],[0.24,-1.25,0]]
  ];
  return <group {...props}>
    <Brain3D position={[0,0.75,0]} scale={0.68}/>
    {paths.slice(0,showPeripheral?paths.length:1).map((points,i)=><Line key={i} points={points}
      color={nerveColor} lineWidth={3} transparent opacity={0.9}/>)}
  </group>;
};
