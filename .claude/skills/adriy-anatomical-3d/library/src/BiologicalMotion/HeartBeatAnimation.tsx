import React from "react";
import { GroupProps } from "@react-three/fiber";
import { useCurrentFrame } from "remotion";
import { Heart3D } from "../OrganSystems/Heart3D";

export type HeartBeatAnimationProps = GroupProps & {
  bpm?: number;
  strength?: number;
  color?: string;
  paused?: boolean;
};

/** Animasi denyut visual; BPM hanya mengatur irama tampilan, bukan simulasi fisiologi. */
export const HeartBeatAnimation: React.FC<HeartBeatAnimationProps> = ({
  bpm=72, strength=0.08, color="#b93443", paused=false, ...props
}) => {
  const frame = useCurrentFrame();
  const beatFrames = 1800 / Math.max(1,bpm);
  const phase = paused ? 0 : (frame % beatFrames) / beatFrames;
  const pulse = 1 + strength * Math.pow(Math.max(0,Math.sin(phase*Math.PI*2)),8);
  return <group {...props} scale={pulse}>
    <Heart3D beat={false} color={color}/>
  </group>;
};
