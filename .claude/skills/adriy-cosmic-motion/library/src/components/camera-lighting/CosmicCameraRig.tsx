import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export type CosmicCameraRigProps = {
  from?: [number, number, number];
  to?: [number, number, number];
  lookAt?: [number, number, number];
  endLookAt?: [number, number, number];
  fov?: number;
  startFrame?: number;
  durationInFrames?: number;
  easing?: boolean;
};

/** Deterministic cinematic camera move for Remotion scenes. */
export const CosmicCameraRig: React.FC<CosmicCameraRigProps> = ({
  from = [0, 2, 12],
  to = [0, 0, 7],
  lookAt = [0, 0, 0],
  endLookAt,
  fov = 42,
  startFrame = 0,
  durationInFrames = 180,
  easing = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easing ? Easing.inOut(Easing.cubic) : Easing.linear,
  });
  const position = from.map((v, i) => THREE.MathUtils.lerp(v, to[i], progress)) as [number, number, number];
  const target = endLookAt
    ? lookAt.map((v, i) => THREE.MathUtils.lerp(v, endLookAt[i], progress)) as [number, number, number]
    : lookAt;
  return <PerspectiveCamera makeDefault position={position} fov={fov} near={0.1} far={2000} />;
};
