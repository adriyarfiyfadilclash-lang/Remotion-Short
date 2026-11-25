import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Vec3 = [number, number, number];
type Props = {
  children: React.ReactNode;
  from?: Vec3;
  to?: Vec3;
  startFrame?: number;
  duration?: number;
  easing?: "linear" | "smooth" | "bounce";
  rotationFrom?: Vec3;
  rotationTo?: Vec3;
  scaleFrom?: number;
  scaleTo?: number;
};

/** Frame-driven position, rotation and scale animation for scientific 3D models. */
export const ScientificObjectMotion3D: React.FC<Props> = ({
  children,
  from = [0, 0, 0],
  to = [0, 0, 0],
  startFrame = 0,
  duration = 30,
  easing = "smooth",
  rotationFrom = [0, 0, 0],
  rotationTo = [0, 0, 0],
  scaleFrom = 1,
  scaleTo = 1,
}) => {
  const frame = useCurrentFrame();
  const ease = easing === "linear" ? Easing.linear : easing === "bounce" ? Easing.out(Easing.back(1.3)) : Easing.inOut(Easing.cubic);
  const p = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const mix = (a: number, b: number) => a + (b - a) * p;
  return (
    <group
      position={[mix(from[0], to[0]), mix(from[1], to[1]), mix(from[2], to[2])]}
      rotation={[mix(rotationFrom[0], rotationTo[0]), mix(rotationFrom[1], rotationTo[1]), mix(rotationFrom[2], rotationTo[2])]}
      scale={mix(scaleFrom, scaleTo)}
    >
      {children}
    </group>
  );
};
