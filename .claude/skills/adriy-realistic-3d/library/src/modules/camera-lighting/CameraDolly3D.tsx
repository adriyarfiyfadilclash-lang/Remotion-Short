import React, { useLayoutEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = { startZ?: number; endZ?: number; startX?: number; endX?: number; startY?: number; endY?: number; smooth?: boolean };

/** Straight dolly move along a configurable path. */
export const CameraDolly3D: React.FC<Props> = ({
  startZ = 8, endZ = 4, startX = 0, endX = 0, startY = 1, endY = 1, smooth = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { camera } = useThree();
  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: smooth ? Easing.inOut(Easing.quad) : Easing.linear,
  });
  useLayoutEffect(() => {
    camera.position.set(THREE.MathUtils.lerp(startX, endX, p), THREE.MathUtils.lerp(startY, endY, p), THREE.MathUtils.lerp(startZ, endZ, p));
    camera.lookAt(0, 0, 0);
  }, [camera, startX, endX, startY, endY, startZ, endZ, p]);
  return null;
};
