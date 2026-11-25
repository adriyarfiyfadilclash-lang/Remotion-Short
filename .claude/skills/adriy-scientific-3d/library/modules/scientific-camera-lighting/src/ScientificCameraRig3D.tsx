import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import * as THREE from "three";

type Props = {
  from?: [number, number, number];
  to?: [number, number, number];
  lookAt?: [number, number, number];
  startFrame?: number;
  duration?: number;
  easing?: "linear" | "smooth";
};

/** Moves the active perspective camera between two positions and aims it at a target. */
export const ScientificCameraRig3D: React.FC<Props> = ({
  from = [0, 0, 8],
  to = [0, 0, 6],
  lookAt = [0, 0, 0],
  startFrame = 0,
  duration = 60,
  easing = "smooth",
}) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const target = useMemo(() => new THREE.Vector3(...lookAt), [lookAt[0], lookAt[1], lookAt[2]]);
  const progress = interpolate(frame - startFrame, [0, Math.max(1, duration)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easing === "smooth" ? Easing.inOut(Easing.cubic) : Easing.linear,
  });

  const x = from[0] + (to[0] - from[0]) * progress;
  const y = from[1] + (to[1] - from[1]) * progress;
  const z = from[2] + (to[2] - from[2]) * progress;

  camera.position.set(x, y, z);
  camera.lookAt(target);
  camera.updateProjectionMatrix();
  return null;
};
