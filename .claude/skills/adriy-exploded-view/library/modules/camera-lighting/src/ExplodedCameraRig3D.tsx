import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Vec3 = [number, number, number];
type Props = {
  children: React.ReactNode;
  from?: Vec3;
  to?: Vec3;
  lookAtFrom?: Vec3;
  lookAtTo?: Vec3;
  startFrame?: number;
  duration?: number;
  fov?: number;
  near?: number;
  far?: number;
};

/** Animated camera rig for a controlled move between two exploded-view angles. */
export const ExplodedCameraRig3D: React.FC<Props> = ({
  children,
  from = [4, 3, 7],
  to = [6, 2.4, 5],
  lookAtFrom = [0, 0, 0],
  lookAtTo = [0, 0, 0],
  startFrame = 0,
  duration = 60,
  fov = 42,
  near = 0.1,
  far = 100,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const mix = (a: number, b: number) => a + (b - a) * p;
  const position: Vec3 = [mix(from[0], to[0]), mix(from[1], to[1]), mix(from[2], to[2])];
  const target: Vec3 = [
    mix(lookAtFrom[0], lookAtTo[0]),
    mix(lookAtFrom[1], lookAtTo[1]),
    mix(lookAtFrom[2], lookAtTo[2]),
  ];
  return (
    <group>
      <perspectiveCamera makeDefault position={position} fov={fov} near={near} far={far} />
      <group position={target}>{children}</group>
    </group>
  );
};
