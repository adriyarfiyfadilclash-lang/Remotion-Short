import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Lung3D } from "../OrganSystems/Lung3D";

export type BreathingAnimationProps = GroupProps & {
  breathsPerMinute?: number;
  depth?: number;
  paused?: boolean;
};

/** Siklus mengembang dan mengempis paru-paru untuk visualisasi konsep pernapasan. */
export const BreathingAnimation: React.FC<BreathingAnimationProps> = ({
  breathsPerMinute=14, depth=0.12, paused=false, ...props
}) => {
  const frame=useCurrentFrame();
  const period=1800/Math.max(1,breathsPerMinute);
  const phase=paused?0:(frame%period)/period;
  const inhale=(1-Math.cos(phase*Math.PI*2))/2;
  return <group {...props} scale={[1+depth*inhale,1+depth*inhale,1]}>
    <Lung3D breathing={false}/>
  </group>;
};
