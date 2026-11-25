import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";
import {useThree} from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  children: React.ReactNode;
  from?: [number, number, number];
  to?: [number, number, number];
  startFrame?: number;
  endFrame?: number;
  easing?: "linear" | "smooth";
};

const smooth = (t:number) => t*t*(3-2*t);

export const Animated3DObject:React.FC<Props> = ({
  children, from=[0,0,0], to=[0,0,0], startFrame=0, endFrame=30, easing="smooth"
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t0 = THREE.MathUtils.clamp((frame-startFrame)/Math.max(1,endFrame-startFrame),0,1);
  const t = easing==="smooth" ? smooth(t0) : t0;
  const group = React.useRef<THREE.Group>(null);
  React.useLayoutEffect(()=>{
    if (!group.current) return;
    group.current.position.set(
      THREE.MathUtils.lerp(from[0],to[0],t),
      THREE.MathUtils.lerp(from[1],to[1],t),
      THREE.MathUtils.lerp(from[2],to[2],t)
    );
  },[t,from[0],from[1],from[2],to[0],to[1],to[2]]);
  return <group ref={group}>{children}</group>;
};
