import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import * as THREE from "three";

type Props = {
  from?: [number, number, number];
  to?: [number, number, number];
  lookAt?: [number, number, number];
  fov?: number;
  easing?: boolean;
  children?: React.ReactNode;
};

/** Deterministic camera move driven by the Remotion frame. Place inside ThreeCanvas. */
export const CinematicCamera3D: React.FC<Props> = ({
  from = [0, 1.5, 7], to = [0, 0.8, 4.5], lookAt = [0, 0, 0], fov = 42, easing = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { camera } = useThree();
  const t = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: easing ? Easing.inOut(Easing.cubic) : Easing.linear,
  });
  useLayoutEffect(() => {
    camera.position.set(
      THREE.MathUtils.lerp(from[0], to[0], t),
      THREE.MathUtils.lerp(from[1], to[1], t),
      THREE.MathUtils.lerp(from[2], to[2], t),
    );
    camera.fov = fov;
    camera.lookAt(...lookAt);
    camera.updateProjectionMatrix();
  }, [camera, from, to, lookAt, fov, t]);
  return null;
};
